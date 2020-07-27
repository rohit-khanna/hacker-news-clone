import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
//import data from "../testData";
import ConfigureStore from "./configureStore";
import actions from "../../redux/actions";
import Routes from "../../Routes";
import { renderRoutes } from "react-router-config";
const fs = require("fs");
const path = require("path");

export default async function serverRenderer(req, res) {
  const store = new ConfigureStore();

  const ss = await actions.newsSearchActions.fetchNewsFromApi_NEW({});

  store.dispatch(ss);
  const html = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <StaticRouter context={{}} location={req.path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </ReduxProvider>
  );
  //console.log(store.getState());
  const filePath = path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "build",
    "index.html"
  );

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
