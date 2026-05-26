import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'AI Lead Generation System',
    category: 'AI Automation',
    description: 'Built an intelligent multi-step outreach pipeline that qualifies and books 40+ leads/week automatically.',
    gradient: 'from-[#00e5c0]/20 to-[#00b4d8]/5',
    accent: '#00e5c0',
    tags: ['n8n', 'OpenAI', 'HubSpot'],
  },
  {
    title: 'E-Commerce SaaS Redesign',
    category: 'UI/UX Design',
    description: 'Full product redesign for a UK-based SaaS platform — increased conversion by 62% in 3 months.',
    gradient: 'from-[#ff5722]/20 to-[#f5a623]/5',
    accent: '#ff5722',
    tags: ['Figma', 'React', 'Framer'],
  },
  {
    title: 'Real Estate Voice Agent',
    category: 'Voice AI',
    description: 'A voice AI that handles inbound calls, qualifies prospects and books viewings — 24/7, zero staff cost.',
    gradient: 'from-[#a855f7]/20 to-[#6366f1]/5',
    accent: '#a855f7',
    tags: ['Retell AI', 'Calendly', 'CRM'],
  },
  {
    title: 'Legal Firm SEO Campaign',
    category: 'SEO',
    description: 'Took a London law firm from page 4 to #1 ranking for 12 high-intent keywords in 4 months.',
    gradient: 'from-[#10b981]/20 to-[#059669]/5',
    accent: '#10b981',
    tags: ['SEMrush', 'Content', 'Technical SEO'],
  },
]

export default function Work() {
  return (
    <section id="work" className="py-28 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="section-label mb-4">Case Studies</p>
            <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)]">
              Work That <span className="text-gradient-teal">Delivers</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            Real projects. Real results. Every case study below came with measurable business impact.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group card-glass overflow-hidden hover:border-white/[0.12] transition-all duration-500 cursor-none"
            >
              {/* Visual block */}
              <div className={`relative h-52 bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Decorative geometry */}
                <div
                  className="absolute w-48 h-48 rounded-full border opacity-20"
                  style={{ borderColor: p.accent, top: '-20%', right: '-10%' }}
                />
                <div
                  className="absolute w-24 h-24 rotate-45 border opacity-15"
                  style={{ borderColor: p.accent, bottom: '-10%', left: '10%' }}
                />
                <span className="font-heading font-bold text-6xl opacity-[0.06] text-white select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm"
                    style={{ background: p.accent, color: '#050508' }}
                  >
                    View Project <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-md"
                    style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}25` }}
                  >
                    {p.category}
                  </span>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2 group-hover:text-accent-teal transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/30 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upwork CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href="https://www.upwork.com/freelancers/~01c2a6207a8fe52c62"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            See More on Upwork <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
