/**
 * Social Links & Contact Data
 * Social media profiles and contact information
 */

import {
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const socials = [
  {
    name: "WhatsApp",
    link: "https://wa.me/447950328625",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/skyweb",
  },
  {
    name: "GitHub",
    link: "https://github.com/skyweb",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/skyweb.co.uk",
  },
  {
    name: "Twitter",
    link: "https://x.com/skywebco",
  },
] as const;

// Original SOCIALS format with icons for components
export const socialsWithIcons = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/skyweb",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/skyweb",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/skywebco",
  },
] as const;

// Footer social links with icons
export const footerSocials = [
  {
    title: "Social Media",
    data: [
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://www.instagram.com/skyweb.co.uk",
      },
      {
        name: "X / Twitter",
        icon: RxTwitterLogo,
        link: "https://x.com/skywebco",
      },
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/skyweb",
      },
    ],
  },
  {
    title: "Quick Links",
    data: [
      {
        name: "About",
        icon: null,
        link: "#about-me",
      },
      {
        name: "Services",
        icon: null,
        link: "#services",
      },
      {
        name: "Projects",
        icon: null,
        link: "#projects",
      },
      {
        name: "Contact",
        icon: null,
        link: "#contact",
      },
    ],
  },
] as const;

export type Social = (typeof socials)[number];
