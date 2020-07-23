import React from "react";
import "./Pagination.scss";
import LinkButton from "../common/linkButton";

export default function Pagination({ totalPageCount = 1, currentPage = 1 }) {
  return (
    <footer className="paginationContainer ">
      <LinkButton title="Previous">Previous</LinkButton> |{" "}
      <LinkButton title="Next">Next</LinkButton>
    </footer>
  );
}
