"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CustomAnimateScrollProps {
  className: string;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
  direction?: "left" | "right" | "top" | "bottom";
  retards?: number;
}

const CustomAnimateScroll = ({ className, children, containerRef, direction, retards }: CustomAnimateScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (!ref.current) return;

      const from = { x: 0, y: 0 };
      if (direction === "left") from.x = -1000;
      if (direction === "right") from.x = 1000;
      if (direction === "top") from.y = -1000;
      if (direction === "bottom") from.y = 1000;

      gsap.set(ref.current, { ...from, opacity: 0, width: 0 });

      gsap.to(ref.current, {
        x: "50%",
        y: "50%",
        opacity: 1,
        width: "100%",
        duration: 1,
        ease: "power3.out",
        delay: retards || 0,
        scrollTrigger: {
          trigger: ref.current,
          moveBy(x, y) {
            return [x, y];
          },
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    {
      scope: containerRef?.current ?? ref,
      dependencies: [direction, retards],
    }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default CustomAnimateScroll;
