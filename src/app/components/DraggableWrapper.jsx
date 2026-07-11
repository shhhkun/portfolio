// was used for testing react-draggable
"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const DraggableWrapper = ({ onClose, onFocus, onStop, zIndex, position }) => {
  const nodeRef = useRef(null);

  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (nodeRef.current) {
        const windowWidth = nodeRef.current.offsetWidth;
        const windowHeight = nodeRef.current.offsetHeight;
        const headerHeight = 56; // adjust later

        setBounds({
          top: 0,
          left: 0,
          right: window.innerWidth - windowWidth,
          bottom: window.innerHeight - headerHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".handle"
      bounds={bounds}
      position={position}
      onStop={onStop}
    >
      <div
        ref={nodeRef}
        className="overflow-hidden rounded-2xl bg-purple-800 shadow-2xl"
        style={{
          zIndex: zIndex,
          width: "400px",
          height: "300px",
          position: "absolute",
        }}
        onMouseDown={onFocus}
      >
        {/* Window Header */}
        <div className="handle flex cursor-grab items-center justify-between bg-purple-600 p-4 text-white">
          <p className="font-bold">Drag Me!</p>
          <button
            onClick={onClose}
            className="rounded-full border-none bg-transparent p-1 text-xl leading-none font-bold text-white transition-colors hover:bg-purple-700"
          >
            &times;
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow p-4">
          <p className="text-white">
            This is the content of the draggable window. This content can be
            hidden when dragged below the viewport.
          </p>
        </div>
      </div>
    </Draggable>
  );
};

export default DraggableWrapper;
