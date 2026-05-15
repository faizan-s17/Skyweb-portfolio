# Data Files Quick Reference

## 🎯 At a Glance

Need to update something? Find it here:

| Want to Change | File | Key Export |
|---|---|---|
| **Your name, bio, headline** | `data/personalInfo.ts` | `personalInfo` |
| **Portfolio projects** | `data/projects.ts` | `projects` |
| **Technical skills** | `data/skills.ts` | `skillData`, `frontendSkills`, etc. |
| **Social media links** | `data/socialLinks.ts` | `socials`, `socialsWithIcons` |
| **Testimonials, services** | `data/testimonials.ts` | `testimonials`, `services` |
| **Contact email, phone, form** | `data/contact.ts` | `contactInfo` |
| **Navigation menu** | `data/navigation.ts` | `navigationLinks` |

---

## 📝 File Templates

### personalInfo.ts
```typescript
export const personalInfo = {
  name: "",
  email: "",
  bio: "",
  hero: {
    headline: "",
    metrics: []
  },
  about: { ... },
  whyChooseUs: { ... }
}
```

### projects.ts
```typescript
export const projects = [
  {
    title: "",
    description: "",
    image: "",
    link: "",
    category: "",
    stats: [],
    technologies: []
  }
]
```

### skills.ts
```typescript
export const skillData = [
  {
    skill_name: "",
    image: "",
    width: 80,
    height: 80
  }
]
```

### socialLinks.ts
```typescript
export const socials = [
  {
    name: "",
    link: ""
  }
]
```

### testimonials.ts
```typescript
export const testimonials = [
  {
    name: "",
    role: "",
    rating: 5,
    quote: ""
  }
]

export const services = [
  {
    title: "",
    description: "",
    highlights: []
  }
]
```

### contact.ts
```typescript
export const contactInfo = {
  email: "",
  whatsapp: "",
  form: { ... },
  cta: { ... }
}
```

### navigation.ts
```typescript
export const navigationLinks = [
  {
    title: "",
    link: ""
  }
]
```

---

## 🔗 Import Examples

### Old Way (Still Works)
```typescript
import { PROJECTS, SOCIALS, SKILL_DATA } from "@/constants";
```

### New Way (Recommended)
```typescript
import { 
  projects, 
  socials, 
  skillData,
  personalInfo,
  testimonials,
  contactInfo 
} from "@/data";
```

### With Types
```typescript
import type { Project, Testimonial, Service } from "@/data";
```

---

## ✏️ Common Updates

### Update Your Name & Bio
**File:** `data/personalInfo.ts`
```typescript
{
  name: "Your Name",
  bio: "Your bio...",
  email: "you@email.com"
}
```

### Add Project
**File:** `data/projects.ts`
```typescript
export const projects = [
  // ... existing projects
  {
    title: "New Project",
    description: "Description...",
    image: "/projects/new.png",
    link: "https://project.com"
  }
]
```

### Update Social Link
**File:** `data/socialLinks.ts`
```typescript
export const socials = [
  {
    name: "GitHub",
    link: "https://github.com/yourprofile"
  }
]
```

### Update Email
**File:** `data/contact.ts`
```typescript
export const contactInfo = {
  email: "newemail@domain.com"
}
```

### Update Headline
**File:** `data/personalInfo.ts`
```typescript
hero: {
  headline: "Your new headline..."
}
```

---

## 🚀 Import in Components

### Example: Using Projects in a Component
```typescript
import { projects } from "@/data";

export default function ProjectSection() {
  return (
    <div>
      {projects.map((project) => (
        <div key={project.title}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example: Using Contact Info
```typescript
import { contactInfo } from "@/data";

export default function Footer() {
  return (
    <footer>
      <p>Email: {contactInfo.email}</p>
      <a href={contactInfo.whatsapp}>WhatsApp</a>
    </footer>
  );
}
```

### Example: Using Personal Info
```typescript
import { personalInfo } from "@/data";

export default function Hero() {
  return (
    <h1>{personalInfo.hero.headline}</h1>
  );
}
```

---

## 📁 File Locations & Sizes

| File | Lines | Purpose |
|---|---|---|
| `data/personalInfo.ts` | 120+ | Identity, hero, about |
| `data/projects.ts` | 80+ | Portfolio projects |
| `data/skills.ts` | 200+ | Technical skills |
| `data/socialLinks.ts` | 90+ | Social media links |
| `data/testimonials.ts` | 120+ | Testimonials & services |
| `data/contact.ts` | 80+ | Contact & form config |
| `data/navigation.ts` | 40+ | Menu & links |
| `data/index.ts` | 35+ | Barrel exports |

---

## ⚠️ Important Notes

### ✅ Safe to Edit
- All content in `/data` files
- personalInfo values
- Project descriptions
- Social media links
- Contact information

### ❌ Do NOT Edit
- File structure in `skills.ts`
- Component files
- Animation files
- Config files (unless updating site title)

### 🔄 If You Add/Remove Projects
Update the number in your configuration if you have project count limits:
```typescript
// In projects.ts
export const projects = [
  // Can be any number of projects now
]
```

---

## 🆘 Troubleshooting

### Data Not Updating?
1. Check syntax in the `.ts` file
2. Ensure no TypeScript errors
3. Run `npm run build` to verify
4. Check component imports

### Build Error?
1. Check for missing commas in data files
2. Verify `as const` assertions are intact
3. Check all closing braces

### Components Not Showing Data?
1. Verify import path: `import { ... } from "@/data"`
2. Check export name matches
3. Verify data structure matches component expectations

---

## 📚 Full Documentation

For complete details, see:
- **DATA_STRUCTURE.md** - Complete architecture guide
- **REFACTORING_REPORT.md** - What changed and why

---

**Last Updated:** May 14, 2026
**Version:** 1.0
