/**
 * Contact Information & Configuration
 * Contact details and form configuration
 */

export const contactInfo = {
  // Direct contacts
  email: "theskyweb.uk@gmail.com",
  whatsapp: "https://wa.me/447950328625",
  phone: "+44 7950 328625",
  
  // Form messages
  form: {
    fields: [
      {
        name: "name",
        label: "Your Name",
        type: "text",
        required: true,
        placeholder: "Your Name",
      },
      {
        name: "email",
        label: "Your Email Address",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      {
        name: "business",
        label: "Your Business Name or Website Link",
        type: "text",
        required: false,
        placeholder: "Your business name or website URL",
      },
      {
        name: "message",
        label: "Tell us what you need help with",
        type: "textarea",
        required: true,
        placeholder: "Example: new website, redesign, more leads, booking system, chatbot, SEO, or online payments.",
      },
    ] as const,
    
    submitButton: "Request My Free Audit",
    submittingButton: "Sending...",
    
    messages: {
      success: "Message sent successfully! We'll review your details and reply within 24 hours.",
      error: "Something went wrong. Please try again or contact us directly.",
      fallback: "Thank you! We've received your message. We'll be in touch soon.",
    },
    reassurance: "No pressure. We'll reply with honest suggestions.",
  },
  
  // CTA Sections
  cta: {
    main: {
      title: "Let's Turn Your Website Into a Client-Getting System",
      description: "Tell us about your business and we'll suggest the best website, automation, or lead-generation setup for your goals.",
    },
    contact: {
      title: "Direct Contact & Free Audit",
      description: "Email, WhatsApp, or complete the form below. We'll review your homepage, speed, trust signals, and CTA flow.",
    },
    urgency: {
      title: "Want to know why your website is not getting enough enquiries?",
      description: "Send your website link and we'll review your homepage, speed, trust signals, and CTA flow.",
      cta: "Request Free Homepage Review",
      note: "Limited weekly review slots available.",
    },
  },
  
  // Alternative contact methods
  alternativeContacts: {
    email: "theskyweb.uk@gmail.com",
    whatsapp: "https://wa.me/447950328625",
    upwork: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62",
  },
} as const;

export type ContactInfo = typeof contactInfo;
