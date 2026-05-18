"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]]"
      >
        <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          Tools that help your business perform better
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[22px] sm:text-[26px] md:text-[30px] text-white font-medium mt-[10px] text-center mb-[15px] px-4"
      >
        Technology That Helps Your Business Website Perform Better
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[16px] sm:text-[18px] md:text-[20px] text-gray-200 mb-10 mt-[10px] text-center px-4"
      >
        We use modern tools behind the scenes so your website loads fast, works smoothly, and is easy to scale.
      </motion.div>
    </div>
  );
};
