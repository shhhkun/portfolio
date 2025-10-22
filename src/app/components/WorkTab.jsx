import React from "react";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

const HandleBar = () => (
  <div
    className="w-12 h-1 rounded-full mx-auto"
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
              My expertise includes full-stack development, with a focus on
              creating robust, user-friendly software for web and apps.
            </p>
          </div>

          <div
            className="h-1 my-8 mx-[-32px]"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* Development & Tools Section */}
          <div className="skills-section">
            <div className="skills-container flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Tools Column */}
              <div className="skill-column flex-1">
                <h2
                  className="font-semibold mb-4"
                  style={{ fontSize: "1.25rem" }}
                >
                  TOOLS
                </h2>
                <div className="skill-grid flex flex-wrap gap-2">
                  <div className="skill-pill">Git</div>
                  <div className="skill-pill">GitHub</div>
                  <div className="skill-pill">Agile</div>
                  <div className="skill-pill">Scrum</div>
                  <div className="skill-pill">CI/CD</div>
                  <div className="skill-pill">Docker</div>
                  <div className="skill-pill">Visual Studio</div>
                  <div className="skill-pill">Figma</div>
                  <div className="skill-pill">Linux</div>
                  <div className="skill-pill">Windows</div>
                  <div className="skill-pill">LaTeX</div>
                </div>
              </div>
              {/* Development Column */}
              <div className="skill-column flex-1">
                <h2
                  className="font-semibold mb-4"
                  style={{ fontSize: "1.25rem" }}
                >
                  DEVELOPMENT
                </h2>
                <div className="skill-grid flex flex-wrap gap-2">
                  <div className="skill-pill">JavaScript</div>
                  <div className="skill-pill">TypeScript</div>
                  <div className="skill-pill">HTML</div>
                  <div className="skill-pill">CSS</div>
                  <div className="skill-pill">Python</div>
                  <div className="skill-pill">C/C++</div>
                  <div className="skill-pill">Verilog</div>
                  <div className="skill-pill">Next.js</div>
                  <div className="skill-pill">React</div>
                  <div className="skill-pill">Node.js</div>
                  <div className="skill-pill">Express.js</div>
                  <div className="skill-pill">Vite</div>
                  <div className="skill-pill">Electron</div>
                  <div className="skill-pill">Prisma</div>
                  <div className="skill-pill">PostgreSQL</div>
                  <div className="skill-pill">Firebase/Firestore</div>
                  <div className="skill-pill">OAuth 2.0</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="h-1 my-8 mx-[-32px]"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* Projects Section */}
          <h2
            className="section-title font-semibold mb-4"
            style={{
              fontSize: "1.25rem",
            }}
          >
            PROJECTS
          </h2>

          <div className="projects-section flex flex-col gap-8">
            {/* Project Card 10 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative overflow-hidden rounded-t-lg aspect-video">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/lofiscape.webp"
                  alt="Placeholder for project 10"
                />
              </div>

              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    LoFi Scape
                  </h3>
                  <p className="flex-grow">
                    Curate your perfect productivity environment. Mix calming
                    LoFi beats with custom ambient soundscapes, from gentle rain
                    to a lively cafe. Built with Next.js, Tailwind CSS, and the
                    Youtube Player API.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React, Next.js, Tailwind CSS, Youtube Player API, Vercel
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://lofiscape.vercel.app"
                      target="_blank"
                      className="pill-button"
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
                      Figma Prototype
                    </a>
                    <a
                      href="https://github.com/shhhkun/lofiscape"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 9 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative overflow-hidden rounded-t-lg aspect-video">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/chromatica.webp"
                  alt="Placeholder for project 9"
                />
              </div>

              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Chromatica
                  </h3>
                  <p className="flex-grow">
                    A web app that connects with the Spotify API to generate
                    unique color palettes based on your top tracks and artists.
                    It was built with a Next.js frontend, a Next.js API routes
                    backend with Prisma, and a PostgreSQL database.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React, Next.js, Tailwind CSS, Spotify API & OAuth 2.0,
                    Prisma & PostgreSQL, Vercel
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://chromatica-music.vercel.app"
                      target="_blank"
                      className="pill-button"
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
                      Figma Prototype
                    </a>
                    <a
                      href="https://github.com/shhhkun/chromatica"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 8 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative overflow-hidden rounded-t-lg aspect-video">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/ramentimer.webp"
                  alt="Placeholder for project 8"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Ramen Timer
                  </h3>
                  <p className="flex-grow">
                    A simple, mobile-first ramen timer web app with a nostalgic,
                    pixel-art aesthetic. It was built using a Next.js frontend,
                    an Express.js backend, and a PostgreSQL database to record
                    timer data for my favorite ramen brands.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React, Next.js, Tailwind CSS, Express.js, PostgreSQL,
                    Node.js, Vercel
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://ramentimer.vercel.app"
                      target="_blank"
                      className="pill-button"
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
                      Figma Prototype
                    </a>
                    <a
                      href="https://github.com/shhhkun/ramentimer"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 7 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative overflow-hidden rounded-t-lg aspect-video">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/trashu.webp"
                  alt="Placeholder for project 7"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
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
                    a playful, "panda" themed UI.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React, Vite, Node.js, Electron, TypeScript
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/shhhkun/Trashu"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 6 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative overflow-hidden rounded-t-lg aspect-video">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/kept2.webp"
                  alt="Placeholder for project 6"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Kept
                  </h3>
                  <p className="flex-grow">
                    A personalized task scheduler with a 24-hour timetable and a
                    gamified system that uses XP and badges to encourage
                    consistent productivity. It integrates with Firebase for
                    secure data persistence & Firestore for profiles.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React, Vite, Firebase/Firestore, Node.js
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://productivityapp-eb15a.web.app/"
                      target="_blank"
                      className="pill-button"
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
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center overflow-hidden
                           rounded-t-lg aspect-video group"
                style={{ backgroundColor: "#b3e6ff" }}
              >
                <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
                    color="var(--bg)"
                    weight="fill"
                    className="absolute top-0 left-0"
                  />
                </div>
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    SmartMirror
                  </h3>
                  <p className="flex-grow">
                    An IoT device that enables real-time data exchange between a
                    Raspberry Pi and a mobile app via Bluetooth Low Energy. The
                    project involved designing modular protocols and working in
                    an Agile team environment.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
                    style={{ color: "var(--text4)", fontSize: "0.875rem" }}
                  >
                    React/React Native, Node.js, Python, Raspberry Pi, BLE,
                    JavaScript
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/shhhkun/SmartMirror"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center overflow-hidden
                           rounded-t-lg aspect-video group"
                style={{ backgroundColor: "#ffb3b3" }}
              >
                <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
                    color="var(--bg)"
                    weight="fill"
                    className="absolute top-0 left-0"
                  />
                </div>
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Multi-Threaded HTTP Server
                  </h3>
                  <p className="flex-grow">
                    Developed a HTTP server that handles GET and PUT requests
                    using POSIX threads for concurrency. The project includes a
                    dedicated logging file to monitor all incoming and outgoing
                    traffic.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
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
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center overflow-hidden
                           rounded-t-lg aspect-video group"
                style={{ backgroundColor: "#fdfd96" }}
              >
                <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
                    color="var(--bg)"
                    weight="fill"
                    className="absolute top-0 left-0"
                  />
                </div>
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    Huffman Data Compressor
                  </h3>
                  <p className="flex-grow">
                    A command-line tool that efficiently compresses and
                    decompresses files using the Huffman encoding algorithm. The
                    project's core is an implementation that leverages classic
                    data structures like priority queues and binary trees.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
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
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center overflow-hidden
                           rounded-t-lg aspect-video group"
                style={{ backgroundColor: "#a8e6cf" }}
              >
                <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                  <GithubLogoIcon
                    size={56}
                    color="var(--bg)"
                    weight="fill"
                    className="absolute top-0 left-0"
                  />
                </div>
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    RSA Public Key Cryptography
                  </h3>
                  <p className="flex-grow">
                    Built a command-line tool that implements the RSA public key
                    cryptography algorithm from the ground up. The program
                    securely encrypts and decrypts messages by generating public
                    and private keys.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
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
                      GitHub Repo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 1 */}
            <div
              className="project-card rounded-lg flex flex-col"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div className="project-image-container relative overflow-hidden rounded-t-lg aspect-video">
                <img
                  className="project-image w-full object-cover transition-transform duration-300 hover:scale-110"
                  src="/dollhouse.webp"
                  alt="Placeholder for project 1"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.25rem",
                    }}
                  >
                    DollHouse
                  </h3>
                  <p className="flex-grow">
                    A simple 2D game built in Construct 3 to explore core game
                    design principles. As a key member of a small team, I
                    implemented all of the event-based logic, as well as
                    contributed to level design and asset creation. Due to
                    engine export limitations, a live demo of the game is not
                    available.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium mb-2"
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
                      GitHub Repo
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
