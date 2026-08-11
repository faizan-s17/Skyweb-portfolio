import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import DentalDemo from './DentalDemo'
import RooferDemo from './RooferDemo'
import RestaurantDemo from './RestaurantDemo'
import { accentColor, useIsLight } from '../lib/theme'

/* Standout, accent-branded heading for each demo category */
function CategoryHeader({ index, eyebrow, title, accentWord, tagline, description, accent, isLight }) {
  const textAccent = accentColor(accent, isLight)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative flex items-end justify-between gap-4 border-b border-white/[0.07] pb-6"
    >
      <div className="flex items-stretch gap-4">
        {/* accent bar */}
        <span
          className="w-[3px] rounded-full shrink-0"
          style={{ background: `linear-gradient(to bottom, ${accent}, ${accent}00)` }}
        />
        <div>
          <span
            className="inline-block font-mono text-[11px] tracking-[0.25em] uppercase px-2.5 py-1 rounded-md mb-3"
            style={{ background: `${accent}14`, color: textAccent, border: `1px solid ${accent}33` }}
          >
            {eyebrow}
          </span>
          <h3 className="font-heading font-bold text-white text-[1.6rem] sm:text-[2.1rem] leading-[1.1] tracking-tight">
            {title}{' '}
            {accentWord && <span style={{ color: textAccent }}>{accentWord}</span>}
          </h3>
          {tagline && (
            <p className="text-white/75 text-sm font-medium mt-1.5">{tagline}</p>
          )}
          {description && (
            <p className="text-white/45 text-sm mt-2 max-w-lg leading-relaxed">{description}</p>
          )}
        </div>
      </div>

      {/* oversized faint index, editorial style */}
      <span
        className="hidden sm:block font-heading font-bold text-6xl leading-none select-none shrink-0"
        style={{ color: `${accent}1f` }}
      >
        {index}
      </span>
    </motion.div>
  )
}

/* Flagship showcase — lifts a demo category off the page with an
 * accent-tinted glow and a defined border, instead of a heading + card
 * sitting directly on the section background. */
function ShowcasePanel({ accent, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="relative rounded-[2rem] border overflow-hidden p-6 sm:p-8 lg:p-10 mb-16"
      style={{
        borderColor: `${accent}26`,
        background: `linear-gradient(180deg, ${accent}0d 0%, transparent 60%)`,
        boxShadow: `0 30px 90px -40px ${accent}33`,
      }}
    >
      {/* decorative corner glow + grid, kept inside the panel's own stacking context */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
      <div
        className="absolute -top-36 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background: `${accent}26` }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  )
}

export default function Work() {
  const isLight = useIsLight()
  return (
    <section id="work" className="py-28 bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      {/* ambient atmosphere — echoes the two demo accents, kept subtle so it reads
          as depth rather than decoration */}
      <div
        className="absolute top-0 left-[8%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.08] pointer-events-none"
        style={{ background: '#4f9cf9' }}
      />
      <div
        className="absolute bottom-0 right-[8%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.08] pointer-events-none"
        style={{ background: '#ff5722' }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="section-label mb-4">Projects &amp; Demos</p>
            <h2 className="section-title text-[clamp(2rem,5vw,3.5rem)]">
              Work That <span className="text-gradient-teal">Delivers</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-sm leading-relaxed">
            Interactive, live demos you can try right here: real calls handled end-to-end by our AI.
          </p>
        </motion.div>

        {/* ───── Category 01 · AI Receptionist ───── */}
        <ShowcasePanel accent="#4f9cf9">
          <CategoryHeader
            index="01"
            eyebrow="Live Voice Demo"
            title="SkyWeb"
            accentWord="FrontDesk"
            tagline="AI Voice Receptionist"
            accent="#4f9cf9"
            isLight={isLight}
            description="One voice AI answers every call, qualifies the caller, and books the appointment. Deploy it for dental, barbershops, med spas, and beyond. Press play to hear a real call handled end-to-end."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <DentalDemo />
          </div>
        </ShowcasePanel>

        {/* ───── Category 02 · AI Roofing Receptionist + CRM ───── */}
        <ShowcasePanel accent="#ff5722">
          <CategoryHeader
            index="02"
            eyebrow="Flagship Build"
            title="SkyWeb"
            accentWord="RoofDesk"
            tagline="AI Receptionist + CRM"
            accent="#ff5722"
            isLight={isLight}
            description="A WhatsApp AI captures and qualifies the lead, and a full CRM runs the job from there. Watch a storm leak become a booked job, live."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <RooferDemo />
          </div>
        </ShowcasePanel>

        {/* ───── Category 03 · AI Restaurant Receptionist ───── */}
        <ShowcasePanel accent="#ef4444">
          <CategoryHeader
            index="03"
            eyebrow="Live Voice Demo"
            title="SkyWeb"
            accentWord="OrderDesk"
            tagline="AI Receptionist for Takeaways"
            accent="#ef4444"
            isLight={isLight}
            description="Takes the order off a live menu, checks the delivery postcode, prices it and sends it to the kitchen — then texts the customer the moment the owner accepts. This one is not a recording: talk to it yourself."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <RestaurantDemo />
          </div>
        </ShowcasePanel>

        {/* Upwork CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
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
