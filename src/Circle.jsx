import React from "react";

// @ts-ignore
export const Circle = React.forwardRef(({ id, onClick }, ref) => {
  return (
    <div
      id={id}
      onClick={onClick}
      ref={ref}
      className={`item item-${id}`}
    ></div>
  );
});
