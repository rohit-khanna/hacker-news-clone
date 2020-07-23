import React from "react";
import "./DataRow.scss";
import NewsMetadata from "../newsMetadata/NewsMetadata";
import moment from "moment";
import { FaSortUp } from "react-icons/fa";

export default function DataRow({
  sNo,
  title,
  url,
  author,
  id,
  createdDate,
  commentsCount,
  voteCount,
  isOddRow,
}) {
  return (
    <tr id={id} className={`row ${isOddRow ? "odd" : "even"}`}>
      <td className="col-1">{sNo + 1}</td>
      <td className="col-2">{commentsCount}</td>
      <td
        className={` col-2 ${
          voteCount > 50 && voteCount < 100
            ? "importantValue"
            : voteCount > 100
            ? "significantValue"
            : ""
        }`}
      >
        {voteCount}
      </td>
      <td className="col-1">
        <FaSortUp title="upvote" size="1.25em" className="upVoteIcon" />
      </td>
      <td className="col-12">
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
