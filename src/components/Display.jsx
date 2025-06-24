import React from "react";

function Display({ display }) {
  // If the number of displayed characters exceeds 12, the font will change to a smaller font and the text will wrap to another line
  const numChar = display.split("").length;
  const fontSizeClass = numChar > 12 ? "sm:text-4xl" : "sm:text-6xl";
  const displayHeight = numChar > 12 ? "h-28" : "h-24";
  const fontSizeClassMobile = numChar > 12 ? "text-3xl" : "text-5xl";
  return (
    <div
      className={`${displayHeight} sm:w-lg w-sm bg-black flex items-center justify-center rounded p-3 transition-all ease-linear duration-200`}
    >
      <textarea
        readOnly
        className={`bg-white w-full h-full rounded text-right px-2 text-black text-wrap ${fontSizeClassMobile} ${fontSizeClass} `}
        placeholder="0"
        value={display}
      />
    </div>
  );
}

export default Display;
