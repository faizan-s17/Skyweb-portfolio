/**
 * CONTENT EXTRACTION - Old Portfolio Data
 * 
 * This file contains all extracted, cleaned, and professional content
 * from the old myportfolio project. Ready to be mapped into
 * Space Portfolio components without modifying the existing design.
 * 
 * DO NOT MODIFY SPACE PORTFOLIO STRUCTURE - This is content only.
 */

// ============================================================================
// 1. PERSONAL IDENTITY & BRANDING
// ============================================================================

export const PERSONAL_IDENTITY = {
  // Brand Name
  brandName: "Skyweb",
  brandTagline: "UK-Focused AI Web Studio",
  
  // Professional Title
  professionalTitle: "Full-Stack AI Web Developer",
  
  // Location & Focus
  location: "UK-Based",
  specialization: "AI-Powered Websites & Web Development",
  
  // Contact Email
  email: "theskyweb.uk@gmail.com",
} as const;

// ============================================================================
// 2. HERO SECTION CONTENT
// ============================================================================

export const HERO_CONTENT = {
  // Main Headline
  headline: "We Build Smart, AI-Powered Websites That Grow Your Business",
  
  // Subheading
  subheading: "From design to deployment, everything is handled with a speed-first, conversion-focused approach that helps you win more leads and more trust.",
  
  // Badge Text (Top section)
  badgeText: "UK-Focused AI Web Studio",
  
  // Primary CTA Button
  primaryCTA: {
    label: "Get a Free Quote",
    href: "/contact",
  },
  
  // Secondary CTA Button
  secondaryCTA: {
    label: "View Our Work",
    href: "/portfolio",
  },
  
  // Key Metrics (4-column section)
  metrics: [
    {
      value: "48h",
      label: "Fast Delivery",
    },
    {
      value: "90+",
      label: "Lighthouse Target",
    },
    {
      value: "24/7",
      label: "Support Mindset",
    },
    {
      value: "AI",
      label: "Automation Ready",
    },
  ] as const,
  
  // Service Stack Preview (Hero right side)
  serviceStackTitle: "Conversion-Focused Stack",
  serviceStackSubtitle: "Design, SEO, automation, and hosting",
  serviceStackBadge: "Live",
  
  // Core Services (4-card grid in hero)
  coreServices: [
    {
      title: "Website Development",
      description: "Fast, responsive, premium UI",
    },
    {
      title: "AI Automation",
      description: "Smart workflows and lead capture",
    },
    {
      title: "SEO Optimization",
      description: "Structured for rankings",
    },
    {
      title: "Chatbots",
      description: "WhatsApp and website bots",
    },
  ] as const,
  
  // Industries Served
  industriesServed: [
    "Lawyers",
    "Gyms",
    "Salons",
    "E-commerce",
    "Startups",
  ] as const,
  industriesLabel: "Working with startups worldwide",
} as const;

// ============================================================================
// 3. ABOUT SECTION CONTENT
// ============================================================================

export const ABOUT_CONTENT = {
  // Section Header
  sectionLabel: "About Us",
  headline: "A Lean, UK-Focused Agency Built for Modern Growth",
  description: "We combine premium UI, practical automation, and conversion thinking so your website does more than look good. It helps your business win trust and generate demand.",
  
  // Core Values (4 pillars)
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
  
  // Team Capabilities (3-card section)
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
} as const;

// ============================================================================
// 4. SERVICES - Full Detailed List
// ============================================================================

export const SERVICES_FULL = [
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

// ============================================================================
// 5. WHY CHOOSE US - Key Differentiators
// ============================================================================

export const WHY_CHOOSE_US = {
  sectionLabel: "Why Choose Us",
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
} as const;

// ============================================================================
// 6. PROJECTS - Portfolio Case Studies
// ============================================================================

export const PROJECTS_DETAILED = [
  {
    name: "Northstar Fitness",
    category: "Service Business",
    summary: "A conversion-focused website concept for a UK gym brand with memberships, classes, and local lead capture.",
    description: "Premium gym membership site showcasing classes, trainers, and transparent pricing with a streamlined booking and conversion funnel.",
    stats: [
      { value: "+42%", label: "Leads" },
      { value: "2.1s", label: "Load Time" },
      { value: "3x", label: "Faster Funnel" },
    ],
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion"],
  },
  {
    name: "Apex Legal",
    category: "Professional Services",
    summary: "A polished legal-services concept designed to build trust, show expertise, and encourage consultations.",
    description: "Professional law firm website emphasizing credentials, case results, and client testimonials with a strong consultation CTA.",
    stats: [
      { value: "+37%", label: "Calls" },
      { value: "94", label: "SEO Score" },
      { value: "24/7", label: "Support" },
    ],
    technologies: ["React", "Node", "SEO", "Analytics"],
  },
  {
    name: "Luna Commerce",
    category: "E-Commerce",
    summary: "An AI-ready storefront experience concept with product storytelling, faster checkout, and stronger trust signals.",
    description: "Modern e-commerce platform combining rich product narratives, automated recommendations, and frictionless checkout optimization.",
    stats: [
      { value: "+28%", label: "Conversion" },
      { value: "3.8s", label: "Faster Pages" },
      { value: "AI", label: "Automation" },
    ],
    technologies: ["Next.js", "Commerce UI", "Automation", "Performance"],
  },
  {
    name: "Studio Bloom",
    category: "Salons & Beauty",
    summary: "A luxury landing-page system for salons that need bookings, trust, and beautifully presented services.",
    description: "Elegant salon website with service gallery, stylist portfolios, integrated booking system, and client testimonials.",
    stats: [
      { value: "+61%", label: "Bookings" },
      { value: "5.0", label: "Stars" },
      { value: "AI", label: "Chatbot" },
    ],
    technologies: ["Brand Design", "Booking Flow", "Chatbot", "Local SEO"],
  },
] as const;

// ============================================================================
// 7. TESTIMONIALS - Client Feedback
// ============================================================================

export const TESTIMONIALS = [
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

// ============================================================================
// 8. SOCIAL LINKS & CONTACT INFORMATION
// ============================================================================

export const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/447950328625",
    icon: "FiMessageCircle",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/theskyweb.uk?igsh=dzhiaHVuYjBiOTFh&utm_source=qr",
    icon: "FiInstagram",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "FiGithub",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62?companyReference=1435937255329460225&mp_source=share",
    icon: "FiMessageSquare",
  },
] as const;

export const CONTACT_DETAILS = {
  email: "theskyweb.uk@gmail.com",
  whatsapp: "https://wa.me/447950328625",
  upwork: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62?companyReference=1435937255329460225&mp_source=share",
} as const;

// ============================================================================
// 9. NAVIGATION STRUCTURE
// ============================================================================

export const NAVIGATION = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// ============================================================================
// 10. CALL-TO-ACTION SECTIONS
// ============================================================================

export const CTA_SECTIONS = {
  mainHeroFooter: {
    title: "Let's Build Something Amazing",
    description: "If you need a website that looks premium, loads fast, and turns visitors into leads, we should talk.",
  },
  
  servicesPage: {
    title: "Ready to Transform Your Online Presence?",
    description: "Start with a free consultation and a clear roadmap for your project.",
  },
  
  contactConfirmation: {
    title: "Let's Build Something Amazing",
    description: "If you need a website that looks premium, loads fast, and turns visitors into leads, we should talk.",
  },
} as const;

// ============================================================================
// 11. FOOTER CONTENT
// ============================================================================

export const FOOTER_CONTENT = {
  brandName: "Skyweb",
  tagline: "High-performance, AI-powered websites for UK businesses, startups, and service brands.",
  
  sections: [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Portfolio", href: "/portfolio" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ] as const,
} as const;

// ============================================================================
// 12. FORM FIELDS & LABELS
// ============================================================================

export const FORM_CONFIG = {
  contact: {
    fields: [
      { name: "name", label: "Your Name", type: "text", required: true },
      { name: "email", label: "Email Address", type: "email", required: true },
      { name: "business", label: "Business/Project Name", type: "text", required: false },
      { name: "message", label: "Tell us about your project", type: "textarea", required: true },
    ] as const,
    
    submitButton: "Send Message",
    successMessage: "Message sent! We'll get back to you within 24 hours.",
    errorMessage: "Something went wrong. Please try again or contact us directly.",
    
    contactMethods: {
      email: "theskyweb.uk@gmail.com",
      whatsapp: "https://wa.me/447950328625",
      fallbackText: "Or reach out directly via WhatsApp or email.",
    },
  } as const,
} as const;

// ============================================================================
// 13. PAGE METADATA & SEO
// ============================================================================

export const PAGE_METADATA = {
  homepage: {
    title: "Skyweb | AI-Powered Websites for Startups & UK Businesses",
    description: "High-performance web development and AI automation for UK startups and service businesses. Premium design, fast delivery, conversion-focused.",
  },
  
  services: {
    title: "Web Development Services | Skyweb",
    description: "Full website development, SEO, AI automation, chatbots, and conversion strategy for UK businesses.",
  },
  
  portfolio: {
    title: "Portfolio | Skyweb - Our Best Work",
    description: "View our latest projects across fitness, legal, e-commerce, and beauty industries.",
  },
  
  about: {
    title: "About Skyweb | UK-Based AI Web Studio",
    description: "Learn about our mission, values, and why we focus on fast, premium, conversion-focused web development.",
  },
  
  contact: {
    title: "Contact | Skyweb - Get a Free Quote",
    description: "Get a free quote, contact us on WhatsApp, or request a consultation.",
  },
} as const;

// ============================================================================
// 14. SUMMARY & USAGE GUIDE
// ============================================================================

/**
 * USAGE INSTRUCTIONS
 * 
 * This file is organized into logical sections that map to different
 * Space Portfolio components and pages. To integrate this data:
 * 
 * 1. HERO SECTION (components/main/hero.tsx + components/sub/hero-content.tsx)
 *    - Use: HERO_CONTENT
 *    - Update: Hero headline, subheading, CTAs, metrics
 * 
 * 2. PROJECTS SECTION (components/main/projects.tsx)
 *    - Use: PROJECTS_DETAILED (or create simplified version)
 *    - Map to: PROJECTS constant in constants/index.ts
 * 
 * 3. ABOUT SECTION (optional, components/sub/hero-content.tsx or new component)
 *    - Use: ABOUT_CONTENT, WHY_CHOOSE_US
 *    - Create new section if needed
 * 
 * 4. SOCIAL LINKS (components/main/footer.tsx)
 *    - Use: SOCIAL_LINKS
 *    - Update: SOCIALS constant in constants/index.ts
 * 
 * 5. FOOTER (components/main/footer.tsx)
 *    - Use: FOOTER_CONTENT, CONTACT_DETAILS
 *    - Update: Footer component
 * 
 * 6. CONFIG & METADATA (config/index.ts)
 *    - Use: PERSONAL_IDENTITY, PAGE_METADATA
 *    - Update: Site title, author info, description
 * 
 * IMPORTANT:
 * - DO NOT MODIFY: components/main/skills.tsx
 * - DO NOT MODIFY: components/main/encryption.tsx
 * - DO NOT MODIFY: Any animation or motion files
 * - DO NOT MODIFY: Global styling (app/globals.css)
 * 
 * All content is ready to be integrated without touching the Space Portfolio's
 * existing design, animations, or futuristic effects.
 */

export default {
  PERSONAL_IDENTITY,
  HERO_CONTENT,
  ABOUT_CONTENT,
  SERVICES_FULL,
  WHY_CHOOSE_US,
  PROJECTS_DETAILED,
  TESTIMONIALS,
  SOCIAL_LINKS,
  CONTACT_DETAILS,
  NAVIGATION,
  CTA_SECTIONS,
  FOOTER_CONTENT,
  FORM_CONFIG,
  PAGE_METADATA,
};
