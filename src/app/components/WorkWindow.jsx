"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const WorkWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
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
        const headerHeight = 56;

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
          width: "1000px",
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
            backgroundColor: "#171717",
            height: "56px",
            borderBottom: "2px solid white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p className="font-bold">work</p>
          <button
            onClick={onClose}
            className="font-bold transition-transform hover:scale-110"
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="custom-scrollbar p-12 flex-grow min-h-0 overflow-y-auto"
          style={{ backgroundColor: "#132135" }}
        >
          {/* Intro Card */}
          <div
            className="intro-card rounded-lg p-8"
            style={{ backgroundColor: "#273b54" }}
          >
            <h3 className="font-bold" style={{ fontSize: "1.25rem" }}>
              Open for opportunities. Connect with me at{" "}
              <a
                href="mailto:serjobarron@gmail.com"
                className="underline"
                style={{ color: "#C0FAFF" }}
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
            style={{ backgroundColor: "#5f5b82", height: "1px" }}
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
            style={{ backgroundColor: "#5f5b82", height: "1px" }}
          ></div>

          {/* Projects Section */}
          <h2
            className="section-title font-semibold mb-4 text-gray-200"
            style={{
              fontSize: "1.5rem",
            }}
          >
            PROJECTS
          </h2>

          <div className="projects-section flex flex-col gap-8">
            {/* Project Card 1 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+1"
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
                    Trashu
                  </h3>
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    A desktop storage manager app built with Electron and React
                    to intelligently manage and optimize local storage. It uses
                    smart cleanup metrics to provide recommendations, all within
                    a playful, "panda" themed UI.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Electron, React, Node.js, Vite, TypeScript
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 2 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+2"
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
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    A personalized task scheduler with a 24-hour timetable and a
                    gamified system that uses XP and badges to encourage
                    consistent productivity. It integrates with Firebase for
                    secure data persistence & Firestore for profiles.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    React, Node.js, Vite, Firebase/Firestore
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 3 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+3"
                  alt="Placeholder for project 3"
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
                    SmartMirror
                  </h3>
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    An IoT device that enables real-time data exchange between a
                    Raspberry Pi and a mobile app via Bluetooth Low Energy. The
                    project involved designing modular protocols and working in
                    an Agile team environment.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Python, React/React Native, Node.js, JavaScript, BLE,
                    Raspberry Pi
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 4 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+4"
                  alt="Placeholder for project 4"
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
                    Multi-Threaded HTTP Server
                  </h3>
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    Implemented a high-performance HTTP server from scratch,
                    demonstrating a fundamental understanding of network
                    protocols, concurrency, and low-level memory management. A
                    core systems project.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    C
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 5 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+5"
                  alt="Placeholder for project 5"
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
                    Huffman Data Compressor
                  </h3>
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    Developed a complete Huffman encoding and decoding tool to
                    efficiently compress and decompress files. This project
                    highlights a strong grasp of data structures and algorithm
                    design.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    C
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 6 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+6"
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
                    RSA Public Key Cryptography
                  </h3>
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    Built a command-line tool that implements the RSA algorithm
                    from scratch. This project demonstrates a core understanding
                    of public key cryptography and security principles.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    C
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Card 7 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container overflow-hidden relative aspect-square"
                style={{ backgroundColor: "#30363d", width: "320px" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+7"
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
                  <p
                    className="flex-grow"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    A simple 2D game built in Construct 3 created to explore the
                    principles of game design and logic using a game development
                    engine. A fun project to showcase creativity and
                    problem-solving.
                  </p>
                </div>
                <div className="mt-4">
                  <p
                    className="font-medium text-gray-500 mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    Construct 3
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="pill-button">
                      GitHub Repo
                    </a>
                    <a href="#" className="pill-button">
                      Live Demo
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
