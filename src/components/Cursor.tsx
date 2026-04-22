import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };

  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX -40 );
      mouseY.set(e.clientY -40);
    };
    window.addEventListener("mousemove", moveMouse);
    return () => window.removeEventListener("mousemove", moveMouse);
  }, []);
  return (
    <motion.div
      style={{ x: cursorX, y: cursorY }}
      className="fixed top-0 left-0 w-20 h-20 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    >
      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
    </motion.div>
  );
}