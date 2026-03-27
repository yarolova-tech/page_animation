"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Zap } from "lucide-react";

const skilles = ["React", "Next.js", "Tailwind", "GSAP", "TypeScript", "Node.js", "PostgreSQL", "Prisma","MongoDB", "Docker", "Git", "CI/CD", "n8n", "Express.js", "MySQL"];

export default function PresentationAnime() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const [dimensions, setDimensions] = useState({ rx: 425, ry: 100, isMobile: false });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setDimensions({ rx: 140, ry: 50, isMobile: true });
      else setDimensions({ rx: 425, ry: 100, isMobile: false });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const obj = { progress: 0 };
    tlRef.current = gsap.to(obj, {
      progress: 1,
      duration: 20,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        buttonsRef.current.forEach((btn, i) => {
          if (!btn) return;
          const angle = (i / skilles.length) * 360 - obj.progress * 360;
          const rad = angle * (Math.PI / 180);
          gsap.set(btn, {
            x: Math.cos(rad) * dimensions.rx,
            y: Math.sin(rad) * dimensions.ry,
            zIndex: Math.round(Math.sin(rad) * 10) + 20,
            scale: 0.8 + (Math.sin(rad) + 1) * 0.2,
            opacity: 0.5 + (Math.sin(rad) + 1) * 0.5,
          });
        });
      },
    });
    return () => { tlRef.current?.kill(); };
  }, [dimensions]);

  return (
    <div className="flex flex-col items-center gap-10 w-full max-w-7xl px-4">
      <h1 className="text-2xl uppercase font-extrabold text-primary mb-6 flex justify-center items-center flex-row gap-2"><Zap /><span className="underline">Mon Compétences</span></h1>
      <div 
        className="relative flex items-center justify-center -rotate-6 bg-card  shadow-2xl rounded-full"
        style={{ width: dimensions.rx * 2 + (dimensions.isMobile ? 80 : 150), height: dimensions.ry * 2 + 50 }}
      >
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
          {skilles.map((skill, i) => (
            <div key={i} ref={(el) => { buttonsRef.current[i] = el; }} className="absolute">
              <button 
                onMouseEnter={() => tlRef.current?.pause()}
                onMouseLeave={() => tlRef.current?.play()}
                className="px-4 py-2 bg-background border border-border rounded-full rounded-tr-none cursor-pointer font-bold hover:bg-primary hover:text-white transition-all text-xs sm:text-sm shadow-lg"
              >
                {skill}
              </button>
            </div>
          ))}
          <div className="pointer-events-none absolute text-center opacity-10">
             <span className="text-4xl font-black uppercase italic">Skills</span>
          </div>
        </div>
      </div>
    </div>
  );
}