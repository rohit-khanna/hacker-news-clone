import { BEGIN_API_CALL, END_API_CALL } from "./actionTypes";

/**
 * Action Creator: Begin an API Call
 * @param {String} apiIdentifier api identifier constant from 'API_CALL_IDENTIFIERS'
 */
export function beginAPICall(apiIdentifier) {
  return {
    type: BEGIN_API_CALL,
    apiIdentifier
  };
}

/**
 * Action Creator: End an API Call
 * @param {String} apiIdentifier api identifier constant from 'API_CALL_IDENTIFIERS'
 */
export function endAPICall(apiIdentifier) {
  return {
    type: END_API_CALL,
    apiIdentifier
  };
}
