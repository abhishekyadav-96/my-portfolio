"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for the inner dot (instant follow)
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Motion values for the outer circle target
  const circleX = useMotionValue(0);
  const circleY = useMotionValue(0);

  // Smooth spring for the outer circle
  // High stiffness = faster response, Lower damping = less resistance but potential bounce (28 is good for 500)
  const springConfig = { damping: 28, stiffness: 500, mass: 0.5 };
  const smoothCircleX = useSpring(circleX, springConfig);
  const smoothCircleY = useSpring(circleY, springConfig);

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      // Update dot position (centered 6px dot -> -3px)
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);

      // Update circle target position (centered 32px circle -> -16px)
      circleX.set(e.clientX - 16);
      circleY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", updateMouse);
    
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [dotX, dotY, circleX, circleY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: smoothCircleX,
          y: smoothCircleY,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "rgba(59, 130, 246, 0.3)" : "transparent",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-blue-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
}
