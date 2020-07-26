import InitialState from "./initialState";
import {
  FETCH_FRONT_PAGE_NEWS_SUCCESS,
  FETCH_FRONT_PAGE_NEWS_FAILURE,
  FETCH_LOCAL_NEWS_SUCCESS,
  FETCH_HIDDEN_ITEMS_SUCCESS,
} from "../actions/actionTypes";
import { keys, values, each, filter, includes } from "lodash";

const STATE_SLICE_NAME = "newsResult";

export const newsReducer = (state = InitialState[STATE_SLICE_NAME], action) => {
  switch (action.type) {
    case FETCH_FRONT_PAGE_NEWS_SUCCESS: {
      const currentState = { ...state };
      const { query, data, page } = action;
      currentState.error = "";
      currentState.data = data; // data is normalized Data with key as objID
      currentState.query = query;
      currentState.page = page;
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
      const { data } = action;
      each(keys(data), (objectId) => {
        const { points: localPointsCount } = data[objectId];
        if (localPointsCount > currentState.data.points)
          currentState.data.points = localPointsCount; // replace local points only when external points > local Count
      });
      return currentState;
    }

    case FETCH_HIDDEN_ITEMS_SUCCESS: {
      const currentState = { ...state };
      const { data } = action;
      return filter(values(currentState.data), ({ objectId }) =>
        includes(keys(data), objectId)
      );
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
  getResult: (appState) =>
    appState[STATE_SLICE_NAME] && appState[STATE_SLICE_NAME].data,
};