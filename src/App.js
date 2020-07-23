import React from "react";
import DataGrid from "./components/dataGrid";
import data from "./testData";
import "./App.scss";
import LineChart from "./components/charts/lineChart";
import { convertNewsDataToChartCoordinates } from "./utils";

function App() {
  return (
    <main className="mainContainer">
      <DataGrid data={data} />
      <hr />
      <LineChart data={convertNewsDataToChartCoordinates(data.hits)} />
    </main>
  );
}

export default App;
