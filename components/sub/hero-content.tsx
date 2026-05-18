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
      className="flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-20 mt-8 md:mt-16 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-3 md:gap-5 justify-center m-auto text-start">
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
          className="flex flex-col gap-2 md:gap-4 mt-2 md:mt-4 text-2xl sm:text-3xl md:text-5xl font-bold text-white max-w-[650px] w-auto h-auto leading-[1.08] section-title"
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
          className="text-xs sm:text-sm md:text-base text-gray-300 my-2 md:my-3 max-w-[620px] leading-relaxed font-light section-subtitle"
        >
          {hero.subheading}
        </motion.p>

        {/* Benefit Chips */}
        <motion.div
          variants={slideInFromLeft(0.9)}
          className="flex flex-wrap gap-2 my-2 md:my-3"
        >
          {hero.benefitChips?.map((chip, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs sm:text-sm bg-purple-500/20 text-purple-200 rounded-full border border-purple-500/30"
            >
              ✓ {chip.label}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.95)}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-4 section-reveal"
        >
          <a
            href={hero.cta.primary.href}
            className="py-3 px-6 button-primary interactive-button text-center text-white cursor-pointer rounded-lg font-semibold text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            {hero.cta.primary.text}
          </a>
          <a
            href={hero.cta.secondary.href}
            className="py-3 px-6 border border-purple-500/80 interactive-button text-center text-white cursor-pointer rounded-lg font-semibold text-sm sm:text-base hover:bg-purple-500/10 hover:border-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            {hero.cta.secondary.text}
          </a>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          variants={slideInFromLeft(1)}
          className="text-xs sm:text-sm text-gray-400 mt-3"
        >
          {hero.trustLine}
        </motion.p>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="hidden md:flex w-full h-full justify-center items-center"
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
