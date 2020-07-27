import React from "react";
import "./NewsMetadata.scss";
import UrlLabel from "../common/urlLabel";
import LinkButton from "../common/linkButton";
import { formatDateRelativeToToday, getTruncatedString } from "../../utils";

export default function NewsMetadata({
  url,
  author,
  createdDate,
  title,
  OnHide,
}) {
  return (
    <div className="newsMetadataContainer">
      <LinkButton className="title" title="open post">
        {getTruncatedString(title, 80)}
      </LinkButton>

      <div className="metaData">
        <UrlLabel urlString={url} />
        <span className="author cursor-pointer">
          <LinkButton
            className="author"
            title="visit profile"
          >{`by ${author}`}</LinkButton>
        </span>
        <span className="font-color-grey">
          {" "}
          {formatDateRelativeToToday(createdDate)}
        </span>
        <div className="hideButtonContainer">
          [
          <LinkButton className="hideButton" title="hide" onClick={OnHide}>
            hide
          </LinkButton>
          ]
        </div>
      </div>
    </div>
  );
}
