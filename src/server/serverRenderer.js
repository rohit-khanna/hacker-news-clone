import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import ConfigureStore from "./middleware/configureStore";
import Routes from "../Routes";
const fs = require("fs");
const path = require("path");

var routes = ["/"];

export default function serverRenderer(req, res) {
  var match = routes.find((route) =>
    matchPath(req.path, {
      path: route,
      exact: true,
    })
  );

  const store = new ConfigureStore();
  const html = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter context={{}} location={req.path}>
        <Routes />
      </StaticRouter>
    </ReduxProvider>
  );

  const filePath = path.resolve(__dirname, "..", "..", "build", "index.html");

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>
       <script>
         window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
      </script>
      `
      )
    );
  });
}
