"use client";
import { useRef } from "react";
import CardAnime from "@/components/outils/CardAnime";
import LightDark from "@/components/outils/LightDark";

const Home = () => {
  return (
    <div className="w-full h-dvh">
      <LightDark />
      <CardAnime />
    </div>
  );
};

export default Home;


