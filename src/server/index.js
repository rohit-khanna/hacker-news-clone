import express from "express";
import { Provider as ReduxProvider } from "react-redux";

// we'll talk about this in a minute:
import serverRenderer from "./middleware/renderer";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../App";
import React from "react";
import ConfigureStore from "./middleware/configureStore";
const path = require("path");
const PORT = 3000;

// initialize the application and create the routes
const app = express();

app.use(express.static(path.resolve(__dirname, "../../build")));
app.use(express.static(path.resolve(__dirname, "../../public")));

app.get("/", (req, res) => {
  console.log("adasdasd");
  const store = new ConfigureStore();
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.path} context={{}}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </StaticRouter>
  );

  console.log(html);

  res.send(`<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>Hacker News Clone</title>
  </head>
  <body>  <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
    </script>
  <script />
  </body>
</html>
`);
});

// start the app
app.listen(PORT, (error) => {
  if (error) {
    return console.log("something bad happened", error);
  }

  console.log("listening on " + PORT + "...");
});
