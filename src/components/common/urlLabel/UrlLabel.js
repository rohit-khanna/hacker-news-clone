import React from "react";
import { getHostNameFromUrlString } from "../../../utils";

export default function UrlLabel({ urlString }) {
  return (
    <a href={urlString} alt={urlString} title={urlString}>
      {`(${getHostNameFromUrlString(urlString)})`}
    </a>
  );
}
