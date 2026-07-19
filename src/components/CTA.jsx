import { motion } from 'framer-motion'
import { Mail, MessageCircle, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="py-28 bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] bg-accent-teal/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-label mb-6">Get in Touch</p>

          <h2 className="section-title text-[clamp(2.2rem,6vw,4.5rem)] mb-6 leading-tight">
            Ready to Build Something{' '}
            <span className="text-gradient-teal">Exceptional?</span>
          </h2>

          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Drop us a message and we'll get back within 24 hours. First consultation is always free, no pitch, just strategy.
          </p>

          {/* Contact options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="mailto:theskyweb.uk@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 card-glass rounded-2xl hover:border-accent-teal/30 hover:bg-accent-teal/[0.03] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center shrink-0">
                <Mail size={18} className="text-accent-teal" />
              </div>
              <div className="text-left">
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">Email</p>
                <p className="text-white font-heading font-semibold text-sm">theskyweb.uk@gmail.com</p>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-accent-teal group-hover:translate-x-1 transition-all duration-300 ml-auto" />
            </a>

            <a
              href="https://wa.me/447950328625"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-8 py-4 card-glass rounded-2xl hover:border-accent-teal/30 hover:bg-accent-teal/[0.03] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center shrink-0">
                <MessageCircle size={18} className="text-accent-teal" />
              </div>
              <div className="text-left">
                <p className="text-white/30 text-xs font-mono uppercase tracking-widest">WhatsApp</p>
                <p className="text-white font-heading font-semibold text-sm">+44 7950 328625</p>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-accent-teal group-hover:translate-x-1 transition-all duration-300 ml-auto" />
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-white/20 text-xs font-mono uppercase tracking-widest">
            {['Free Consultation', 'No Long Contracts', 'Results Guaranteed', 'UK Based'].map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-accent-teal" />
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
