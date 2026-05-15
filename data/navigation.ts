/**
 * Navigation & Menu Structure
 * Navigation links and menu configuration
 */

export const navigationLinks = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Services",
    link: "#services",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const pageLinks = {
  home: "/",
  services: "/services",
  portfolio: "/portfolio",
  about: "/about",
  contact: "/contact",
} as const;

export const externalLinks = {
  demo: "https://space-portfolio.vercel.app",
} as const;

export type NavigationLink = (typeof navigationLinks)[number];
