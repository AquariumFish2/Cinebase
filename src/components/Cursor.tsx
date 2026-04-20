import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Smooth springs for hardware-accelerated movement
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);
  return (
    <motion.div
      style={{ x: cursorX, y: cursorY }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    >
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
    </motion.div>
  );
}