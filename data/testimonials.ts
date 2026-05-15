/**
 * Testimonials & Client Feedback
 * Client success stories and reviews
 */

export const testimonials = [
  {
    name: "Amelia Grant",
    role: "Founder, Grant Wellness Studio",
    rating: 5,
    quote: "The website looked premium from day one and the enquiry quality improved almost immediately.",
  },
  {
    name: "Dylan Brooks",
    role: "Startup Operator",
    rating: 5,
    quote: "Clear communication, fast turnaround, and a very strong understanding of conversion and UX.",
  },
  {
    name: "Nadia Patel",
    role: "E-Commerce Brand Owner",
    rating: 5,
    quote: "Our new site feels more trustworthy, loads faster, and is set up properly for SEO growth.",
  },
] as const;

export const services = [
  {
    title: "Full Website Development",
    icon: "development",
    description: "Custom website builds with a premium visual system, responsive layouts, and performance-minded implementation.",
    highlights: ["Custom design", "Mobile responsive", "Fast performance"],
  },
  {
    title: "SEO Services",
    icon: "seo",
    description: "Search-ready website architecture with on-page SEO, technical SEO, and keyword-focused structure.",
    highlights: ["On-page SEO", "Technical SEO", "Ranking strategy"],
  },
  {
    title: "Hosting & Domain",
    icon: "hosting",
    description: "We help with setup, ongoing maintenance, and security-minded deployment guidance.",
    highlights: ["Setup", "Maintenance", "Security"],
  },
  {
    title: "AI Automated Websites",
    icon: "ai",
    description: "Automate content capture, lead routing, and intelligent customer interactions from the first visit.",
    highlights: ["AI content generation", "Smart forms", "Automation workflows"],
  },
  {
    title: "Chatbots",
    icon: "chatbot",
    description: "Website and WhatsApp chatbots designed to answer questions and route leads automatically.",
    highlights: ["WhatsApp bots", "Website bots", "Customer automation"],
  },
  {
    title: "Conversion Strategy",
    icon: "global",
    description: "A conversion-first layout approach with strong CTAs, trust signals, and friction removal.",
    highlights: ["CTA strategy", "Trust blocks", "Lead flow optimization"],
  },
] as const;

export type Testimonial = (typeof testimonials)[number];
export type Service = (typeof services)[number];
