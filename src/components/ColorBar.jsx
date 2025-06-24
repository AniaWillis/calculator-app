import React, { useState } from "react";
import { BACKGROUND_COLORS } from "../constants/backgroundColors";

function ColorBar({ onColor }) {
  const [isHovered, setIsHovered] = useState(false);

  // isHovered is used to hide the black panel and uncover the panel with colors
  return (
    <div
      onClick={() => {
        if (window.innerWidth <= 768) {
          // Toggle only on mobile
          setIsHovered((prev) => !prev);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative sm:w-lg w-sm h-10 cursor-pointer transition-all duration-400 ease-in-out "
    >
      <div
        className={`absolute top-2 left-0 right-0 w-full bg-black rounded transition-all duration-400 ease-in-out ${
          isHovered ? "h-0 opacity-0" : "h-6 opacity-100"
        }`}
      ></div>

      <div
        className={`absolute top-0 left-0 right-0 w-full h-10 flex bg-black border-2 justify-evenly p-2 gap-2 rounded transition-all duration-400 ease-in-out ${
          isHovered ? "h-10 opacity-100" : "h-0 opacity-0"
        }`}
      >
        {Object.entries(BACKGROUND_COLORS).map(([color, colorClassName]) => (
          <button
            key={color}
            onClick={() => {
              onColor(color);
              console.log(color);
            }}
            className={`size-full rounded-full border-2 cursor-pointer ${colorClassName} `}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ColorBar;
