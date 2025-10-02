"use client";

import React, { useState, useEffect } from "react";
import HomeWindow from "./components/HomeWindow";
import AboutWindow from "./components/AboutWindow";
import WorkWindow from "./components/WorkWindow";
import LinksWindow from "./components/LinksWindow";
import ContactWindow from "./components/ContactWindow";
import ResumeWindow from "./components/ResumeWindow";

import AboutTab from "./components/AboutTab";
import LinksTab from "./components/LinksTab";
import WorkTab from "./components/WorkTab";
import ContactTab from "./components/ContactTab";
import ResumeTab from "./components/ResumeTab";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // define the media query for screen size <= 768px
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    // initial check and set up listener
    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return isMobile;
};

const initialWindowsState = {
  about: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  links: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  work: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  contact: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
  resume: { isOpen: false, zIndex: 100, position: { x: 0, y: 0 } },
};

// mapping of window IDs to their corresponding React components
const windowComponents = {
  about: AboutWindow,
  links: LinksWindow,
  work: WorkWindow,
  contact: ContactWindow,
  resume: ResumeWindow,
};

// mapping of tab IDs to their component
const tabComponents = {
  about: AboutTab,
  links: LinksTab,
  work: WorkTab,
  contact: ContactTab,
  resume: ResumeTab,
};

const Page = () => {
  const [windows, setWindows] = useState(initialWindowsState);
  const [highestZIndex, setHighestZIndex] = useState(100);
  const isMobile = useIsMobile();

  // handle open window
  const handleOpen = (windowId) => {
    setWindows((prevWindows) => {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return {
        ...prevWindows,
        [windowId]: {
          ...prevWindows[windowId],
          isOpen: true,
          zIndex: newZIndex,
        },
      };
    });
  };

  // handle close window
  const handleClose = (windowId) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], isOpen: false },
    }));
  };

  // bring window to front
  const handleFocus = (windowId) => {
    setWindows((prevWindows) => {
      if (prevWindows[windowId].zIndex === highestZIndex) {
        return prevWindows;
      }
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return {
        ...prevWindows,
        [windowId]: { ...prevWindows[windowId], zIndex: newZIndex },
      };
    });
  };

  // update window position on stop (remember position)
  const handleStop = (windowId, e, ui) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], position: { x: ui.x, y: ui.y } },
    }));
  };

  return (
    <main>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="z-10">
          <HomeWindow handleOpen={handleOpen} isMobile={isMobile} />
        </div>
      </div>

      {/* dynamically render windows based on their `isOpen` state */}
      {Object.entries(windows).map(([windowId, windowState]) => {
        let ComponentToRender = null;
        let props = {};

        if (isMobile) {
          ComponentToRender = tabComponents[windowId];
          props = {
            windowId: windowId,
            isOpen: windowState.isOpen,
            handleClose: handleClose,
          };
        } else {
          if (!windowState.isOpen) return null;

          ComponentToRender = windowComponents[windowId];
          props = {
            onClose: () => handleClose(windowId),
            onFocus: () => handleFocus(windowId),
            onStop: (e, ui) => handleStop(windowId, e, ui),
            zIndex: windowState.zIndex,
            position: windowState.position,
          };
        }

        if (ComponentToRender) {
          return <ComponentToRender key={windowId} {...props} />;
        }
        return null;
      })}
    </main>
  );
};

export default Page;
