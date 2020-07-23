import moment from "moment";
import { isEmpty, map, orderBy } from "lodash";

/**
 * get hostname from the Url String
 * @param {*} urlString
 */
export const getHostNameFromUrlString = (urlString) => {
  if (!urlString) return "";
  const matches = urlString.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  return matches && matches[1];
};

/**
 * format the date string relative to today
 * @param {*} dateString
 */
export const formatDateRelativeToToday = (dateString) => {
  const inputDate = moment(dateString);
  return inputDate.fromNow();
};

/**
 * helper method to return the truncated string with specified max length
 * @param {*} stringValue string value
 * @param {*} maxLength max length, default is 10
 */
export const getTruncatedString = (stringValue, maxLength = 10) => {
  isEmpty(stringValue);
  return isEmpty(stringValue)
    ? ""
    : stringValue.substr(0, maxLength) +
        (stringValue.length > maxLength ? "..." : "");
};

export const getFromLocalStorageAsJSON = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const sendToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const convertNewsDataToChartCoordinates = (newsData) => {
  return map(orderBy(newsData, "id"), ({ id, objectID, points }) => ({
    x: id,
    y: points,
  }));
};
