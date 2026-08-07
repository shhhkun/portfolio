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
  MinusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

const ResumeWindow = ({
  onClose,
  onFocus,
  onMinimize,
  onStop,
  zIndex,
  position,
  isActive,
}) => {
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
        const taskbarHeight =
          document.querySelector(".taskbar")?.offsetHeight ?? 48;

        setBounds({
          top: 0,
          left: 0,
          right: window.innerWidth - windowWidth,
          bottom: window.innerHeight - headerHeight - taskbarHeight,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const downloadResume = () => {
    const resumeUrl = `${assetBase}/documents/Serjo_Barron_Resume.pdf`;
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
          className={`flex flex-col overflow-hidden ${
            isActive ? "window-active" : ""
          }`}
          style={{
            width: "100%",
            height: "100%",
            zIndex: zIndex,
            borderRadius: "10px",
            border: "2px solid var(--border)",
            boxSizing: "border-box",
            boxShadow: isActive
              ? "var(--window-shadow-active)"
              : "var(--window-shadow)",
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
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  onMinimize && onMinimize();
                  playAudio2(0.1);
                }}
                className="cursor-pointer transition-transform hover:scale-110"
                style={{ color: "var(--text-header)" }}
                aria-label="Minimize window"
              >
                <MinusIcon weight="bold" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  playAudio2(0.1);
                }}
                className="cursor-pointer transition-transform hover:scale-110"
                style={{ color: "var(--text-header)" }}
                aria-label="Close window"
              >
                <XIcon weight="bold" />
              </button>
            </div>
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
                  Bachelor of Science - Computer Engineering |{" "}
                  <span style={{ color: "var(--text)" }}>GPA:</span> 3.70
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
                    Built reusable UI components and analytics dashboards in
                    TypeScript for a modular AI chatbot platform, integrating
                    GraphQL operations and REST APIs to surface user-specific
                    usage metrics.
                  </li>
                  <li className="mb-2">
                    Redesigned onboarding workflows across free, pro, and team
                    tiers, streamlining account setup, workspace creation,
                    chatbot configuration, and tier-specific provisioning while
                    integrating <strong>OAuth</strong> authentication and{" "}
                    <strong>Stripe</strong> payments.
                  </li>
                  <li className="mb-2">
                    Designed and prototyped a centralized{" "}
                    <strong>identity and access management</strong> architecture
                    to address fragmented authentication logic across{" "}
                    <strong>4 core platform services</strong>, evaluating Clerk
                    and APISIX-based solutions while defining token, session,
                    and authorization workflows.
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
                    Managed AV systems, live streaming, and technical operations
                    for weekly events and SlugCon, supporting{" "}
                    <strong>1,000+ attendees</strong>.
                  </li>
                  <li className="mb-2">
                    Coordinated event logistics across officers, volunteers, and
                    external partners, contributing to venue planning,
                    sponsorship outreach, technical setup, and live event
                    execution.
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
                  React, Next.js, Node.js, TypeScript, Redis, Groq API,
                  CourtListener API
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Designed a <strong>multi-stage retrieval pipeline</strong>{" "}
                    that analyzes arbitrary URLs, extracts structured{" "}
                    <strong>legal case metadata</strong>, and generates case
                    summaries through LLM inference and external legal data
                    sources.
                  </li>
                  <li className="mb-2">
                    Implemented <strong>TTL-based Redis caching</strong>{" "}
                    workflows that reduced repeat-request latency by up to{" "}
                    <strong>96%</strong> by eliminating redundant LLM inference
                    and external API requests.
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
                    Integrated <strong>Spotify OAuth</strong> to retrieve
                    personalized listening data, storing user records and API
                    credentials through Prisma and PostgreSQL while generating
                    dynamic visualizations from Spotify responses.
                  </li>
                  <li className="mb-2">
                    Developed a reactive interface that generated dynamic themes
                    from extracted album artwork color palettes, creating
                    personalized visual experiences from user listening history.
                  </li>
                </ul>
              </div>
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
                    Owned <strong>BLE integration</strong> end-to-end by
                    engineering the Python communication layer, conducting
                    hardware integration, and synchronizing communication
                    between the Raspberry Pi and iOS/Android clients.
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
                  React, Next.js, YouTube Player API
                </p>
                <ul
                  className="mt-4 ml-8 list-disc"
                  style={{
                    fontSize: "1.25rem",
                    color: "var(--text4)",
                  }}
                >
                  <li className="mb-2">
                    Built a browser-based ambient mixing tool integrating the{" "}
                    <strong>YouTube iFrame Player API</strong> to synchronize
                    music playback with customizable ambient soundscapes.
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
                  Python, TypeScript, JavaScript, C, C++, SQL, HTML/CSS
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Frameworks & Libraries:
                  </span>{" "}
                  React, Next.js, Node.js, Express.js, Tailwind CSS, Prisma
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Databases & Cloud:
                  </span>{" "}
                  PostgreSQL, Redis, AWS (S3, CloudFront, IAM), Vercel
                </li>
                <li className="mb-2">
                  <span className="font-bold" style={{ color: "var(--text)" }}>
                    Tools & Platforms:
                  </span>{" "}
                  Git, Docker, GitHub Actions, Linux, Playwright, OAuth, REST
                  APIs, LLM APIs, Figma
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
