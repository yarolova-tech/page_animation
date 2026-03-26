"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Experience, experiencesData } from "@/components/data/experience";
import { Blend, CalendarDays, Dot, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CardAnime = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const experiences: Experience[] = experiencesData;

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".row");

      rows.forEach((row) => {
        const left = row.querySelector(".left");
        const right = row.querySelector(".right");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 95%",
            end: "bottom 5%",
            scrub: 1,
          },
        });

        tl.from(left, { xPercent: -100, opacity: 0, ease: "none" }).from(
          right,
          { xPercent: 100, opacity: 0, ease: "none" },
          "<",
        );

        tl.to(
          [left, right],
          {
            opacity: 0,
            scale: 0.8,
            yPercent: -20,
            ease: "none",
            duration: 0.5,
          },
          "+=0.2",
        );
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="w-full max-w-7xl mx-auto bg-card overflow-hidden"
    >
      {experiences.map((experience) => (
        <div key={experience.id} className="w-full h-auto">
          <div className="row relative w-full h-[80vh] md:h-[40vh] flex flex-col md:flex-row gap-4 md:gap-14 p-4">
            <div className="left w-full md:w-1/2 h-full bg-background rounded-2xl flex flex-col justify-between pb-6 gap-2 p-3 font-bold shadow-lg">
              <h1 className="w-full text-lg text-center">{experience.title}</h1>

              <div className="text-foreground/60">
                <div className="flex flex-row justify-between px-4 pt-2">
                  <h1 className="text-primary">
                    {experience.type || "Stage"}{" "}
                    <span className="text-foreground/60">
                      ({experience.niveau})
                    </span>
                  </h1>
                  <p className="flex gap-2 items-center">
                    <CalendarDays className="text-primary" size={20} />
                    {experience.mois || "Indetermine"}
                    <span className="text-primary px-3 py-1 bg-card rounded-xl">
                      {experience.annee}
                    </span>
                  </p>
                </div>

                <div className="flex flex-row items-center gap-4 px-4 pt-2">
                  <MapPin className="text-primary" size={20} />
                  <h1>{experience.location || "Indetermine"}</h1>
                </div>
              </div>

              <div className="px-4 mb-10 text-foreground/60">
                <p>{experience.description}</p>
              </div>
            </div>

            <div className="w-12 h-12 bg-background absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-50 flex justify-center items-center rounded-full">
              <Blend className="text-primary" />
            </div>

            <p className="hidden md:block bg-background absolute top-0 left-0 h-1 w-full z-10 text-foreground text-center font-bold rotate-90" />

            <div className="right w-full md:w-1/2 h-full bg-background rounded-2xl flex flex-row justify-between items-start pb-3 gap-4 font-bold shadow-lg p-4">
              <div className="w-full">
                <div className="w-full mx-2">
                  <h1>Architecture Logicielle:</h1>
                  <p className="ml-10 text-foreground/60 mt-1 flex">
                    <span className="text-primary">
                        <Dot />
                      </span>
                    {experience.architectures?.join(", ") || "Indetermine"}
                  </p>
                </div>

                <div className="w-full mx-2">
                  <h1>Frontend :</h1>
                  {(experience.frontend || ["Indetermine"]).map((tech, idx) => (
                    <p
                      key={`front-${experience.id}-${idx}`}
                      className="ml-10 text-foreground/60 mt-1 flex"
                    >
                      <span className="text-primary">
                        <Dot />
                      </span>
                      {tech}
                    </p>
                  ))}
                </div>

                <div className="w-full mx-2">
                  <h1>Backend :</h1>
                  {(experience.backend || ["Indetermine"]).map((tech, idx) => (
                    <p
                      key={`back-${experience.id}-${idx}`}
                      className="ml-10 text-foreground/60 mt-1 flex"
                    >
                      <span className="text-primary">
                        <Dot />
                      </span>
                      {tech}
                    </p>
                  ))}
                </div>

                <div className="w-full mx-2">
                  <h1>Base de donnees :</h1>
                  {(experience.database || ["Indetermine"]).map((tech, idx) => (
                    <p
                      key={`db-${experience.id}-${idx}`}
                      className="ml-10 text-foreground/60 mt-1 flex"
                    >
                      <span className="text-primary">
                        <Dot />
                      </span>
                      {tech}
                    </p>
                  ))}
                </div>
              </div>

              {experience.autres && (
                <div className="w-full mx-2 flex flex-col justify-end items-end mr-6">
                  <h1>Autres :</h1>
                  {(experience.autres || ["Indetermine"]).map((tech, idx) => (
                    <p
                      key={`other-${experience.id}-${idx}`}
                      className="ml-10 text-foreground/60 mt-1 flex"
                    >
                      <span className="text-primary">
                        <Dot />
                      </span>
                      {tech}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardAnime;
