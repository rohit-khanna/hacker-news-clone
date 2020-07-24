import axios from "axios";
import CONFIG from "./config";

axios.defaults.baseURL = CONFIG.API_SERVER_URL;

axios.interceptors.response.use(
  (response) => {
    switch (response.status) {
      default:
        return response.data;
    }
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return Promise.reject({
            message: CONFIG.ERROR_MESSAGE.NOT_FOUND,
            error,
          });
        case 500:
          return Promise.reject({
            message: CONFIG.ERROR_MESSAGE.SERVER_ERROR,
            error,
          });
        default:
          return Promise.reject(
            new Error(CONFIG.ERROR_MESSAGE.UNKNOWN_CODE, error.response)
          );
      }
    } else if (error.request) {
      return Promise.reject(new Error("Network Error", error.request));
    } else {
      return Promise.reject({ cancelled: true });
    }
  }
);
