"use client";

import React from "react";
import StarfieldBackground from "./Stars";
import Moon from "./Moon";

/**
 * Specialized night sky: subtle drifting starfield + moon.
 * Stars are a dark-theme-only feature, so the color is fixed here
 * (an explicit `color` prop still overrides).
 */
const NightSky = ({ color = "#ffffff", ...props }) => {
  return (
    <>
      <StarfieldBackground
        color={color}
        layers={3}
        density={100}
        velocityX={0.15}
        velocityY={0.05}
        {...props}
      />
      <Moon
        size={80}
        x={76}
        y={18}
        color={"#d1c19a"}
        glow={"#8a8a8a"}
        moonGlowSize={28}
        moonGlowIntensity={0.7}
        pulseSpeed={5 * 0.8}
        radialGlowSize={1640}
        radialGlowAlpha={0.22}
      />
    </>
  );
};

export default NightSky;
