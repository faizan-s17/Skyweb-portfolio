/**
 * Testimonials & Client Feedback
 * Client success stories and reviews
 */

export const testimonials = [
  {
    name: "Client Name",
    role: "Local Service Business",
    rating: 5,
    quote: "Skyweb helped us turn a basic online presence into a professional website that feels much easier for customers to trust.",
  },
  {
    name: "Client Name",
    role: "UK Business Owner",
    rating: 5,
    quote: "The process was clear, fast, and focused on what actually matters — getting more enquiries.",
  },
  {
    name: "Client Name",
    role: "Small Business",
    rating: 5,
    quote: "Our new website looks premium on mobile and makes it much easier for people to contact us.",
  },
] as const;

export const services = [
  {
    title: "Full Website Development",
    icon: "development",
    description: "Build a professional website that makes your business look trusted and helps visitors contact you faster.",
    highlights: ["Mobile-friendly design", "Clear service pages", "Fast loading speed", "Contact & WhatsApp CTAs"],
  },
  {
    title: "SEO Services",
    icon: "seo",
    description: "Make your website easier to find on Google with clean structure, page titles, and local search basics.",
    highlights: ["Local SEO setup", "Search-friendly pages", "Better Google visibility"],
  },
  {
    title: "Hosting & Domain",
    icon: "hosting",
    description: "We help you get your website online smoothly without confusing technical steps.",
    highlights: ["Domain setup", "Hosting support", "Website maintenance"],
  },
  {
    title: "AI Automated Websites",
    icon: "ai",
    description: "Turn your website into a lead-handling system that captures details and helps you respond faster.",
    highlights: ["Smart forms", "Lead routing", "Auto replies", "AI assistance"],
  },
  {
    title: "Chatbots",
    icon: "chatbot",
    description: "Answer common customer questions and guide visitors to contact, book, or buy.",
    highlights: ["WhatsApp chatbot", "Website chatbot", "Customer FAQs"],
  },
  {
    title: "Conversion Strategy",
    icon: "global",
    description: "Improve your website layout so more visitors take action instead of leaving.",
    highlights: ["Stronger CTAs", "Trust sections", "Better lead flow"],
  },
] as const;

export type Testimonial = (typeof testimonials)[number];
export type Service = (typeof services)[number];
