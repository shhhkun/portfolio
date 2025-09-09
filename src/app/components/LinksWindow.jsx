"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import {
  GithubLogoIcon,
  DiscordLogoIcon,
  LinkedinLogoIcon,
  SquareIcon,
} from "@phosphor-icons/react";

const LeetCodeLogo = ({ size, color, weight, className }) => {
  let strokeWidth = "1.5";
  if (weight === "light") {
    strokeWidth = "1";
  } else if (weight === "regular") {
    strokeWidth = "2.5";
  } else if (weight === "bold") {
    strokeWidth = "4";
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={`${className}`}
    >
      <defs>
        <style>
          {`
            .a,.b {
              fill: none;
              stroke: ${color};
              stroke-linecap: round;
              stroke-linejoin: round;
              stroke-width: ${strokeWidth};
            }
          `}
        </style>
      </defs>
      <path
        className="a"
        d="M33.8092,34.8772,26.8725,41.814a5.7258,5.7258,0,0,1-8.1154,0L8.6127,31.67a5.726,5.726,0,0,1,0-8.1155L18.7571,13.41a5.7258,5.7258,0,0,1,8.1154,0L34.5,21.0373"
      />
      <path className="b" d="M18.7571,13.41,27.7647,4.5" />
      <path className="a" d="M19.5838,27.5918h21.49" />
    </svg>
  );
};

const LinksWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
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
        const headerHeight = 56;

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
          width: "640px",
          height: "400px",
          borderRadius: "10px",
          border: "2px solid ",
          boxSizing: "border-box",
          position: "absolute",
        }}
        onMouseDown={onFocus}
      >
        {/* Window Header */}
        <div
          className="handle cursor-grab flex items-center justify-between px-6 py-2"
          style={{
            fontSize: "1.25rem",
            backgroundColor: "#171717",
            height: "56px",
            borderBottom: "2px solid white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className="font-bold">links</p>
          <button
            onClick={onClose}
            className="font-bold transition-transform hover:scale-110"
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="justify-center items-center flex flex-col flex-grow min-h-0 p-12"
          style={{ backgroundColor: "#132135" }}
        >
          {/* Intro Card */}
          <div
            className="intro-card w-full rounded-lg p-4"
            style={{ backgroundColor: "#233d61ff" }}
          >
            <h2 className="font-bold" style={{ fontSize: "1.25rem" }}>
              Stuff
            </h2>
          </div>

          {/* Link Icons */}
          <div className="flex flex-row flex-wrap gap-8 p-4">
            {/* GitHub Button */}
            <a
              href="https://github.com/your-username" // Replace with the correct link
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            >
              <div className="relative w-16 h-16">
                <GithubLogoIcon
                  size={64}
                  color="#171717"
                  weight="fill"
                  className="absolute top-0 left-0"
                />
                <GithubLogoIcon
                  size={64}
                  color="#ffffff"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">github</p>
            </a>

            {/* LeetCode Button */}
            <a
              href="https://leetcode.com/your-username/" // Replace with the correct link
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            >
              <div className="relative w-16 h-16">
                <SquareIcon
                  size={64}
                  color="#171717"
                  weight="fill"
                  className="absolute top-0 left-0"
                  style={{
                    transform:
                      "rotate(45deg) translateY(4px) translateX(3px) scaleY(0.7) scaleX(0.7)",
                  }}
                />
                <LeetCodeLogo
                  size={64}
                  color="#ffffff"
                  weight="regular"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">leetcode</p>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://github.com/your-username" // Replace with the correct link
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            >
              <div className="relative w-16 h-16">
                <LinkedinLogoIcon
                  size={64}
                  color="#171717"
                  weight="fill"
                  className="absolute top-0 left-0"
                />
                <LinkedinLogoIcon
                  size={64}
                  color="#ffffff"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">linkedin</p>
            </a>

            {/* Discord Button */}
            <a
              href="https://github.com/your-username" // Replace with the correct link
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
            >
              <div className="relative w-16 h-16">
                <DiscordLogoIcon
                  size={64}
                  color="#171717"
                  weight="fill"
                  className="absolute top-0 left-0"
                />
                <DiscordLogoIcon
                  size={64}
                  color="#ffffff"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">discord</p>
            </a>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default LinksWindow;
