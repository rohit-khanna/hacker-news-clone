import moment from "moment";
import { isEmpty, map, orderBy, each } from "lodash";

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
  return map(orderBy(newsData, "sno"), ({ objectID, sno, points }) => ({
    x: sno,
    y: points,
  }));
};

export const normalizeNewsData = (responseData) => {
  const result = { data: {}, page: {} };
  if (isEmpty(responseData)) return result;

  const { hits, page, nbPages, hitsPerPage } = responseData;
  const pageMultipler = page * 10;

  each(hits, ({ objectID, ...restKey }, idx) => {
    result.data[objectID] = result.data[objectID] || {};
    result.data[objectID] = {
      objectID,
      sno: pageMultipler + (idx + 1),
      ...restKey,
    };
  });

  result.page = { currentPage: page, totalPages: nbPages, hitsPerPage };

  return result;
};
