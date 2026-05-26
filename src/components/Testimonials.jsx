import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote:
      "SkyWeb built us an AI lead agent that books 30-40 qualified calls a week completely hands-free. Best investment we've made this year.",
    name: 'James Holloway',
    role: 'CEO, PropTech Ventures',
    avatar: 'JH',
    color: '#00e5c0',
  },
  {
    quote:
      'The UI redesign they delivered increased our trial-to-paid conversion by 58%. They understood our product better than agencies we paid 5x more.',
    name: 'Sarah Mitchell',
    role: 'Founder, FinTrack SaaS',
    avatar: 'SM',
    color: '#ff5722',
  },
  {
    quote:
      "Our WhatsApp chatbot now handles 80% of customer queries automatically. SkyWeb set it up in a week and it's been flawless.",
    name: 'Raza Ahmed',
    role: 'Operations Director, EcomBrand',
    avatar: 'RA',
    color: '#a855f7',
  },
]

export default function Testimonials() {
  return (
    <section className="py-28 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Glow blobs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Client Voices</p>
          <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)]">
            What Our Clients <span className="text-gradient-teal">Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="card-glass p-7 flex flex-col gap-5 hover:border-white/[0.12] transition-all duration-300 group"
            >
              <Quote size={20} style={{ color: t.color }} className="opacity-70" />
              <p className="text-white/60 text-sm leading-relaxed flex-1 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/[0.05]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-xs text-bg-primary shrink-0"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-heading font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/35 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
