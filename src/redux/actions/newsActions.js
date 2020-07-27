import {
  FETCH_FRONT_PAGE_NEWS_SUCCESS,
  FETCH_FRONT_PAGE_NEWS_FAILURE,
  FETCH_LOCAL_NEWS_SUCCESS,
  FETCH_HIDDEN_ITEMS_SUCCESS,
} from "./actionTypes";
//import { API_CALL_IDENTIFIERS } from "../constants";
import { ExternalBaseService, InternalBaseService } from "../../services";
import CONFIG from "../../config/config";
//import { beginAPICall, endAPICall } from "./apiCallActions";
import { isEmpty, each, keys } from "lodash";
import moment from "moment";
import { normalizeNewsData } from "../../utils";

//#region Action Creators
export const fetchFrontPageNewsSuccess = (
  searchParams,
  data,
  page,
  syncUpRequired
) => {
  return {
    type: FETCH_FRONT_PAGE_NEWS_SUCCESS,
    query: searchParams,
    data,
    page,
    syncUpRequired,
  };
};

export const fetchFrontPageNewsFailure = (searchParams, error) => {
  return {
    type: FETCH_FRONT_PAGE_NEWS_FAILURE,
    query: searchParams,
    error,
  };
};

export const fetchNewsFromLocalSvcSuccess = (data) => {
  return {
    type: FETCH_LOCAL_NEWS_SUCCESS,
    data,
  };
};

export const fetchHiddenNewsItemsSuccess = (data) => {
  return {
    type: FETCH_HIDDEN_ITEMS_SUCCESS,
    data,
  };
};
//#endregion

//#region
/**
 * THUNK: to fetch the Front Page News: Client Side Calling
 * @param {*} pageObj page Object
 */
const fetchNewsFromApi = (pageObj) => async (dispatch) => {
  //const apiIdentifier = API_CALL_IDENTIFIERS.FRONT_PAGE_NEWS_SEARCH;
  const searchQuery = `&page=${!isEmpty(pageObj) ? pageObj.page : 0}`;
  try {
    //  dispatch(beginAPICall(apiIdentifier));

    const endpoint = CONFIG.API_ENDPOINTS.FETCH_FRONT_PAGE_NEWS;

    const response = await ExternalBaseService.get(endpoint + searchQuery);
    const { data, page } = normalizeNewsData(response.data);
    //dispatch(fetchFrontPageNewsSuccess(searchQuery, data, page));
    return { data, page, searchQuery };
  } catch (error) {
    dispatch(fetchFrontPageNewsFailure(searchQuery, error.message));
  } finally {
    //dispatch(endAPICall(apiIdentifier));
  }
};

/**
 * Assuming, Service Data has been already fetched and stored in Redux
 */
const syncNewsWithLocal = (newsDataSrviceData, searchQuery, page) => async (
  dispatch
) => {
  const serviceData = { ...newsDataSrviceData };
  const localData = fetchNewsFromLocalService();
  const hiddenData = fetchHiddenNewsItems();

  each(keys(localData), (objectId) => {
    const { points: localPointsCount } = localData[objectId];

    if (
      serviceData[objectId] &&
      localPointsCount > serviceData[objectId].points
    )
      serviceData[objectId].points = localPointsCount; // replace local points only when external points > local Count
  });
  each(keys(hiddenData), (key) => delete serviceData[key]);
  dispatch(fetchFrontPageNewsSuccess(searchQuery, serviceData, page, false));
};

/**
 * Server Side Calling
 * @param {*} pageObj
 */
const fetchNewsFromApi_NEW = async (pageObj) => {
  const searchQuery = `&page=${!isEmpty(pageObj) ? pageObj.page : 0}`;
  try {
    const endpoint =
      "https://hn.algolia.com/api/v1" +
      CONFIG.API_ENDPOINTS.FETCH_FRONT_PAGE_NEWS;

    const response = await ExternalBaseService.get(endpoint + searchQuery);

    const { data, page } = normalizeNewsData(response.data.data);

    return fetchFrontPageNewsSuccess(searchQuery, data, page, true);
  } catch (error) {
    return fetchFrontPageNewsFailure(searchQuery, error.message);
  }
};

/**
 * THUNK: fetch News data stored in local service
 */
const fetchNewsFromLocalService = () => {
  const localNewsDetails = InternalBaseService.get(
    CONFIG.LOCAL_STORAGE_KEYS.UPVOTES
  );
  return localNewsDetails || {};
};

/**
 * THUNK: fetch Hidden News Items
 */
const fetchHiddenNewsItems = () => {
  const hiddenItems = InternalBaseService.get(CONFIG.LOCAL_STORAGE_KEYS.HIDDEN);
  return hiddenItems || {};
};

/**
 *  UpVote a news item
 * @param {*} newsItemId
 * @param {*} currentCount
 */
const upVote = (newsItemId, currentCount) => async (dispatch) => {
  const localNewsDetails =
    InternalBaseService.get(CONFIG.LOCAL_STORAGE_KEYS.UPVOTES) || {};
  localNewsDetails[newsItemId] = localNewsDetails[newsItemId] || {};
  localNewsDetails[newsItemId].points = currentCount + 1;
  if (
    InternalBaseService.put(CONFIG.LOCAL_STORAGE_KEYS.UPVOTES, localNewsDetails)
  ) {
    dispatch(fetchNewsFromLocalSvcSuccess(fetchNewsFromLocalService()));
  }
};

/**
 * Hide a News Item
 * @param {*} newsItemId news item Identifier
 */
const hideNewsItem = (newsItemId) => async (dispatch) => {
  const localHiddenItems =
    InternalBaseService.get(CONFIG.LOCAL_STORAGE_KEYS.HIDDEN) || {};
  localHiddenItems[newsItemId] = moment();
  if (
    InternalBaseService.put(CONFIG.LOCAL_STORAGE_KEYS.HIDDEN, localHiddenItems)
  ) {
    dispatch(fetchHiddenNewsItemsSuccess(localHiddenItems));
  }
};

//#endregion

//#region Business Actions
/**
 * This is a Busines Action to fetch News to be displayed to User.
 * It does the following steps:
 *  - Fetch News from External API
 *  - Fetch News Details from local Service
 *  - Merge these data to prepare final Result, to return
 * @param {*} pageObj
 */
const fetchNews = (pageObj) => async (dispatch) => {
  // 1. Fetch Data From External Srvice
  //2. Fetch Data from Local Service
  // 3. Fetch Hidden Data
  const { data: serviceData, page, searchQuery } = await fetchNewsFromApi(
    pageObj
  )(dispatch);

  syncNewsWithLocal(serviceData, searchQuery, page)(dispatch);
};

//#endregion

export const actions = {
  fetchNewsFromApi,
  fetchNewsFromLocalService,
  fetchHiddenNewsItems,
  syncNewsWithLocal,
  upVote,
  hideNewsItem,
  fetchNewsFromApi_NEW,
};

export const businessActions = {
  fetchNews,
};
