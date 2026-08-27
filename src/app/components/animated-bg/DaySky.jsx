"use client";

import React from "react";
import Sun from "./Sun";
import SunRings from "./SunRings";
import Clouds from "./Clouds";

/**
 * Specialized day sky: warm sun with ambient glow, concentric pulsing rings
 * behind it, and drifting oval clouds.
 */
const DaySky = (props) => {
  return (
    <>
      {/* circular glow */}
      <SunRings
        size={400}
        innerSize={100}
        x={76}
        y={18}
        color={"#e8933a"}
        opacity={0.2}
        endOpacity={0}
        rings={4}
      />

      {/* drifting clouds */}
      <Clouds
        color="#c8d1d9"
        layers={4}
        count={12}
        velocityX={14}
        velocityY={0}
        size={200}
      />

      <Sun
        size={80}
        x={76}
        y={18}
        color={"#f4a940"}
        glow={"#e8933a"}
        sunGlowSize={28}
        sunGlowIntensity={0.8}
        pulseSpeed={5 * 0.8}
        radialGlowSize={1000}
        radialGlowAlpha={0.28}
        {...props}
      />
    </>
  );
};

export default DaySky;
