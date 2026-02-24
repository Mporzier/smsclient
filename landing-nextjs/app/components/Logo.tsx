import React from "react";

/** Taille du logo (classes Tailwind). Exemples : "w-12 h-12", "w-20 h-20", "w-24 h-24" */
const LOGO_SIZE = "w-24 h-24";

type LogoProps = {
  /** Override container size/scale. Examples: "w-12 h-12", "scale-100", "w-32 h-32" */
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <div
      className={`scale-50 md:scale-75 flex-none group relative flex items-center justify-center ${LOGO_SIZE} rounded-2xl transition-all duration-300 cursor-pointer overflow-visible ${className}`}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 -2 62 62"
        className="w-full h-full overflow-visible"
        style={{ shapeRendering: "geometricPrecision" }}
      >
        <g filter="url(#logo-round)">
          <polygon
            className="fill-amber-300"
            points="0,22.032 17.064,31.032 58.064,10.032"
          />
          <polygon
            className="fill-pink-500"
            points="24.064,35.032 20.064,48.032 58.064,10.032"
          />
          <polygon
            className="fill-purple-300"
            points="17.064,31.032 24.064,35.032 44.064,48.032 58.064,10.032"
          />
          <polygon
            className="fill-pink-400"
            points="24.064,35.032 20.127,48.032 17.064,31.032 58.064,10.032"
          />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
