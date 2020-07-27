import React from "react";
import "./Pagination.scss";
import LinkButton from "../common/linkButton";

export default function Pagination({ totalPageCount = 1, currentPage = 0 }) {
  const isNextVisible = currentPage < totalPageCount;
  const isPrevVisible = currentPage > 0;
  return (
    <footer className="paginationContainer ">
      <LinkButton
        title="Previous"
        className={`${isPrevVisible ? "" : "disabled"}`}
      >
        Previous
      </LinkButton>
      |{" "}
      <LinkButton title="Next" className={`${isNextVisible ? "" : "disabled"}`}>
        Next
      </LinkButton>
    </footer>
  );
}
