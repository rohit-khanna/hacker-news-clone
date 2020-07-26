import React, { useEffect } from "react";
import DataGrid from "./components/dataGrid";
import { isEmpty } from "lodash";
import "./App.scss";
import LineChart from "./components/charts/lineChart";
import { convertNewsDataToChartCoordinates } from "./utils";

function App({ actions, newsData, val }) {
  useEffect(() => {
    //  if (isEmpty(newsData)) actions.fetchNews({ nextPage: 0 });
  }, []);

  useEffect(() => {
    console.log("updated");
  }, [newsData]);
  debugger;
  return (
    <main className="mainContainer">
      <DataGrid data={newsData} actions={actions || {}} />
      <hr />

      <LineChart data={convertNewsDataToChartCoordinates(newsData)} />
    </main>
  );
}

export default App;
