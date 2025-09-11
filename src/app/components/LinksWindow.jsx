"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import {
  GithubLogoIcon,
  DiscordLogoIcon,
  LinkedinLogoIcon,
  SquareIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

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
  const { playAudio1, playAudio2 } = useAudioPlayer();
  const nodeRef = useRef(null);
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
  const [toastMessage, setToastMessage] = useState("");

  const handleCopyDiscord = async () => {
    const discordUsername = "shhhkun";

    try {
      await navigator.clipboard.writeText(discordUsername);
      setToastMessage("copied!");
    } catch (err) {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = discordUsername;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToastMessage("copied!");
    } finally {
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (nodeRef.current) {
        const windowWidth = nodeRef.current.offsetWidth;
        const windowHeight = nodeRef.current.offsetHeight;
        const headerHeight = 48;

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
            backgroundColor: "var(--card-header)",
            height: "48px",
            borderBottom: "2px solid var(--border)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className="font-bold" style={{ color: "var(--text-header)" }}>
            links
          </p>
          <button
            onClick={() => {
              onClose();
              playAudio2(0.1);
            }}
            className="font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="justify-center items-center flex flex-col flex-grow min-h-0 p-12"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Link Icons */}
          <div className="flex flex-row flex-wrap gap-8 p-4">
            {/* GitHub Button */}
            <a
              href="https://github.com/shhhkun" // Replace with the correct link
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative w-16 h-16">
                <GithubLogoIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                />
                <GithubLogoIcon
                  size={64}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">github</p>
            </a>

            {/* LeetCode Button */}
            <a
              href="https://leetcode.com/u/shhhkun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative w-16 h-16">
                <SquareIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                  style={{
                    transform:
                      "rotate(45deg) translateY(4px) translateX(3px) scaleY(0.7) scaleX(0.7)",
                  }}
                />
                <LeetCodeLogo
                  size={64}
                  color="var(--text)"
                  weight="regular"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">leetcode</p>
            </a>

            {/* LinkedIn Button */}
            <a
              href="https://linkedin.com/in/serjobarron"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
              onClick={() => playAudio1(0.2)}
            >
              <div className="relative w-16 h-16">
                <LinkedinLogoIcon
                  size={64}
                  color="var(--bg)"
                  weight="fill"
                  className="absolute top-0 left-0"
                />
                <LinkedinLogoIcon
                  size={64}
                  color="var(--text)"
                  weight="light"
                  className="absolute top-0 left-0 z-10"
                />
              </div>
              <p className="font-bold mt-2">linkedin</p>
            </a>

            {/* Discord Button */}
            <div className="relative">
              <button
                onClick={() => {
                  handleCopyDiscord();
                  playAudio1(0.2);
                }}
                className="flex flex-col items-center bg-transparent border-none p-4 rounded-xl cursor-pointer transition-transform duration-300 transform hover:scale-110"
              >
                <div className="relative w-16 h-16">
                  <DiscordLogoIcon
                    size={64}
                    color="var(--bg)"
                    weight="fill"
                    className="absolute top-0 left-0"
                  />
                  <DiscordLogoIcon
                    size={64}
                    color="var(--text)"
                    weight="light"
                    className="absolute top-0 left-0 z-10"
                  />
                </div>
                <p className="font-bold mt-2">discord</p>
              </button>

              {/* Toast Notification */}
              {toastMessage && (
                <span
                  className="absolute bg-black bg-opacity-75 rounded-md px-2 py-1 -bottom-4 left-1/2 transform -translate-x-1/2"
                  style={{ fontSize: "0.75rem" }}
                >
                  {toastMessage}
                </span>
              )}
            </div>

            {/* Intro Card */}
            <div
              className="intro-card rounded-lg text-center mx-auto py-4 px-16"
              style={{
                backgroundColor: "var(--card-bg2)",
              }}
            >
              <h2>All the places to say hi</h2>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default LinksWindow;
