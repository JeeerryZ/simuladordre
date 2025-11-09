"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?:
    | "fadeUp"
    | "fadeLeft"
    | "fadeRight"
    | "fadeDown"
    | "scale"
    | "slideUp";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -50px 0px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={animations[animation]}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }}
    >
      {children}
    </motion.div>
  );
}
