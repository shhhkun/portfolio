"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import HomeWindow from "./components/HomeWindow";
import AboutWindow from "./components/AboutWindow";
import WorkWindow from "./components/WorkWindow";
import ResumeWindow from "./components/ResumeWindow";

import AboutTab from "./components/mobile/AboutTab";
import WorkTab from "./components/mobile/WorkTab";
import ResumeTab from "./components/mobile/ResumeTab";

import Taskbar from "./components/Taskbar";
import { useTheme } from "./components/ThemeContext";

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
  about: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    position: { x: 0, y: 0 },
  },
  work: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    position: { x: 0, y: 0 },
  },
  resume: {
    isOpen: false,
    isMinimized: false,
    zIndex: 100,
    position: { x: 0, y: 0 },
  },
};

// mapping of window IDs to their corresponding React components
const windowComponents = {
  about: AboutWindow,
  work: WorkWindow,
  resume: ResumeWindow,
};

// mapping of tab IDs to their component
const tabComponents = {
  about: AboutTab,
  work: WorkTab,
  resume: ResumeTab,
};

// Cascade offsets applied to freshly opened windows so they don't stack at 0,0
const CASCADE_OFFSET = 36;
const CASCADE_MAX_OFFSET = 180;

const Page = () => {
  const [windows, setWindows] = useState(initialWindowsState);
  const [highestZIndex, setHighestZIndex] = useState(100);
  const [openCount, setOpenCount] = useState(0);
  const isMobile = useIsMobile();
  const { theme } = useTheme();

  // compute a cascade position for a freshly opened window
  const getCascadePosition = () => {
    const offset = Math.min(openCount * CASCADE_OFFSET, CASCADE_MAX_OFFSET);
    return { x: offset, y: offset };
  };

  // handle open window
  const handleOpen = (windowId) => {
    setWindows((prevWindows) => {
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);

      // only cascade the first time a window state transitions from closed -> opened
      const willOpenFresh = !prevWindows[windowId].isOpen;

      let newState = {
        ...prevWindows,
        [windowId]: {
          ...prevWindows[windowId],
          isOpen: true,
          isMinimized: false,
          zIndex: newZIndex,
        },
      };

      if (willOpenFresh) {
        setOpenCount((count) => count + 1);
        newState = {
          ...newState,
          [windowId]: {
            ...newState[windowId],
            position: getCascadePosition(),
          },
        };
      }

      return newState;
    });
  };

  // handle close window
  const handleClose = (windowId) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: {
        ...prevWindows[windowId],
        isOpen: false,
        isMinimized: false,
      },
    }));
  };

  // minimize a window (visible in taskbar, hidden from desktop)
  const handleMinimize = (windowId) => {
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: { ...prevWindows[windowId], isMinimized: true },
    }));
  };

  // restore a minimized window from the taskbar: un-minimize AND bring to front
  const handleRestore = (windowId) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    setWindows((prevWindows) => ({
      ...prevWindows,
      [windowId]: {
        ...prevWindows[windowId],
        isMinimized: false,
        zIndex: newZIndex,
      },
    }));
  };

  // bring window to front (and un-minimize if it somehow is)
  const handleFocus = (windowId) => {
    setWindows((prevWindows) => {
      if (prevWindows[windowId].zIndex === highestZIndex) {
        // already in front; just ensure it's not minimized
        return {
          ...prevWindows,
          [windowId]: { ...prevWindows[windowId], isMinimized: false },
        };
      }
      const newZIndex = highestZIndex + 1;
      setHighestZIndex(newZIndex);
      return {
        ...prevWindows,
        [windowId]: {
          ...prevWindows[windowId],
          zIndex: newZIndex,
          isMinimized: false,
        },
      };
    });
  };

  // the topmost window among open, visible (non-minimized) windows —
  // this drives the taskbar active highlight
  const activeWindowId =
    Object.entries(windows)
      .filter(([, w]) => w.isOpen && !w.isMinimized)
      .sort((a, b) => b[1].zIndex - a[1].zIndex)[0]?.[0] ?? null;

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
        <div className="z-50">
          <HomeWindow handleOpen={handleOpen} isMobile={isMobile} />
        </div>
      </div>

      {/* dynamically render windows based on their `isOpen` state */}
      <AnimatePresence>
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
            if (!windowState.isOpen || windowState.isMinimized) return null;

            ComponentToRender = windowComponents[windowId];
            props = {
              onClose: () => handleClose(windowId),
              onFocus: () => handleFocus(windowId),
              onMinimize: () => handleMinimize(windowId),
              onStop: (e, ui) => handleStop(windowId, e, ui),
              zIndex: windowState.zIndex,
              position: windowState.position,
              isActive: windowId === activeWindowId,
            };
          }

          if (ComponentToRender) {
            return <ComponentToRender key={windowId} {...props} />;
          }
          return null;
        })}
      </AnimatePresence>

      {/* Windows-style taskbar (desktop only) */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        handleFocus={handleFocus}
        handleMinimize={handleMinimize}
        handleRestore={handleRestore}
        isMobile={isMobile}
        theme={theme}
      />
    </main>
  );
};

export default Page;
