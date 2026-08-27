import React from "react";
import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { useAudioPlayer } from "./audio/AudioPlayer";

const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL;

const HandleBar = () => (
  <div
    className="mx-auto h-1 w-12 rounded-full"
    style={{ backgroundColor: "var(--text-header)" }}
  />
);

const ResumeTab = ({ isOpen, windowId, handleClose }) => {
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
    const resumeUrl = `${assetBase}/documents/Serjo_Barron_Resume.pdf`;
    window.open(resumeUrl, "_blank");
  };

  return (
    <>
      {/* Backdrop (handles outside clicks) */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${backdropOpacityClass} ${visibilityClass}`}
        onClick={() => {
          closeModal();
          playAudio2();
        }}
        aria-hidden={!isOpen}
      />

      {/* Modal Container (Fixed at the bottom, full width) */}
      <div
        className={`fixed bottom-0 left-0 z-50 flex max-h-[85vh] w-full flex-col transition-transform duration-500 ease-in-out ${transformClass} overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex flex-shrink-0 flex-row items-center rounded-t-lg px-6 py-2"
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
              playAudio2();
            }}
            className="absolute left-1/2 -translate-x-1/2 transform cursor-pointer font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            <HandleBar />
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="custom-scrollbar-thin overflow-y-auto p-8"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* HEADER */}
          <div
            className="mb-8 flex items-center justify-between rounded-lg p-4 shadow-lg"
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
                    playAudio1();
                  }}
                  className="download-button flex cursor-pointer items-center rounded-md px-4 py-2"
                  style={{ fontSize: "1rem" }}
                >
                  Download PDF
                </button>
              </div>
              <div
                className="mt-4 flex flex-wrap gap-6"
                style={{
                  color: "var(--text4)",
                  fontSize: "1rem",
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
                  onClick={() => playAudio1()}
                >
                  <span className="mr-1">
                    <div className="relative h-6 w-6">
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
                  className="flex transform cursor-pointer items-center no-underline transition-transform duration-300 hover:scale-105"
                  onClick={() => playAudio1()}
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
                  onClick={() => playAudio1()}
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
            className="mb-8 rounded-lg p-4 shadow-lg"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
              style={{
                fontSize: "1.25rem",
              }}
            >
              EDUCATION
            </h2>
            <div style={{ fontSize: "1rem" }}>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold">
                  University of California, Santa Cruz
                </span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  Sep 2020 – Jun 2024
                </span>
              </div>
              <p style={{ color: "var(--text4)" }}>
                Bachelor of Science - Computer Engineering |{" "}
                <span style={{ color: "var(--text)" }}>GPA:</span> 3.70
              </p>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div
            className="mb-8 rounded-lg p-4 shadow-lg"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
              style={{
                fontSize: "1.25rem",
              }}
            >
              EXPERIENCE
            </h2>

            <div style={{ fontSize: "1rem" }}>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">Software Engineer Intern</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  Oct 2025 – Feb 2026
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                BotStacks – San Francisco, CA
              </p>
              <ul
                className="mt-4 ml-6 list-disc"
                style={{
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Built reusable UI components and dashboard interfaces in
                  TypeScript for an AI chatbot platform, integrating GraphQL and
                  REST APIs while developing against its{" "}
                  <strong>LangChain runner</strong> for LLM execution and usage
                  analytics.
                </li>
                <li className="mb-2">
                  Redesigned onboarding workflows across free, pro, and team
                  tiers, streamlining account setup, workspace creation, chatbot
                  configuration, and tier-specific provisioning while
                  integrating <strong>Google OAuth</strong> and{" "}
                  <strong>Stripe</strong> payments.
                </li>
                <li className="mb-2">
                  Designed a centralized{" "}
                  <strong>identity and access management</strong> architecture
                  to address fragmented authentication logic across{" "}
                  <strong>4 core platform services</strong>, developing Clerk
                  and APISIX proof-of-concepts while defining token, session,
                  and authorization workflows.
                </li>
              </ul>
            </div>

            <div style={{ fontSize: "1rem" }}>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">Computer Science Reader</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  Sep 2023 – Jun 2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                Baskin School of Engineering – Santa Cruz, CA
              </p>
              <ul
                className="mt-4 ml-6 list-disc"
                style={{
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Evaluated weekly lab reports for{" "}
                  <strong>200 + students</strong>, assessing C implementations
                  and algorithmic reasoning across data structures, sorting,
                  graph algorithms, Huffman coding, and cryptography.
                </li>
                <li className="mb-2">
                  Provided technical feedback while coordinating grading
                  workflows with faculty, teaching assistants, and readers.
                </li>
              </ul>
            </div>

            <div style={{ fontSize: "1rem" }}>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">Tech Manager</span>
                <span className="italic" style={{ color: "var(--text4)" }}>
                  Jun 2023 – Jun 2024
                </span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                Slug Anime and Manga Association – Santa Cruz, CA
              </p>
              <ul
                className="mt-4 ml-6 list-disc"
                style={{
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Maintained and optimized a TypeScript/Next.js website,
                  improving application reliability, frontend presentation, and
                  performance while managing artist, vendor, and sponsor content
                  for recurring events.
                </li>
                <li className="mb-2">
                  Coordinated event logistics, venue planning, and sponsorship
                  outreach while managing AV systems, live streaming, and
                  technical operations for the organization's annual SlugCon
                  anime convention, supporting <strong>1,000+ attendees</strong>
                  .
                </li>
              </ul>
            </div>
          </div>

          {/* PROJECTS */}
          <div
            className="mb-8 rounded-lg p-4 shadow-lg"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
              style={{
                fontSize: "1.25rem",
              }}
            >
              PROJECTS
            </h2>

            <div style={{ fontSize: "1rem" }}>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">CaseFile</span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                Python, FastAPI, React, Next.js, TypeScript, PyTorch,
                PostgreSQL, pgvector, Redis
              </p>
              <ul
                className="mt-4 ml-8 list-disc"
                style={{
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Designed a <strong>Python/FastAPI retrieval pipeline</strong>{" "}
                  that analyzes arbitrary URLs, extracts structured legal case
                  metadata, and assembles evidence from CourtListener,
                  Wikipedia, and semantic retrieval for LLM-powered case
                  overview generation.
                </li>
                <li className="mb-2">
                  Implemented a persistent <strong>RAG knowledge base</strong>{" "}
                  with PostgreSQL and pgvector, embedding chunked legal
                  documents while reducing repeat-request latency by up to{" "}
                  <strong>96%</strong> through TTL-based Redis caching.
                </li>
                <li className="mb-2">
                  Evaluated retrieval performance across news, articles, and
                  transcripts, achieving <strong>98.3% Recall@3</strong> and{" "}
                  <strong>0.931 MRR</strong> over 60 queries spanning 10 legal
                  cases.
                </li>
              </ul>
            </div>

            <div style={{ fontSize: "1rem" }}>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">Chromatica</span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React, Next.js, JavaScript, Prisma, PostgreSQL, Spotify API
              </p>
              <ul
                className="mt-4 ml-8 list-disc"
                style={{
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
                  Developed a reactive interface that generates dynamic themes
                  from extracted album artwork color palettes, creating
                  personalized visual experiences from user listening history.
                </li>
              </ul>
            </div>

            <div style={{ fontSize: "1rem" }}>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">SmartMirror</span>
              </div>
              <p
                className="italic"
                style={{ fontSize: "0.875rem", color: "var(--text4)" }}
              >
                React/React Native, Electron, Python, C++, BLE, Raspberry Pi
              </p>
              <ul
                className="mt-4 ml-8 list-disc"
                style={{
                  color: "var(--text4)",
                }}
              >
                <li className="mb-2">
                  Collaborated with a cross-functional team of{" "}
                  <strong>6 engineers</strong> to design and deploy an embedded
                  IoT smart mirror with a companion React Native mobile app for
                  managing user profiles and display settings.
                </li>
                <li className="mb-2">
                  Owned <strong>BLE integration</strong> end-to-end by
                  engineering a Python GATT peripheral with 16 custom
                  characteristics to map mobile controls to the Raspberry Pi
                  application, achieving{" "}
                  <strong>100% communication reliability</strong> across 50+
                  tests.
                </li>
              </ul>
            </div>
          </div>

          {/* SKILLS */}
          <div
            className="rounded-lg p-4 shadow-lg"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h2
              className="mb-6 border-b-1 border-[#5f5b82] pb-4 font-bold"
              style={{
                fontSize: "1.25rem",
              }}
            >
              SKILLS
            </h2>
            <ul
              className="ml-6 list-disc"
              style={{
                fontSize: "1rem",
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
                React, Next.js, FastAPI, Node.js, Express.js, PyTorch, Prisma,
                Tailwind CSS, pgvector
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
                APIs, LLM APIs
              </li>
            </ul>
          </div>

          {/* placeholder */}
        </div>
      </div>
    </>
  );
};

export default ResumeTab;
