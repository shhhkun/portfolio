"use client";

import React, { useState, useEffect, useRef } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // define the media query for screen size <= 768px
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    // initial check and set up listener
    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return isMobile;
};

const FloatingObject = ({
  amplitude = 20,
  speed = 0.0002, // 0.0002
  direction = "right",
}) => {
  const isMobile = useIsMobile();
  const objectSizeClass = isMobile ? "w-24 h-24" : "w-32 h-32";
  const containerBottomClass = isMobile ? "bottom-32" : "bottom-24";
  const objectWidth = isMobile ? 96 : 128;

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null); // for main container div
  const animationFrameRef = useRef(null);
  const currentXRef = useRef(0);

  // create animation on mount & clean up on unmount
  useEffect(() => {
    if (!containerRef.current) {
      return; // wait for render of window
    }

    let lastTimestamp = performance.now();

    let currentX = currentXRef.current;

    // initial container width (for wrap around)
    const initialContainerWidth = containerRef.current.offsetWidth;

    // check if the current X is near 0 (first run) or fully off-screen
    const isInitialRunOrOffScreen =
      currentXRef.current === 0 ||
      currentX < -objectWidth ||
      currentX > initialContainerWidth + objectWidth;

    if (isInitialRunOrOffScreen) {
      // initialize to the standard off-screen starting point
      currentX =
        direction === "right"
          ? -objectWidth
          : initialContainerWidth + objectWidth;
    }

    const animate = (timestamp) => {
      // get the live, current container width from the ref on every frame
      const containerWidth = containerRef.current.offsetWidth;

      // calculate the time difference (deltaTime) since the last frame
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // calculate the horizontal movement distance for this frame
      const movement = deltaTime * speed * 200;

      // update the X position based on the chosen direction
      if (direction === "right") {
        currentX += movement;
        // if the object moves past the right edge, reset it to the far left
        if (currentX > containerWidth + objectWidth) {
          currentX = -objectWidth;
        }
      } else {
        currentX -= movement;
        // if the object moves past the left edge, reset it to the far right
        if (currentX < -objectWidth) {
          currentX = containerWidth;
        }
      }

      // calculate the vertical "bobbing" motion using a sine wave
      const newY = Math.sin(timestamp * 0.001) * amplitude;

      // store before updating state
      currentXRef.current = currentX;

      setPosition({ x: currentX, y: newY });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [amplitude, speed, direction, objectWidth, isMobile]);

  return (
    <div
      ref={containerRef}
      id="floating-container"
      className={`absolute left-0 w-full flex justify-start z-12 ${containerBottomClass}`}
    >
      <div
        className={`relative ${objectSizeClass}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scaleX(${
            direction === "left" ? -1 : 1
          })`,
        }}
      >
        <img
          src="/bears.png"
          alt="Bear"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default FloatingObject;
