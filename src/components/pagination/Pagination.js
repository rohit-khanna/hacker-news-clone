import React from "react";
import "./Pagination.scss";
import LinkButton from "../common/linkButton";

export default function Pagination({
  totalPageCount = 1,
  currentPage = 0,
  onPrevClick,
  onNextCLick,
}) {
  const isNextVisible = currentPage < totalPageCount;
  const isPrevVisible = currentPage > 0;

  return (
    <footer className="paginationContainer ">
      <LinkButton
        title="Previous"
        className={`${isPrevVisible ? "" : "disabled"}`}
        onClick={onPrevClick}
      >
        Previous
      </LinkButton>
      |{" "}
      <LinkButton
        title="Next"
        className={`${isNextVisible ? "" : "disabled"}`}
        onClick={onNextCLick}
      >
        Next
      </LinkButton>
    </footer>
  );
}
