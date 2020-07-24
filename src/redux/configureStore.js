import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

export default function ConfigureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add suport for redux dev tools

  const isProductionEnvironment = process.env.NODE_ENV === "production";

  const middlewares = [thunk];

  return createStore(
    rootReducer,
    initialState,
    isProductionEnvironment
      ? applyMiddleware(...middlewares)
      : composeEnhancers(applyMiddleware(...middlewares))
  );
}
