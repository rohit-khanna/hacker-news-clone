import React from "react";
import DataGrid from "./components/dataGrid";
import data from "./testData";
import "./App.scss";

function App() {
  return (
    <main className="mainContainer">
      <DataGrid data={data} />
    </main>
  );
}

export default App;
