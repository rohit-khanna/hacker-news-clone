import React from "react";
import Loadable from "react-loadable";

const AppComponent = Loadable({
  loader: () => import("./AppContainer"),
  loading: () => <div>loading...</div>,
});

export default [
  {
    path: "/",
    exact: true,
    component: AppComponent,
  },
];
