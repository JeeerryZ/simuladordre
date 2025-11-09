"use client";

import { motion, type MotionProps } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  motionProps?: Partial<MotionProps>;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export default function PageTransition({
  children,
  className,
  motionProps = {},
}: PageTransitionProps) {
  const combinedProps = {
    ...pageVariants,
    transition: { duration: 0.3 },
    ...motionProps,
  };

  return (
    <motion.div className={className} {...combinedProps}>
      {children}
    </motion.div>
  );
}
PageTransition.displayName = "PageTransition";

export { PageTransition };
