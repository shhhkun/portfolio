"use client";

import React, { useRef } from "react";
import { useAudioPlayer } from "../audio/AudioPlayer";
import { useBGM } from "../audio/BGMPlayer";
import Tooltip from "../Tooltip";

/**
 * A simple, controllable sun for the day sky. Structural twin of Moon.jsx,
 * with a warm orange/yellow palette that reads on a light background.
 *
 * Layers (back to front):
 *  1. Large radial "sunlight" gradient washing the surrounding sky
 *     (defaults to centered on the sun; offsettable via radialX/radialY)
 *  2. A border-hugging glow around the sun disc, with a pulse
 *  3. The sun itself
 *
 * All positions are percentages of the parent container.
 *
 * Props:
 *  - size:              sun diameter in px (default 80)
 *  - x / y:             sun center position, % of container (default 76 / 18)
 *  - color:             base sun surface color, 6-digit hex (default "#ffc259")
 *  - glow:              ambient glow color, 6-digit hex (default "#ff9e40")
 *  - sunGlowSize:       border-glow spread in px (default 28)
 *  - sunGlowIntensity:  border-glow peak strength 0..1 (default 0.8)
 *  - pulseSpeed:        seconds per glow pulse; 0 disables the pulse (default 5)
 *  - radialGlowSize:    sunlight gradient diameter in px (default 1640)
 *  - radialGlowAlpha:   sunlight gradient peak alpha 0..1 (default 0.28)
 *  - radialX / radialY: sunlight gradient center, % of container;
 *                       defaults to the sun's x/y so it stays centered
 */
const SUN_PULSE_KEYFRAMES = `
@keyframes sun-border-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
`;

const Sun = ({
  size = 80,
  x = 76,
  y = 18,
  color = "#ffc259",
  glow = "#ff9e40",
  sunGlowSize = 28,
  sunGlowIntensity = 0.8,
  pulseSpeed = 5,
  radialGlowSize = 1640,
  radialGlowAlpha = 0.28,
  radialX, // optional
  radialY, // optional
}) => {
  const { playAudio1, playAudio6 } = useAudioPlayer();
  const { toggleBGM, isPlaying: bgmPlaying } = useBGM();

  // Defaults are owned by DaySky; fall back here only for direct usage.
  size = size ?? 80;
  x = x ?? 76;
  y = y ?? 18;
  color = color ?? "#ffb703";
  glow = glow ?? "#ff9e40";
  sunGlowSize = sunGlowSize ?? 28;
  sunGlowIntensity = sunGlowIntensity ?? 0.7;
  pulseSpeed = pulseSpeed ?? 5;
  radialGlowSize = radialGlowSize ?? 1640;
  radialGlowAlpha = radialGlowAlpha ?? 0.22;

  // cooldown so jittery cursor movement doesn't machine-gun the sfx
  const HOVER_COOLDOWN_MS = 1500;
  const lastHoverRef = useRef(0);
  const handleHover = () => {
    const now = Date.now();
    if (now - lastHoverRef.current < HOVER_COOLDOWN_MS) return;
    lastHoverRef.current = now;
    playAudio6();
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
    boxShadow: `0 0 ${sunGlowSize}px ${Math.round(sunGlowSize / 3)}px ${toRgba(
      glow,
      sunGlowIntensity,
    )}`,
    animation:
      pulseSpeed > 0
        ? `sun-border-pulse ${pulseSpeed}s ease-in-out infinite`
        : "none",
    opacity: pulseSpeed > 0 ? undefined : sunGlowIntensity,
  };

  const discStyle = {
    position: "relative",
    width: size,
    height: size,
    borderRadius: "50%",
    // same treatment as the moon disc: subtle off-center highlight only
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
    <div className="pointer-events-none absolute inset-0 z-25 overflow-hidden">
      <style>{SUN_PULSE_KEYFRAMES}</style>

      {/* large ambient sunlight wash (decorative) */}
      <div style={radialGlowStyle} aria-hidden="true" />

      {/* sun + border glow, positioned together */}
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
        <Tooltip
          title="THE SUN"
          text="Click me for some good vibes."
          offsetX={0}
          offsetY={100}
        >
          <button
            type="button"
            aria-label="Sun"
            onClick={() => {
              playAudio1();
              toggleBGM();
            }}
            onMouseEnter={handleHover}
            className="cursor-pointer transition-[filter] duration-300 hover:drop-shadow-[0_0_8px_var(--glow-color)]"
            style={{
              ...discStyle,
              pointerEvents: "auto", // root is pointer-events-none; opt back in
              "--glow-color": toRgba(glow, 0.9),
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Sun;
