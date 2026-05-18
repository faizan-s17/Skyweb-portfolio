/**
 * Social Links & Contact Data
 * Social media profiles and contact information
 */

import {
  FiMessageCircle,
} from "react-icons/fi";

import {
  RxGithubLogo,
  RxInstagramLogo,
} from "react-icons/rx";

import {
  SiUpwork,
} from "react-icons/si";

export const socials = [
  {
    name: "WhatsApp",
    link: "https://wa.me/447950328625",
  },
  {
    name: "GitHub",
    link: "https://github.com/skyweb",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/theskyweb.uk?igsh=dzhiaHVuYjBiOTFh&utm_source=qr",
  },
  {
    name: "Upwork",
    link: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62",
  },
] as const;

// Original SOCIALS format with icons for components
export const socialsWithIcons = [
  {
    name: "WhatsApp",
    icon: FiMessageCircle,
    link: "https://wa.me/447950328625",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/skyweb",
  },
  {
    name: "Instagram",
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/theskyweb.uk?igsh=dzhiaHVuYjBiOTFh&utm_source=qr",
  },
  {
    name: "Upwork",
    icon: SiUpwork,
    link: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62",
  },
] as const;

// Footer social links with icons
export const footerSocials = [
  {
    title: "Social Media",
    data: [
      {
        name: "WhatsApp",
        icon: FiMessageCircle,
        link: "https://wa.me/447950328625",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/skyweb",
      },
      {
        name: "Instagram",
        icon: RxInstagramLogo,
        link: "https://www.instagram.com/theskyweb.uk?igsh=dzhiaHVuYjBiOTFh&utm_source=qr",
      },
      {
        name: "Upwork",
        icon: SiUpwork,
        link: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62",
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
