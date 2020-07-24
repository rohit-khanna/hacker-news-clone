/* eslint-disable no-unused-vars */
import axios from "axios";

/**
 * Structure of response to be sent
 * @param {*} dataObj data
 * @param {*} errorStr error string
 */
const response = (dataObj, errorStr) => ({
  data: dataObj,
  error: errorStr,
});

/**
 * the POST method
 * @param {*} endpointUrl endpoint url, without base-url
 * @param {*} data data object to be posted
 * @param {*} config additional config
 */
async function post(endpointUrl, data, config) {
  try {
    const serverResponse = await axios.post(endpointUrl, data, config);
    return response(serverResponse, "");
  } catch (error) {
    return response("", error.message);
  }
}

/**
 * the PUT method
 * @param {*} endpointUrl endpoint url, without base-url
 * @param {*} data data object to be posted
 * @param {*} config additional config
 */
async function put(endpointUrl, data, config) {
  try {
    const serverResponse = await axios.put(endpointUrl, data, config);
    return response(serverResponse, "");
  } catch (error) {
    return response("", error.message);
  }
}

/**
 * the Get method
 * @param {*} endpointUrl endpoint url, without base-url
 * @param {*} config additional config
 */
async function get(endpointUrl, config) {
  try {
    const serverResponse = await axios.get(endpointUrl, config);
    return response(serverResponse, "");
  } catch (error) {
    return response("", error.message);
  }
}

/**
 * the Delete method
 * @param {*} endpointUrl endpoint url, without base-url
 * @param {*} config additional config
 */
async function delet(endpointUrl) {
  try {
    const serverResponse = await axios.delete(endpointUrl);
    return response(serverResponse, "");
  } catch (error) {
    return response("", error);
  }
}

export default {
  get,
  post,
  put,
  delete: delet,
};
