import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

const AppComponent = Loadable({
  loader: () => import("./App"),
  loading: () => <div>loading...</div>,
});

export default function Routes() {
  return (
    <div>
      <Route path="/" exact component={AppComponent} />
    </div>
  );
}
