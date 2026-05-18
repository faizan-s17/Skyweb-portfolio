"use client";

import { motion } from "framer-motion";
import { services } from "@/data";
import { slideInFromLeft, slideInFromRight } from "@/lib/motion";

export const Services = () => {
  // Emoji mapping for service icons
  const iconMap: Record<string, string> = {
    development: "🎨",
    seo: "📈",
    hosting: "🛡️",
    ai: "⚡",
    chatbot: "💬",
    global: "🌍",
  };

  return (
    <section
      id="services"
      className="section-shell"
    >
      {/* Background gradient elements */}
      <div className="section-orb-top-right" />
      <div className="section-orb-bottom-left" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center text-center mb-12 section-reveal"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-6 section-title">
          Services That Help Your Business
        </h2>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl section-subtitle">
          From building fast websites to capturing leads, we focus on what actually helps your business grow.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            variants={index % 2 === 0 ? slideInFromLeft(0.2 + index * 0.1) : slideInFromRight(0.2 + index * 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group space-card-purple p-6 interactive-surface cursor-pointer h-full hover:shadow-[0_0_24px_rgba(112,66,248,0.22)]"
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />

            <div className="relative z-10 flex flex-col h-full">
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {iconMap[service.icon] || "✨"}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3 section-title group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow section-subtitle">
                {service.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-purple-500/20">
                {service.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 group-hover:border-cyan-500/60 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Border glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 rounded-lg shadow-lg shadow-purple-500/50" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
