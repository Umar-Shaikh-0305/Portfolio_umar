import { useEffect, useRef } from "react";

/**
 * A soft golden glow that follows the cursor around the page, like the
 * effect on hasnain-mughal.vercel.app. Purely decorative:
 * - Only activates on devices with a real mouse (pointer: fine) — touch
 *   screens skip it entirely, since there's no cursor to follow.
 * - Respects prefers-reduced-motion by not rendering at all.
 * - pointer-events: none so it never blocks clicks on real content.
 * - Uses requestAnimationFrame + easing (not an instant snap) for the same
 *   smooth trailing feel as the reference site, rather than a jerky jump.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReduced) return;

    function handleMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!hasMoved.current) {
        // Snap to the first real position instead of easing in from (0,0)
        current.current.x = e.clientX;
        current.current.y = e.clientY;
        hasMoved.current = true;
        if (glowRef.current) glowRef.current.style.opacity = "1";
      }
    }

    function tick() {
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", handleMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}
