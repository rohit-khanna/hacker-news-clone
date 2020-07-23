import React from "react";
import "./NewsMetadata.scss";
import UrlLabel from "../common/urlLabel";
import LinkButton from "../common/linkButton";

export default function NewsMetadata({
  url,
  author,
  createdDate,
  title,
  hideButtonVisible = true,
}) {
  return (
    <div className="newsMetadataContainer">
      <LinkButton className="title" text={title} title="open post" />

      <div className="metaData">
        <UrlLabel urlString={url} />
        <span className="author cursor-pointer">
          <LinkButton
            className="author"
            text={`by ${author}`}
            title="visit profile"
          />
        </span>
        <span className="font-color-grey"> {createdDate.fromNow()}</span>
      </div>
      <div className="ml-2 font-size-small">
        [<LinkButton className="hideButton" text="hide" title="hide" />]
      </div>
    </div>
  );
}
