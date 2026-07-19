import { motion } from 'framer-motion'
import { accentColor, useIsLight } from '../lib/theme'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    description: 'We start with a free 30-minute strategy session to understand your goals, challenges, and existing systems.',
    color: '#00e5c0',
  },
  {
    num: '02',
    title: 'Strategy & Design',
    description: 'Our team crafts a tailored plan (UI wireframes, automation maps, or an SEO roadmap) and gets your approval before we build.',
    color: '#ff5722',
  },
  {
    num: '03',
    title: 'Build & Automate',
    description: 'We execute at speed. Every deliverable is tested, optimised, and built to scale from day one.',
    color: '#f5a623',
  },
  {
    num: '04',
    title: 'Launch & Grow',
    description: 'We go live, monitor performance, and keep iterating. And we don\'t disappear after handoff.',
    color: '#a855f7',
  },
]

export default function Process() {
  const isLight = useIsLight()
  return (
    <section id="process" className="py-28 bg-bg-secondary relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="section-label mb-4">How It Works</p>
          <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)]">
            From Idea to <span className="text-gradient-teal">Impact</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto mt-4">
            A clear, transparent process designed to get you results without the agency runaround.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[42px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number badge */}
                <div
                  className="relative w-[84px] h-[84px] rounded-2xl flex items-center justify-center mb-6 shrink-0"
                  style={{
                    background: `${step.color}0f`,
                    border: `1px solid ${step.color}30`,
                    boxShadow: `0 0 40px ${step.color}10`,
                  }}
                >
                  <span className="font-heading font-bold text-2xl" style={{ color: accentColor(step.color, isLight) }}>
                    {step.num}
                  </span>
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-2xl animate-pulse opacity-30"
                    style={{ boxShadow: `0 0 0 8px ${step.color}15` }}
                  />
                </div>

                <h3 className="font-heading font-bold text-white text-lg mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-white/30 text-sm mb-5">Ready to start? Your first call is completely free.</p>
          <a href="https://wa.me/447950328625" target="_blank" rel="noreferrer" className="btn-primary">
            Book a Free Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  )
}
