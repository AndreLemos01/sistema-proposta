import React from "react";
import classNames from "classnames";

export function Button({ children, className, ...props }) {
  return (
    <button
      className={classNames(
        "bg-[#F39C12] hover:bg-[#d68910] text-white font-medium py-2 px-4 rounded transition-all",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
