"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A taskbar-style thumbnail preview — simulates a real desktop hover preview.
 * Shows a title with an image below, centered on the hovered taskbar button.
 *
 * Rendered through a portal to document.body (position:fixed) so it is not
 * clipped by the taskbar's overflow and stays put regardless of scaling.
 *
 * Props:
 *  - title:    small heading shown in --tooltip-text
 *  - image:    image src shown below the title
 *  - offsetX:  horizontal px offset from the trigger's center (default 0)
 *  - offsetY:  vertical px offset from the trigger's top (default 8)
 *  - children: the taskbar button hovered to reveal the preview
 */
const ThumbnailTooltip = ({
  title,
  image,
  offsetX = 0,
  offsetY = 8,
  children,
}) => {
  const triggerRef = useRef(null);
  const tipRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({ visible: false, x: 0, y: 0 });

  // only render the portal on the client (document/body don't exist server-side)
  useEffect(() => setMounted(true), []);

  // measure the card once rendered, then center it on the trigger (icon)
  useLayoutEffect(() => {
    if (!state.visible) return;
    const el = triggerRef.current;
    const tip = tipRef.current;
    if (!el || !tip) return;

    const tr = el.getBoundingClientRect();
    const tw = tip.offsetWidth;
    const left = tr.left + tr.width / 2 - tw / 2 + offsetX;
    const top = tr.top + offsetY;

    setState((s) => ({
      ...s,
      x: Math.max(0, Math.min(left, window.innerWidth - tw - 8)),
      y: top,
    }));
  }, [state.visible, offsetX, offsetY]);

  // keep position synced while open (scroll / resize / taskbar re-layout)
  useEffect(() => {
    if (!state.visible) return;
    const sync = () => {
      const el = triggerRef.current;
      const tip = tipRef.current;
      if (!el || !tip) return;
      const tr = el.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const left = tr.left + tr.width / 2 - tw / 2 + offsetX;
      setState((s) => ({
        ...s,
        x: Math.max(0, Math.min(left, window.innerWidth - tw - 8)),
        y: tr.top + offsetY,
      }));
    };
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [state.visible, offsetX, offsetY]);

  const tooltipNode = state.visible && (
    <div
      ref={tipRef}
      role="tooltip"
      className="pointer-events-none fixed z-[1000]"
      style={{
        left: state.x,
        top: state.y,
        background: "var(--tooltip-bg)",
        borderRadius: "0.75rem",
        boxShadow: "0 6px 18px -6px rgba(0,0,0,0.45)",
        padding: "0.6rem",
        animation: "tooltip-pop 0.18s ease both",
      }}
    >
      {title && (
        <div
          style={{
            color: "var(--tooltip-text)",
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.02em",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </div>
      )}
      {image && (
        <img
          src={image}
          alt={title || "preview"}
          draggable={false}
          style={{
            width: 220,
            height: 132,
            objectFit: "cover",
            borderRadius: "0.5rem",
            display: "block",
            background: "rgba(0,0,0,0.15)",
          }}
        />
      )}
      <style>{`@keyframes tooltip-pop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex"
        onMouseEnter={() => setState((s) => ({ ...s, visible: true }))}
        onMouseLeave={() => setState((s) => ({ ...s, visible: false }))}
      >
        {children}
      </span>
      {mounted && createPortal(tooltipNode, document.body)}
    </>
  );
};

export default ThumbnailTooltip;
