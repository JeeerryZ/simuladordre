"use client";

import MapSVG from "@/app/simulador/map.svg";
import { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

const setupCss = (color: string, regionIndex: number): string => {
  return `.st0{fill:#e2e8f0;}
	.st1{fill:#e2e8f0;}
	.st2{fill:#e2e8f0;}
	.st3{fill:#e2e8f0;}
	.st4{fill:#e2e8f0;}`.replace(
    new RegExp(`(\\.st${regionIndex}\\{[^}]*?fill:)[^;]+(;?)`, "g"),
    `$1${color}$2`
  );
};

const parseRegion = (region: string): number | undefined => {
  const regions: { [key: string]: number } = {
    sudeste: 4,
    sul: 3,
    norte: 2,
    centro_oeste: 1,
    nordeste: 0,
  };
  return regions[region];
};

export default function Map({
  region: region,
  className: className,
}: {
  region?: string;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current && region !== undefined) {
      const svgEl = ref.current;
      if (!svgEl) return;
      let styleEl = svgEl.querySelector("style");
      if (!styleEl) {
        styleEl = document.createElement("style");
        svgEl.insertBefore(styleEl, svgEl.firstChild);
      }
      styleEl.textContent = setupCss("#10b981", parseRegion(region)!);
    }
  }, [region]);

  return <MapSVG ref={ref} className={cn(className)} />;
}
