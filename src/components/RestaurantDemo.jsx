import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Flame, ArrowUpRight, Mic, MessageSquare, ClipboardCheck,
  ShieldCheck, Clock, UtensilsCrossed,
} from 'lucide-react'

/* Piri-piri red — distinct from the dental blue and roofing orange. */
const ACCENT = '#ef4444'
const ACCENT_2 = '#f97316'

/* The restaurant agent runs inside an iframe. The Dograh widget exposes a
 * single window.DograhWidget global and its snippet guards on a fixed script
 * id, so a second token on the main page would collide with the dental agent
 * already loaded in index.html. The iframe gives this agent its own window. */
const AGENT_SRC = '/restaurant-agent.html'

/* Things worth asking on the call — the third one is the point: the agent is
 * built to hand off rather than invent an answer. */
const PROMPTS = [
  { Icon: UtensilsCrossed, label: 'Order something', text: '“Can I get a Chick’n’Rice meal, hot, with a Coke and garlic mayo — delivery to M14 5TP.”' },
  { Icon: Flame,           label: 'Ask about the food', text: '“How spicy is Extreme?” or “Is the chicken halal?”' },
  { Icon: ShieldCheck,     label: 'Try to catch it out', text: '“Do you cater weddings for 200 people?” — it should offer a callback, not invent an answer.' },
]

const AFTER = [
  { Icon: ClipboardCheck, label: 'Order lands on the dashboard', text: 'Priced, itemised and timed, with an audible alert for the kitchen.' },
  { Icon: MessageSquare,  label: 'Owner taps Accept', text: 'The customer gets a confirmation text within seconds.' },
  { Icon: Clock,          label: 'Or taps Decline', text: 'They pick a reason and the customer is told exactly why — no silence.' },
]

/* ============================ Modal ============================== */
function DemoModal({ onClose }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="AI Restaurant Receptionist live demo"
        style={{ boxShadow: `0 0 80px ${ACCENT}1a` }}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-bg-secondary/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/60 hover:text-white transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}80`)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
        >
          <X size={16} />
        </button>

        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          {/* ---------- Left: the live call ---------- */}
          <div className="relative p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(to bottom right, ${ACCENT}12, transparent)` }}
            />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="relative flex items-center gap-3 mb-6 pr-12 lg:pr-0">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-bg-primary"
                style={{ background: `linear-gradient(to bottom right, ${ACCENT}, ${ACCENT_2})`, boxShadow: `0 0 24px ${ACCENT}59` }}
              >
                <Flame size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-white text-sm leading-tight truncate">Flame Grill Piri Piri</p>
                <p className="text-white/40 text-xs truncate">AI Receptionist · “Alex”</p>
              </div>
              <span
                className="ml-auto text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border"
                style={{ background: `${ACCENT}1f`, color: ACCENT, borderColor: `${ACCENT}40` }}
              >
                Live
              </span>
            </div>

            {/* The agent itself. Deliberately a dark "call console" surface in both
                themes — the iframe can't inherit the site's light-mode remapping,
                so it owns its own contrast rather than half-matching the page. */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: '#0b0b0f', border: `1px solid ${ACCENT}2e` }}
            >
              <iframe
                src={AGENT_SRC}
                title="Talk to the restaurant AI receptionist"
                allow="microphone"
                className="w-full block"
                style={{ height: 210, border: 0, background: 'transparent' }}
              />
            </div>

            <p className="relative text-white/35 text-xs leading-relaxed mt-4">
              This is a real conversation, not a recording. The agent reads a live menu, checks
              the delivery area, prices the order and places it — speak naturally and interrupt
              whenever you like.
            </p>

            {/* what to try */}
            <div className="relative mt-6 space-y-3">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: ACCENT }}>
                Try saying
              </p>
              {PROMPTS.map((p) => (
                <div
                  key={p.label}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}33`, color: ACCENT }}
                  >
                    <p.Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35 mb-0.5">{p.label}</p>
                    <p className="text-[13.5px] text-white/80 leading-relaxed">{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Right: what happens after the call ---------- */}
          <div className="p-7 sm:p-9 bg-white/[0.012]">
            <div className="flex items-center justify-between mb-5 lg:pr-10">
              <p className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: ACCENT }}>
                After you hang up
              </p>
            </div>

            <div className="space-y-3">
              {AFTER.map((step, i) => (
                <div
                  key={step.label}
                  className="relative flex items-start gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}33`, color: ACCENT }}
                  >
                    <step.Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium leading-snug">{step.label}</p>
                    <p className="text-white/45 text-xs leading-relaxed mt-1">{step.text}</p>
                  </div>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-white/25">0{i + 1}</span>
                </div>
              ))}
            </div>

            <div
              className="mt-6 p-4 rounded-xl"
              style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40` }}
            >
              <p className="text-sm text-white font-medium mb-1">Nothing reaches the kitchen unattended</p>
              <p className="text-white/50 text-xs leading-relaxed">
                The AI never confirms an order itself — it takes it and says a text is coming.
                A human accepts or declines every single one, so a busy Friday never turns into
                orders you cannot cook.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.07]">
              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35 mb-3">
                Built on
              </p>
              <div className="flex flex-wrap gap-2">
                {['Voice AI', 'Live menu & pricing', 'Owner dashboard', 'SMS confirmations', 'Allergy handling'].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/55"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

/* ===================== Featured card + wrapper =================== */
export default function RestaurantDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        style={{ boxShadow: `0 0 80px ${ACCENT}14` }}
        className="group md:col-span-2 card-glass overflow-hidden hover:border-white/[0.12] transition-colors duration-500"
      >
        <div className="grid md:grid-cols-2">
          {/* content */}
          <div className="p-7 sm:p-8 order-2 md:order-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}25` }}
              >
                Voice AI · Talk To It Now
              </span>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>

            <h3
              className="font-heading font-bold text-white text-xl sm:text-2xl mb-2 transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              FrontDesk for Restaurants
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              A voice AI that answers the phone, takes the order off a live menu, checks the
              delivery postcode, prices it and sends it to the kitchen — then texts the customer
              the moment the owner accepts. Talk to it yourself.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="self-start relative inline-flex items-center gap-2 px-7 py-3.5 font-heading font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-bg-primary"
              style={{ background: ACCENT, boxShadow: `0 0 30px ${ACCENT}40` }}
            >
              <Mic size={15} /> Start a Live Call
            </button>
          </div>

          {/* preview */}
          <div
            onClick={() => setOpen(true)}
            aria-hidden="true"
            className="relative h-56 md:h-auto flex items-center justify-center overflow-hidden order-1 md:order-2"
            style={{ background: `linear-gradient(to bottom right, ${ACCENT}2e, ${ACCENT_2}0a)` }}
          >
            <div
              className="absolute w-56 h-56 rounded-full border opacity-20"
              style={{ borderColor: ACCENT, top: '-25%', right: '-12%' }}
            />
            <div
              className="absolute w-24 h-24 rotate-45 border opacity-15"
              style={{ borderColor: ACCENT, bottom: '-8%', left: '8%' }}
            />

            <div className="relative flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-bg-primary"
                style={{ background: `linear-gradient(to bottom right, ${ACCENT}, ${ACCENT_2})`, boxShadow: `0 0 30px ${ACCENT}66` }}
              >
                <Flame size={26} />
              </div>
              <div className="flex items-end gap-1 h-7">
                {[0.5, 0.9, 0.4, 1, 0.65, 0.85, 0.45, 0.95, 0.55].map((h, i) => (
                  <span
                    key={i}
                    className="dm-bar w-1 rounded-full"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s`, backgroundColor: `${ACCENT}b3` }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-primary/30">
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-bg-primary"
                style={{ background: ACCENT }}
              >
                <Mic size={14} /> Start a Live Call
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <DemoModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
