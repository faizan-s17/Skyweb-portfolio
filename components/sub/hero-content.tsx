"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { personalInfo } from "@/data";

export const HeroContent = () => {
  const { hero } = personalInfo;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-6 md:px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[10px] border border-[#7042f88b] opacity-[0.95]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            {hero.badge}
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl md:text-6xl font-bold text-white max-w-[650px] w-auto h-auto leading-[1.08] section-title"
        >
          <span>
            {hero.headline.split(" ").map((word, idx) => {
              // Highlight key words for visual hierarchy
              if (
                ["Smart", "AI-Powered", "Websites", "Grow", "Business"].includes(word)
              ) {
                return (
                  <span
                    key={idx}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
                  >
                    {word}{" "}
                  </span>
                );
              }
              return <span key={idx}>{word} </span>;
            })}
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base md:text-lg text-gray-300 my-5 max-w-[620px] leading-relaxed font-light section-subtitle"
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-row gap-4 my-2 section-reveal"
        >
          <a
            href={hero.cta.primary.href}
            className="py-3 px-6 button-primary interactive-button text-center text-white cursor-pointer rounded-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            {hero.cta.primary.text}
          </a>
          <a
            href={hero.cta.secondary.href}
            className="py-3 px-6 border border-purple-500/80 interactive-button text-center text-white cursor-pointer rounded-lg font-semibold hover:bg-purple-500/10 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            {hero.cta.secondary.text}
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          loading="eager"
          style={{ width: "auto", height: "auto" }}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
