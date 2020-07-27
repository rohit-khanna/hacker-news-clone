import React from "react";
import "./DataRow.scss";
import NewsMetadata from "../newsMetadata/NewsMetadata";
import ToggleUpvoteButton from "../common/toggleUpvoteButton/ToggleUpvoteButton";
import { FaRegComments as FaComment, FaHashtag } from "react-icons/fa";
import { AiFillEyeInvisible } from "react-icons/ai";
import IconWithText from "../common/iconWithText/IconWithText";
import LinkButton from "../common/linkButton";

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
  onUpVote,
  OnHide,
}) {
  const handleNewsHide = () => {
    OnHide(id);
  };

  return (
    <tr id={id} className={`row ${isOddRow ? "odd" : "even"}`}>
      <td className="col-1">{sNo}</td>
      <td className="col-2 comment">{commentsCount}</td>
      <td
        className={` col-3 ${
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
          onChange={() => {
            onUpVote(id, voteCount);
          }}
        />
      </td>
      <td className="col-12">
        <NewsMetadata
          title={title}
          author={author}
          createdDate={createdDate}
          url={url}
          OnHide={handleNewsHide}
        />
      </td>
      <td className="col-8 mobileActionArea">
        {" "}
        <IconWithText
          iconComponent={<FaComment />}
          iconTooltip="Comments Count"
          text={commentsCount}
        />{" "}
        <LinkButton
          className="upvote"
          title="Upvote"
          onClick={() => {
            onUpVote(id, voteCount);
          }}
        >
          upvote
        </LinkButton>{" "}
        <IconWithText
          iconComponent={<AiFillEyeInvisible />}
          iconTooltip="Hide"
          text=""
          onClick={handleNewsHide}
        />
        <IconWithText
          iconComponent={<FaHashtag />}
          iconTooltip="ID"
          text={sNo}
          className="id"
        />
      </td>
    </tr>
  );
}
