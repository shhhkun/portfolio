import React, { useState, useEffect, useRef } from "react";

const FloatingObject = ({
  amplitude = 20,
  speed = 0.0002,
  direction = "right",
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null); // for main container div
  const animationFrameRef = useRef(null);

  // create animation on mount & clean up on unmount
  useEffect(() => {
    if (!containerRef.current) {
      return; // wait for render of window
    }

    // width to determine when to wrap around
    const containerWidth = containerRef.current.offsetWidth;
    const objectWidth = 64;

    let lastTimestamp = performance.now();
    let currentX =
      direction === "right" ? -objectWidth : containerWidth + objectWidth;

    const animate = (timestamp) => {
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
          currentX = containerWidth + objectWidth;
        }
      }

      // calculate the vertical "bobbing" motion using a sine wave
      const newY = Math.sin(timestamp * 0.001) * amplitude;
      setPosition({ x: currentX, y: newY });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [amplitude, speed, direction]);

  return (
    <div
      ref={containerRef}
      id="floating-container"
      className="absolute bottom-32 left-0 w-full flex justify-start z-10"
    >
      <div
        className="w-32 h-32 relative"
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
