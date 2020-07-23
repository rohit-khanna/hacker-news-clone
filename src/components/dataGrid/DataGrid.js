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
          <th>#</th>
          <th>Comments</th>
          <th>Vote Count</th>
          <th>Upvote</th>
          <th>News Details</th>
        </tr>
      </thead>
      <tbody>
        {map(data.hits, ({ title, url, author, objectID, created_at }, idx) => (
          <DataRow
            sNo={idx}
            key={objectID}
            title={title}
            url={url}
            author={author}
            id={objectID}
            createdDate={created_at}
          />
        ))}
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
