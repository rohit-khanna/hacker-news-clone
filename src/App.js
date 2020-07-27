import React, { useEffect } from "react";
import DataGrid from "./components/dataGrid";

import "./App.scss";
import LineChart from "./components/charts/lineChart";
import { convertNewsDataToChartCoordinates } from "./utils";
import { isEmpty } from "lodash";
//import data from "./testData";

function App({ actions, newsData, syncUprequired }) {
  useEffect(() => {
    if (!isEmpty(newsData) && syncUprequired) actions.syncUpData(newsData);
  }, [actions, newsData, syncUprequired]);

  useEffect(() => {
    actions.fetchNews();
  }, [actions]);

  return (
    <main className="mainContainer">
      <DataGrid data={newsData} actions={actions || {}} />
      <hr />
      <LineChart data={convertNewsDataToChartCoordinates(newsData)} />
    </main>
  );
}

export default App;
