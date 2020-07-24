import React from "react";
import "./LinkButton.scss";

export default function LinkButton({
  children = "button",
  title,
  className,
  onClick,
  ...props
}) {
  return (
    <button
      {...props}
      className={`linkButton cursor-pointer ${className ? className : ""}`}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
