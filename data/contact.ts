/**
 * Contact Information & Configuration
 * Contact details and form configuration
 */

export const contactInfo = {
  // Direct contacts
  email: "hello@skyweb.co.uk",
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
        placeholder: "John Doe",
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        placeholder: "you@example.com",
      },
      {
        name: "business",
        label: "Business/Project Name",
        type: "text",
        required: false,
        placeholder: "Your Project",
      },
      {
        name: "message",
        label: "Tell us about your project",
        type: "textarea",
        required: true,
        placeholder: "Describe your project needs...",
      },
    ] as const,
    
    submitButton: "Send Message",
    submittingButton: "Sending...",
    
    messages: {
      success: "Message sent successfully! We'll get back to you within 24 hours.",
      error: "Something went wrong. Please try again or contact us directly.",
      fallback: "Thank you! We've received your message. We'll be in touch soon.",
    },
  },
  
  // CTA Sections
  cta: {
    main: {
      title: "Let's Build Something Amazing",
      description: "If you need a website that looks premium, loads fast, and turns visitors into leads, we should talk.",
    },
    contact: {
      title: "Start with a Free Consultation",
      description: "Use the form, email, WhatsApp, or social links to get in touch. Let's discuss your project and create a clear roadmap.",
    },
  },
  
  // Alternative contact methods
  alternativeContacts: {
    email: "hello@skyweb.co.uk",
    whatsapp: "https://wa.me/447950328625",
    upwork: "https://www.upwork.com/freelancers/~01c2a6207a8fe52c62",
  },
} as const;

export type ContactInfo = typeof contactInfo;
