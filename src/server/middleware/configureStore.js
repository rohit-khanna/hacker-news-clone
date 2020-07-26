import { createStore } from "redux";
import { rootReducer } from "../../redux/reducers";
import thunk from "redux-thunk";

export default function ConfigureStore(initialState = {}) {
  // const middlewares = [thunk];

  return createStore(
    rootReducer,
    initialState
    //  applyMiddleware(...middlewares)
  );
}
