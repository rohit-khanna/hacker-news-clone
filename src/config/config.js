const CONFIG = {
  SERVER_TIMEOUT: process.env.REACT_APP_API_TIMEOUT,
  API_SERVER_URL: process.env.REACT_APP_NEWS_SERVICE_URL,
  API_ENDPOINTS: {
    FETCH_FRONT_PAGE_NEWS: "/search?tags=front_page",
  },
  ERROR_MESSAGE: {
    NOT_FOUND: "Requested URL not found",
    SERVER_ERROR: "API Error. Please Retry",
    UNKNOWN_CODE: "Sorry, something bad happened",
  },
  LOCAL_STORAGE_KEYS: {
    UPVOTES: "upvoteDetails",
    HIDDEN: "hiddenRecords",
  },
};

export default CONFIG;
