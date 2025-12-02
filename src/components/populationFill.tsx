"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface PopulationFillProps {
  population: number;
  maxPopulation?: number;
  width?: number;
  height?: number;
  animated?: boolean;
  onAnimationComplete?: () => void;
  showLabel?: boolean;
  labelPosition?: "right" | "bottom" | "auto";
  animationDuration?: number;
}

export default function PopulationFill({
  population,
  maxPopulation = 1000000,
  width = 120,
  height = 120,
  animated = true,
  onAnimationComplete,
  labelPosition = "auto",
  animationDuration = 2.5,
}: PopulationFillProps) {
  const [fillPercentage, setFillPercentage] = useState(0);
  const controls = useAnimation();
  const clipId = `person-${Math.random().toString(36).substr(2, 9)}`;

  // Animação com Framer Motion
  useEffect(() => {
    const percentage = Math.min((population / maxPopulation) * 100, 100);

    if (animated) {
      controls
        .start({
          y: `${100 - percentage}%`,
          transition: {
            duration: animationDuration,
            ease: [0.25, 0.1, 0.25, 1],
          },
        })
        .then(() => {
          onAnimationComplete?.();
        });
    } else {
      controls.set({ y: `${100 - percentage}%` });
      onAnimationComplete?.();
    }

    setFillPercentage(percentage);
  }, [
    population,
    maxPopulation,
    animated,
    controls,
    onAnimationComplete,
    animationDuration,
  ]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("pt-BR");
  };

  return (
    <div
      className={`
        flex items-center
        ${labelPosition === "bottom" ? "flex-col gap-2" : ""}
        ${labelPosition === "right" ? "flex-row gap-2" : ""}
        ${labelPosition === "auto" ? "flex-col gap-2 md:flex-row md:gap-2" : ""}
      `}
    >
      {/* SVG do bonequinho */}
      <div className='relative inline-block' style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          className='overflow-visible'
        >
          <defs>
            <clipPath id={clipId}>
              <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
              <circle cx='12' cy='7' r='4' />
            </clipPath>
          </defs>

          {/* Líquido verde esmeralda com Framer Motion */}
          <g clipPath={`url(#${clipId})`}>
            <motion.rect
              width='24'
              height='24'
              fill='#10b981'
              initial={{ y: "100%" }}
              animate={controls}
            />
          </g>

          {/* Contorno verde - estilo Feather */}
          <g
            fill='none'
            stroke='#059669'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
            <circle cx='12' cy='7' r='4' />
          </g>
        </svg>
      </div>

      {/* Label com habitantes */}
      <motion.div
        className={`
            flex flex-col gap-1
            ${labelPosition === "bottom" ? "items-center" : ""}
            ${labelPosition === "right" ? "items-start" : ""}
            ${labelPosition === "auto" ? "items-center md:items-start" : ""}
          `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span
          className={`
              font-semibold text-gray-300 text-shadow-lg drop-shadow-md leading-tight
              ${labelPosition === "bottom" ? "text-base" : ""}
              ${labelPosition === "right" ? "text-xl" : ""}
              ${labelPosition === "auto" ? "text-lg md:text-3xl" : ""}
            `}
        >
          {formatNumber(population)}
        </span>
        <span
          className={`
              font-medium text-gray-200 text-shadow-lg
              ${labelPosition === "bottom" ? "text-xs" : ""}
              ${labelPosition === "right" ? "text-sm" : ""}
              ${labelPosition === "auto" ? "text-sm md:text-xl" : ""}
            `}
        >
          Habitantes
        </span>
      </motion.div>
    </div>
  );
}
