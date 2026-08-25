"use client";

import React from "react";
import Sun from "./Sun";

/**
 * Specialized day sky: warm sun with ambient glow. No stars — those are a
 * dark-theme-only feature. Tuning mirrors NightSky's numbers.
 */
const DaySky = (props) => {
  return (
    <Sun
      size={80}
      x={76}
      y={18}
      color={"#ffc259"}
      glow={"#ff9e40"}
      sunGlowSize={28}
      sunGlowIntensity={0.8}
      pulseSpeed={5 * 0.8}
      radialGlowSize={1640}
      radialGlowAlpha={0.28}
      {...props}
    />
  );
};

export default DaySky;
