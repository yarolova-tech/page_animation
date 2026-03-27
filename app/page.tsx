"use client";
import CarouselComponent from "@/components/outils/CarouselComponent";
import PresentationAnime from "@/components/outils/PresatationAnime";
import CardAnime from "@/components/outils/CardAnime";
import ResposiveAnime from "@/components/outils/ResposiveAnime";
import LightDark from "@/components/outils/LightDark";

export default function Home() {
  return (
    <main className="w-full min-h-screen max-w-7xl mx-auto bg-card flex flex-col items-center overflow-x-hidden">
      <LightDark />
      
      <section className="w-full py-10">
        <CarouselComponent />
      </section>

      <section className="w-full py-20 flex justify-center">
        <PresentationAnime />
      </section>

      <section className="w-full py-20 ">
        <CardAnime />
      </section>

      <section className="w-full py-20">
        <ResposiveAnime />
      </section>
    </main>
  );
}