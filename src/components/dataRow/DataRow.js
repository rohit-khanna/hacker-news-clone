import React from "react";
import "./DataRow.scss";
import NewsMetadata from "../newsMetadata/NewsMetadata";
import ToggleUpvoteButton from "../common/toggleUpvoteButton/ToggleUpvoteButton";
import {
  FaRegComments as FaComment,
  FaHashtag,
  FaArrowUp,
} from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import LinkButton from "../common/linkButton";
import IconWithText from "../common/iconWithText/IconWithText";

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
      <td className="col-2 comment">{commentsCount}</td>
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
        <ToggleUpvoteButton
          isSelected={sNo % 3 === 0}
          onChange={() => {
            alert("upvote");
          }}
        />
      </td>
      <td className="col-12">
        <NewsMetadata
          title={title}
          author={author}
          createdDate={createdDate}
          url={url}
        />
      </td>
      <td className="col-8 mobileActionArea">
        {" "}
        <IconWithText
          iconComponent={<FaHashtag />}
          iconTooltip="ID"
          text={sNo}
          className="id"
        />
        <IconWithText
          iconComponent={<FaComment />}
          iconTooltip="Comments Count"
          text={commentsCount}
        />
        <IconWithText
          iconComponent={<AiFillEyeInvisible />}
          iconTooltip="Hide"
          text=""
        />
        <ToggleUpvoteButton
          isSelected={sNo % 3 === 0}
          onChange={() => {
            alert("upvote");
          }}
        />
      </td>
    </tr>
  );
}
