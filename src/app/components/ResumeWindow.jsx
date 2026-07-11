"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
    const resumeUrl = "/Serjo_Barron_Resume.pdf";
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
        style={{
          zIndex: zIndex,
          width: "1058px",
          height: "600px",
          position: "absolute",
        }}
        onMouseDown={onFocus}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex flex-col overflow-hidden"
          style={{
            width: "100%",
            height: "100%",
            zIndex: zIndex,
            borderRadius: "10px",
            border: "2px solid var(--border)",
            boxSizing: "border-box",
          }}
        >
          {/* Window Header */}
          <div
            className="handle flex cursor-grab items-center justify-between px-6 py-2"
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
            className="custom-scrollbar min-h-0 flex-grow overflow-y-auto p-12"
            style={{ backgroundColor: "var(--card-bg)" }}
          >
            {/* HEADER */}
            <div
              className="mb-8 flex items-center justify-between rounded-lg p-8 shadow-lg"
              style={{ backgroundColor: "var(--card-bg2)" }}
            >
              <div className="flex w-full flex-col">
                <div className="flex flex-row justify-between">
                  <h1 className="font-bold" style={{ fontSize: "1.75rem" }}>
                    SERJO BARRON
                  </h1>
                  <button
                    onClick={() => {
                      downloadResume();
                      playAudio1(0.2);
                    }}
                    className="download-button flex cursor-pointer items-center rounded-md px-4 py-2"
                    style={{ fontSize: "1.25rem" }}
                  >
                    Download PDF
                  </button>
                </div>
                <div
                  className="mt-4 flex flex-wrap justify-between"
                  style={{
                    color: "var(--text4)",
                    fontSize: "1.25rem",
                  }}
                >
                  <span className="flex items-center">
                    <span className="mr-1">
                      <div className="relative h-6 w-6">
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
                      <div className="relative h-6 w-6">
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
                    className="flex transform cursor-pointer items-center no-underline transition-transform duration-300 hover:scale-105"
                    onClick={() => playAudio1(0.2)}
                  >
                    <span className="mr-1">
                      <div className="relative h-6 w-6">
                        <EnvelopeSimpleIcon
                          size={24}
                          weight="fill"
                          className="absolute top-0 left-0"
                          style={{
                            transform:
                              "translateY(0px) scaleY(0.9) scaleX(0.9)",
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
                    className="flex transform cursor-pointer items-center no-underline transition-transform duration-300 hover:scale-105"
                    onClick={() => playAudio1(0.2)}
                  >
                    <span className="mr-1">
                      <div className="relative h-6 w-6">
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
                    className="flex transform cursor-pointer items-center no-underline transition-transform duration-300 hover:scale-105"
                    onClick={() => playAudio1(0.2)}
                  >
                    <span className="mr-1">
                      <div className="relative h-6 w-6">
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

            {/* EDUCATION */}
            <div
              className="mb-8 rounded-lg p-8 shadow-lg"
              style={{ backgroundColor: "var(--card-bg2)" }}
            >
              <h2
                className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                EDUCATION
              </h2>
              <div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    University of California, Santa Cruz
                  </span>
                  <span
                    className="italic"
                    style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                  >
                    Sep 2020 – Jun 2024
                  </span>
                </div>
                <p style={{ fontSize: "1.25rem", color: "var(--text4)" }}>
                  Bachelor of Science &mdash; Computer Engineering -{" "}
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    GPA:
                  </span>{" "}
                  3.70
                </p>
                {/* <ul
                className="list-disc ml-8 mt-4"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Relevant Coursework:
                  </span>{" "}
                  Data Structures, Computer Architecture, Systems Programming,
                  Computer Networks
                </li>
              </ul> */}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div
              className="mb-8 rounded-lg p-8 shadow-lg"
              style={{ backgroundColor: "var(--card-bg2)" }}
            >
              <h2
                className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                EXPERIENCE
              </h2>
              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    Software Engineer Intern
                  </span>
                  <span
                    className="italic"
                    style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                  >
                    Oct 2025 – Feb 2026
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  BotStacks – San Francisco, CA
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Built reusable UI components and{" "}
                    <strong>dashboard analytics</strong> features in TypeScript
                    within a large-scale monorepo, integrating{" "}
                    <strong>REST APIs</strong> to surface user-specific project
                    metrics and improve data visibility
                  </li>
                  <li className="mb-2">
                    Designed and built the platform onboarding flow across{" "}
                    <strong>free, pro, and team</strong> account tiers,
                    implementing <strong>OAuth</strong> authentication,{" "}
                    <strong>Stripe</strong> payment integration, and
                    tier-specific user configuration in collaboration with
                    backend engineers on PostgreSQL-backed features.
                  </li>
                  <li className="mb-2">
                    Centralized <strong>50+</strong> internal engineering
                    documents into a <strong>Docker</strong>-deployed BookStack
                    wiki, improving knowledge sharing and reducing versioning
                    inconsistencies across teams.
                  </li>
                </ul>
              </div>

              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    Computer Science Reader
                  </span>
                  <span
                    className="italic"
                    style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                  >
                    Sep 2023 – Jun 2024
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  Baskin School of Engineering – Santa Cruz, CA
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Evaluated weekly lab reports and provided technical feedback
                    for <strong>200+</strong> students on systems-level C
                    projects spanning abstract data structures, path-finding
                    algorithms, Huffman coding, and cryptographic
                    implementations.
                  </li>
                </ul>
              </div>

              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    Tech Manager
                  </span>
                  <span
                    className="italic"
                    style={{ fontSize: "1.25rem", color: "var(--text4)" }}
                  >
                    Sep 2023 – Jun 2024
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  Slug Anime and Manga Association – Santa Cruz, CA
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Managed AV, streaming, and real-time troubleshooting for
                    weekly events and SlugCon, supporting{" "}
                    <strong>1,000+ attendees</strong>.
                  </li>
                  <li className="mb-2">
                    Coordinated technical logistics and setup plans among
                    officers, volunteers, and event partners, providing live
                    support and assisting with sponsorship outreach to support
                    event growth.
                  </li>
                </ul>
              </div>
            </div>

            {/* PROJECTS */}
            <div
              className="mb-8 rounded-lg p-8 shadow-lg"
              style={{ backgroundColor: "var(--card-bg2)" }}
            >
              <h2
                className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                PROJECTS
              </h2>
              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    CaseFile
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  React, Next.js, Node.js, TypeScript, Groq API, CourtListener
                  API, Wikipedia API
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Built an AI-assisted legal case analysis platform that
                    accepts arbitrary URLs, extracts{" "}
                    <strong>legal case metadata</strong>, and gener- ates
                    structured case overviews through a{" "}
                    <strong>multi-stage retrieval and LLM pipeline</strong>.
                  </li>
                  <li className="mb-2">
                    Designed a{" "}
                    <strong>retrieval and evidence synthesis pipeline</strong>{" "}
                    using metadata extraction, candidate ranking across legal
                    data sources, and evidence-grounded overview generation
                    while handling noisy transcripts and long-form source
                    content.
                  </li>
                </ul>
              </div>
              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    Chromatica
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  React, Next.js, Node.js, Prisma & PostgreSQL, Spotify API
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Integrated <strong>Spotify OAuth</strong> to fetch
                    personalized listening data — top tracks, artists, and
                    configurable time windows — and extracted dominant colors
                    from album art using <strong>node-vibrant</strong> to drive
                    dynamic UI theming.
                  </li>
                  <li className="mb-2">
                    Rendered extracted palettes as gradients and animated
                    floating bubble backgrounds, translating raw API data into a
                    fully reactive visual experience.
                  </li>
                </ul>
              </div>
              {/* <div>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    Kept
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  React, Vite, Firebase/Firestore, Node.js
                </p>
                <ul
                  className="list-disc ml-8 mt-4"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Developed and deployed a full-stack productivity scheduler
                    with a gamified progression system featuring{" "}
                    <strong>XP, badges, and animations,</strong> driving an
                    estimated <strong>20% increase</strong> in user engagement.
                  </li>
                </ul>
              </div> */}
              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    SmartMirror
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  React/React Native, Node.js, Electron, Python, BLE, Raspberry
                  Pi
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Contributed to a cross-functional team of{" "}
                    <strong>6 engineers</strong> to design and deploy an IoT
                    smart mirror with a companion React Native mobile app built
                    for <strong>cross-platform</strong> compatibility.
                  </li>
                  <li className="mb-2">
                    Owned <strong>BLE integration</strong> end-to-end — authored
                    the Python BLE script handling all device I/O, conducted
                    hardware research, and troubleshot sensor and backend
                    connectivity between the Raspberry Pi and mobile client,
                    achieving <strong>sub-second synchronization</strong>.
                  </li>
                </ul>
              </div>
              <div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold" style={{ fontSize: "1.25rem" }}>
                    LoFi Scape
                  </span>
                </div>
                <p
                  className="italic"
                  style={{ fontSize: "1.125rem", color: "var(--text4)" }}
                >
                  React, Next.js, Youtube Player API
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Built a browser-based ambient mixing tool allowing users to
                    independently control and blend multiple ambient soundscapes
                    (MP4/M4A) alongside lofi music streamed via the{" "}
                    <strong>YouTube iFrame Player API</strong>.
                  </li>
                  <li className="mb-2">
                    Implemented per-track volume control through React state
                    management and applied custom theming support for a
                    polished, distraction-free UI.
                  </li>
                </ul>
              </div>
            </div>

            {/* SKILLS */}
            <div
              className="rounded-lg p-8 shadow-lg"
              style={{ backgroundColor: "var(--card-bg2)" }}
            >
              <h2
                className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
                style={{
                  fontSize: "1.5rem",
                }}
              >
                SKILLS
              </h2>
              <ul
                className="ml-8 list-disc"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Languages:
                  </span>{" "}
                  Python, C, C++, JavaScript, TypeScript, HTML/CSS
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Frontend:
                  </span>{" "}
                  React, Next.js, Tailwind CSS, Vite
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Backend & Databases:
                  </span>{" "}
                  Node.js, Express.js, SQL, PostgreSQL, Firestore, Prisma, REST
                  APIs, LLM APIs
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Tools:
                  </span>{" "}
                  Git, Docker, Linux, Vercel, Figma, LaTeX
                </li>
              </ul>
            </div>

            {/* placeholder */}
          </div>
        </motion.div>
      </div>
    </Draggable>
  );
};

export default ResumeWindow;
