"use client";

import React, { useMemo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadFull } from "tsparticles";

// Map an (x, y) drift vector onto tsParticles' 8-way direction vocabulary.
const getDirection = (vx, vy) => {
  if (Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01) return "none";
  if (Math.abs(vy) >= Math.abs(vx)) return vy > 0 ? "bottom" : "top";
  if (Math.abs(vx) > Math.abs(vy) * 2) return vx > 0 ? "right" : "left";
  return vy > 0
    ? vx > 0
      ? "bottom-right"
      : "bottom-left"
    : vx > 0
      ? "top-right"
      : "top-left";
};

/**
 * Reusable starry-night background built on tsParticles.
 *
 * Renders `layers` transparent particle canvases stacked on top of each other
 * to create a restrained parallax night-sky effect. Farther layers get fewer,
 * smaller, dimmer stars that drift more slowly than the layers in front.
 *
 * The container is pointer-events-none and aria-hidden, so it never blocks
 * clicks, drags, or keyboard focus on the site above it.
 *
 * NOTE: in tsParticles v4 the drawn color lives under
 * `particles.paint.fill.color` — the legacy `particles.color` key is ignored
 * by the painter.
 *
 * Props:
 *  - color:     single star color shared by all layers — a real CSS color
 *               string, NOT var() (tsParticles parses colors in JS)
 *  - layers:    number of depth layers (default 3)
 *  - density:   base star count per layer before depth falloff (default 60)
 *  - velocityX: horizontal drift of the closest layer, px/s-ish (default 0.15)
 *  - velocityY: vertical drift of the closest layer (default 0.05)
 */
const StarfieldBackground = ({
  color = "#ffffff",
  layers = 3,
  density = 60,
  velocityX = 0.15,
  velocityY = 0.05,
}) => {
  const layerConfigs = useMemo(() => {
    const count = Math.max(1, layers);
    const baseSpeed = Math.sqrt(velocityX ** 2 + velocityY ** 2);

    return Array.from({ length: count }, (_, i) => {
      // depth 0 = farthest layer, 1 = closest layer
      const depth = count > 1 ? i / (count - 1) : 1;

      return {
        id: `starfield-layer-${i}`,
        options: {
          fullScreen: false,
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          detectRetina: true,
          particles: {
            paint: {
              fill: {
                enable: true,
                color: { value: color },
              },
            },
            number: {
              value: Math.max(8, Math.round(density * (0.35 + 0.65 * depth))),
              density: { enable: true, area: 900 },
            },
            shape: { type: "circle" },
            opacity: {
              // farther stars are dimmer -> depth cue
              value: {
                min: (0.2 + 0.55 * depth) * 0.6,
                max: 0.2 + 0.55 * depth,
              },
              animation: { enable: true, speed: 0.6, sync: false }, // gentle twinkle
            },
            size: {
              // farther stars are smaller -> depth cue
              value: { min: (0.5 + 1.3 * depth) * 0.6, max: 0.5 + 1.3 * depth },
            },
            move: {
              enable: baseSpeed > 0.01,
              direction: getDirection(velocityX, velocityY),
              straight: true,
              outModes: { default: "out" },
              // farther layers drift noticeably slower -> subtle parallax
              speed: baseSpeed * (0.25 + 0.75 * depth),
            },
          },
          interactivity: { events: { onHover: { enable: false } } },
          motion: { reduce: { disable: false, value: true } },
        },
      };
    });
  }, [layers, density, velocityX, velocityY, color]);

  const init = useMemo(() => loadFull, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      <ParticlesProvider init={init}>
        {layerConfigs.map(({ id, options }) => (
          <Particles
            key={`${id}-${color}`}
            id={id}
            className="absolute inset-0"
            options={options}
          />
        ))}
      </ParticlesProvider>
    </div>
  );
};

export default StarfieldBackground;
