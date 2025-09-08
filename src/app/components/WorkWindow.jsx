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
        const headerHeight = 56; // adjust later

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
          height: "560px",
          borderRadius: "10px",
          border: "2px solid ",
          boxSizing: "border-box",
          position: "absolute",
        }}
        onMouseDown={onFocus}
      >
        {/* Window Header */}
        <div
          className="handle cursor-grab flex items-center justify-between text-white px-4 py-2 font-light"
          style={{
            fontSize: "1.25rem",
            backgroundColor: "#171717",
            height: "56px",
            borderBottom: "2px solid white",
            display: "flex",
            alignItems: "center",
            paddingLeft: "1.5rem",
          }}
        >
          <p className="font-bold">work</p>
          <button
            onClick={onClose}
            className="text-white bg-transparent border-none p-1 leading-none text-xl font-bold rounded-full hover:bg-purple-700 transition-colors"
          >
            &times;
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="custom-scrollbar p-12 flex-grow min-h-0 overflow-y-auto"
          style={{ backgroundColor: "#132135" }}
        >
          {/* Intro Card */}
          <div
            className="intro-card rounded-lg p-4 text-center"
            style={{ backgroundColor: "#384158" }}
          >
            <h3 className="font-bold" style={{ fontSize: "1.25rem" }}>
              Replace
            </h3>
            <p className="mt-2" style={{ fontSize: "1.125rem" }}>
              Replace
            </p>
          </div>

          <div
            className="h-1 my-8"
            style={{ backgroundColor: "#233d61ff", height: "1px" }}
          ></div>

          {/* Development & Tools Section */}
          <div className="skills-section">
            <div className="skills-container flex flex-col md:flex-row gap-6 md:gap-12">
              {/* Tools Column */}
              <div className="skill-column flex-1">
                <h2 className="text-lg font-semibold mb-4">TOOLS</h2>
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
                <h2 className="text-lg font-semibold mb-4">DEVELOPMENT</h2>
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
            style={{ backgroundColor: "#233d61ff", height: "1px" }}
          ></div>

          {/* Projects Section */}
          <h2 className="section-title text-2xl font-semibold mb-4 text-gray-200">
            Project Work
          </h2>
          <div className="projects-section flex flex-col gap-8">
            {/* Project Card 1 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col md:flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ height: "250px", backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container w-full md:w-1/2 md:h-auto overflow-hidden relative"
                style={{ backgroundColor: "#30363d" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+1"
                  alt="Placeholder for project 1"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Project Name 1</h4>
                  <p className="text-sm leading-relaxed flex-grow">
                    Description
                  </p>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#384158] rounded-full font-semibold text-white transition-colors duration-200"
                  >
                    GitHub Repo
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#384158] rounded-full font-semibold text-white transition-colors duration-200"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Project Card 1 */}
            <div
              className="project-card rounded-lg overflow-hidden flex flex-col md:flex-row animate-[slideIn_0.6s_ease-out]"
              style={{ height: "250px", backgroundColor: "#161b22" }}
            >
              <div
                className="project-image-container w-full md:w-1/2 md:h-auto overflow-hidden relative"
                style={{ backgroundColor: "#30363d" }}
              >
                <img
                  className="project-image w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                  src="https://placehold.co/400x250/2f363d/f0f6fc?text=Project+1"
                  alt="Placeholder for project 1"
                />
              </div>
              <div className="project-details p-6 flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Project Name 1</h4>
                  <p className="text-sm leading-relaxed flex-grow">
                    Description
                  </p>
                </div>
                <div className="mt-4 flex gap-3">
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#384158] rounded-full font-semibold text-white transition-colors duration-200"
                  >
                    GitHub Repo
                  </a>
                  <a
                    href="#"
                    className="px-4 py-2 bg-[#384158] rounded-full font-semibold text-white transition-colors duration-200"
                  >
                    Live Demo
                  </a>
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
