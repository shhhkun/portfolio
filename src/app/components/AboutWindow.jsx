"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { useAudioPlayer } from "./AudioPlayer";

const AboutWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
  const { playAudio1, playAudio2 } = useAudioPlayer();
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
          width: "800px",
          height: "560px",
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
            about
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
          className="flex flex-col flex-grow min-h-0"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Profile Picture and Name */}
          <div className="flex items-center px-12 py-8">
            <div
              className="rounded-full overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-110"
              style={{
                width: "136px",
                height: "136px",
              }}
            >
              <img
                src="/bear.png"
                alt="Serjo Barron Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-12">
              <div
                style={{
                  fontWeight: "500",
                  color: "var(--text3)",
                  fontSize: "3rem",
                }}
              >
                Serjo Barron
              </div>
              <div
                className="pl-2"
                style={{ color: "var(--text)", fontSize: "1.125rem" }}
              >
                Full-Stack Developer
                <br />
                UI/UX Enthusiast
              </div>
            </div>
          </div>

          <div
            className="h-1"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* SCROLLABLE BOTTOM SECTION: The rest of the content */}
          <div
            className="custom-scrollbar p-12 text-white flex-grow overflow-y-auto"
            style={{ color: "var(--text)" }}
          >
            <div style={{ fontSize: "1.25rem" }}>
              <p>
                Hi there! I'm Serjo, a full-stack developer who leverages a
                Computer Engineering background to build robust, efficient, and
                creatively designed applications. I focus on...
              </p>
              <ul className="list-disc mt-5 ml-5">
                <li>
                  <span style={{ color: "var(--text3)" }}>
                    <b>Full-Stack Development: </b>
                  </span>
                  Bringing innovative ideas to life from the backend to the user
                  interface.
                </li>
                <li>
                  <span style={{ color: "var(--text3)" }}>
                    <b>User Experience: </b>
                  </span>
                  Designing and building intuitive applications that are a
                  pleasure to use.
                </li>
                <li>
                  <span style={{ color: "var(--text3)" }}>
                    <b>Problem-Solving: </b>
                  </span>
                  Translating complex concepts into elegant and user-friendly
                  solutions.
                </li>
              </ul>
              <p className="mt-5">
                If you're interested in collaborating or just want to chat about
                development, feel free to reach out to me at{" "}
                <a
                  href="mailto:serjobarron@gmail.com"
                  className="underline"
                  style={{ color: "var(--text3)" }}
                  onClick={() => playAudio1(0.2)}
                >
                  serjobarron@gmail.com
                </a>
                !
              </p>
            </div>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.5rem" }}
            >
              EDUCATION
            </h2>
            <blockquote
              className="p-3 mt-5"
              style={{
                fontSize: "1.25rem",
                borderLeft: "6px solid var(--border2)",
              }}
            >
              <h3 style={{ fontSize: "1.25rem" }}>
                B.S. in Computer Engineering
              </h3>
              <p style={{ fontSize: "1rem" }}>
                University of California, Santa Cruz &mdash; 2024, Highest
                Honors
              </p>
            </blockquote>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.5rem" }}
            >
              HOBBIES
            </h2>
            <ul className="list-disc mt-5 ml-5" style={{ fontSize: "1.25rem" }}>
              <li>Dabbling in Digital Art & Animation</li>
              <li>Physical Fitness & Training</li>
              <li>Music (violin; genres like K-Hip-Hop and orchestral)</li>
              <li>Anime & Manga</li>
            </ul>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.5rem" }}
            >
              LANGUAGE PROFICIENCY
            </h2>
            <div
              className="flex flex-col mt-5 gap-y-4"
              style={{ color: "var(--text2)", fontSize: "1.125rem" }}
            >
              {/* English */}
              <div className="flex flex-col gap-y-1 group">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">English</span>
                  <div
                    className="flex-grow rounded-full h-4 relative overflow-hidden"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className="bar-english h-full absolute left-0 rounded-full transition-all duration-300 ease-in-out group-hover:scale-y-125"
                      style={{ width: "100%", backgroundColor: "#a8e6cf" }}
                    ></div>
                  </div>
                </div>
                <span className="text-right" style={{ fontSize: "0.875rem" }}>
                  Proficient
                </span>
              </div>

              {/* Tagalog */}
              <div className="flex flex-col gap-y-1 group">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">Tagalog</span>
                  <div
                    className="flex-grow rounded-full h-4 relative overflow-hidden"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className="bar-tagalog h-full absolute left-0 rounded-full transition-all duration-300 ease-in-out group-hover:scale-y-125"
                      style={{ width: "50%", backgroundColor: "#fdfd96" }}
                    ></div>
                  </div>
                </div>
                <span className="text-right" style={{ fontSize: "0.875rem" }}>
                  Elementary
                </span>
              </div>

              {/* Japanese */}
              <div className="flex flex-col gap-y-1 group">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">Japanese</span>
                  <div
                    className="flex-grow rounded-full h-4 relative overflow-hidden"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className="bar-japanese h-full absolute left-0 rounded-full transition-all duration-300 ease-in-out group-hover:scale-y-125"
                      style={{ width: "20%", backgroundColor: "#ffb3b3" }}
                    ></div>
                  </div>
                </div>
                <span className="text-right" style={{ fontSize: "0.875rem" }}>
                  Beginner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default AboutWindow;
