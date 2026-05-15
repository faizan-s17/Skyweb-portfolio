/**
 * Skills Data
 * Technical skills organized by category
 * ⚠️ IMPORTANT: This data feeds the Space Portfolio skills section.
 * Do not modify the structure without testing the animation effects.
 */

export const skillData = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 35,
    height: 35,
  },
] as const;

export const frontendSkills = [
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 65,
    height: 65,
  },
] as const;

export const backendSkills = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 35,
    height: 35,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 48,
    height: 48,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 58,
    height: 58,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 58,
    height: 58,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 58,
    height: 58,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 65,
    height: 65,
  },
] as const;

export const fullstackSkills = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 58,
    height: 58,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 58,
    height: 58,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 58,
    height: 58,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 42,
    height: 42,
  },
] as const;

export const otherSkills = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 48,
    height: 48,
  },
] as const;

export type SkillType = typeof skillData;
