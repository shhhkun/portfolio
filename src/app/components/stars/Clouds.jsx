"use client";

import React, { useEffect, useMemo, useRef } from "react";

/**
 * Soft drifting clouds for the day sky.
 *
 * Each cloud is a CLUSTER of overlapping full ovals - never concentric, never
 * centered on each other. Puffs are scattered horizontally and vertically with
 * independent sizes and opacities, so every cloud reads as an organic, smoky
 * layered shape rather than a ring-in-a-ring. Cluster dimensions randomize
 * around `size` so no two clouds share the same silhouette.
 *
 * Motion mirrors the stars' controls: every frame each cloud moves by
 * (velocityX, velocityY) * layer factor and wraps seamlessly at the viewport
 * edges - no bounce, no recycle.
 *
 * Props:
 *  - color:     cloud fill color, 6-digit hex (default "#fbfdff")
 *  - layers:    depth layers (default 3)
 *  - count:     total clouds across all layers (default 6)
 *  - velocityX: horizontal drift, px/s; sign sets direction (default 12)
 *  - velocityY: vertical drift, px/s; 0 = level flight (default 0)
 *  - size:      base cluster width in px; individual clusters vary around it
 */
const Clouds = ({
  color = "#fbfdff",
  layers = 3,
  count = 6,
  velocityX = 12,
  velocityY = 0,
  size = 150,
}) => {
  const nodeRefs = useRef([]);

  // build the cloud layout once per config change
  const clouds = useMemo(() => {
    const layerCount = Math.max(1, Math.round(layers));
    const total = Math.max(1, Math.round(count));

    return Array.from({ length: total }, (_, i) => {
      const layer = i % layerCount;
      // depth 0 = farthest, 1 = closest
      const depth = layerCount > 1 ? layer / (layerCount - 1) : 1;

      const w = size * (0.65 + Math.random() * 1.1); // cluster width
      const hRatio = 0.3 + Math.random() * 0.2; // height as fraction of width
      const h = w * hRatio;

      // scatter 2-4 puffs across the cluster, off-center on both axes
      const puffCount = 2 + Math.floor(Math.random() * 3);
      const puffs = [];
      for (let p = 0; p < puffCount; p++) {
        const pw = w * (0.45 + Math.random() * 0.5);
        const spread = puffCount > 1 ? p / (puffCount - 1) : 0.5;
        puffs.push({
          w: pw,
          h: pw * (hRatio + Math.random() * 0.25),
          // horizontal chain left->right with jitter; vertical zig-zag
          x: spread * (w - pw) + (Math.random() - 0.5) * w * 0.18,
          y:
            (Math.random() - 0.5) * h * 0.7 +
            Math.sin(spread * Math.PI) * h * 0.15,
          opacityFactor: 0.35 + Math.random() * 0.5,
        });
      }

      return {
        id: i,
        layer,
        scale: 0.55 + 0.45 * depth,
        opacity: 0.45 + 0.35 * depth,
        speedFactor: 0.4 + 0.6 * depth,
        yPercent: 8 + ((layer * 11 + Math.random() * 10) % 32),
        xPercent: Math.random() * 120 - 10,
        w,
        h,
        puffs,
      };
    });
  }, [layers, count, size]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = performance.now();

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      clouds.forEach((cloud, i) => {
        const node = nodeRefs.current[i];
        if (!node) return;

        const maxX = vw * (cloud.xPercent / 100);
        const maxY = vh * (cloud.yPercent / 100);

        cloud._x = (cloud._x ?? maxX) + velocityX * cloud.speedFactor * dt;
        cloud._y = (cloud._y ?? maxY) + velocityY * dt;

        // seamless wrap (either direction)
        if (cloud._x > vw + cloud.w) cloud._x = -cloud.w * 1.2;
        if (cloud._x + cloud.w < -cloud.w * 0.2) cloud._x = vw + cloud.w * 0.2;
        if (velocityY !== 0) {
          if (cloud._y > vh + cloud.h) cloud._y = -cloud.h * 1.2;
          if (cloud._y + cloud.h < -cloud.h * 0.2) cloud._y = vh + cloud.h * 0.2;
        } else {
          cloud._y = maxY; // hold the assigned band
        }

        node.style.transform = `translate3d(${cloud._x}px, ${cloud._y}px, 0)`;
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [clouds, velocityX, velocityY]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {clouds.map((cloud, i) => (
        <div
          key={cloud.id}
          ref={(el) => (nodeRefs.current[i] = el)}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: cloud.w,
            height: cloud.h,
            filter: "blur(1px)",
            willChange: "transform",
            // initial placement in viewport units; the rAF loop takes over
            // with identical px math on its first frame
            transform: `translate3d(${cloud.xPercent}vw, ${cloud.yPercent}vh, 0)`,
          }}
        >
          {cloud.puffs.map((puff, j) => (
            <div
              key={j}
              style={{
                position: "absolute",
                left: puff.x,
                top: puff.y,
                width: puff.w,
                height: puff.h,
                borderRadius: "50%", // literal full oval
                background: color,
                opacity: cloud.opacity * puff.opacityFactor,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Clouds;
