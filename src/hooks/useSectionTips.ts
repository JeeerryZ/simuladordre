"use client";

import useAvatar from "@/hooks/useAvatar";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SectionTip = {
  id: string;
  message: string;
  duration?: number;
};

export function useSectionTips() {
  const { showTip } = useAvatar();
  const [shownTips, setShownTips] = useState<Set<string>>(new Set());

  const createSectionRef = (tip: SectionTip, threshold = 0.3) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
      once: true,
      amount: threshold,
    });

    useEffect(() => {
      if (isInView && !shownTips.has(tip.id)) {
        const timeout = setTimeout(() => {
          showTip(tip);
          setShownTips((prev) => new Set(prev).add(tip.id));
        }, 300);

        return () => clearTimeout(timeout);
      }
    }, [isInView, tip]);

    return ref;
  };

  return { createSectionRef };
}
