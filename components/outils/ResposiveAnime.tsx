"use client";
import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);

export default function ResposiveAnime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState("mobile");
  const lastLayout = useRef("mobile");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const updateLayout = (mode: string) => {
        if (mode === lastLayout.current) return;

        const state = Flip.getState(".box");

        window.requestAnimationFrame(() => {
          try {
            flushSync(() => {
              setLayout(mode);
              lastLayout.current = mode;
            });

            Flip.from(state, {
              duration: 0.7,
              ease: "power3.inOut",
              stagger: 0.03,
              absolute: true,
              onComplete: () => {
                gsap.set(".box", { clearProps: "all" });
              }
            });
          } catch (e) {
            setLayout(mode);
            lastLayout.current = mode;
          }
        });
      };

      mm.add("(max-width: 480px)", () => updateLayout("mobile"));
      mm.add("(min-width: 481px) and (max-width: 768px)", () => updateLayout("tablette"));
      mm.add("(min-width: 769px) and (max-width: 1023px)", () => updateLayout("laptop"));
      mm.add("(min-width: 1024px)", () => updateLayout("desktop"));

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const getGridClass = () => {
    if (layout === "mobile") return "grid-cols-1";
    if (layout === "tablette") return "grid-cols-2";
    if (layout === "laptop") return "grid-cols-3";
    return "grid-cols-4";
  };

  return (
    <div ref={containerRef} className="w-full max-w-7xl px-6 mx-auto py-20">
      <div className={`grid gap-4 ${getGridClass()}`}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            data-flip-id={`box-${i}`}
            className="box h-40 bg-background border border-border rounded-2xl flex items-center justify-center font-bold shadow-lg"
          >
            Project {i}
          </div>
        ))}
      </div>
    </div>
  );
}