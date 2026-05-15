/**
 * Projects Data
 * Portfolio projects with descriptions, images, and links
 */

export const projects = [
  {
    title: "Northstar Fitness",
    description:
      "Conversion-focused gym platform with premium UI, streamlined booking, and local lead capture built for growth.",
    image: "/projects/project-1.png",
    imageAlt: "Northstar Fitness project preview",
    liveDemo: "https://northstar-fitness-demo.vercel.app",
    github: "https://github.com/skyweb/northstar-fitness",
    category: "Service Business",
    stats: [
      { value: "+42%", label: "Leads" },
      { value: "2.1s", label: "Load Time" },
      { value: "3x", label: "Faster Funnel" },
    ],
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion"],
  },
  {
    title: "Apex Legal",
    description:
      "Polished legal services site designed for trust, stronger consultation intent, and search visibility.",
    image: "/projects/project-2.png",
    imageAlt: "Apex Legal project preview",
    liveDemo: "https://apex-legal-demo.vercel.app",
    github: "https://github.com/skyweb/apex-legal",
    category: "Professional Services",
    stats: [
      { value: "+37%", label: "Calls" },
      { value: "94", label: "SEO Score" },
      { value: "24/7", label: "Support" },
    ],
    technologies: ["React", "Node", "SEO", "Analytics"],
  },
  {
    title: "Luna Commerce",
    description:
      "AI-ready e-commerce storefront with richer product storytelling, smarter recommendations, and smoother checkout.",
    image: "/projects/project-3.png",
    imageAlt: "Luna Commerce project preview",
    liveDemo: "https://luna-commerce-demo.vercel.app",
    github: "https://github.com/skyweb/luna-commerce",
    category: "E-Commerce",
    stats: [
      { value: "+28%", label: "Conversion" },
      { value: "3.8s", label: "Faster Pages" },
      { value: "AI", label: "Automation" },
    ],
    technologies: ["Next.js", "Commerce UI", "Automation", "Performance"],
  },
  {
    title: "Sci-Sol Consultants",
    description:
      "Professional regulatory consulting website for the pharmaceutical industry, featuring a modern corporate design, responsive user experience, and trust-focused digital presence.",
    image: "/projects/scisol.png",
    imageAlt: "Sci-Sol Consultants project preview",
    liveDemo: "https://scientificsolution.pk",
    github: "https://github.com/skyweb/studio-bloom",
    category: "Regulatory Consulting",
    stats: [
      { value: "98%", label: "Success Rate" },
      { value: "15+", label: "Countries" },
      { value: "10+", label: "Experts" },
    ],
    technologies: ["Next.js", "Tailwind", "Responsive Design"],
  },
] as const;

export type Project = (typeof projects)[number];
