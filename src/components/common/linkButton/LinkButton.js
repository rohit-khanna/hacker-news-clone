import React from "react";
import "./LinkButton.scss";

export default function LinkButton({
  text = "button",
  title,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      className={`linkButton cursor-pointer ${className ? className : ""}`}
      title={title || text}
    >
      {text}
    </button>
  );
}
