"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

type SkillDataProviderProps = {
  src: string;
  name: string;
  width: number;
  height: number;
  index: number;
};

export const SkillDataProvider = ({
  src,
  name,
  width,
  height,
  index,
}: SkillDataProviderProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;
  const reducedWidth = Math.max(28, Math.round(width * 0.8));
  const reducedHeight = Math.max(28, Math.round(height * 0.8));

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
      className="h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center"
    >
      <Image
        src={`/skills/${src}`}
        width={width}
        height={height}
        alt={name}
        style={{
          width: `${reducedWidth}px`,
          height: `${reducedHeight}px`,
          objectFit: "contain",
        }}
      />
    </motion.div>
  );
};
