import { Fragment } from "react";

export default function Marquee({
  items,
  className = "",
  itemClassName = "",
  separatorClassName = "",
  duration = 32,
  separator = "✳",
}) {
  const group = (
    <span className="marquee-group">
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          <span className={itemClassName}>{item}</span>
          <span className={`shrink-0 ${separatorClassName}`} aria-hidden="true">
            {separator}
          </span>
        </Fragment>
      ))}
    </span>
  );

  return (
    <span className={`marquee ${className}`} aria-hidden="true">
      <span
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {group}
        {group}
      </span>
    </span>
  );
}
