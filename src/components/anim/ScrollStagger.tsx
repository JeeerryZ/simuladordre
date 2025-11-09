"use client";

import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollStaggerProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  animation?: "fadeUp" | "fadeDown" | "scale" | "slideLeft" | "slideRight";
  duration?: number;
  once?: boolean;
  amount?: number;
}

const staggerAnimations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] },
    },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 0.75] },
    },
  },
};

export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 0.1,
  initialDelay = 0,
  animation = "fadeUp",
  duration = 0.6,
  once = true,
  amount = 0.2,
}: ScrollStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -100px 0px",
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        duration: duration,
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants = staggerAnimations[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial='hidden'
      animate={isInView ? "visible" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
