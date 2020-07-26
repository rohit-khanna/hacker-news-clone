import express from "express";
import { Provider as ReduxProvider } from "react-redux";

// we'll talk about this in a minute:
//import serverRenderer from "./middleware/renderer";
import ReactDOMServer from "react-dom/server";
//import { StaticRouter } from "react-router-dom";
import App from "../App";
import React from "react";
import ConfigureStore from "./middleware/configureStore";
const path = require("path");
const PORT = process.env.PORT || 3000;
const fs = require("fs");
// initialize the application and create the routes
const app = express();
console.log(__dirname);
app.use(express.static(path.resolve(__dirname, "..", "..", "build")));
app.use(express.static(path.resolve(__dirname, "..", "..", "public")));

app.get("/*", (req, res) => {
  console.log("Calling route....");
  const store = new ConfigureStore();
  const html = ReactDOMServer.renderToString(
    <ReduxProvider store={store}>
      <App val="2" />
    </ReduxProvider>
  );

  const filePath = path.resolve(__dirname, "..", "..", "build", "index.html");

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    res.end(
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
});

// start the app
app.listen(PORT, (error) => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
