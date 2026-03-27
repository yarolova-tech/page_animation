"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiencesData } from "@/components/data/experience";
import { Blend, CalendarDays, MapPin, Dot, Zap } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function CardAnime() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".row");
      if (rows.length === 0) return;

      rows.forEach((row) => {
        const left = row.querySelector(".left");
        const right = row.querySelector(".right");
        const centerIcon = row.querySelector(".center-icon");

        if (left && right) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%", // Déclenche un peu avant que l'élément soit au milieu
              end: "top 20%",
              scrub: 1,
            },
          });

          tl.from(left, { xPercent: -50, opacity: 0, ease: "power2.out" })
            .from(right, { xPercent: 50, opacity: 0, ease: "power2.out" }, "<")
            .from(centerIcon, { scale: 0, opacity: 0, rotate: -180 }, "<");
        }
      });
    },
    { scope: containerRef, dependencies: [experiencesData] }
  );

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto py-20 space-y-24 px-4"

    >
      <h1 className="text-2xl uppercase font-extrabold text-primary mb-6 flex justify-center items-center flex-row gap-2"><Zap /><span className="underline">Mon Experiences Professionnels</span></h1>
      {experiencesData.map((experience) => (
        <div key={experience.id} className="row relative w-full flex flex-col md:flex-row gap-4 md:gap-14 min-h-[40vh]">
          
          {/* CARTE GAUCHE - Infos Générales */}
          <div className="left w-full md:w-1/2 bg-background border border-border rounded-3xl flex flex-col justify-between p-6 shadow-xl relative z-10">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-2 text-center">
                {experience.title}
              </h2>

              <div className="space-y-4 text-foreground/80">
                <div className="flex justify-between items-center bg-card/50 p-3 rounded-xl">
                  <h3 className="font-semibold text-primary">
                    {experience.type || "Stage"}{" "}
                    <span className="text-foreground/50 text-sm italic">
                      ({experience.niveau})
                    </span>
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <CalendarDays className="text-primary" size={18} />
                    <span>{experience.mois}</span>
                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-lg">
                      {experience.annee}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-2">
                  <MapPin className="text-primary" size={18} />
                  <span className="font-medium text-sm">{experience.location || "Indéterminé"}</span>
                </div>

                <p className="text-sm leading-relaxed opacity-70 px-2 py-4 italic">
                  "{experience.description}"
                </p>
              </div>
            </div>
          </div>

          {/* ICON CENTRAL */}
          <div className="center-icon hidden md:flex w-14 h-14 bg-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 justify-center items-center rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]">
            <Blend className="text-white" size={28} />
          </div>

          {/* LIGNE DÉCORATIVE CENTRALE */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-border to-transparent z-0" />

          {/* CARTE DROITE - Stack Technique */}
          <div className="right w-full md:w-1/2 bg-background border border-border rounded-3xl p-6 shadow-xl flex flex-col gap-6 relative z-10">
            <h3 className="font-bold text-lg text-primary border-b border-border pb-2">Architecture & Stack</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Logiciel */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-50">Architecture</h4>
                <div className="flex items-center gap-2 text-sm font-semibold">
                   <Dot className="text-primary" /> {experience.architectures?.join(", ") || "N/A"}
                </div>
              </div>

              {/* Frontend */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-50">Frontend</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  {experience.frontend?.map((tech, idx) => (
                    <span key={idx} className="flex items-center"><Dot className="text-primary" /> {tech}</span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-50">Backend</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  {experience.backend?.map((tech, idx) => (
                    <span key={idx} className="flex items-center"><Dot className="text-primary" /> {tech}</span>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold uppercase tracking-wider opacity-50">Base de données</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                  {experience.database?.map((tech, idx) => (
                    <span key={idx} className="flex items-center"><Dot className="text-primary" /> {tech}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Autres */}
            {experience.autres && (
              <div className="mt-auto pt-4 border-t border-border/50">
                <h4 className="text-xs font-bold uppercase opacity-40 mb-2 text-right">Outils & Autres</h4>
                <div className="flex flex-wrap justify-end gap-3 text-xs font-bold text-primary">
                  {experience.autres.map((tech, idx) => (
                    <span key={idx} className="bg-primary/10 px-3 py-1 rounded-full">{tech}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}