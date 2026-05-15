/**
 * Data Index
 * Central export point for all portfolio data
 * Import from this file for cleaner imports throughout the app
 */

export { personalInfo } from "./personalInfo";
export type { PersonalInfo } from "./personalInfo";

export { projects } from "./projects";
export type { Project } from "./projects";

export {
  skillData,
  frontendSkills,
  backendSkills,
  fullstackSkills,
  otherSkills,
} from "./skills";
export type { SkillType } from "./skills";

export {
  socials,
  socialsWithIcons,
  footerSocials,
} from "./socialLinks";
export type { Social } from "./socialLinks";

export {
  testimonials,
  services,
} from "./testimonials";
export type { Testimonial, Service } from "./testimonials";

export { contactInfo } from "./contact";
export type { ContactInfo } from "./contact";

export { navigationLinks, pageLinks, externalLinks } from "./navigation";
export type { NavigationLink } from "./navigation";
