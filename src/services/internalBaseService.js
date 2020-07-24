import { getFromLocalStorageAsJSON, sendToLocalStorage } from "../utils";

/**
 * get request
 * @param {*} key
 */
const get = (key) => {
  if (!key) return {};
  return getFromLocalStorageAsJSON(key);
};

/**
 * Create New Key-Value Pair
 * @param {*} key
 * @param {*} value
 */
const post = (key, value) => {
  if (!key) return false;
  sendToLocalStorage(key, value);
  return true;
};

export default {
  get,
  post,
  put: post,
};
