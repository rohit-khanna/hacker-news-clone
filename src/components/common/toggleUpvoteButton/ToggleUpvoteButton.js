import React from "react";
import "./ToggleUpvoteButton.scss";
import { FaSortUp } from "react-icons/fa";

export default function ToggleUpvoteButton({ isSelected, onChange }) {
  return (
    <FaSortUp
      title="upvote"
      size="1.25em"
      onClick={onChange}
      className={`upVoteIcon ${isSelected ? "selected" : ""}`}
    />
  );
}
