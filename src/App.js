import React, { useEffect } from "react";
import DataGrid from "./components/dataGrid";
import data from "./testData";
import "./App.scss";
import LineChart from "./components/charts/lineChart";
import { convertNewsDataToChartCoordinates } from "./utils";

function App({ actions, newsData, val }) {
  useEffect(() => {
    //  actions.fetchNews({ nextPage: 0 });
  }, [actions]);

  return (
    <main className="mainContainer">
      <DataGrid data={data.hits} actions={actions || {}} />
      <hr />
      <div>Value:{val}</div>
      <LineChart data={convertNewsDataToChartCoordinates(data.hits)} />
    </main>
  );
}

export default App;
