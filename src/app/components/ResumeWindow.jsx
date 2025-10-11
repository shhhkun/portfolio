"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

const ResumeWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
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

  const downloadResume = () => {
    const resumeUrl = "/resume.pdf";
    window.open(resumeUrl, "_blank");
  };

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
          width: "1058px",
          height: "600px",
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
            resume
          </p>
          <button
            onClick={() => {
              onClose();
              playAudio2(0.1);
            }}
            className="cursor-pointer font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="custom-scrollbar p-12 flex-grow min-h-0 overflow-y-auto"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* HEADER */}
          <div
            className="flex justify-between items-center mb-8 p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <h1 className="font-bold" style={{ fontSize: "1.75rem" }}>
                  SERJO BARRON
                </h1>
                <button
                  onClick={() => {
                    downloadResume();
                    playAudio1(0.2);
                  }}
                  className="download-button cursor-pointer flex items-center px-4 py-2 rounded-md"
                  style={{ fontSize: "1.25rem" }}
                >
                  Download PDF
                </button>
              </div>
              <div
                className="flex flex-wrap gap-6 mt-4"
                style={{
                  color: "var(--text4)",
                  fontSize: "1.25rem",
                }}
              >
                <span className="flex items-center">
                  <span className="mr-1">
                    <div className="relative w-6 h-6">
                      <MapPinIcon
                        size={24}
                        weight="fill"
                        className="absolute top-0 left-0"
                      />
                    </div>
                  </span>
                  Sacramento, CA
                </span>
                <span className="flex items-center">
                  <span className="mr-1">
                    <div className="relative w-6 h-6">
                      <PhoneIcon
                        size={24}
                        weight="fill"
                        className="absolute top-0 left-0"
                      />
                    </div>
                  </span>
                  916-584-5289
                </span>
                <a
                  href="mailto:serjobarron@gmail.com"
                  className="flex items-center no-underline cursor-pointer transition-transform duration-300 transform hover:scale-110"
                  onClick={() => playAudio1(0.2)}
                >
                  <span className="mr-1">
                    <div className="relative w-6 h-6">
                      <EnvelopeSimpleIcon
                        size={24}
                        weight="fill"
                        className="absolute top-0 left-0"
                        style={{
                          transform: "translateY(0px) scaleY(0.9) scaleX(0.9)",
                        }}
                      />
                    </div>
                  </span>
                  serjobarron@gmail.com
                </a>
                <a
                  href="https://linkedin.com/in/serjobarron"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center no-underline cursor-pointer transition-transform duration-300 transform hover:scale-110"
                  onClick={() => playAudio1(0.2)}
                >
                  <span className="mr-1">
                    <div className="relative w-6 h-6">
                      <LinkedinLogoIcon
                        size={24}
                        weight="fill"
                        className="absolute top-0 left-0"
                      />
                    </div>
                  </span>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/shhhkun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center no-underline cursor-pointer transition-transform duration-300 transform hover:scale-110"
                  onClick={() => playAudio1(0.2)}
                >
                  <span className="mr-1">
                    <div className="relative w-6 h-6">
                      <GithubLogoIcon
                        size={24}
                        weight="fill"
                        className="absolute top-0 left-0"
                      />
                    </div>
                  </span>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div
            className="rounded-lg shadow-lg p-8 mb-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.5rem",
              }}
            >
              PROJECTS
            </h2>
            <div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  Chromatica
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  09/2025 – Present
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                React, Next.js, Node.js, Prisma & PostgreSQL, Vercel
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                Engineered a full-stack web application that utilizes the
                Spotify API to generate unique color palettes based on your top
                tracks and artists. Deployed a responsive, user-facing
                experience that showcases expertise in OAuth integration.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  Ramen Timer
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  09/2025
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                React, Next.js, Express.js, Node.js, PostgreSQL, Vercel
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                Developed and deployed a mobile-first ramen timer
                web app with a nostalgic, pixel-art aesthetic. Built to record timer
                data for your favorite ramen brands, showcasing fundamental
                full-stack development skills with PostgreSQL.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  Trashu
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  08/2025 – Present
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                React, Vite, Node.js, Electron
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                Engineered a desktop app for storage management that saves users
                an estimated 15-20 minutes weekly by intelligently detecting
                duplicate and unused files. Designed the UI with Figma,
                translating complex data into an intuitive interface.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  Kept
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  07/2025 – 08/2025
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                React, Vite, Firebase/Firestore, Node.js
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                Developed and deployed a productivity scheduler web application
                with a gamified system of XP, badges, and animations that
                increased user engagement by an estimated 20%.
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  SmartMirror
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  01/2024 – 06/2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                React/React Native, Node.js, Electron, Python, BLE, Raspberry Pi
              </p>
              <p
                className="mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                Developed an IoT device and mobile app designed to reduce phone
                reliance in the morning and improve mental health. Orchestrated
                a real-time data exchange pipeline that achieved sub-second data
                transfer via Bluetooth Low Energy (BLE), enabling seamless
                communication between a Raspberry Pi and a React Native mobile
                app.
              </p>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div
            className="rounded-lg shadow-lg p-8 mb-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.5rem",
              }}
            >
              EXPERIENCE
            </h2>
            <div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  Computer Systems and C Programming Reader
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  09/2023 – 06/2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                Baskin School of Engineering – Santa Cruz, CA
              </p>
              <ul
                className="list-disc ml-8 mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Graded and provided feedback on weekly lab reports for over
                  200 students in systems programming and C.
                </li>
                <li className="mb-2">
                  Explained technical concepts clearly to support student
                  learning and LaTeX formatting conventions.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  Tech Manager
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  09/2023 – 06/2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "1.125rem", color: "var(--text4)" }}
              >
                Slug Anime and Manga Association – Santa Cruz, CA
              </p>
              <ul
                className="list-disc ml-8 mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Managed AV, streaming, and live troubleshooting for weekly
                  meetings and SlugCon, a 1000+ person convention.
                </li>
                <li className="mb-2">
                  Coordinated technical logistics and relayed setup plans across
                  officers, guests, and event partners.
                </li>
                <li className="mb-2">
                  Provided ongoing tech support and contributed to outreach and
                  event funding initiatives.
                </li>
              </ul>
            </div>
          </div>

          {/* SKILLS */}
          <div
            className="rounded-lg shadow-lg p-8 mb-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.5rem",
              }}
            >
              SKILLS
            </h2>
            <ul
              className="list-disc ml-8"
              style={{
                fontSize: "1.25rem",
                color: "var(--text4)",
              }}
            >
              <li className="mb-2">
                <span className="font-bold" style={{ color: "var(--text)" }}>
                  Programming Languages:
                </span>{" "}
                Python, C, C++, JavaScript, TypeScript, HTML, CSS, Verilog
              </li>
              <li className="mb-2">
                <span className="font-bold" style={{ color: "var(--text)" }}>
                  Frameworks & Libraries:
                </span>{" "}
                React, Next.js, Node.js, Express.js, Tailwind CSS, Vite,
                Electron, Firebase, Prisma
              </li>
              <li className="mb-2">
                <span className="font-bold" style={{ color: "var(--text)" }}>
                  Databases:
                </span>{" "}
                PostgreSQL, Firestore
              </li>
              <li className="mb-2">
                <span className="font-bold" style={{ color: "var(--text)" }}>
                  Tools:
                </span>{" "}
                Git, GitHub, Vercel, CI/CD, Visual Studio, Figma, LaTeX
              </li>
            </ul>
          </div>

          {/* EDUCATION */}
          <div
            className="rounded-lg shadow-lg p-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.5rem",
              }}
            >
              EDUCATION
            </h2>
            <div>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                  University of California, Santa Cruz
                </span>
                <span
                  className="italic"
                  style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                >
                  09/2020 – 06/2024
                </span>
              </div>
              <p style={{ fontSize: "1.25rem", color: "var(--text4)" }}>
                Bachelor of Science &mdash; Computer Engineering
              </p>
              <ul
                className="list-disc ml-8 mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    GPA:
                  </span>{" "}
                  3.70
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Relevant Coursework:
                  </span>{" "}
                  Data Structures & Algorithms, Computer Architecture, Computer
                  System Design, Embedded System Design, Computer Networks,
                  Network Programming, Electronic Circuits, Logic Design,
                  Signals & Systems
                </li>
              </ul>
            </div>
          </div>
          {/* placeholder */}
        </div>
      </div>
    </Draggable>
  );
};

export default ResumeWindow;
