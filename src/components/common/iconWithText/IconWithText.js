import React from "react";
import "./IconWithText.scss";

export default function IconWithText({
  iconComponent,
  text,
  iconTooltip,
  onClick,
  className,
}) {
  return (
    <div
      className={`iconWithTextContainer ${className ? className : ""}`}
      title={iconTooltip}
      onClick={onClick}
    >
      {iconComponent}
      <span>{text}</span>
    </div>
  );
}
