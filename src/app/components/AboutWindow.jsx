"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const AboutWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
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
        const headerHeight = 53; // adjust later

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
        className="flex flex-col overflow-hidden"
        style={{
          zIndex: zIndex,
          width: "809px",
          height: "561.9px",
          borderRadius: "10px",
          border: "2px solid ",
          boxSizing: "border-box",
          position: "absolute",
        }}
        onMouseDown={onFocus}
      >
        {/* Window Header */}
        <div
          className="handle cursor-grab flex items-center justify-between text-white px-4 py-2 font-light"
          style={{
            fontSize: "1.25rem",
            backgroundColor: "#171717",
            height: "53px",
            borderBottom: "2px solid white",
            display: "flex",
            alignItems: "center",
            paddingLeft: "1.5rem",
          }}
        >
          <p className="font-bold">About Me</p>
          <button
            onClick={onClose}
            className="text-white bg-transparent border-none p-1 leading-none text-xl font-bold rounded-full hover:bg-purple-700 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="p-4 flex-grow overflow-y-auto"
          style={{
            backgroundColor: "#132135",
          }}
        >
          <p className="text-white">
            This is the content of the draggable window. This content can be
            hidden when dragged below the viewport.
          </p>
        </div>
      </div>
    </Draggable>
  );
};

export default AboutWindow;
