"use client";

import Map from "@/components/map";
import PopulationFillFeather from "@/components/populationFill";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const texts = [
  "Simulando cenários para sua região",
  "Calculando valores de implementação",
  "Analisando dados locais",
  "Ajustando parâmetros regionais",
  "Personalizando soluções para você",
];

const maxHabitantes: Record<string, number> = {
  sudeste: 5000000, // São Paulo (SP) - 15 milhões
  sul: 2000000, // Curitiba (PR) - 1,9 milhão
  norte: 1000000, // Manaus (AM) - 2,3 milhões
  centro_oeste: 1500000, // Brasília (DF) - 2,9 milhões
  nordeste: 2500000, // Fortaleza (CE) - 2,6 milhões
};

type RegionOffset = {
  x: string;
  y: string;
};

const getRegionCenterOffset = (region: string): RegionOffset => {
  const offsets: { [key: string]: RegionOffset } = {
    sudeste: { x: "-30%", y: "-30%" },
    sul: { x: "-15%", y: "-40%" },
    norte: { x: "20%", y: "20%" },
    centro_oeste: { x: "-4%", y: "-5%" },
    nordeste: { x: "-50%", y: "20%" },
  };
  return offsets[region] || { x: "0%", y: "0%" };
};

type LoadingAnimationProps = {
  region: string;
  habitantes?: number;
  onComplete?: () => void;
};

export default function LoadingAnimation({
  region,
  habitantes = 100000,
  onComplete,
}: LoadingAnimationProps) {
  const offset = getRegionCenterOffset(region);
  const [step, setStep] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  return (
    <div className='transition-all duration-300 w-auto p-4 rounded-3xl overflow-hidden bg-linear-to-br from-emerald-500/20 via-green-400/10 to-teal-500/20 backdrop-blur-sm relative'>
      <AnimatePresence mode='wait'>
        {step === 0 && (
          <motion.div
            key='map'
            className='w-full h-full flex items-center justify-center'
            initial={{ y: 0 }}
            exit={{ y: -500, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.div
              initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [1, 1.3, 1.3, 1.3, 1.0],
                x: [0, 0, offset.x, offset.x, 0],
                y: [0, 0, offset.y, offset.y, 0],
              }}
              transition={{
                duration: 3,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: "easeInOut",
              }}
              onAnimationComplete={() => setStep(1)}
            >
              <Map region={region} className='w-96' />
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            exit={{ y: -500, opacity: 0 }}
            key={"habitants"}
            onAnimationComplete={() => setTimeout(() => setStep(2), 1500)}
          >
            <PopulationFillFeather
              population={habitantes}
              maxPopulation={maxHabitantes[region] || 1000000}
              animated={true}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key='text-animation'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode='wait'>
              <motion.p
                key={textIndex}
                className='text-center text-gray-200 text-shadow-lg drop-shadow-md text-l font-semibold'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                onAnimationComplete={() => {
                  if (textIndex < texts.length - 1) {
                    setTimeout(() => {
                      setTextIndex(textIndex + 1);
                    }, 1500);
                  } else {
                    setTimeout(() => {
                      onComplete && onComplete();
                    }, 1000);
                  }
                }}
              >
                {texts[textIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
