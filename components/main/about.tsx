"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data";
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/lib/motion";

export const About = () => {
  const { about } = personalInfo;

  return (
    <section
      id="about-me"
      className="section-shell"
    >
      {/* Background gradient elements for visual interest */}
      <div className="section-orb-top-left" />
      <div className="section-orb-bottom-right" />

      {/* Section Headline */}
      <motion.div
        variants={slideInFromTop}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="w-full flex flex-col items-center text-center mb-12 section-reveal"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-6 section-title">
          {about.headline}
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl section-subtitle">
          {about.description}
        </p>
      </motion.div>

      {/* Values Section */}
      <motion.div
        variants={slideInFromLeft(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full mb-16"
      >
        <h3 className="text-2xl font-semibold text-white mb-8 text-center section-title">
          Our Foundation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {about.values.map((value, index) => (
            <motion.div
              key={value.title}
              variants={slideInFromLeft(0.3 + index * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group space-card-purple p-6 interactive-surface cursor-pointer hover:shadow-[0_0_22px_rgba(112,66,248,0.22)]"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />
              
              <div className="relative z-10">
                <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-300 leading-relaxed font-light section-subtitle">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Capabilities Section */}
      <motion.div
        variants={slideInFromRight(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full"
      >
        <h3 className="text-2xl font-semibold text-white mb-8 text-center section-title">
          What We Deliver
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {about.teamCapabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              variants={slideInFromRight(0.3 + index * 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group space-card-cyan p-6 interactive-surface cursor-pointer hover:shadow-[0_0_22px_rgba(45,212,191,0.2)]"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-2">
                  {capability.title}
                </h4>
                <p className="text-gray-300 text-center text-sm leading-relaxed font-light section-subtitle">
                  {capability.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
