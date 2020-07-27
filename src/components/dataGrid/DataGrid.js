import React from "react";
import "./DataGrid.scss";
import { map, orderBy, isEmpty } from "lodash";
import DataRow from "../dataRow";
import Pagination from "../pagination";

export default function DataGrid({
  data,
  actions: { upvote, hideNewsItem },
  handleNextButtonClick,
  handlePrevButtonClick,
  pageDetails,
}) {
  const handleUpVote = (objectId, currentCount) => {
    upvote(objectId, currentCount);
  };

  const handleHideNews = (objectId) => {
    hideNewsItem(objectId);
  };

  return (
    <table cellPadding="0" cellSpacing="0" id="mainDataGrid">
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-2">Comments</th>
          <th className="col-3">Vote #</th>
          <th className="col-1">Upvote</th>
          <th colSpan="2" className="col-12">
            News Details
          </th>
          <th colSpan="5" className="mobilHeader">
            News Details
          </th>
        </tr>
      </thead>
      <tbody>
        {data && !isEmpty(data) ? (
          map(
            orderBy(data, "sno"),
            (
              {
                title,
                url,
                author,
                objectID,
                created_at,
                num_comments,
                points,
                sno,
              },
              idx
            ) => (
              <DataRow
                sNo={sno}
                key={objectID}
                title={title}
                url={url}
                author={author}
                id={objectID}
                createdDate={created_at}
                commentsCount={num_comments}
                voteCount={points}
                isOddRow={idx % 2 === 1}
                onUpVote={handleUpVote}
                OnHide={handleHideNews}
              />
            )
          )
        ) : (
          <tr>
            <td colSpan="5" className="text-align-center pt-1 ">
              {" "}
              No Data found
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">
            {data && !isEmpty(data) ? (
              <Pagination
                onNextCLick={handleNextButtonClick}
                onPrevClick={handlePrevButtonClick}
                currentPage={pageDetails ? pageDetails.currentPage : 0}
                totalPageCount={pageDetails ? pageDetails.totalPages : 0}
              />
            ) : (
              ""
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
