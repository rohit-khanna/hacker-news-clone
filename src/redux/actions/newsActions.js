import {
  FETCH_FRONT_PAGE_NEWS_SUCCESS,
  FETCH_FRONT_PAGE_NEWS_FAILURE,
  FETCH_LOCAL_NEWS_SUCCESS,
  FETCH_HIDDEN_ITEMS_SUCCESS,
} from "./actionTypes";
import { API_CALL_IDENTIFIERS } from "../constants";
import { ExternalBaseService, InternalBaseService } from "../../services";
import CONFIG from "../../config/config";
import { beginAPICall, endAPICall } from "./apiCallActions";
import { isEmpty } from "lodash";
import moment from "moment";
import { normalizeNewsData } from "../../utils";

//#region Action Creators
export const fetchFrontPageNewsSuccess = (searchParams, data, page) => {
  return {
    type: FETCH_FRONT_PAGE_NEWS_SUCCESS,
    query: searchParams,
    data,
    page,
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

//#region thunk
/**
 * THUNK: to fetch the Front Page News
 * @param {*} pageObj page Object
 */
const fetchNewsFromApi = (pageObj) => async (dispatch) => {
  const apiIdentifier = API_CALL_IDENTIFIERS.FRONT_PAGE_NEWS_SEARCH;
  const searchQuery = `&page=${pageObj.nextPage}`;
  try {
    dispatch(beginAPICall(apiIdentifier));

    const endpoint = CONFIG.API_ENDPOINTS.FETCH_FRONT_PAGE_NEWS;

    const response = await ExternalBaseService.get(
      endpoint,
      endpoint + searchQuery
    );
    const { data, page } = normalizeNewsData(response.data);
    dispatch(fetchFrontPageNewsSuccess(searchQuery, data, page));
  } catch (error) {
    dispatch(fetchFrontPageNewsFailure(searchQuery, error.message));
  } finally {
    dispatch(endAPICall(apiIdentifier));
  }
};

/**
 * THUNK: fetch News data stored in local service
 */
const fetchNewsFromLocalService = () => async (dispatch) => {
  const localNewsDetails = InternalBaseService.get(
    CONFIG.LOCAL_STORAGE_KEYS.UPVOTES
  );
  if (!isEmpty(localNewsDetails)) {
    dispatch(fetchNewsFromLocalSvcSuccess(localNewsDetails));
  }
};

/**
 * THUNK: fetch Hidden News Items
 */
const fetchHiddenNewsItems = () => async (dispatch) => {
  const hiddenItems = InternalBaseService.get(CONFIG.LOCAL_STORAGE_KEYS.HIDDEN);
  if (!isEmpty(hiddenItems)) {
    dispatch(fetchHiddenNewsItemsSuccess(hiddenItems));
  }
};

/**
 *  UpVote a news item
 * @param {*} newsItemId
 * @param {*} currentCount
 */
const upVote = (newsItemId, currentCount) => async (dispatch) => {
  const localNewsDetails =
    InternalBaseService.get(CONFIG.LOCAL_STORAGE_KEYS.UPVOTES) || {};
  localNewsDetails[newsItemId].points = currentCount + 1;
  if (
    InternalBaseService.put(CONFIG.LOCAL_STORAGE_KEYS.UPVOTES, localNewsDetails)
  ) {
    fetchNewsFromLocalService()(dispatch);
  }
};

/**
 * Hide a News Item
 * @param {*} newsItemId news item Identifier
 */
const hideNewsItem = (newsItemId) => async (dispatch) => {
  const localHiddenItems = InternalBaseService.get(
    CONFIG.LOCAL_STORAGE_KEYS.HIDDEN
  );
  localHiddenItems[newsItemId] = moment();
  if (
    InternalBaseService.put(CONFIG.LOCAL_STORAGE_KEYS.HIDDEN, localHiddenItems)
  ) {
    fetchHiddenNewsItems()(dispatch);
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
  await Promise.all([
    await fetchNewsFromApi(pageObj)(dispatch),
    await fetchNewsFromLocalService()(dispatch),
    await fetchHiddenNewsItems()(dispatch),
  ]);
};
//#endregion

export const actions = {
  fetchNewsFromApi,
  fetchNewsFromLocalService,
  fetchHiddenNewsItems,
  upVote,
  hideNewsItem,
};

export const businessActions = {
  fetchNews,
};
