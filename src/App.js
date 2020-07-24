import React, { useEffect } from "react";
import DataGrid from "./components/dataGrid";
//import data from "./testData";
import "./App.scss";
import LineChart from "./components/charts/lineChart";
import { convertNewsDataToChartCoordinates } from "./utils";

function App({ actions, newsData }) {
  useEffect(() => {
    actions.fetchNews({ nextPage: 0 });
  }, [actions]);

  return (
    <main className="mainContainer">
      <DataGrid data={newsData} />
      <hr />
      <LineChart data={convertNewsDataToChartCoordinates(newsData)} />
    </main>
  );
}

export default App;
