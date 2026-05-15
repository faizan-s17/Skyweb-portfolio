# Data Architecture Guide

## Overview

The Space Portfolio has been refactored to use a **centralized data management system**. All portfolio content is now managed in the `/data` folder, making it easy to update information without touching component files.

## Directory Structure

```
data/
├── index.ts                 # Central export point
├── personalInfo.ts          # Personal identity & branding
├── projects.ts              # Portfolio projects
├── skills.ts                # Technical skills
├── socialLinks.ts           # Social media & contact
├── testimonials.ts          # Client feedback & services
├── contact.ts               # Contact info & forms
└── navigation.ts            # Menu & navigation links
```

## File Overview & Usage

### 1. **personalInfo.ts**
Contains all personal identity and branding information.

**Key Exports:**
- `personalInfo.name` - Brand/portfolio name
- `personalInfo.email` - Contact email
- `personalInfo.bio` - Short bio
- `personalInfo.hero` - Hero section content (headline, CTA, metrics)
- `personalInfo.about` - About section (values, team capabilities)
- `personalInfo.whyChooseUs` - Key differentiators

**Used By:**
- `config/index.ts` - Site metadata
- `components/main/hero.tsx` - Hero section
- `components/sub/hero-content.tsx` - Hero content

**Example Update:**
```typescript
// Update hero headline
export const personalInfo = {
  hero: {
    headline: "Your new headline here",
    // ... rest of config
  }
}
```

---

### 2. **projects.ts**
Portfolio projects with descriptions, stats, and technologies.

**Key Exports:**
- `projects` - Array of 4 project objects

**Project Structure:**
```typescript
{
  title: string;
  description: string;
  image: string;  // Path to image in /public/projects/
  link: string;   // Project URL
  category: string;
  stats: Array<{ value: string; label: string }>;
  technologies: string[];
}
```

**Used By:**
- `components/main/projects.tsx` - Project display

**Example Update:**
```typescript
// Edit an existing project
{
  title: "Updated Project Name",
  description: "New description...",
  image: "/projects/new-image.png",
  // ... rest
}
```

---

### 3. **skills.ts**
Technical skills organized by category.

⚠️ **IMPORTANT:** Keep the structure exactly as-is to preserve animations.

**Key Exports:**
- `skillData` - All skills
- `frontendSkills` - Frontend technologies
- `backendSkills` - Backend technologies
- `fullstackSkills` - Cross-platform tools
- `otherSkills` - Additional languages

**Skill Structure:**
```typescript
{
  skill_name: string;
  image: string;      // Filename in /public/skills/
  width: number;
  height: number;
}
```

**Used By:**
- `components/main/skills.tsx` - Skill display with animations

**⚠️ Do NOT modify:**
- Field names
- Object structure
- Image format or sizes (unless updating images)

---

### 4. **socialLinks.ts**
Social media profiles and contact links.

**Key Exports:**
- `socials` - Simple social links (no icons)
- `socialsWithIcons` - Links with React Icons
- `footerSocials` - Organized footer sections

**Used By:**
- `components/main/navbar.tsx` - Navigation socials
- `components/main/footer.tsx` - Footer links
- Contact pages

**Example Update:**
```typescript
export const socials = [
  {
    name: "WhatsApp",
    link: "https://wa.me/YOUR_NUMBER",
  },
  // ...
]
```

---

### 5. **testimonials.ts**
Client testimonials and service offerings.

**Key Exports:**
- `testimonials` - Client reviews (3 testimonials)
- `services` - Service offerings (6 services)

**Testimonial Structure:**
```typescript
{
  name: string;
  role: string;
  rating: number;        // 1-5
  quote: string;
}
```

**Service Structure:**
```typescript
{
  title: string;
  icon: string;          // Icon identifier
  description: string;
  highlights: string[];  // Key points
}
```

**Used By:**
- Optional testimonials section
- Services showcase page

**Example Update:**
```typescript
// Add new testimonial
export const testimonials = [
  // ... existing
  {
    name: "New Client",
    role: "Company/Role",
    rating: 5,
    quote: "Success story...",
  }
]
```

---

### 6. **contact.ts**
Contact information and form configuration.

**Key Exports:**
- `contactInfo.email` - Email address
- `contactInfo.whatsapp` - WhatsApp link
- `contactInfo.phone` - Phone number
- `contactInfo.form` - Form field definitions
- `contactInfo.cta` - CTA messages
- `contactInfo.alternativeContacts` - Other contact methods

**Used By:**
- `components/main/footer.tsx` - Footer contact
- Contact form pages
- CTA sections

**Form Fields:**
```typescript
{
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  required: boolean;
  placeholder?: string;
}
```

**Example Update:**
```typescript
export const contactInfo = {
  email: "newemail@example.com",
  whatsapp: "https://wa.me/NEW_NUMBER",
  // ... rest
}
```

---

### 7. **navigation.ts**
Navigation links and menu configuration.

**Key Exports:**
- `navigationLinks` - Main navigation menu
- `pageLinks` - Internal page routes
- `externalLinks` - External URLs

**Used By:**
- `components/main/navbar.tsx` - Navigation menu
- Various components for routing

**Example Update:**
```typescript
export const navigationLinks = [
  { title: "Home", link: "#home" },
  { title: "About", link: "#about" },
  { title: "Work", link: "#work" },
]
```

---

### 8. **index.ts** (Data Barrel Export)
Central export point for all data.

**Allows Clean Imports:**
```typescript
// Instead of:
import { projects } from "@/data/projects";
import { personalInfo } from "@/data/personalInfo";

// Use:
import { projects, personalInfo } from "@/data";
```

---

## How to Update Data

### Step 1: Identify What to Change
Each file is clearly labeled with what it's used for. Find the relevant file.

### Step 2: Update the Data
Edit the TypeScript object in the appropriate file.

### Step 3: Test
- If updating styles/animations (skills.ts): Test the skills section animations
- If updating content: Verify text displays correctly
- If updating links: Test navigation works

### Step 4: No Component Changes Needed
Components automatically use the updated data via imports.

---

## Common Updates

### Update Personal Bio
**File:** `personalInfo.ts`
```typescript
export const personalInfo = {
  name: "New Name",
  bio: "New bio text...",
  // ... rest
}
```

### Add/Edit Projects
**File:** `projects.ts`
```typescript
export const projects = [
  // Edit existing or add new
  {
    title: "New Project",
    description: "...",
    image: "/projects/new-project.png",
    // ...
  }
]
```

### Update Social Links
**File:** `socialLinks.ts`
```typescript
export const socials = [
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/your-profile",
  },
  // ...
]
```

### Update Contact Info
**File:** `contact.ts`
```typescript
export const contactInfo = {
  email: "your-new-email@example.com",
  // ...
}
```

### Update Navigation Menu
**File:** `navigation.ts`
```typescript
export const navigationLinks = [
  { title: "New Item", link: "#new-section" },
  // ...
]
```

---

## Data Types (TypeScript)

All data exports include TypeScript types for better DX:

```typescript
import type { Project, Testimonial, Service } from "@/data";

// Now you have type safety when working with data
const myProject: Project = { /* ... */ };
```

---

## Architecture Benefits

✅ **Centralized Management** - All content in one place
✅ **Easy Updates** - No component code changes needed
✅ **Scalable** - Add more data files as needed
✅ **Type-Safe** - Full TypeScript support
✅ **Maintainable** - Clear file organization
✅ **Reusable** - Components stay generic and focused
✅ **Backward Compatible** - `constants/index.ts` still works

---

## Best Practices

1. **Keep Data Separate from Logic**
   - Data files = content only
   - Components = display logic only

2. **Use Consistent Formatting**
   - Maintain existing object structures
   - Don't rename fields without updating components

3. **Preserve Arrays & Types**
   - Keep `as const` assertions
   - Don't change data structure for existing exports

4. **Update Incrementally**
   - Change one file at a time
   - Test after each change

5. **Document Custom Fields**
   - Add comments for non-obvious properties
   - Explain icon identifiers, image paths, etc.

---

## Migration From Old Structure

The old `constants/index.ts` is now a **barrel export** that imports from `/data` files.

- ✅ Existing imports still work: `import { PROJECTS } from "@/constants"`
- ✅ New imports recommended: `import { projects } from "@/data"`
- ✅ No breaking changes to components

---

## Future Extensions

Consider adding when needed:
- `awards.ts` - Awards & certifications
- `experience.ts` - Work experience timeline
- `blog.ts` - Blog posts metadata
- `resume.ts` - Resume/CV data
- `pricing.ts` - Service pricing
- `faq.ts` - Frequently asked questions

Just create a new file in `/data` and add it to `index.ts`.

---

**Last Updated:** May 14, 2026
**Architecture Version:** 1.0
