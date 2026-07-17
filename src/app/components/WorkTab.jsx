import React from "react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import GitHubLogo from "../utils/GitHubLogo";
import FigmaLogo from "../utils/FigmaLogo";
import { useAudioPlayer } from "./AudioPlayer";

const HandleBar = () => (
  <div
    className="mx-auto h-1 w-12 rounded-full"
    style={{ backgroundColor: "var(--text-header)" }}
  />
);

const WorkTab = ({ isOpen, windowId, handleClose }) => {
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
            projects
          </p>
          <button
            onClick={() => {
              closeModal();
              playAudio2(0.1);
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
          {/* Intro Card */}
          <div
            className="intro-card rounded-lg p-8"
            style={{ backgroundColor: "var(--card-bg2)" }}
          >
            <h3 className="font-bold" style={{ fontSize: "1.125rem" }}>
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
            <p className="mt-2" style={{ fontSize: "1rem" }}>
              My expertise lies in Full-Stack Development, where I apply
              Software Engineering principles to create efficient and
              user-friendly applications.
            </p>
          </div>

          <div
            className="mx-[-32px] my-8 h-1"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* Development & Tools Section */}
          <div className="skills-section">
            <div className="skills-container flex flex-col gap-6 md:flex-row md:gap-12">
              {/* Tools Column */}
              <div className="skill-column flex-1">
                <h2
                  className="mb-4 font-semibold"
                  style={{ fontSize: "1.25rem" }}
                >
                  TOOLS
                </h2>
                <div className="skill-grid flex flex-wrap gap-2">
                  <div className="skill-pill">Git</div>
                  <div className="skill-pill">GitHub</div>
                  <div className="skill-pill">Docker</div>
                  <div className="skill-pill">Vercel</div>
                  <div className="skill-pill">Linux</div>
                  <div className="skill-pill">Windows</div>
                  <div className="skill-pill">Figma</div>
                  <div className="skill-pill">LaTeX</div>
                </div>
              </div>
              {/* Development Column */}
              <div className="skill-column flex-1">
                <h2
                  className="mb-4 font-semibold"
                  style={{ fontSize: "1.25rem" }}
                >
                  DEVELOPMENT
                </h2>
                <div className="skill-grid flex flex-wrap gap-2">
                  {/* Languages */}
                  <div className="skill-pill">JavaScript</div>
                  <div className="skill-pill">TypeScript</div>
                  <div className="skill-pill">Python</div>
                  <div className="skill-pill">C/C++</div>
                  <div className="skill-pill">HTML/CSS</div>

                  {/* Frontend */}
                  <div className="skill-pill">React</div>
                  <div className="skill-pill">Next.js</div>
                  <div className="skill-pill">Tailwind CSS</div>
                  <div className="skill-pill">Vite</div>

                  {/* Backend */}
                  <div className="skill-pill">Node.js</div>
                  <div className="skill-pill">Express.js</div>
                  <div className="skill-pill">REST APIs</div>
                  <div className="skill-pill">OAuth</div>
                  <div className="skill-pill">LLM APIs</div>

                  {/* Databases */}
                  <div className="skill-pill">PostgreSQL</div>
                  <div className="skill-pill">Prisma</div>
                  <div className="skill-pill">SQL</div>
                  <div className="skill-pill">Firebase/Firestore</div>

                  {/* Desktop */}
                  <div className="skill-pill">Electron</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="mx-[-32px] my-8 h-1"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* Projects Section */}
          <h2
            className="section-title mb-4 font-semibold"
            style={{
              fontSize: "1.25rem",
            }}
          >
            PROJECTS
          </h2>

          <div className="projects-section flex flex-col gap-8">
            {/* Project Card 11 */}
            <div
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/casefile.webp"
                  alt="Placeholder for project 11"
                />
              </div>

              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    LoFi Scape
                  </h3>
                  <p className="flex-grow">
                    Analyze legal content from online sources by extracting{" "}
                    <strong>case metadata</strong>, retrieving relevant records
                    from <strong>legal databases</strong>, and generating{" "}
                    <strong>structured case overviews</strong> through an
                    AI-powered pipeline.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-2 font-medium"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React, Next.js, Node.js, TypeScript, Groq API, CourtListener
                    API, Wikipedia API
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://casefile-demo.vercel.app"
                      target="_blank"
                      className="pill-button pill-button--accent"
                      onClick={() => playAudio1(0.2)}
                    >
                      Live Demo
                    </a>
                    <a
                      href="https://www.figma.com/design/QbmcxNeZD4xR2BIVhmKK68/CaseFile?node-id=0-1&t=lWEb4JSG6KLiGcSp-1"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      <FigmaLogo />
                      Figma
                    </a>
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/lofiscape.webp"
                  alt="Placeholder for project 10"
                />
              </div>

              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    LoFi Scape
                  </h3>
                  <p className="flex-grow">
                    Curate your perfect productivity environment. Mix calming
                    LoFi beats with custom ambient soundscapes, from gentle rain
                    to a lively cafe. Built with Next.js, Tailwind CSS, and the{" "}
                    <strong>Youtube Player API</strong>.
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/chromatica.webp"
                  alt="Placeholder for project 9"
                />
              </div>

              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Chromatica
                  </h3>
                  <p className="flex-grow">
                    A web app that connects to the <strong>Spotify API</strong>{" "}
                    to generate dynamic color palettes based on your top tracks
                    and artists, extracting dominant colors from album art to
                    drive a fully reactive UI.
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/ramentimer.webp"
                  alt="Placeholder for project 8"
                />
              </div>
              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Ramen Timer
                  </h3>
                  <p className="flex-grow">
                    A mobile-first ramen timer with a nostalgic{" "}
                    <strong>pixel-art</strong> aesthetic, built full-stack with
                    a Next.js frontend, Express.js backend, and PostgreSQL
                    database.
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/trashu.webp"
                  alt="Placeholder for project 7"
                />
              </div>
              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Trashu
                  </h3>
                  <p className="flex-grow">
                    A desktop storage manager app built with Electron and React
                    to intelligently manage and optimize local storage. It uses
                    smart cleanup metrics to provide recommendations, all within
                    a playful, <strong>panda themed UI</strong>.
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/kept2.webp"
                  alt="Placeholder for project 6"
                />
              </div>
              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Kept
                  </h3>
                  <p className="flex-grow">
                    A personalized task scheduler with a 24-hour timetable and a
                    gamified system that uses <strong>XP and badges</strong> to
                    encourage consistent productivity. It integrates with
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
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/smartmirror.webp"
                  alt="Placeholder for project 5"
                />
              </div>
              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container group relative flex aspect-video items-center justify-center overflow-hidden rounded-t-lg"
                style={{ backgroundColor: "#ffb3b3" }}
              >
                <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
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
                      fontSize: "1.25rem",
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container group relative flex aspect-video items-center justify-center overflow-hidden rounded-t-lg"
                style={{ backgroundColor: "#b3e6ff" }}
              >
                <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
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
                      fontSize: "1.25rem",
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container group relative flex aspect-video items-center justify-center overflow-hidden rounded-t-lg"
                style={{ backgroundColor: "#a8e6cf" }}
              >
                <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
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
                      fontSize: "1.25rem",
                    }}
                  >
                    RSA Public Key Cryptography
                  </h3>
                  <p className="flex-grow">
                    Built a command-line tool that implements the{" "}
                    <strong>RSA</strong> public key cryptography algorithm from
                    the ground up. The program securely encrypts and decrypts
                    messages by generating public and private keys.
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
              className="project-card flex flex-col rounded-lg"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/dollhouse.webp"
                  alt="Placeholder for project 1"
                />
              </div>
              <div className="project-details flex w-full flex-col justify-between p-6">
                <div>
                  <h3
                    className="mb-2 font-semibold"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    DollHouse
                  </h3>
                  <p className="flex-grow">
                    A 2D game built in Construct 3 to explore core game design
                    principles. As a key member of a small team, I implemented
                    all of the event-based logic, as well as contributed to
                    level design and asset creation. Due to engine export
                    limitations, a live demo of the game is not available.
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
      </div>
    </>
  );
};

export default WorkTab;
