import { BEGIN_API_CALL, END_API_CALL } from "../actionTypes";
import { beginAPICall, endAPICall } from "../apiCallActions";

const API_IDENTIFIER = "SOME_API_ID";

describe("apiCallActions", () => {
  describe("action creators", () => {
    it("should create an action to Begin an API call", async () => {
      const expectedAction = {
        type: BEGIN_API_CALL,
        apiIdentifier: API_IDENTIFIER,
      };
      const actualAction = beginAPICall(API_IDENTIFIER);
      expect(expectedAction).toEqual(actualAction);
    });
    it("should create an action to End an API call", async () => {
      const expectedAction = {
        type: END_API_CALL,
        apiIdentifier: API_IDENTIFIER,
      };
      const actualAction = endAPICall(API_IDENTIFIER);
      expect(expectedAction).toEqual(actualAction);
    });
  });
});
