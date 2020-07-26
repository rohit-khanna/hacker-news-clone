import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter, Switch, Route } from "react-router-dom";
// import our main App component
import App from "../../App";
import { Provider as ReduxProvider } from "react-redux";
import ConfigureStore from "./configureStore";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact component={App} />
    </Switch>
  );
};

export default (req, res) => {
  console.log("adasdasd");
  const store = new ConfigureStore();
  const html = ReactDOMServer.renderToString(
    <StaticRouter context={{}}>
      {/* <ReduxProvider store={store}> */}
      <AppRoutes />
      {/* </ReduxProvider> */}
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
    <script src="bundle.js"></script>
  </body>
</html>
`);

  // point to the html file created by CRA's build tool
  // const filePath = path.resolve(__dirname, "..", "build", "index.html");
  //   fs.readFile(filePath, "utf8", (err, htmlData) => {
  //     if (err) {
  //       console.error("err", err);
  //       return res.status(404).end();
  //     }
  //     const store = new ConfigureStore();
  //     /// We can make a Call to fetch Data from HERE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //     // TODO
  //     // render the app as a string
  //     const html = ReactDOMServer.renderToString(
  //       <StaticRouter location={req.url} context={{}}>
  //         <ReduxProvider store={store}>
  //           <AppContainer />
  //         </ReduxProvider>
  //       </StaticRouter>
  //     );
  //     // inject the rendered app into our html and send it
  //     res.send(
  //       htmlData.replace(
  //         '<div id="root"></div>',
  //         `
  //       <div id="root">${html}</div>
  //       <script>
  //         window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
  //       </script>
  // `
  //       )
  //     );
  //   });
};
