import React from "react";
import "./DataGrid.scss";
import { map } from "lodash";
import DataRow from "../dataRow";
import Pagination from "../pagination";

export default function DataGrid({ data }) {
  return (
    <table cellPadding="0" cellSpacing="0" id="mainDataGrid">
      <thead>
        <tr>
          <th className="col-1">#</th>
          <th className="col-2">Comments</th>
          <th className="col-2">Vote Count</th>
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
        {map(
          data.hits,
          (
            { title, url, author, objectID, created_at, num_comments, points },
            idx
          ) => (
            <DataRow
              sNo={idx}
              key={objectID}
              title={title}
              url={url}
              author={author}
              id={objectID}
              createdDate={created_at}
              commentsCount={num_comments}
              voteCount={points}
              isOddRow={idx % 2 === 1}
            />
          )
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="5">
            <Pagination />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
