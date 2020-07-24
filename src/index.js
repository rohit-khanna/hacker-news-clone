import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppContainer from "./AppContainer";
import ConfigureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import InitialState from "./redux/reducers/initialState";
import "./config/config-axios";

const store = new ConfigureStore(InitialState);

ReactDOM.render(
  <ReduxProvider store={store}>
    <AppContainer />
  </ReduxProvider>,

  document.getElementById("root")
);
