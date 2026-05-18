/**
 * Projects Data
 * Portfolio projects with descriptions, images, and links
 */

export const projects = [
  {
    title: "Northstar Fitness",
    description:
      "Gym needed a premium site that makes bookings easier.",
    businessType: "Fitness / Gym",
    problemSolved: "Needed a premium site that makes bookings easier.",
    conversionGoal: "Increase class enquiries and sign-ups.",
    keyFeatures: ["Booking-focused layout", "Local lead capture", "Mobile-first design"],
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
      "Legal services needed a trust-focused website for consultation enquiries.",
    businessType: "Legal Services",
    problemSolved: "Needed a trust-focused website for consultation enquiries.",
    conversionGoal: "Increase consultation requests.",
    keyFeatures: ["Professional layout", "Trust-focused sections", "Clear CTA flow"],
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
      "E-commerce needed a smoother product browsing and checkout experience.",
    businessType: "E-commerce",
    problemSolved: "Needed a smoother product browsing and checkout experience.",
    conversionGoal: "Increase product interest and online sales.",
    keyFeatures: ["Product storytelling", "Secure checkout", "AI-ready structure"],
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
      "Pharmaceutical consulting needed a corporate website that builds industry trust.",
    businessType: "Pharmaceutical / Regulatory Consulting",
    problemSolved: "Needed a corporate website that builds industry trust.",
    conversionGoal: "Improve credibility and enquiry flow.",
    keyFeatures: ["Professional design", "Responsive layout", "Service-focused content"],
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
