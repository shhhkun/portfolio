"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { useAudioPlayer } from "./AudioPlayer";

const WorkWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
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
          width: "1056px",
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
            work
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
          className="custom-scrollbar p-12 flex-grow min-h-0 overflow-y-auto"
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
              My expertise includes full-stack development, with a focus on
              creating robust, user-friendly software for web and apps.
            </p>
          </div>

          <div
            className="h-1 my-8"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* Development & Tools Section */}
          <div className="skills-section">
            <div className="skills-container flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Tools Column */}
              <div className="skill-column flex-1">
                <h2
                  className="font-semibold mb-4"
                  style={{ fontSize: "1.5rem" }}
                >
                  TOOLS
                </h2>
                <div className="skill-grid flex flex-wrap gap-2">
                  <div className="skill-pill">Git</div>
                  <div className="skill-pill">GitHub</div>
                  <div className="skill-pill">Agile</div>
                  <div className="skill-pill">Scrum</div>
                  <div className="skill-pill">CI/CD</div>
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
                  style={{ fontSize: "1.5rem" }}
                >
                  DEVELOPMENT
                </h2>
                <div className="skill-grid flex flex-wrap gap-2">
                  <div className="skill-pill">JavaScript</div>
                  <div className="skill-pill">TypeScript</div>
                  <div className="skill-pill">Next.js</div>
                  <div className="skill-pill">React</div>
                  <div className="skill-pill">Node.js</div>
                  <div className="skill-pill">Express.js</div>
                  <div className="skill-pill">PostgreSQL</div>
                  <div className="skill-pill">Python</div>
                  <div className="skill-pill">C/C++</div>
                  <div className="skill-pill">HTML</div>
                  <div className="skill-pill">CSS</div>
                  <div className="skill-pill">Vite</div>
                  <div className="skill-pill">Firebase</div>
                  <div className="skill-pill">Electron</div>
                  <div className="skill-pill">Verilog</div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="h-1 my-8"
            style={{ backgroundColor: "var(--border2)", height: "1px" }}
          ></div>

          {/* Projects Section */}
          <h2
            className="section-title font-semibold mb-4"
            style={{
              fontSize: "1.5rem",
            }}
          >
            PROJECTS
          </h2>

          <div className="projects-section flex flex-col gap-8">
            {/* Project Card 0 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "transparent", width: "420px" }}
              >
                <img
                  className="project-image w-full h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                  src="/ramentimer.webp"
                  alt="Placeholder for project 0"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.375rem",
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
                    Next.js, React, Node.js, Express.js, PostgreSQL, Vercel,
                    Tailwind CSS
                  </p>
                  <div className="flex gap-3">
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

            {/* Project Card 1 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "transparent", width: "420px" }}
              >
                <img
                  className="project-image w-full h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                  src="/trashu2.webp"
                  alt="Placeholder for project 1"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="font-semibold mb-2"
                    style={{
                      fontSize: "1.375rem",
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
                    Electron, React, Node.js, Vite, TypeScript
                  </p>
                  <div className="flex gap-3">
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

            {/* Project Card 2 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "transparent", width: "420px" }}
              >
                <img
                  className="project-image w-full h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                  src="/kept2.webp"
                  alt="Placeholder for project 2"
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
                    React, Node.js, Vite, Firebase/Firestore
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/shhhkun/Kept"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      GitHub Repo
                    </a>
                    <a
                      href="https://productivityapp-eb15a.web.app/"
                      target="_blank"
                      className="pill-button"
                      onClick={() => playAudio1(0.2)}
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "#b3e6ff", width: "420px" }}
              >
                <div className="relative w-16 h-16">
                  <GithubLogoIcon
                    size={64}
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
                    Python, React/React Native, Node.js, JavaScript, BLE,
                    Raspberry Pi
                  </p>
                  <div className="flex gap-3">
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
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "#ffb3b3", width: "420px" }}
              >
                <div className="relative w-16 h-16">
                  <GithubLogoIcon
                    size={64}
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
                  <div className="flex gap-3">
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

            {/* Project Card 5 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "#fdfd96", width: "420px" }}
              >
                <div className="relative w-16 h-16">
                  <GithubLogoIcon
                    size={64}
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
                  <div className="flex gap-3">
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

            {/* Project Card 6 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative flex items-center justify-center h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "#a8e6cf", width: "420px" }}
              >
                <div className="relative w-16 h-16">
                  <GithubLogoIcon
                    size={64}
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
                  <div className="flex gap-3">
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

            {/* Project Card 7 */}
            <div
              className="project-card rounded-lg flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "var(--card-bg3)" }}
            >
              <div
                className="project-image-container relative rounded-tl-lg rounded-bl-lg"
                style={{ backgroundColor: "transparent", width: "420px" }}
              >
                <img
                  className="project-image w-full h-64 object-cover transition-transform duration-300 hover:scale-110 hover:rounded-lg rounded-tl-lg rounded-bl-lg"
                  src="/dollhouse.webp"
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
                  <div className="flex gap-3">
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
    </Draggable>
  );
};

export default WorkWindow;
