"use client";

import React from "react";
import StarfieldBackground from "./StarfieldBackground";
import Moon from "./Moon";

/**
 * Specialized starfield tuned for this portfolio's night sky:
 * subtle, slow, mostly-horizontal drift across three depth layers.
 *
 * Star color follows the `theme` prop (an explicit `color` prop overrides).
 */
const STAR_COLORS = {
  dark: "#ffffff",
  light: "#000000",
};

const NightSky = ({ color, theme, ...props }) => {
  return (
    <>
      <StarfieldBackground
        color={color ?? STAR_COLORS[theme]}
        layers={3}
        density={125}
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
        {...props}
      />
    </>
  );
};

export default NightSky;
