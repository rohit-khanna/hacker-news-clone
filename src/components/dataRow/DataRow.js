import React from "react";
import "./DataRow.scss";
import NewsMetadata from "../newsMetadata/NewsMetadata";
import moment from "moment";

export default function DataRow({ sNo, title, url, author, id, createdDate }) {
  return (
    <tr id={id}>
      <td className="text-align-center">{sNo + 1}</td>
      <td className="text-align-center">1</td>
      <td className="text-align-center">2</td>
      <td className="text-align-center">btn</td>
      <td>
        <NewsMetadata
          title={title}
          author={author}
          createdDate={moment(createdDate)}
          url={url}
        />
      </td>
    </tr>
  );
}
