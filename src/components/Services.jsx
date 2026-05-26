import { motion } from 'framer-motion'
import { Layers, Zap, Users, Search, MessageSquare, Mic } from 'lucide-react'
import { useRef } from 'react'

const services = [
  {
    icon: Layers,
    color: '#00e5c0',
    title: 'UI/UX Design',
    description:
      'Pixel-perfect, conversion-focused interfaces built with Figma — from wireframes to high-fidelity prototypes that clients approve first try.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    icon: Zap,
    color: '#ff5722',
    title: 'AI Automation',
    description:
      'Eliminate repetitive tasks and unlock efficiency. We wire up smart automation pipelines that run 24/7 — zero burnout, maximum output.',
    tags: ['n8n', 'Make', 'Zapier', 'APIs'],
  },
  {
    icon: Users,
    color: '#f5a623',
    title: 'Lead & Marketing Agents',
    description:
      'Intelligent AI agents that qualify leads, send follow-ups, and run your outreach campaigns on autopilot — while you sleep.',
    tags: ['Lead Gen', 'Cold Outreach', 'CRM'],
  },
  {
    icon: Mic,
    color: '#00b4d8',
    title: 'Appointment & Voice Agents',
    description:
      'Deploy voice AI that books calls, answers FAQs, and handles reception. Your customers never wait, your team never burns out.',
    tags: ['Voice AI', 'Scheduling', 'Retell AI'],
  },
  {
    icon: Search,
    color: '#a855f7',
    title: 'SEO Optimization',
    description:
      'Technical SEO + content strategy that pushes you to page one. We audit, fix, and build — then show you the rankings climb.',
    tags: ['Technical SEO', 'Content', 'Analytics'],
  },
  {
    icon: MessageSquare,
    color: '#10b981',
    title: 'Chatbots',
    description:
      'Custom-trained chatbots that handle support, close sales, and engage visitors 24/7 — integrated into your site or WhatsApp.',
    tags: ['GPT-4', 'WhatsApp', 'Web Chat'],
  },
]

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)
  const Icon = service.icon

  const handleMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale3d(1.02,1.02,1.02)`
  }
  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale3d(1,1,1)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="service-card card-glass p-7 h-full group"
        style={{ '--card-accent': service.color }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
        >
          <Icon size={22} style={{ color: service.color }} />
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-white text-lg mb-3 group-hover:text-white transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/45 text-sm leading-relaxed mb-5 font-sans">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/35 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover glow line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
        />
      </div>
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 bg-bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">What We Do</p>
          <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)] mb-5">
            Everything You Need to{' '}
            <span className="text-gradient-teal">Scale</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
            Full-stack digital services built for businesses that want real results — not just a pretty website.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a href="https://wa.me/447950328625" target="_blank" rel="noreferrer" className="btn-primary">
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
