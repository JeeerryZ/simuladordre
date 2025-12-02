"use client";

import { AvatarTip } from "@/types/avatarTip.types";
import { createContext, useCallback, useRef, useState } from "react";

type AvatarContextType = {
  showTip: (tip: AvatarTip) => void;
  hideTip: () => void;
  currentTip: AvatarTip | null;
  isVisible: boolean;
};

export const AvatarContext = createContext<AvatarContextType | null>(null);

export function AvatarProvider({ children }: { children: React.ReactNode }) {
  const [currentTip, setCurrentTip] = useState<AvatarTip | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hideTip = useCallback(() => {
    setIsVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const showTip = useCallback(
    (tip: AvatarTip) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setCurrentTip(tip);
      setIsVisible(true);

      const duration = tip.duration || 5000;
      timeoutRef.current = setTimeout(() => {
        hideTip();
      }, duration);
    },
    [hideTip]
  );

  return (
    <AvatarContext.Provider
      value={{
        showTip,
        hideTip,
        currentTip,
        isVisible,
      }}
    >
      {children}
    </AvatarContext.Provider>
  );
}
