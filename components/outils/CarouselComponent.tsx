"use client"

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"
import { Zap } from "lucide-react"

export default function CarouselComponent() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)

  const DELAY = 3000 

  const plugin = useRef(
    Autoplay({ delay: DELAY, stopOnInteraction: false })
  )

  useEffect(() => {
    if (!api) return;

    let interval: NodeJS.Timeout;
    
    const startProgress = () => {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = (elapsed / DELAY) * 100;
        
        if (newProgress <= 100) {
          setProgress(newProgress);
        }
      }, 50); 
    };

    startProgress();

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setProgress(0);
      clearInterval(interval);
      startProgress();
    });

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  const slides = [1, 2, 3, 4, 5]; 

  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <h1 className="text-2xl uppercase font-extrabold text-primary mb-6 flex justify-center items-center flex-row gap-2"><Zap /><span className="underline">Mon projets</span></h1>
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full max-w-4xl px-4"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent>
          {slides.map((number, index) => (
            <CarouselItem key={index}>
              <div className="flex aspect-video items-center justify-center bg-background border border-border rounded-2xl shadow-xl p-6 text-center">
                <div className="space-y-4">
                   <span className="text-primary font-bold text-xl">Projet {number}</span>
                   <h3 className="text-foreground text-4xl md:text-6xl font-black tracking-tighter">
                    VISUAL ART {number}
                  </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: count }).map((_, index) => {
          const isActive = current === index
          return (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-border",
                isActive ? "w-12" : "w-4 hover:bg-primary/50 cursor-pointer"
              )}
              aria-label={`Aller au slide ${index + 1}`}
            >
              {isActive && (
                <span 
                  className="absolute inset-y-0 left-0 bg-primary transition-none" 
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}