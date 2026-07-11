import React, { useState, useRef, useEffect } from "react";
import { useAudioPlayer } from "./AudioPlayer";

const HandleBar = () => (
  <div
    className="mx-auto h-1 w-12 rounded-full"
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
      { threshold: 0.5 },
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
          className="custom-scrollbar-thin flex flex-1 flex-col overflow-y-auto"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          {/* Profile Picture and Name */}
          <div className="flex flex-shrink-0 flex-col items-center px-12 py-8">
            <div className="max-h-34 max-w-34 transform cursor-pointer overflow-hidden rounded-full transition-transform duration-300 hover:scale-110">
              <img
                src="/pfp.webp"
                alt="Serjo Barron Profile"
                className="h-full w-full object-cover"
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
              Software Engineer, Full-Stack Developer, UI/UX Enthusiast
              <br />
              Former Software Engineer Intern at{" "}
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
            className="h-[1px] w-full flex-shrink-0"
            style={{ backgroundColor: "var(--border2)" }}
          ></div>

          <div
            className="custom-scrollbar flex-grow p-8 text-white"
            style={{ color: "var(--text)" }}
          >
            <div style={{ fontSize: "1rem" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Hi there!</strong> I’m Serjo.
              </p>

              <p style={{ marginBottom: "0.5rem" }}>
                I’m a Software Engineer and Full-Stack Developer dedicated to
                building digital experiences that are as reliable under the hood
                as they are intuitive to the user.
              </p>

              <p style={{ marginBottom: "0.5rem" }}>
                My path into engineering wasn't a straight line; it was driven
                by a lifelong knack for building things. While pursuing my
                Computer Engineering degree at UC Santa Cruz, I navigated
                low-level systems, hardware architecture, and physics. I found
                the hardware world fascinating, but realized the
                research-focused nature of embedded systems wasn't where I
                wanted to leave my mark. Instead, I discovered a passion for
                modern software development—specifically the fast-paced,
                collaborative cycle of building, testing, and refining
                applications. Today, I thrive on finding elegant code solutions,
                cross-functional collaboration, and continuously improving a
                product.
              </p>

              <p style={{ marginBottom: "0.5rem" }}>I specialize in...</p>

              <ul className="mt-5 ml-5 list-disc">
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
            </div>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.25rem" }}
            >
              EDUCATION
            </h2>
            <blockquote
              className="mt-5 p-3"
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
            <ul className="mt-5 ml-5 list-disc">
              <li>Digital Art, Anime & Comics</li>
              <li>Physical Fitness & Training</li>
              <li>Playing Violin</li>
              <li>Gaming (Sandbox & Online)</li>
            </ul>

            <h2
              className="mt-5 font-bold"
              style={{ color: "var(--text)", fontSize: "1.25rem" }}
            >
              LANGUAGE PROFICIENCY
            </h2>
            <div
              className="mt-5 flex flex-col gap-y-4"
              ref={barRef}
              style={{ color: "var(--text2)" }}
            >
              {/* English */}
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-4">
                  <span className="w-24">English</span>
                  <div
                    className="relative h-4 flex-grow overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className={`bar-english absolute left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? "scale-y-125" : ""
                      } origin-left transform`}
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
                    className="relative h-4 flex-grow overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className={`bar-tagalog absolute left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? "scale-y-125" : ""
                      } origin-left transform`}
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
                    className="relative h-4 flex-grow overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--bar-bg)" }}
                  >
                    <div
                      className={`bar-japanese absolute left-0 h-full rounded-full transition-all duration-1000 ease-out ${
                        isVisible ? "scale-y-125" : ""
                      } origin-left transform`}
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
