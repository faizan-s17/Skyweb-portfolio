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
  bio: "Skyweb builds fast, mobile-friendly websites for UK businesses that want more calls, enquiries, bookings, and trust online.",
  description:
    "We design premium, mobile-friendly websites that help UK businesses get more calls, enquiries, bookings, and trust — without confusing tech or slow delivery.",
  
  // Contact
  email: "theskyweb.uk@gmail.com",
  location: "United Kingdom",
  
  // About Section
  about: {
    headline: "Why UK Businesses Trust Skyweb",
    description:
      "We focus on what matters: fast websites, clear communication, and results that bring more calls and enquiries.",
    
    values: [
      {
        title: "More Calls & Enquiries",
        description: "Every page is designed to help visitors contact you, book, or buy.",
      },
      {
        title: "Fast Website Speed",
        description: "Visitors leave slow websites. We build sites that load instantly and keep people engaged.",
      },
      {
        title: "Mobile-First Design",
        description: "Your site works smoothly on phones, tablets, and desktops where most customers browse.",
      },
      {
        title: "Setup & Support",
        description: "From domain setup to ongoing updates. We're here after launch too.",
      },
    ] as const,
    
    teamCapabilities: [
      {
        title: "Design",
        description: "Premium, trustworthy layouts",
      },
      {
        title: "Conversion",
        description: "Clear CTAs and lead capture",
      },
      {
        title: "Automation",
        description: "Chatbots, forms, and AI help",
      },
    ] as const,
  },
  
  // Hero Section
  hero: {
    headline: "Your Website Isn't Bringing Clients? We Build Fast AI Websites That Generate Leads.",
    subheading: "We design premium, mobile-friendly websites that help UK businesses get more calls, enquiries, bookings, and trust — without confusing tech or slow delivery.",
    badge: "UK-Focused AI Web Studio",
    
    trustLine: "Free audit • Reply within 24 hours • No pressure",
    
    benefitChips: [
      { label: "More Calls" },
      { label: "Faster Website" },
      { label: "Better Trust" },
    ] as const,
    
    metrics: [
      { value: "24h", label: "Average response" },
      { value: "UK-Focused", label: "Support" },
      { value: "Lead-Focused", label: "Design" },
      { value: "Mobile-First", label: "Builds" },
    ] as const,
    
    cta: {
      primary: {
        text: "Get My Free Website Audit",
        href: "/contact",
      },
      secondary: {
        text: "View Client-Ready Demos",
        href: "#projects",
      },
    },
  },
  
  // Why Choose Us / Trust Section
  whyChooseUs: {
    headline: "Built to help small businesses look trusted and get contacted.",
    subheading: "We focus on what actually matters: clear communication, fast builds, and websites that bring enquiries.",
    reasons: [
      {
        title: "Clear Communication",
        description: "You understand every step. No technical jargon, just honest updates.",
      },
      {
        title: "Fast Delivery",
        description: "Get your site online without weeks of waiting. Launch-ready in days, not months.",
      },
      {
        title: "Conversion-Focused Layouts",
        description: "Every page is designed to help visitors contact you, book, or buy. Not just look good.",
      },
      {
        title: "WhatsApp & Contact Form Setup",
        description: "Make it easy for customers to reach you. Automated responses to enquiries.",
      },
      {
        title: "SEO-Ready Structure",
        description: "Built for Google search. Better visibility means more visitors and more leads.",
      },
      {
        title: "Ongoing Support Available",
        description: "Updates, fixes, and maintenance. We're here after launch too.",
      },
    ] as const,
  },
} as const;

export type PersonalInfo = typeof personalInfo;
