import React from "react";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

const HandleBar = () => (
  <div
    className="w-12 h-1 rounded-full mx-auto"
    style={{ backgroundColor: "var(--text-header)" }}
  />
);

const ContactTab = ({ isOpen, windowId, handleClose }) => {
  const { playAudio1, playAudio2 } = useAudioPlayer();

  // determine the translation state for the sliding animation
  // if the component is not open, it slides down (translate-y-full)
  const transformClass = isOpen ? "translate-y-0" : "translate-y-full";

  // determine the visibility and backdrop state
  // when closed, prevent interaction with the backdrop and modal
  const visibilityClass = isOpen
    ? "pointer-events-auto"
    : "pointer-events-none";
  const backdropOpacityClass = isOpen ? "opacity-75" : "opacity-0";

  const closeModal = () => {
    handleClose(windowId);
  };

  const downloadResume = () => {
    const resumeUrl = "/Serjo_Barron_Resume.pdf";
    window.open(resumeUrl, "_blank");
  };

  return (
    <>
      {/* Backdrop (handles outside clicks) */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${backdropOpacityClass} ${visibilityClass}`}
        onClick={() => {
          closeModal();
          playAudio2(0.1);
        }}
        aria-hidden={!isOpen}
      />

      {/* Modal Container (Fixed at the bottom, full width) */}
      <div
        className={`fixed bottom-0 left-0 w-full max-h-[85vh] z-50 
                   flex flex-col transition-transform duration-500 ease-in-out ${transformClass} overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex flex-row items-center rounded-t-lg px-6 py-2 flex-shrink-0"
          style={{
            fontSize: "1.25rem",
            backgroundColor: "var(--card-header)",
            border: "2px solid",
          }}
        >
          <p className="font-bold" style={{ color: "var(--text-header)" }}>
            {windowId}
          </p>
          <button
            onClick={() => {
              closeModal();
              playAudio2(0.1);
            }}
            className="absolute left-1/2 transform -translate-x-1/2 cursor-pointer font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            <HandleBar />
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="custom-scrollbar-thin p-8 overflow-y-auto"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* HEADER */}
          <div
            className="flex justify-between items-center mb-8 p-4 rounded-lg shadow-lg"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <h1 className="font-bold" style={{ fontSize: "1.5rem" }}>
                  SERJO BARRON
                </h1>
                <button
                  onClick={() => {
                    downloadResume();
                    playAudio1(0.2);
                  }}
                  className="download-button cursor-pointer flex items-center px-4 py-2 rounded-md"
                  style={{ fontSize: "1rem" }}
                >
                  Download PDF
                </button>
              </div>
              <div
                className="flex flex-wrap gap-6 mt-4"
                style={{
                  color: "var(--text4)",
                  fontSize: "1rem",
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
            className="rounded-lg shadow-lg p-4 mb-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.25rem",
              }}
            >
              PROJECTS
            </h2>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Chromatica</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  09/2025 – Present
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React, Next.js, Node.js, Prisma & PostgreSQL, Vercel
              </p>
              <p
                className="mt-4"
                style={{
                  color: "var(--text4)",
                }}
              >
                Engineered a full-stack web application that utilizes the
                Spotify API to generate unique color palettes based on your top
                tracks and artists. Deployed a responsive, user-facing
                experience that showcases expertise in OAuth integration.
              </p>
            </div>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Ramen Timer</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  09/2025
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React, Next.js, Express.js, Node.js, PostgreSQL, Vercel
              </p>
              <p
                className="mt-4"
                style={{
                  color: "var(--text4)",
                }}
              >
                Developed and deployed a mobile-first ramen timer web app with a
                nostalgic, pixel-art aesthetic. Built to record timer data for
                your favorite ramen brands, showcasing fundamental full-stack
                development skills with PostgreSQL.
              </p>
            </div>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Trashu</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  08/2025 – Present
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React, Vite, Node.js, Electron
              </p>
              <p
                className="mt-4"
                style={{
                  color: "var(--text4)",
                }}
              >
                Engineered a desktop app for storage management that saves users
                an estimated 15-20 minutes weekly by intelligently detecting
                duplicate and unused files. Designed the UI with Figma,
                translating complex data into an intuitive interface.
              </p>
            </div>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Kept</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  07/2025 – 08/2025
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React, Vite, Firebase/Firestore, Node.js
              </p>
              <p
                className="mt-4"
                style={{
                  color: "var(--text4)",
                }}
              >
                Developed and deployed a productivity scheduler web application
                with a gamified system of XP, badges, and animations that
                increased user engagement by an estimated 20%.
              </p>
            </div>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">SmartMirror</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  01/2024 – 06/2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React/React Native, Node.js, Electron, Python, BLE, Raspberry Pi
              </p>
              <p
                className="mt-4"
                style={{
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
            className="rounded-lg shadow-lg p-4 mb-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.25rem",
              }}
            >
              EXPERIENCE
            </h2>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">
                  Computer Systems and C Programming Reader
                </span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  09/2023 – 06/2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                Baskin School of Engineering – Santa Cruz, CA
              </p>
              <ul
                className="list-disc ml-6 mt-4"
                style={{
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

            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Tech Manager</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  09/2023 – 06/2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                Slug Anime and Manga Association – Santa Cruz, CA
              </p>
              <ul
                className="list-disc ml-6 mt-4"
                style={{
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
            className="rounded-lg shadow-lg p-4 mb-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.25rem",
              }}
            >
              SKILLS
            </h2>
            <ul
              className="list-disc ml-6"
              style={{
                fontSize: "1rem",
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
            className="rounded-lg shadow-lg p-4"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="font-bold mb-6 border-b-1 border-[#5f5b82] pb-4"
              style={{
                fontSize: "1.25rem",
              }}
            >
              EDUCATION
            </h2>
            <div style={{ fontSize: "1rem" }}>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">
                  University of California, Santa Cruz
                </span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  09/2020 – 06/2024
                </span>
              </div>
              <p style={{ color: "var(--text4)" }}>
                Bachelor of Science &mdash; Computer Engineering
              </p>
              <ul
                className="list-disc ml-6 mt-4"
                style={{
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
    </>
  );
};

export default ContactTab;
