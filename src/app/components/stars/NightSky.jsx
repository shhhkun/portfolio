"use client";

import React from "react";
import StarfieldBackground from "./StarfieldBackground";

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
    <StarfieldBackground
      color={color ?? STAR_COLORS[theme]}
      layers={3}
      density={125}
      velocityX={0.15}
      velocityY={0.05}
      {...props}
    />
  );
};

export default NightSky;
