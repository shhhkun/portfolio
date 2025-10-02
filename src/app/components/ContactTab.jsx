import React, { useState } from "react";
import { useAudioPlayer } from "./AudioPlayer";

const ContactTab = ({ isOpen, windowId, handleClose }) => {
  const { playAudio1, playAudio2 } = useAudioPlayer();
  const [toastMessage, setToastMessage] = useState("");
  const emailAddress = "serjobarron@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setToastMessage("copied!");
    } catch (err) {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = emailAddress;
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setToastMessage("copied!");
    } finally {
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
    }
  };

  const handleEmailButtonClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

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
        className={`fixed bottom-0 left-0 w-full max-h-[80vh] z-50 
                   flex flex-col transition-transform duration-500 ease-in-out ${transformClass} overflow-hidden`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex justify-between relative rounded-t-lg px-6 py-2 flex-shrink-0 "
          style={{
            fontSize: "1.25rem",
            backgroundColor: "var(--card-header)",
            border: "2px solid ",
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
            className="cursor-pointer font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="justify-center items-center flex flex-col p-8"
          style={{ backgroundColor: "var(--card-bg)", fontSize: "1rem" }}
        >
          <h2 className="font-bold mb-4" style={{ fontSize: "1.25rem" }}>
            You've got mail!
          </h2>

          <p>
            Feel free to reach out if you have a question, a project idea, or
            just want to say hi. I'm always happy to chat.
          </p>

          <p
            className="relative cursor-pointer mt-4"
            onClick={() => {
              handleCopyEmail();
              playAudio1(0.2);
            }}
          >
            reach out at:{" "}
            <span
              style={{ color: "var(--text3)", textDecoration: "underline" }}
            >
              {emailAddress}
            </span>
            {toastMessage && (
              <span
                className="absolute bg-black bg-opacity-75 rounded-md px-2 py-1 -bottom-8 left-1/2 transform -translate-x-1/2"
                style={{ color: "#ffffff", fontSize: "0.75rem" }}
              >
                {toastMessage}
              </span>
            )}
          </p>

          {/* Email Me Button */}
          <button
            onClick={() => {
              handleEmailButtonClick();
              playAudio1(0.2);
            }}
            className="contact-button cursor-pointer mt-10 px-4 py-2 rounded-md"
          >
            send me an email!
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactTab;
