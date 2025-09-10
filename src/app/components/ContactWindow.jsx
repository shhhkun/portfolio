"use client";

import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";

const ContactWindow = ({ onClose, onFocus, onStop, zIndex, position }) => {
  const nodeRef = useRef(null);
  const [bounds, setBounds] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });
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
          width: "584px",
          height: "400px",
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
          <p className="font-bold">contact</p>
          <button
            onClick={onClose}
            className="font-bold transition-transform hover:scale-110"
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="justify-center items-center flex flex-col flex-grow min-h-0 p-12"
          style={{ backgroundColor: "#132135" }}
        >
          <h2 className="font-bold mb-4" style={{ fontSize: "1.5rem" }}>
            You've got mail!
          </h2>

          <p style={{ fontSize: "1.25rem" }}>
            Feel free to reach out if you have a question, a project idea, or
            just want to say hi. I'm always happy to chat.
          </p>

          <p
            className="relative cursor-pointer mt-4"
            style={{ fontSize: "1.25rem" }}
            onClick={handleCopyEmail}
          >
            reach out at:{" "}
            <span style={{ color: "#C0FAFF", textDecoration: "underline" }}>
              {emailAddress}
            </span>
            {toastMessage && (
              <span
                className="absolute bg-black bg-opacity-75 rounded-md px-2 py-1 -bottom-8 left-1/2 transform -translate-x-1/2"
                style={{ fontSize: "0.75rem" }}
              >
                {toastMessage}
              </span>
            )}
          </p>

          {/* Email Me Button */}
          <button
            onClick={handleEmailButtonClick}
            className="contact-button mt-8 px-4 py-2 rounded-md"
            style={{ fontSize: "1.25rem" }}
          >
            send me an email!
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default ContactWindow;
