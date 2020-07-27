import InitialState from "./initialState";
import {
  FETCH_FRONT_PAGE_NEWS_SUCCESS,
  FETCH_FRONT_PAGE_NEWS_FAILURE,
  FETCH_LOCAL_NEWS_SUCCESS,
  FETCH_HIDDEN_ITEMS_SUCCESS,
} from "../actions/actionTypes";
import { keys, each } from "lodash";

const STATE_SLICE_NAME = "newsResult";

export const newsReducer = (state = InitialState[STATE_SLICE_NAME], action) => {
  switch (action.type) {
    case FETCH_FRONT_PAGE_NEWS_SUCCESS: {
      const currentState = { ...state };
      const { query, data, page, syncUpRequired } = action;
      currentState.error = "";
      currentState.data = data; // data is normalized Data with key as objID
      if (query) currentState.query = query;
      if (page) currentState.page = page;
      currentState.syncUpRequired = syncUpRequired;
      return currentState;
    }
    case FETCH_FRONT_PAGE_NEWS_FAILURE: {
      const currentState = { ...state };
      const { query, error } = action;
      currentState.error = error;
      currentState.data = {};
      currentState.query = query;
      currentState.page = {};

      return currentState;
    }
    case FETCH_LOCAL_NEWS_SUCCESS: {
      const currentState = { ...state };
      const currentDataObj = { ...currentState.data };
      const { data } = action;
      each(keys(data), (objectId) => {
        const { points: localPointsCount } = data[objectId];
        if (
          currentDataObj[objectId] &&
          localPointsCount > currentDataObj[objectId].points
        )
          currentDataObj[objectId].points = localPointsCount; // replace local points only when external points > local Count
      });
      currentState.data = currentDataObj;
      return currentState;
    }

    case FETCH_HIDDEN_ITEMS_SUCCESS: {
      const currentState = { ...state };
      const currentDataObj = { ...currentState.data };
      const { data } = action;
      each(keys(data), (key) => delete currentDataObj[key]);
      currentState.data = currentDataObj;
      return currentState;
    }

    default:
      return state;
  }
};

export const selectors = {
  getError: (appState) =>
    appState[STATE_SLICE_NAME] && appState[STATE_SLICE_NAME].error,
  getQuery: (appState) =>
    appState[STATE_SLICE_NAME] && appState[STATE_SLICE_NAME].query,
  getResult: (appState) => appState[STATE_SLICE_NAME],
  getSyncUprequired: (appState) => appState[STATE_SLICE_NAME].syncUpRequired,
};
