/**
 * Constants Index
 * Exports all constants from centralized data folder
 * 
 * ⚠️ NOTE: Data is now managed in /data folder for better scalability
 * This file imports and re-exports for backward compatibility
 */

import {
  skillData,
  frontendSkills,
  backendSkills,
  fullstackSkills,
  otherSkills,
  socialsWithIcons,
  footerSocials,
  projects,
  navigationLinks,
  externalLinks,
} from "@/data";

// ============================================================================
// SKILL DATA - Imported from data/skills.ts
// ============================================================================

export const SKILL_DATA = skillData;
export const FRONTEND_SKILL = frontendSkills;
export const BACKEND_SKILL = backendSkills;
export const FULLSTACK_SKILL = fullstackSkills;
export const OTHER_SKILL = otherSkills;

// ============================================================================
// SOCIALS - Imported from data/socialLinks.ts
// ============================================================================

export const SOCIALS = socialsWithIcons;
export const FOOTER_DATA = footerSocials;

// ============================================================================
// PROJECTS - Imported from data/projects.ts
// ============================================================================

export const PROJECTS = projects;

// ============================================================================
// NAVIGATION - Imported from data/navigation.ts
// ============================================================================

export const NAV_LINKS = navigationLinks;
export const LINKS = externalLinks;
