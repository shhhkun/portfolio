"use client";

import React, { useRef } from "react";
import { useAudioPlayer } from "../AudioPlayer";

/**
 * A simple, controllable moon for the night sky.
 *
 * Layers (back to front):
 *  1. Large radial "moonlight" gradient that washes the surrounding sky
 *     (defaults to being centered on the moon; offsettable via radialX/radialY)
 *  2. A border-hugging glow around the moon disc, with a pulse
 *  3. The moon itself
 *
 * All positions are percentages of the parent container. The parent must be
 * `relative`.
 *
 * Props:
 *  - size:              moon diameter in px (default 80)
 *  - x / y:             moon center position, % of container (default 76 / 18)
 *  - color:             base moon surface color, 6-digit hex (default "#d1c19a")
 *  - glow:              base glow color, 6-digit hex (default "#f1efe2")
 *  - moonGlowSize:      border-glow spread in px (default 28)
 *  - moonGlowIntensity: border-glow peak strength 0..1 (default 0.7)
 *  - pulseSpeed:        seconds per glow pulse; 0 disables the pulse (default 5)
 *  - radialGlowSize:    moonlight gradient diameter in px (default 560)
 *  - radialGlowAlpha:   moonlight gradient peak alpha 0..1 (default 0.22)
 *  - radialX / radialY: moonlight gradient center, % of container;
 *                       defaults to the moon's x/y so it stays centered
 */
const MOON_PULSE_KEYFRAMES = `
@keyframes moon-border-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
`;

const Moon = ({
  size = 80,
  x = 76,
  y = 18,
  color = "#d1c19a",
  glow = "f1efe2",
  moonGlowSize = 28,
  moonGlowIntensity = 0.7,
  pulseSpeed = 5,
  radialGlowSize = 560,
  radialGlowAlpha = 0.22,
  radialX, // optional
  radialY, // optional
}) => {
  const { playAudio1, playAudio6 } = useAudioPlayer();

  // cooldown so jittery cursor movement doesn't machine-gun the sfx
  const HOVER_COOLDOWN_MS = 1500;
  const lastHoverRef = useRef(0);
  const handleHover = () => {
    const now = Date.now();
    if (now - lastHoverRef.current < HOVER_COOLDOWN_MS) return;
    lastHoverRef.current = now;
    playAudio6(0.15);
  };

  const glowX = radialX ?? x;
  const glowY = radialY ?? y;

  // hex alpha suffixes require 6-digit hex input
  const toRgba = (hex, alpha) => {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const borderGlowStyle = {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    boxShadow: `0 0 ${moonGlowSize}px ${Math.round(moonGlowSize / 3)}px ${toRgba(
      color,
      moonGlowIntensity,
    )}`,
    animation:
      pulseSpeed > 0
        ? `moon-border-pulse ${pulseSpeed}s ease-in-out infinite`
        : "none",
    opacity: pulseSpeed > 0 ? undefined : moonGlowIntensity,
  };

  const discStyle = {
    position: "relative",
    width: size,
    height: size,
    borderRadius: "50%",
    // subtle off-center highlight so the disc reads as a sphere
    background: `radial-gradient(circle at 32% 30%, ${toRgba(
      color,
      1,
    )} 0%, ${toRgba(color, 0.95)} 45%, ${toRgba(color, 0.9)} 100%)`,
  };

  const radialGlowStyle = {
    position: "absolute",
    left: `${glowX}%`,
    top: `${glowY}%`,
    width: radialGlowSize,
    height: radialGlowSize,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${toRgba(
      glow,
      radialGlowAlpha,
    )} 0%, transparent 70%)`,
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">
      <style>{MOON_PULSE_KEYFRAMES}</style>

      {/* large ambient moonlight wash (decorative) */}
      <div style={radialGlowStyle} aria-hidden="true" />

      {/* moon + border glow, positioned together */}
      <div
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div style={borderGlowStyle} />
        <button
          type="button"
          aria-label="Moon"
          onClick={() => playAudio1(0.2)}
          onMouseEnter={handleHover}
          className="cursor-pointer transition-[filter] duration-300 hover:drop-shadow-[0_0_8px_var(--glow-color)]"
          style={{
            ...discStyle,
            pointerEvents: "auto",
            "--glow-color": toRgba(color, 0.9),
          }}
        />
      </div>
    </div>
  );
};

export default Moon;
