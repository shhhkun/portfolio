"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { GithubLogoIcon } from "@phosphor-icons/react";
import GitHubLogo from "../utils/GitHubLogo";
import FigmaLogo from "../utils/FigmaLogo";
import { useAudioPlayer } from "./AudioPlayer";

// SKILL GROUPS
const skillGroups = {
  // Group 1: Programming Languages
  "group-language": ["JavaScript", "TypeScript", "Python", "C/C++"],

  // Group 2: Web Fundamentals
  "group-web": ["HTML/CSS"],

  // Group 3: Frontend
  "group-frontend": ["React", "Next.js", "Tailwind CSS", "Vite"],

  // Group 4: Backend & API
  "group-backend": ["Node.js", "Express.js", "REST APIs", "OAuth", "LLM APIs"],

  // Group 5: Databases
  "group-database": ["SQL", "PostgreSQL", "Prisma", "Firebase/Firestore"],

  // Group 6: Dev Tools & Deployment
  "group-dev": ["Git", "GitHub", "Docker", "Vercel", "Figma"],

  // Group 7: Desktop & Systems
  "group-desktop": ["Linux", "Windows", "Electron", "LaTeX"],
};

// Helper to assign each skill to exactly one group
const assignSkillToGroup = (skill) => {
  for (const [groupName, skills] of Object.entries(skillGroups)) {
    if (skills.includes(skill)) {
      return groupName;
    }
  }
  return null; // Shouldn't happen
};

// ===== SKILL PILL COMPONENT =====
const SkillPill = ({ skill, activeSkill, setActiveSkill }) => {
  const group = assignSkillToGroup(skill);
  const isActive = activeSkill === skill;

  // Check if this skill should be highlighted (same group as active skill)
  const shouldHighlight =
    activeSkill && group === assignSkillToGroup(activeSkill) && !isActive;

  return (
    <div
      className={`skill-pill ${group} ${isActive ? "active" : ""} ${
        shouldHighlight ? "highlight" : ""
      }`}
      onMouseEnter={() => setActiveSkill(skill)}
      onMouseLeave={() => setActiveSkill(null)}
    >
      {skill}
    </div>
  );
};

const WorkWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
  const { playAudio1, playAudio2 } = useAudioPlayer();
  const nodeRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);

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
        style={{
          zIndex: zIndex,
          width: "1056px",
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
              projects
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
            {/* Intro Card */}
            <div
              className="intro-card rounded-lg p-8"
              style={{ backgroundColor: "var(--card-bg2)" }}
            >
              <h3 className="font-bold" style={{ fontSize: "1.25rem" }}>
                Open for opportunities. Connect with me at{" "}
                <a
                  href="mailto:serjobarron@gmail.com"
                  className="underline"
                  style={{ color: "var(--text3)" }}
                  onClick={() => playAudio1(0.2)}
                >
                  serjobarron@gmail.com
                </a>
              </h3>
              <p className="mt-2" style={{ fontSize: "1.125rem" }}>
                My expertise lies in Full-Stack Development, where I apply
                Software Engineering principles to create efficient and
                user-friendly applications.
              </p>
            </div>

            <div
              className="my-8 h-1"
              style={{ backgroundColor: "var(--border2)", height: "1px" }}
            ></div>

            {/* Development & Tools Section */}
            <div className="skills-section">
              <div className="skills-container flex flex-col gap-6 md:flex-row md:gap-12">
                {/* Tools Column */}
                <div className="skill-column flex-1">
                  <h2
                    className="mb-4 font-semibold"
                    style={{ fontSize: "1.5rem" }}
                  >
                    TOOLS
                  </h2>
                  <div className="skill-grid flex flex-wrap gap-2">
                    {[
                      "Git",
                      "GitHub",
                      "Docker",
                      "Vercel",
                      "Linux",
                      "Windows",
                      "Figma",
                      "LaTeX",
                    ].map((skill) => (
                      <SkillPill
                        key={skill}
                        skill={skill}
                        activeSkill={activeSkill}
                        setActiveSkill={setActiveSkill}
                      />
                    ))}
                  </div>
                </div>

                {/* Development Column */}
                <div className="skill-column flex-1">
                  <h2
                    className="mb-4 font-semibold"
                    style={{ fontSize: "1.5rem" }}
                  >
                    DEVELOPMENT
                  </h2>
                  <div className="skill-grid flex flex-wrap gap-2">
                    {[
                      // Languages
                      "JavaScript",
                      "TypeScript",
                      "Python",
                      "C/C++",
                      "HTML/CSS",

                      // Frontend
                      "React",
                      "Next.js",
                      "Tailwind CSS",
                      "Vite",

                      // Backend
                      "Node.js",
                      "Express.js",
                      "REST APIs",
                      "OAuth",
                      "LLM APIs",

                      // Databases
                      "PostgreSQL",
                      "Prisma",
                      "SQL",
                      "Firebase/Firestore",

                      // Desktop
                      "Electron",
                    ].map((skill) => (
                      <SkillPill
                        key={skill}
                        skill={skill}
                        activeSkill={activeSkill}
                        setActiveSkill={setActiveSkill}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="my-8 h-1"
              style={{ backgroundColor: "var(--border2)", height: "1px" }}
            ></div>

            {/* Projects */}
            <h2
              className="section-title mb-4 font-semibold"
              style={{
                fontSize: "1.5rem",
              }}
            >
              PROJECTS
            </h2>

            <div className="projects-section flex flex-col gap-8">
              {/* Project Card 11 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/casefile.webp"
                    alt="Placeholder for project 11"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      CaseFile
                    </h3>
                    <p className="flex-grow">
                      Analyze legal content from online sources by extracting{" "}
                      <strong>case metadata</strong>, retrieving relevant
                      records from <strong>legal databases</strong>, and
                      generating <strong>structured case overviews</strong>{" "}
                      through an AI-powered pipeline.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React, Next.js, Node.js, TypeScript, Groq API,
                      CourtListener API, Wikipedia API
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/casefile"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 10 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/lofiscape.webp"
                    alt="Placeholder for project 10"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      LoFi Scape
                    </h3>
                    <p className="flex-grow">
                      Curate your perfect productivity environment. Mix calming
                      LoFi beats with custom ambient soundscapes, from gentle
                      rain to a lively cafe. Built with Next.js, Tailwind CSS,
                      and the <strong>Youtube Player API</strong>.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React, Next.js, Youtube Player API
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://lofiscape.vercel.app"
                        target="_blank"
                        className="pill-button pill-button--accent"
                        onClick={() => playAudio1(0.2)}
                      >
                        Live Demo
                      </a>
                      <a
                        href="https://www.figma.com/design/gsf9eDUKs9j6X2RoKSLkIu/LofiScape?node-id=0-1&t=o49jsYXOxh7WWJCm-1"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <FigmaLogo />
                        Figma
                      </a>
                      <a
                        href="https://github.com/shhhkun/lofiscape"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 9 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/chromatica.webp"
                    alt="Placeholder for project 9"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      Chromatica
                    </h3>
                    <p className="flex-grow">
                      A web app that connects to the{" "}
                      <strong>Spotify API</strong> to generate dynamic color
                      palettes based on your top tracks and artists, extracting
                      dominant colors from album art to drive a fully reactive
                      UI.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React, Next.js, Node.js, Prisma & PostgreSQL, Spotify API
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://chromatica-music.vercel.app"
                        target="_blank"
                        className="pill-button pill-button--accent"
                        onClick={() => playAudio1(0.2)}
                      >
                        Live Demo
                      </a>
                      <a
                        href="https://www.figma.com/design/xGFkHzn1fG5u96a8Hh1O0V/Vibe-Palette?node-id=0-1&t=YqybfchkBCkxq6n2-1"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <FigmaLogo />
                        Figma
                      </a>
                      <a
                        href="https://github.com/shhhkun/chromatica"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                      <a
                        href="/Chromatica_Case_Study.pdf"
                        target="_blank"
                        className="pill-button pill-button--accent2"
                        onClick={() => playAudio1(0.2)}
                      >
                        Write-Up
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 8 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/ramentimer.webp"
                    alt="Placeholder for project 8"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      Ramen Timer
                    </h3>
                    <p className="flex-grow">
                      A mobile-first ramen timer with a nostalgic{" "}
                      <strong>pixel-art</strong> aesthetic, built full-stack
                      with a Next.js frontend, Express.js backend, and
                      PostgreSQL database.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React, Next.js, Node.js, Express.js, PostgreSQL
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://ramentimer.vercel.app"
                        target="_blank"
                        className="pill-button pill-button--accent"
                        onClick={() => playAudio1(0.2)}
                      >
                        Live Demo
                      </a>
                      <a
                        href="https://www.figma.com/design/P67iWewggnoDCZJU85Jkxq/Timer?node-id=0-1&t=jq6jeZ1cptalgGGs-1"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <FigmaLogo />
                        Figma
                      </a>
                      <a
                        href="https://github.com/shhhkun/ramentimer"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 7 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/trashu2.webp"
                    alt="Placeholder for project 7"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      Trashu
                    </h3>
                    <p className="flex-grow">
                      A desktop storage manager app built with Electron and
                      React to intelligently manage and optimize local storage.
                      It uses smart cleanup metrics to provide recommendations,
                      all within a playful, <strong>panda themed UI</strong>.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React, TypeScript, Vite, Node.js, Electron
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/Trashu"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 6 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/kept2.webp"
                    alt="Placeholder for project 6"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      Kept
                    </h3>
                    <p className="flex-grow">
                      A personalized task scheduler with a 24-hour timetable and
                      a gamified system that uses <strong>XP and badges</strong>{" "}
                      to encourage consistent productivity. It integrates with
                      Firebase for secure data persistence & Firestore for
                      profiles.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React, Vite, Node.js, Firebase/Firestore
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://productivityapp-eb15a.web.app/"
                        target="_blank"
                        className="pill-button pill-button--accent"
                        onClick={() => playAudio1(0.2)}
                      >
                        Live Demo
                      </a>
                      <a
                        href="https://github.com/shhhkun/Kept"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub Repo
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 5 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/smartmirror.webp"
                    alt="Placeholder for project 5"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      SmartMirror
                    </h3>
                    <p className="flex-grow">
                      IoT smart mirror and companion mobile app connected via a
                      Python BLE pipeline authored end-to-end, achieving{" "}
                      <strong>sub-second synchronization</strong> between a
                      Raspberry Pi and React Native client.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      React/React Native, Node.js, Electron, Python, BLE,
                      Raspberry Pi
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/SmartMirror"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                      <a
                        href="/SmartMirror_Design.pdf"
                        target="_blank"
                        className="pill-button pill-button--accent2"
                        onClick={() => playAudio1(0.2)}
                      >
                        Write-Up
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative flex h-64 items-center justify-center rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                  style={{ backgroundColor: "#ffb3b3", width: "420px" }}
                >
                  <div className="relative h-16 w-16">
                    <GithubLogoIcon
                      size={64}
                      color="var(--bg)"
                      weight="fill"
                      className="absolute top-0 left-0"
                    />
                  </div>
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      Multi-Threaded HTTP Server
                    </h3>
                    <p className="flex-grow">
                      An HTTP server handling GET and PUT requests using{" "}
                      <strong>POSIX threads</strong> for concurrency, with a
                      dedicated logging system to monitor all incoming and
                      outgoing traffic.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      C
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/CSE130/tree/main/asgn4"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative flex h-64 items-center justify-center rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                  style={{ backgroundColor: "#b3e6ff", width: "420px" }}
                >
                  <div className="relative h-16 w-16">
                    <GithubLogoIcon
                      size={64}
                      color="var(--bg)"
                      weight="fill"
                      className="absolute top-0 left-0"
                    />
                  </div>
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      Huffman Data Compressor
                    </h3>
                    <p className="flex-grow">
                      A command-line tool that efficiently compresses and
                      decompresses files using the{" "}
                      <strong>Huffman encoding</strong> algorithm. The project's
                      core is an implementation that leverages classic data
                      structures like priority queues and binary trees.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      C
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/CSE13S-Projects/tree/main/asgn5"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative flex h-64 items-center justify-center rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                  style={{ backgroundColor: "#a8e6cf", width: "420px" }}
                >
                  <div className="relative h-16 w-16">
                    <GithubLogoIcon
                      size={64}
                      color="var(--bg)"
                      weight="fill"
                      className="absolute top-0 left-0"
                    />
                  </div>
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      RSA Public Key Cryptography
                    </h3>
                    <p className="flex-grow">
                      Built a command-line tool that implements the{" "}
                      <strong>RSA</strong> public key cryptography algorithm
                      from the ground up. The program securely encrypts and
                      decrypts messages by generating public and private keys.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      C
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/CSE13S-Projects/tree/main/asgn6"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Card 1 */}
              <div
                className="project-card flex animate-[slideIn_0.6s_ease-out] flex-row rounded-lg"
                style={{ backgroundColor: "var(--card-bg3)" }}
              >
                <div
                  className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                  style={{ backgroundColor: "transparent", width: "420px" }}
                >
                  <img
                    className="project-image h-64 w-full rounded-tl-lg rounded-bl-lg object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg"
                    src="/dollhouse.webp"
                    alt="Placeholder for project 1"
                  />
                </div>
                <div className="project-details flex w-full flex-col justify-between p-6">
                  <div>
                    <h3
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: "1.375rem",
                      }}
                    >
                      DollHouse
                    </h3>
                    <p className="flex-grow">
                      A 2D game built in Construct 3 to explore core game design
                      principles. As a key member of a small team, I implemented
                      all of the event-based logic, as well as contributed to
                      level design and asset creation.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p
                      className="mb-2 font-medium"
                      style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                    >
                      Construct 3
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://github.com/shhhkun/dollhouse"
                        target="_blank"
                        className="pill-button"
                        onClick={() => playAudio1(0.2)}
                      >
                        <GitHubLogo />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Draggable>
  );
};

export default WorkWindow;
