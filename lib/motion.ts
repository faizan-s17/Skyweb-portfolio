export function slideInFromLeft(delay: number) {
  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.55,
        ease: smoothEase,
      },
    },
  };
}

export function slideInFromRight(delay: number) {
  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: delay,
        duration: 0.55,
        ease: smoothEase,
      },
    },
  };
}

export const slideInFromTop = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};
