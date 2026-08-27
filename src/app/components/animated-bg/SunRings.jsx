"use client";

import React from "react";

/**
 * Literal circular glow stripes behind the sun — a static, contiguous band
 * system. Stripes touch edge-to-edge (no gaps), starting flush with the sun
 * disc's edge and expanding outward to `size`. Each stripe is equally thick.
 *
 * Opacity behaves like a real glow: MOST solid nearest the disc, gradually
 * dissolving outward — innermost stripe at `opacity`, fading linearly to
 * `endOpacity` (default 0, fully melted into the sky) at the outermost stripe.
 *
 * The stripe thickness is derived automatically: (outerRadius - innerRadius) /
 * rings — which guarantees perfect continuity (no gaps, no overlap) at any
 * ring count or size.
 *
 * Props:
 *  - size:       outermost stripe diameter in px (default 340)
 *  - innerSize:  diameter where the first stripe begins — just past the sun
 *                disc (default 96; the disc itself is 80)
 *  - x / y:      center position, % of container (default 50 / 50)
 *  - color:      stripe color, 6-digit hex (default "#f5c86b")
 *  - opacity:    opacity of the INNERMOST stripe (nearest the disc) 0..1 (default 0.45)
 *  - endOpacity: opacity of the OUTERMOST stripe; 0 melts fully into the sky (default 0)
 *  - rings:      number of stripes (default 4)
 */
const SunRings = ({
  size = 340,
  innerSize = 96,
  x = 50,
  y = 50,
  color = "#f5c86b",
  opacity = 0.45,
  endOpacity = 0,
  rings = 4,
}) => {
  const ringCount = Math.max(1, Math.round(rings));

  // contiguous stripes: each stripe's border width is exactly its share of
  // the radial span, so consecutive rings touch edge-to-edge with no gaps
  const innerRadius = innerSize / 2;
  const outerRadius = size / 2;
  const borderWidth = (outerRadius - innerRadius) / ringCount;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {Array.from({ length: ringCount }, (_, i) => {
        // ring 0 = nearest the disc (most solid), ring (n-1) = outermost (faded)
        const t = ringCount > 1 ? i / (ringCount - 1) : 1;
        // center this stripe's diameter in the middle of its radial band
        const diameter = (innerRadius + borderWidth * (i + 0.5)) * 2;
        return (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: diameter,
              height: diameter,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: `${borderWidth}px solid ${color}`,
              opacity: opacity + (endOpacity - opacity) * t,
            }}
          />
        );
      })}
    </div>
  );
};

export default SunRings;
