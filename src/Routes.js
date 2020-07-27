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
  {
    path: "*",
    // eslint-disable-next-line react/no-multi-comp
    component: () => {
      return (
        <>
          <h2>404</h2>
          <h4>Page Not found</h4>
        </>
      );
    },
  },
];
