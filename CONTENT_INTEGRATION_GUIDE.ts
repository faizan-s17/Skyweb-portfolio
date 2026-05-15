/**
 * SPACE PORTFOLIO - SIMPLIFIED DATA MAPPING
 * 
 * This file maps old portfolio content into Space Portfolio format.
 * Use this for direct integration into existing Space Portfolio components.
 * 
 * ⚠️ CONSTRAINTS:
 * - Skills section (components/main/skills.tsx) is PRESERVED - NO CHANGES
 * - Encryption/divider effect is PRESERVED - NO CHANGES
 * - All animations and 3D effects are PRESERVED - NO CHANGES
 * - Only content data is being migrated
 */

// ============================================================================
// PROJECTS - Direct Space Portfolio Format
// ============================================================================

export const PROJECTS_FOR_SPACE_PORTFOLIO = [
  {
    title: "Northstar Fitness",
    description:
      "Conversion-focused gym membership site with premium UI, streamlined booking funnel, and lead capture optimization. Achieved +42% lead increase with 2.1s load times.",
    image: "/projects/northstar-fitness.png",
    link: "https://northstar-fitness-demo.vercel.app",
  },
  {
    title: "Apex Legal",
    description:
      "Polished legal services platform emphasizing credentials, case results, and client trust. SEO-optimized with 24/7 support infrastructure and consultation focus.",
    image: "/projects/apex-legal.png",
    link: "https://apex-legal-demo.vercel.app",
  },
  {
    title: "Luna Commerce",
    description:
      "AI-ready e-commerce storefront with rich product storytelling, automated recommendations, and frictionless checkout. Features 28% conversion rate improvement.",
    image: "/projects/luna-commerce.png",
    link: "https://luna-commerce-demo.vercel.app",
  },
  {
    title: "Studio Bloom",
    description:
      "Luxury salon website with service gallery, stylist portfolios, integrated booking system, and AI chatbot. Boosted bookings by 61% with premium design and local SEO.",
    image: "/projects/studio-bloom.png",
    link: "https://studio-bloom-demo.vercel.app",
  },
] as const;

// ============================================================================
// SOCIAL LINKS - Direct Space Portfolio Format
// ============================================================================

export const SOCIALS_FOR_SPACE_PORTFOLIO = [
  {
    name: "WhatsApp",
    icon: "FiMessageCircle", // Replace with actual icon import
    link: "https://wa.me/447950328625",
  },
  {
    name: "LinkedIn",
    icon: "FiLinkedin",
    link: "https://linkedin.com",
  },
  {
    name: "GitHub",
    icon: "FiGithub",
    link: "https://github.com",
  },
] as const;

// ============================================================================
// HERO/INTRO CONTENT - For hero-content.tsx
// ============================================================================

export const HERO_INTRO_FOR_SPACE = {
  // Update this in components/sub/hero-content.tsx
  name: "Full-Stack AI Web Developer",
  headline: "We Build Smart, AI-Powered Websites That Grow Your Business",
  description:
    "From design to deployment, everything is handled with a speed-first, conversion-focused approach that helps you win more leads and more trust.",
  tagline: "UK-Focused AI Web Studio",
  
  // Update these CTAs in the hero component
  primaryAction: {
    text: "Get a Free Quote",
    link: "/contact",
  },
  secondaryAction: {
    text: "View Our Work",
    link: "/portfolio",
  },
} as const;

// ============================================================================
// METADATA - For config/index.ts
// ============================================================================

export const SITE_CONFIG_FOR_SPACE = {
  title: "Skyweb | AI-Powered Websites for Startups & UK Businesses",
  description:
    "High-performance web development and AI automation for UK startups and service businesses. Premium design, fast delivery, conversion-focused.",
  
  author: {
    name: "Skyweb",
    email: "hello@skyweb.co.uk",
    url: "https://skyweb.co.uk",
  },
  
  keywords: [
    "web development",
    "AI automation",
    "nextjs",
    "react",
    "freelancer",
    "uk web developer",
    "startup websites",
    "conversion optimization",
    "premium web design",
  ],
} as const;

// ============================================================================
// CONTACT INFO - For footer.tsx
// ============================================================================

export const CONTACT_FOR_SPACE = {
  email: "hello@skyweb.co.uk",
  whatsapp: "https://wa.me/447950328625",
} as const;

// ============================================================================
// INTEGRATION CHECKLIST
// ============================================================================

/**
 * STEP-BY-STEP INTEGRATION GUIDE
 * 
 * FILE 1: constants/index.ts
 * ========================
 * 1. Update siteConfig:
 *    - title: Use SITE_CONFIG_FOR_SPACE.title
 *    - description: Use SITE_CONFIG_FOR_SPACE.description
 *    - authors: Use SITE_CONFIG_FOR_SPACE.author
 *    - keywords: Use SITE_CONFIG_FOR_SPACE.keywords
 * 
 * 2. Update PROJECTS array:
 *    - Replace with PROJECTS_FOR_SPACE_PORTFOLIO
 *    - Create image files in public/projects/ folder
 * 
 * 3. Update SOCIALS array:
 *    - Replace or merge with SOCIALS_FOR_SPACE_PORTFOLIO
 *    - Keep existing icon imports
 * 
 * FILE 2: components/sub/hero-content.tsx
 * =======================================
 * 1. Update introduction text with HERO_INTRO_FOR_SPACE.headline
 * 2. Update description with HERO_INTRO_FOR_SPACE.description
 * 3. Update name/tagline references
 * 4. Update CTA button text and links
 * 
 * FILE 3: components/main/footer.tsx
 * ==================================
 * 1. Update email in footer: Use CONTACT_FOR_SPACE.email
 * 2. Update social links section with SOCIALS_FOR_SPACE_PORTFOLIO
 * 3. Update footer description with brand tagline
 * 
 * FILE 4: config/index.ts
 * ======================
 * 1. Update title with SITE_CONFIG_FOR_SPACE.title
 * 2. Update description with SITE_CONFIG_FOR_SPACE.description
 * 3. Update author information
 * 
 * ⚠️ FILES TO PRESERVE (DO NOT EDIT):
 * ==================================
 * - components/main/skills.tsx ✅ KEEP UNCHANGED
 * - components/main/encryption.tsx ✅ KEEP UNCHANGED
 * - lib/motion.ts ✅ KEEP UNCHANGED
 * - app/globals.css ✅ KEEP UNCHANGED
 * - tailwind.config.ts ✅ KEEP UNCHANGED
 * 
 * ASSETS TO ADD:
 * ==============
 * Create these image files in public/projects/:
 * - northstar-fitness.png
 * - apex-legal.png
 * - luna-commerce.png
 * - studio-bloom.png
 * 
 * Optional:
 * - Create favicon from branding (or keep current)
 * - Add logo if needed
 */

export default {
  PROJECTS_FOR_SPACE_PORTFOLIO,
  SOCIALS_FOR_SPACE_PORTFOLIO,
  HERO_INTRO_FOR_SPACE,
  SITE_CONFIG_FOR_SPACE,
  CONTACT_FOR_SPACE,
};
