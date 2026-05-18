/**
 * Personal Information & Branding
 * Centralized personal data for the portfolio
 */

export const personalInfo = {
  // Basic Identity
  name: "Skyweb",
  fullName: "AI Web Developer",
  title: "Full-Stack AI Web Developer",
  tagline: "UK-Focused AI Web Studio",
  
  // Bio & Description
  bio: "High-performance, AI-powered websites for UK businesses, startups, and service brands.",
  description:
    "We combine premium UI, practical automation, and conversion thinking so your website does more than look good. It helps your business win trust and generate demand.",
  
  // Contact
  email: "theskyweb.uk@gmail.com",
  location: "United Kingdom",
  
  // About Section
  about: {
    headline: "A Lean, UK-Focused Agency Built for Modern Growth",
    description:
      "We combine premium UI, practical automation, and conversion thinking so your website does more than look good. It helps your business win trust and generate demand.",
    
    values: [
      {
        title: "Mission",
        description: "Build websites that feel premium, perform fast, and help businesses generate leads consistently.",
      },
      {
        title: "Why UK-Based Matters",
        description: "Clear communication, business trust, and a professional delivery standard clients can rely on.",
      },
      {
        title: "Journey",
        description: "From simple builds to AI-enabled systems, the focus stays on speed, clarity, and measurable outcomes.",
      },
      {
        title: "Team",
        description: "A lean, agile setup with design, development, SEO, and automation capabilities ready to scale.",
      },
    ] as const,
    
    teamCapabilities: [
      {
        title: "Strategy",
        description: "Positioning and conversion",
      },
      {
        title: "Design & Dev",
        description: "Modern UI and clean builds",
      },
      {
        title: "Automation",
        description: "AI workflows and lead capture",
      },
    ] as const,
  },
  
  // Hero Section
  hero: {
    headline: "We Build Smart, AI-Powered Websites That Grow Your Business",
    subheading: "From design to deployment, everything is handled with a speed-first, conversion-focused approach that helps you win more leads and more trust.",
    badge: "UK-Focused AI Web Studio",
    
    metrics: [
      { value: "48h", label: "Fast Delivery" },
      { value: "90+", label: "Lighthouse Target" },
      { value: "24/7", label: "Support Mindset" },
      { value: "AI", label: "Automation Ready" },
    ] as const,
    
    cta: {
      primary: {
        text: "Get a Free Quote",
        href: "/contact",
      },
      secondary: {
        text: "View Our Work",
        href: "#projects",
      },
    },
  },
  
  // Why Choose Us
  whyChooseUs: {
    headline: "Built for Trust, Speed, and Higher Conversion Rates",
    reasons: [
      {
        title: "Fast Delivery",
        description: "Launch-ready builds with premium polish and speed-first implementation.",
      },
      {
        title: "UK-Based Professionalism",
        description: "Clear communication, trusted business standards, and local-market awareness.",
      },
      {
        title: "AI Integration",
        description: "Automation workflows, chatbot experiences, and smart content support.",
      },
      {
        title: "24/7 Support Mindset",
        description: "Reliable handoff, clear documentation, and ongoing maintenance options.",
      },
    ] as const,
  },
} as const;

export type PersonalInfo = typeof personalInfo;
