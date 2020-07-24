import InitialState from "./initialState";
import { BEGIN_API_CALL, END_API_CALL } from "../actions/actionTypes";

const STATE_SLICE_NAME = "apiCallsInProgress";
/**
 * Increment the Count of Active API Calls for an apiIdentifier
 * @param {*} stateObj current State-Slice in redux
 * @param {*} apiCallIdentifier API Identifier
 */
const incrementApiCalls = (stateObj, apiCallIdentifier) => {
  // initialize object-property if its not initialized.
  stateObj[apiCallIdentifier] = stateObj[apiCallIdentifier] || 0;
  stateObj[apiCallIdentifier] += 1;
  return stateObj;
};

/**
 * Decrement the Count of Active API Calls for an apiIdentifier
 * @param {*} stateObj current State-Slice in redux
 * @param {*} apiCallIdentifier API Identifier
 */
const decrementApiCall = (stateObj, apiCallIdentifier) => {
  if (stateObj[apiCallIdentifier] > 0) stateObj[apiCallIdentifier] -= 1;
  return stateObj;
};

/**
 * This is the reducer to return the State-Slice for Api calls status in system.
 * @param {*} state state object
 * @param {*} action action object
 */
export const apiCallStatusReducer = (
  state = InitialState[STATE_SLICE_NAME],
  action
) => {
  switch (action.type) {
    case BEGIN_API_CALL:
      return incrementApiCalls({ ...state }, action.apiIdentifier);
    case END_API_CALL:
      return decrementApiCall({ ...state }, action.apiIdentifier);
    default:
      return state;
  }
};

export const selectors = {
  getApiCallStatus: (appState, apiCallIdentifier) =>
    appState[STATE_SLICE_NAME][apiCallIdentifier],
};
