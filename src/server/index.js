import express from "express";
import serverRenderer from "./serverRenderer";
import Loadable from "react-loadable";

const path = require("path");
const PORT = process.env.PORT || 3000;

// initialize the application and create the routes
const app = express();
const router = express.Router();
router.use("^/$", serverRenderer);

router.use(express.static(path.resolve(__dirname, "..", "..", "build")));

router.use(express.static(path.resolve(__dirname, "..", "..", "public")));

router.use("*", serverRenderer);

app.use(router);

Loadable.preloadAll().then(() => {
  app.listen(PORT, (error) => {
    if (error) {
      return console.log("something bad happened", error);
    }

    console.log("listening on " + PORT + "...");
  });
});
