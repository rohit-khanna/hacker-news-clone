import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./App.scss";
import ConfigureStore from "./redux/configureStore";
import { renderRoutes } from "react-router-config";

import { Provider as ReduxProvider } from "react-redux";
import InitialState from "./redux/reducers/initialState";
import "./config/config-axios";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";

const serverState = window.__PRELOADED_STATE__;
const store = new ConfigureStore(serverState || InitialState);

ReactDOM.hydrate(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
