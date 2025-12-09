// FormAvatar.tsx
"use client";

import useAvatar from "@/hooks/useAvatar";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

export default function FormAvatar() {
  const { currentTip, isVisible, hideTip, showTip } = useAvatar();

  return (
    <div className='fixed bottom-6 right-6 z-50 flex items-end gap-3'>
      <AnimatePresence>
        {isVisible && currentTip && (
          <motion.div
            key={currentTip.id}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className='absolute right-full mr-4 bottom-0 bg-white rounded-xl shadow-2xl p-4 w-80 border border-green-200'
          >
            <button
              onClick={hideTip}
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X size={14} />
            </button>

            <p className='text-sm text-gray-800 pr-4'>{currentTip.message}</p>

            <div className='absolute -right-2 bottom-4 w-4 h-4 bg-white border-r-2 border-b-2 border-green-200 -rotate-45' />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type='button'
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.3,
          type: "spring",
          stiffness: 120,
          damping: 18,
        }}
        className='relative w-14 h-14 md:w-20 md:h-20 rounded-full bg-transparent flex items-center justify-center shadow-lg hover:scale-110 transition-transform'
        onClick={() => {
          if (!isVisible) {
            showTip({
              id: "click-help",
              message:
                "Precisa de uma mão? Vou te dando dicas conforme você preenche !",
            });
          } else {
            hideTip();
          }
        }}
      >
        <Image src='/drconcessao.png' alt='Avatar' width={500} height={500} />
        {isVisible && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white'
          />
        )}
      </motion.button>
    </div>
  );
}
