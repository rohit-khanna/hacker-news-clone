import React, { useEffect, useState } from "react";
import DataGrid from "./components/dataGrid";

import "./App.scss";
import LineChart from "./components/charts/lineChart";
import { convertNewsDataToChartCoordinates, getQueryParams } from "./utils";
import { isEmpty } from "lodash";
import { withRouter } from "react-router-dom";

//import data from "./testData";

function App({ actions, newsData, pageDetails, syncUprequired, history }) {
  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (!isEmpty(newsData) && syncUprequired) {
      actions.syncUpData(newsData);
      setTimeout(() => {
        setInitialLoad(false);
      }, 1000);
    }
  }, [actions, newsData, syncUprequired]);

  useEffect(() => {
    if (!initialLoad && history.location.search) {
      // it is not initial App load and search queries are not null
      actions.fetchNews(getQueryParams(history.location.search));
    }
  }, [history.location.search, initialLoad]);

  const handlePrevButtonClick = () => {
    const { currentPage } = pageDetails;
    const nxtPage = currentPage <= 0 ? 0 : currentPage - 1;

    history.push(`?page=${nxtPage}`);
  };

  const handleNextButtonClick = () => {
    const { currentPage, totalPages } = pageDetails;
    const nxtPage = currentPage >= totalPages ? totalPages : currentPage + 1;
    history.push(`?page=${nxtPage}`);
  };

  return (
    <main className="mainContainer">
      <DataGrid
        data={newsData}
        actions={actions || {}}
        handleNextButtonClick={handleNextButtonClick}
        handlePrevButtonClick={handlePrevButtonClick}
        pageDetails={pageDetails}
      />
      <hr />
      {newsData && !isEmpty(newsData) ? (
        <LineChart data={convertNewsDataToChartCoordinates(newsData)} />
      ) : (
        ""
      )}
    </main>
  );
}

export default withRouter(App);
