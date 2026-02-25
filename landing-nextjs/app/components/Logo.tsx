import React from "react";

/** Taille du logo (classes Tailwind). Exemples : "w-12 h-12", "w-20 h-20", "w-24 h-24" */
const LOGO_SIZE = "w-20 h-20";

/** Configuration de l'étoile à 4 branches */
const STAR_CONFIG = {
  cx: 41, // Centre X
  cy: 38, // Centre Y
  size: 5, // Taille (distance du centre aux pointes)
};

/** Génère les points SVG pour une étoile à 4 branches */
const getStarPoints = (cx: number, cy: number, size: number) => {
  const inner = size * 0.25; // Distance aux points intermédiaires
  return `${cx},${cy - size} ${cx + inner},${cy - inner} ${cx + size},${cy} ${
    cx + inner
  },${cy + inner} ${cx},${cy + size} ${cx - inner},${cy + inner} ${
    cx - size
  },${cy} ${cx - inner},${cy - inner}`;
};

/** Génère les polygones de clip pour les quadrants */
const getStarClipPolygons = (cx: number, cy: number, size: number) => ({
  topLeft: `${cx},${cy - size} ${cx},${cy} ${cx - size},${cy}`,
  bottomRight: `${cx},${cy} ${cx},${cy + size} ${cx + size},${cy}`,
  topRight: `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy}`,
  bottomLeft: `${cx},${cy} ${cx - size},${cy} ${cx},${cy + size}`,
});

/** Rayon d'arrondi pour les coins de l'avion */
const PLANE_CORNER_RADIUS = 1.5;

/**
 * Convertit des points de polygone en path SVG avec coins arrondis
 * @param points - chaîne de points "x1,y1 x2,y2 x3,y3 ..."
 * @param radius - rayon d'arrondi aux coins
 */
const polygonToRoundedPath = (points: string, radius: number): string => {
  const coords = points.split(" ").map((p) => {
    const [x, y] = p.split(",").map(Number);
    return { x, y };
  });

  if (coords.length < 3) return "";

  const getVector = (
    from: { x: number; y: number },
    to: { x: number; y: number }
  ) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    return { dx: dx / len, dy: dy / len, len };
  };

  let path = "";

  for (let i = 0; i < coords.length; i++) {
    const prev = coords[(i - 1 + coords.length) % coords.length];
    const curr = coords[i];
    const next = coords[(i + 1) % coords.length];

    const v1 = getVector(curr, prev);
    const v2 = getVector(curr, next);

    const r = Math.min(radius, v1.len / 2, v2.len / 2);

    const p1 = { x: curr.x + v1.dx * r, y: curr.y + v1.dy * r };
    const p2 = { x: curr.x + v2.dx * r, y: curr.y + v2.dy * r };

    if (i === 0) {
      path = `M ${p1.x},${p1.y}`;
    } else {
      path += ` L ${p1.x},${p1.y}`;
    }
    path += ` Q ${curr.x},${curr.y} ${p2.x},${p2.y}`;
  }

  path += " Z";
  return path;
};

type LogoProps = {
  /** Override container size/scale. Examples: "w-12 h-12", "scale-100", "w-32 h-32" */
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  const { cx, cy, size } = STAR_CONFIG;
  const starPoints = getStarPoints(cx, cy, size);
  const clipPolygons = getStarClipPolygons(cx, cy, size);

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
        <g>
          <path
            className="fill-sky-500"
            d={polygonToRoundedPath(
              "0,22.032 17.064,31.032 58.064,10.032",
              PLANE_CORNER_RADIUS
            )}
          />
          <path
            className="fill-sky-400"
            d={polygonToRoundedPath(
              "24.064,35.032 20.064,48.032 58.064,10.032",
              PLANE_CORNER_RADIUS
            )}
          />
          <path
            className="fill-sky-300"
            d={polygonToRoundedPath(
              "17.064,31.032 24.064,35.032 44.064,48.032 58.064,10.032",
              PLANE_CORNER_RADIUS
            )}
          />
          <path
            className="fill-sky-200"
            d={polygonToRoundedPath(
              "24.064,35.032 20.127,48.032 17.064,31.032 58.064,10.032",
              PLANE_CORNER_RADIUS
            )}
          />
        </g>

        {/* Étoile à 4 branches - configurable via STAR_CONFIG */}
        <defs>
          <clipPath id="star-tl-br">
            <polygon points={clipPolygons.topLeft} />
            <polygon points={clipPolygons.bottomRight} />
          </clipPath>
          <clipPath id="star-tr-bl">
            <polygon points={clipPolygons.topRight} />
            <polygon points={clipPolygons.bottomLeft} />
          </clipPath>
        </defs>

        {/* Base de l'étoile */}
        <polygon className="fill-white" points={starPoints} />
        {/* Overlay pour les points haut-droite et bas-gauche */}
        <polygon
          className="fill-white"
          points={starPoints}
          clipPath="url(#star-tr-bl)"
        />
      </svg>
    </div>
  );
};

export default Logo;
