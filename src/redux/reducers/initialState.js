const InitialState = {
  /**
   *  this key is responsible for storing the API calls in progress at the moment.The data is saved as
   * {"apiIdentifier" : <countOfActiveCalls>, ... }
   */
  apiCallsInProgress: {},
  /**
   * this key is responsible for storing the Query and result for the Request made for News Search
   */
  newsResult: {
    query: "",
    data: {},
    error: "",
  },
};

export default InitialState;
