import React, { useState, useRef, useEffect } from "react";
import { useAudioPlayer } from "./AudioPlayer";

const HandleBar = () => (
  <div
    className="w-12 h-1 rounded-full mx-auto"
    style={{ backgroundColor: "var(--text-header)" }}
  />
);

const AboutTab = ({ isOpen, windowId, handleClose }) => {
  const { playAudio1, playAudio2 } = useAudioPlayer();
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);

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

  useEffect(() => {
    if (!barRef.current) return; // prevent run before mount

    // observer config
    const observer = new IntersectionObserver(
      ([entry]) => {
        // if the element is visible (intersecting viewport)
        if (entry.isIntersecting) {
          setIsVisible(true);
          // stop observing once it has appeared
          observer.unobserve(entry.target);
        }
      },
      // trigger when 50% of the element is visible
      { threshold: 0.5 }
    );

    observer.observe(barRef.current);

    // cleanup on unmount
    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

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
          className="custom-scrollbar-thin flex flex-col flex-1 overflow-y-auto"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Profile Picture and Name */}
          <div className="flex flex-col items-center px-12 py-8 flex-shrink-0">
            <div className="max-w-34 max-h-34 rounded-full overflow-hidden cursor-pointer transition-transform duration-300 transform hover:scale-110">
              <img
                src="/pfp.webp"
                alt="Serjo Barron Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2
              className="font-medium"
              style={{
                color: "var(--text3)",
                fontSize: "2.75rem",
              }}
            >
              Serjo Barron
            </h2>
            <h3
              className="text-center"
              style={{ color: "var(--text)", fontSize: "1rem" }}
            >
              Full-Stack Developer, UI/UX Enthusiast
              <br />
              Current Software Engineer Intern at{" "}
              <a
                href="https://www.botstacks.ai/"
                target="_blank"
                className="underline"
                style={{ color: "var(--text3)" }}
                onClick={() => playAudio1(0.2)}
              >
                BotStacks
              </a>
            </h3>
          </div>

          <div
            className="w-full flex-shrink-0 h-[1px]"
            style={{ backgroundColor: "var(--border2)" }}
          ></div>

          <div
            className="custom-scrollbar p-8 text-white flex-grow"
            style={{ color: "var(--text)" }}
          >
            <div style={{ fontSize: "1rem" }}>
              <p>
                Hi there! I'm Serjo, a full-stack developer who leverages a
                Computer Engineering background to build robust, efficient, and
                creatively designed applications. I focus on...
              </p>
              <ul className="list-disc mt-5 ml-5">
                <li>
                  <span style={{ color: "var(--text3)" }}>
                    <b>Full-Stack Development: </b>
                  </span>
                  Bringing innovative ideas to life from the backend to the user
                  interface.
                </li>
                <li>
                  <span style={{ color: "var(--text3)" }}>
                    <b>User Experience: </b>
                  </span>
                  Designing and building intuitive applications that are a
                  pleasure to use.
                </li>
                <li>
                  <span style={{ color: "var(--text3)" }}>
                    <b>Problem-Solving: </b>
                  </span>
                  Translating complex concepts into elegant and user-friendly
                  solutions.
                </li>
              </ul>
              <p className="mt-5">
                If you're interested in collaborating or just want to chat about
                development, feel free to reach out to me at{" "}
                <a
                  href="mailto:serjobarron@gmail.com"
                  className="underline"
                  style={{ color: "var(--text3)" }}
                  onClick={() => playAudio1(0.2)}
                >
                  serjobarron@gmail.com
                </a>
                !
              </p>
            </div>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.25rem" }}
            >
              EDUCATION
            </h2>
            <blockquote
              className="p-3 mt-5"
              style={{
                borderLeft: "6px solid var(--border2)",
              }}
            >
              <h3>B.S. in Computer Engineering</h3>
              <p>
                University of California, Santa Cruz &mdash; 2024, Highest
                Honors
              </p>
            </blockquote>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.25rem" }}
            >
              HOBBIES
            </h2>
            <ul className="list-disc mt-5 ml-5">
              <li>Dabbling in Digital Art & Animation</li>
              <li>Physical Fitness & Training</li>
              <li>Music (violin; genres like K-Hip-Hop and orchestral)</li>
              <li>Anime & Manga</li>
            </ul>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.25rem" }}
            >
              LANGUAGE PROFICIENCY
            </h2>
            <div
              className="flex flex-col mt-5 gap-y-4"
              ref={barRef}
              style={{ color: "var(--text2)" }}
            >
              {/* English */}
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">English</span>
                  <div
                    className="flex-grow rounded-full h-4 relative overflow-hidden"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className={`bar-english h-full absolute left-0 rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? "scale-y-125" : ""
                      } transform origin-left`}
                      style={{
                        width: isVisible ? "100%" : "0%",
                        backgroundColor: "#a8e6cf",
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-right" style={{ fontSize: "0.75rem" }}>
                  Proficient
                </span>
              </div>

              {/* Tagalog */}
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">Tagalog</span>
                  <div
                    className="flex-grow rounded-full h-4 relative overflow-hidden"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className={`bar-tagalog h-full absolute left-0 rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? "scale-y-125" : ""
                      } transform origin-left`}
                      style={{
                        width: isVisible ? "50%" : "0%",
                        backgroundColor: "#fdfd96",
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-right" style={{ fontSize: "0.75rem" }}>
                  Elementary
                </span>
              </div>

              {/* Japanese */}
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">Japanese</span>
                  <div
                    className="flex-grow rounded-full h-4 relative overflow-hidden"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className={`bar-japanese h-full absolute left-0 rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? "scale-y-125" : ""
                      } transform origin-left`}
                      style={{
                        width: isVisible ? "20%" : "0%",
                        backgroundColor: "#ffb3b3",
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-right" style={{ fontSize: "0.75rem" }}>
                  Beginner
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutTab;
