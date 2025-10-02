import React from "react";

const BottomUpModal = ({ isOpen, windowId, handleClose }) => {
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
        onClick={closeModal}
        aria-hidden={!isOpen}
      />

      {/* Modal Container (Fixed at the bottom, full width) */}
      <div
        className={`fixed bottom-0 left-0 w-full max-h-[90vh] bg-gray-800 text-white z-50 
                   flex flex-col transition-transform duration-500 ease-out ${transformClass} overflow-hidden`}
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
            onClick={closeModal}
            className="font-bold transition-transform hover:scale-110"
            style={{ color: "var(--text-header)" }}
          >
            x
          </button>
        </div>

        {/* Main Content Area */}
        <div
          className="flex flex-col flex-1 overflow-y-auto"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
        </div>
      </div>
    </>
  );
};

export default BottomUpModal;
