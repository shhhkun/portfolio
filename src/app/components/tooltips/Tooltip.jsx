"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A simple, reusable tooltip card.
 *
 * Rendered through a portal to document.body and positioned with position:fixed
 * centered on the trigger, so it is NOT clipped by ancestors with overflow:hidden
 * or displaced by ancestor transforms (e.g. draggable windows, tilt cards).
 * Fades in via a gentle pop animation.
 *
 * Defaults: centered horizontally on the trigger. Use offsetY (e.g. a negative
 * value) to place it above, and offsetX to nudge it left/right from center.
 *
 * Props:
 *  - title:    small heading (default: --tooltip-text)
 *  - text:     body text (default: --text)
 *  - color:    color of title text (default: --tooltip-text)
 *  - offsetX:  horizontal px offset from the trigger's center (default 0)
 *  - offsetY:  vertical px offset from the trigger's top (default 8)
 *  - children: the element hovered to reveal the tooltip
 */
const Tooltip = ({
  title,
  text,
  color = "var(--tooltip-text)",
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

  // measure the card now that it's been rendered, then center it on the trigger
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

  // keep position synced while open (e.g. page/window scroll, trigger moves)
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
        boxShadow: "0 6px 18px -6px rgba(0,0,0,0.35)",
        padding: "0.6rem 0.85rem",
        minWidth: "max-content",
        animation: "tooltip-pop 0.18s ease both",
      }}
    >
      {title && (
        <div
          style={{
            color: color,
            fontWeight: 700,
            fontSize: "0.8rem",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>
      )}
      {title && text && <div style={{ height: "0.35rem" }} />}
      {text && (
        <div
          style={{
            color: "var(--text)",
            fontSize: "0.78rem",
            lineHeight: 1.4,
          }}
        >
          {text}
        </div>
      )}
      <style>{`@keyframes tooltip-pop { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
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

export default Tooltip;
