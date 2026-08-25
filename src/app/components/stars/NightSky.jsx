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

// Moon tuning
const MOON_DEFAULTS = {
  size: 80, // diameter in px
  x: 76, // moon center, % of viewport
  y: 18,
  color: "#d1c19a", // surface + glow tint (6-digit hex)
  glow: "#8a8a8a",
  moonGlowSize: 28, // border-glow spread in px
  moonGlowIntensity: 0.7, // border-glow strength 0..1
  pulseSpeed: 5 * 0.8, // seconds per pulse; 0 = static
  radialGlowSize: 1640, // moonlight wash diameter in px
  radialGlowAlpha: 0.22, // wash intensity 0..1
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
      <Moon {...MOON_DEFAULTS} />
    </>
  );
};

export default NightSky;
