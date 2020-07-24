import { combineReducers } from "redux";

import {
  apiCallStatusReducer,
  selectors as apiCallStatusSelectors,
} from "./apiCallStatusReducer";
import { newsReducer, selectors as newsSelectors } from "./newsReducer";

export const rootReducer = combineReducers({
  newsResult: newsReducer,
  apiCallsInProgress: apiCallStatusReducer,
});

export const selectors = {
  apiCallStatusSelectors,
  newsSelectors,
};
