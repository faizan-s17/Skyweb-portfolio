import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, X, RotateCcw, ArrowUpRight, MessageCircle, CheckCheck,
  User, Phone, MapPin, Wrench, AlertTriangle, CalendarClock, CalendarCheck,
  Inbox, Flame, Home, Users, Calendar, CheckCircle2, Volume2, VolumeX,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * SkyWeb · AI Roofing Receptionist — self-playing WhatsApp → CRM demo.
 *
 * Fully self-contained: no Supabase / n8n / WhatsApp calls. A scripted
 * conversation plays on a virtual clock; the right-hand CRM panel
 * populates in real time as the AI captures each detail — so the demo
 * is bulletproof on the live site (no rate limits, no backend, no cost).
 *
 * speaker: 'ai' = Peak Roofing AI receptionist (outgoing, green bubble)
 *          'customer' = homeowner messaging in (incoming, grey bubble)
 * ------------------------------------------------------------------ */

/* SkyWeb's warm brand accents — keeps RoofDesk clearly distinct from the
 * blue FrontDesk receptionist it sits next to, and reads as "urgent job /
 * storm damage" rather than another voice demo */
const ACCENT = '#ff5722'
const ACCENT_2 = '#f5a623'

/* The player follows the site theme (mirrors DentalDemo's approach). Pinning
 * these on the modal root re-points every text-white/x, bg-white/x and
 * border-white/x utility inside it. */
const DARK_STAGE = {
  '--fg': '255 255 255',
  '--bg-primary': '5 5 8',
  '--bg-secondary': '10 10 15',
  '--bg-card': '14 14 20',
  '--accent-teal': '0 229 192',
  '--grid-line': '255 255 255',
  '--grid-alpha': '0.03',
}
const LIGHT_STAGE = {
  '--fg': '11 18 32',
  '--bg-primary': '244 247 251',
  '--bg-secondary': '255 255 255',
  '--bg-card': '237 242 248',
  '--accent-teal': '0 128 108',
  '--grid-line': '11 18 32',
  '--grid-alpha': '0.05',
}

/* WhatsApp-authentic bubble/surface colours for each theme, plus the
 * CRM panel's SaaS-dashboard palette. Everything literal (hex, or Tailwind
 * classes that don't route through the --fg token) lives here so the whole
 * modal reads as one deliberate light or dark surface, not an inverted dark
 * theme with mismatched panels. */
function surfaceset(light) {
  return light
    ? {
        backdrop: 'rgba(15,23,42,0.4)',
        waHeader: '#ffffff',
        chatBg: '#eaf1fb',
        waOut: '#d9fdd3',
        waIn: '#ffffff',
        inputBar: '#f0f5fc',
        // soft blue canvas (matches FrontDesk's light stage) with white cards
        // raised on top of it — flat white-on-white read as sterile/plain.
        crmBg: '#eef3f9',
        crmHeaderBg: '#e4ecf5',
        crmBorder: 'border-[#d8e6f5]',
        crmTitle: 'text-slate-800',
        crmLive: 'text-emerald-600',
        headerIconBg: 'bg-blue-100',
        headerIconText: 'text-blue-600',
        cardShadow: '0 1px 2px rgba(30,64,120,0.06), 0 6px 16px rgba(30,64,120,0.07)',
        kpiBg: 'bg-[#ffffff]',
        kpiBorder: 'border-[#d8e6f5]',
        kpiHighlightBorder: 'border-red-300',
        kpiLabel: 'text-slate-500',
        kpiValue: 'text-slate-900',
        leadsCard: 'bg-[#ffffff] border-[#d8e6f5]',
        leadsLabel: 'text-slate-700',
        leadsCount: 'text-slate-400',
        emptyState: 'text-slate-400',
        leadCardBase: 'bg-[#ffffff]',
        leadCardBorderHot: 'border-red-200',
        leadCardBorderNormal: 'border-[#d8e6f5]',
        avatarHot: 'bg-red-50 text-red-600',
        avatarNormal: 'bg-slate-100 text-slate-500',
        name: 'text-slate-800',
        sub: 'text-slate-500',
        scoreHot: 'bg-red-50 border-red-200 text-red-600',
        scoreWarm: 'bg-amber-50 border-amber-200 text-amber-600',
        scoreOk: 'bg-emerald-50 border-emerald-200 text-emerald-600',
        scoreNone: 'bg-slate-100 border-slate-200 text-slate-400',
        statusBooked: 'text-cyan-700 bg-cyan-50 border-cyan-200',
        statusNew: 'text-blue-700 bg-blue-50 border-blue-200',
        apptBar: 'bg-cyan-50 border-cyan-200',
        apptText: 'text-cyan-700',
        apptConfirmed: 'bg-emerald-100 text-emerald-700',
        metaText: 'text-slate-500',
        lastMeta: 'text-slate-300',
        sourceBadge: 'bg-emerald-50 border-emerald-200 text-emerald-700',
        urgencyText: 'text-red-600',
        endedCard: 'border-emerald-200 bg-emerald-50',
        endedTitle: 'text-slate-800',
        endedBody: 'text-slate-500',
      }
    : {
        backdrop: 'rgba(0,0,0,0.8)',
        waHeader: '#1f2c33',
        chatBg: '#0b141a',
        waOut: '#075e54cc',
        waIn: '#202c33',
        inputBar: '#1f2c33',
        crmBg: '#0f0f10',
        crmHeaderBg: '#161618',
        crmBorder: 'border-zinc-800',
        crmTitle: 'text-zinc-100',
        crmLive: 'text-emerald-400',
        headerIconBg: 'bg-blue-500/15',
        headerIconText: 'text-blue-400',
        cardShadow: 'none',
        kpiBg: 'bg-[#0f0f10]',
        kpiBorder: 'border-zinc-800/60',
        kpiHighlightBorder: 'border-red-500/30',
        kpiLabel: 'text-zinc-500',
        kpiValue: 'text-zinc-100',
        leadsCard: 'bg-[#0f0f10] border-zinc-800/60',
        leadsLabel: 'text-zinc-200',
        leadsCount: 'text-zinc-600',
        emptyState: 'text-zinc-600',
        leadCardBase: 'bg-[#0f0f10]',
        leadCardBorderHot: 'border-red-500/30',
        leadCardBorderNormal: 'border-zinc-800/60',
        avatarHot: 'bg-red-500/15 text-red-300',
        avatarNormal: 'bg-zinc-800 text-zinc-400',
        name: 'text-zinc-200',
        sub: 'text-zinc-500',
        scoreHot: 'bg-red-500/10 border-red-500/30 text-red-400',
        scoreWarm: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        scoreOk: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
        scoreNone: 'bg-zinc-800 border-zinc-700 text-zinc-500',
        statusBooked: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        statusNew: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        apptBar: 'bg-cyan-500/10 border-cyan-500/20',
        apptText: 'text-cyan-300',
        apptConfirmed: 'bg-emerald-500/20 text-emerald-400',
        metaText: 'text-zinc-500',
        lastMeta: 'text-zinc-700',
        sourceBadge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        urgencyText: 'text-red-400',
        endedCard: 'border-emerald-500/25 bg-emerald-500/[0.06]',
        endedTitle: 'text-zinc-100',
        endedBody: 'text-zinc-400',
      }
}

const SCRIPT = [
  {
    speaker: 'customer',
    text: "Hi, my roof's leaking really badly after last night's storm 😟",
    typeMs: 700, holdMs: 1200,
    cards: [{ id: 'lead', Icon: Inbox, label: 'New Enquiry', value: 'WhatsApp · just now' }],
  },
  {
    speaker: 'ai',
    text: "Hi there 👋 Welcome to Peak Roofing Solutions. That sounds stressful — I'll get this sorted fast. Could I take your full name?",
    typeMs: 1400, holdMs: 1200,
  },
  {
    speaker: 'customer',
    text: 'John Carter',
    typeMs: 650, holdMs: 850,
    cards: [{ id: 'name', Icon: User, label: 'Customer', value: 'John Carter' }],
  },
  {
    speaker: 'ai',
    text: "Thanks John. What's the best phone number to reach you on?",
    typeMs: 1100, holdMs: 1000,
  },
  {
    speaker: 'customer',
    text: '07788 123456',
    typeMs: 700, holdMs: 850,
    cards: [{ id: 'phone', Icon: Phone, label: 'Phone', value: '07788 123456' }],
  },
  {
    speaker: 'ai',
    text: 'Got it. And your postcode, so I can dispatch the nearest team?',
    typeMs: 1100, holdMs: 1000,
  },
  {
    speaker: 'customer',
    text: 'S1 2AB',
    typeMs: 550, holdMs: 850,
    cards: [{ id: 'postcode', Icon: MapPin, label: 'Postcode', value: 'S1 2AB' }],
  },
  {
    speaker: 'ai',
    text: 'Is water actively coming into the property right now?',
    typeMs: 1000, holdMs: 1000,
  },
  {
    speaker: 'customer',
    text: "Yeah, it's dripping through the bedroom ceiling",
    typeMs: 950, holdMs: 1300,
    cards: [
      { id: 'service', Icon: Wrench, label: 'Service', value: 'Emergency Repair' },
      { id: 'urgency', Icon: AlertTriangle, label: 'Urgency', value: 'EMERGENCY', danger: true },
    ],
  },
  {
    speaker: 'ai',
    text: "Understood — I'm flagging this as an emergency. I can have a surveyor with you tomorrow. Does 9:00 AM or 1:00 PM suit you?",
    typeMs: 1600, holdMs: 1400,
    score: 94,
  },
  {
    speaker: 'customer',
    text: '9am please',
    typeMs: 550, holdMs: 900,
  },
  {
    speaker: 'ai',
    text: "You're booked in, John 🎉 A surveyor will be with you tomorrow at 9:00 AM. Confirmation sent by WhatsApp and email.",
    typeMs: 1600, holdMs: 1600,
    status: 'BOOKED',
    cards: [
      { id: 'appt', Icon: CalendarClock, label: 'Inspection', value: 'Tomorrow · 9:00 AM' },
      { id: 'conf', Icon: MessageCircle, label: 'Action', value: 'Confirmation sent' },
      { id: 'cal', Icon: CalendarCheck, label: 'Action', value: 'Calendar synced' },
    ],
  },
]

/* Pre-compute absolute timeline (ms) so every visible element can be
 * derived purely from the virtual clock — gives free pause/seek/replay. */
const { BEATS, TOTAL, SCORE_TARGET, SCORE_AT, STATUS_AT } = (() => {
  let cursor = 0
  let scoreTarget = 0
  let scoreAt = null
  let statusAt = null
  const beats = SCRIPT.map((s) => {
    const typingStart = cursor
    const msgAt = cursor + s.typeMs
    const cards = (s.cards || []).map((c, i) => ({ ...c, at: msgAt + 250 + i * 230 }))
    if (s.score != null) { scoreTarget = s.score; scoreAt = msgAt + 200 }
    if (s.status) { statusAt = msgAt + 200 }
    cursor = msgAt + s.holdMs
    return { ...s, typingStart, msgAt, cards }
  })
  return { BEATS: beats, TOTAL: cursor + 800, SCORE_TARGET: scoreTarget, SCORE_AT: scoreAt, STATUS_AT: statusAt }
})()

const fmt = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000))
  return `0:${(s % 60).toString().padStart(2, '0')}`
}

/* compact KPI tile — mirrors the real CRM dashboard cards */
function KpiTile({ label, value, Icon, color, highlight, T }) {
  return (
    <div className={`rounded-xl border ${T.kpiBg} ${highlight ? T.kpiHighlightBorder : T.kpiBorder} px-2.5 py-2.5`} style={{ boxShadow: T.cardShadow }}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-[9px] font-medium ${T.kpiLabel} uppercase tracking-wider truncate`}>{label}</span>
        <span className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: `${color}1a` }}>
          <Icon size={11} style={{ color }} />
        </span>
      </div>
      <div className="h-[22px] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className={`block text-lg font-bold ${T.kpiValue} tabular-nums leading-none`}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ============================ Modal ============================== */
function DemoModal({ onClose }) {
  const playingRef = useRef(false)
  const clockRef = useRef(0)
  const lastRef = useRef(0)
  const chatRef = useRef(null)
  const crmRef = useRef(null)
  const sndMsg = useRef(null)
  const sndTick = useRef(null)
  const sndBooked = useRef(null)
  const sndAmbient = useRef(null)
  const mutedRef = useRef(true)
  const prevMsg = useRef(0)
  const prevCards = useRef(0)
  const prevBooked = useRef(false)

  const [clock, setClock] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  // follow the site theme (read once — the toggle lives behind the modal, so
  // it can't change while the player is open)
  const [light] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('light'),
  )
  const STAGE = light ? LIGHT_STAGE : DARK_STAGE
  const T = useMemo(() => surfaceset(light), [light])

  const setPlay = useCallback((v) => { playingRef.current = v; setPlaying(v) }, [])

  /* preload demo sounds — default muted, the user opts in via the toggle */
  useEffect(() => {
    const make = (src, vol, loop = false) => {
      const a = new Audio(src)
      a.volume = vol
      a.loop = loop
      a.preload = 'auto'
      return a
    }
    sndMsg.current = make('/msg.mp3', 0.35)
    sndTick.current = make('/tick.mp3', 0.22)
    sndBooked.current = make('/booked.mp3', 0.5)
    sndAmbient.current = make('/ambient.mp3', 0.05, true)
    return () => {
      [sndMsg, sndTick, sndBooked, sndAmbient].forEach((r) => {
        if (r.current) { r.current.pause(); r.current = null }
      })
    }
  }, [])

  const playSfx = useCallback((ref) => {
    const a = ref.current
    if (!a || mutedRef.current) return
    try { a.currentTime = 0; a.play().catch(() => {}) } catch { /* noop */ }
  }, [])

  /* keep the mute ref in sync and drive the ambient bed */
  useEffect(() => {
    mutedRef.current = muted
    const a = sndAmbient.current
    if (!a) return
    if (!muted && playing) a.play().catch(() => {})
    else a.pause()
  }, [muted, playing])

  /* lock body scroll + escape to close */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  /* single virtual-clock loop drives the whole demo */
  useEffect(() => {
    let raf
    const loop = (ts) => {
      if (!lastRef.current) lastRef.current = ts
      const dt = ts - lastRef.current
      lastRef.current = ts
      if (playingRef.current) {
        clockRef.current = Math.min(TOTAL, clockRef.current + dt)
        if (clockRef.current >= TOTAL) { playingRef.current = false; setPlaying(false) }
      }
      setClock((prev) =>
        (Math.abs(prev - clockRef.current) >= 32 || clockRef.current === TOTAL || clockRef.current === 0)
          ? clockRef.current : prev,
      )
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* derive everything from the clock. `started` gates the pre-play intro:
   * without it, the first beat's typing window (typingStart: 0) would make
   * typingSpeaker truthy at clock=0 and skip straight past the intro before
   * the user ever presses play. */
  const started = playing || clock > 0
  const messages = useMemo(() => (started ? BEATS.filter((b) => clock >= b.msgAt) : []), [clock, started])
  const typingSpeaker = useMemo(() => {
    if (!started) return null
    const b = BEATS.find((x) => clock >= x.typingStart && clock < x.msgAt)
    return b ? b.speaker : null
  }, [clock, started])
  const cards = useMemo(() => {
    const out = []
    for (const b of BEATS) for (const c of b.cards) if (clock >= c.at) out.push(c)
    return out
  }, [clock])

  const score = SCORE_AT != null && clock >= SCORE_AT
    ? Math.round(SCORE_TARGET * Math.min(1, (clock - SCORE_AT) / 1000))
    : 0
  const booked = STATUS_AT != null && clock >= STATUS_AT
  const ended = clock >= TOTAL
  const isHot = score >= 75

  /* derive the live CRM lead row straight from the captured cards */
  const getCard = (id) => cards.find((c) => c.id === id)
  const leadCreated = !!getCard('lead')
  const nm = getCard('name')?.value || ''
  const svc = getCard('service')?.value || ''
  const ph = getCard('phone')?.value || ''
  const pc = getCard('postcode')?.value || ''
  const urg = !!getCard('urgency')
  const apptVal = getCard('appt')?.value || ''
  const status = booked ? 'BOOKED' : 'NEW'
  const totalLeads = 23 + (leadCreated ? 1 : 0)
  const hotLeads = 5 + (isHot ? 1 : 0)
  const bookedCount = 8 + (booked ? 1 : 0)
  const scorePillCls = isHot
    ? T.scoreHot
    : score >= 50 ? T.scoreWarm
    : score >= 25 ? T.scoreOk
    : T.scoreNone
  const statusCls = booked ? T.statusBooked : T.statusNew

  /* keep the chat pinned to the latest message */
  useEffect(() => {
    const el = chatRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length, typingSpeaker])

  /* keep the CRM panel pinned to the newest captured detail */
  useEffect(() => {
    const el = crmRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [cards.length, booked, ended])

  /* sound effects synced to the timeline beats */
  useEffect(() => {
    if (messages.length > prevMsg.current && playingRef.current) playSfx(sndMsg)
    prevMsg.current = messages.length
  }, [messages.length, playSfx])

  useEffect(() => {
    if (cards.length > prevCards.current && playingRef.current) playSfx(sndTick)
    prevCards.current = cards.length
  }, [cards.length, playSfx])

  useEffect(() => {
    if (booked && !prevBooked.current && playingRef.current) playSfx(sndBooked)
    prevBooked.current = booked
  }, [booked, playSfx])

  const togglePlay = () => {
    if (ended) { clockRef.current = 0; setClock(0); setPlay(true); return }
    setPlay(!playingRef.current)
  }
  const replay = () => { clockRef.current = 0; setClock(0); setPlay(true) }
  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    clockRef.current = ratio * TOTAL
    setClock(clockRef.current)
  }

  const progress = Math.min(100, (clock / TOTAL) * 100)

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      style={STAGE}
      onClick={onClose}
    >
      <div className="absolute inset-0 backdrop-blur-md" style={{ background: T.backdrop }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="AI Roofing Receptionist WhatsApp demo"
        style={{ boxShadow: `0 0 80px ${ACCENT}1f` }}
        className="relative w-full max-w-5xl h-[90vh] lg:h-[600px] overflow-y-auto lg:overflow-hidden flex flex-col bg-bg-secondary/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/60 hover:text-white transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}80`)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
        >
          <X size={16} />
        </button>

        <div className="grid lg:grid-cols-[1.08fr_1fr] lg:flex-1 lg:min-h-0">
          {/* ---------- Left: WhatsApp conversation ---------- */}
          <div className="relative border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden flex flex-col lg:min-h-0">
            {/* WhatsApp header */}
            <div
              className="relative flex items-center gap-3 px-5 py-3.5 pr-12 lg:pr-5 border-b border-white/[0.06]"
              style={{ background: T.waHeader }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: `linear-gradient(to bottom right, ${ACCENT}, ${ACCENT_2})` }}
              >
                <Home size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-semibold text-white text-sm leading-tight truncate">Peak Roofing Solutions</p>
                <p className="text-[11px] truncate flex items-center gap-1.5" style={{ color: ACCENT }}>
                  <span className={`w-1.5 h-1.5 rounded-full ${playing ? 'animate-pulse' : ''}`} style={{ background: ACCENT }} />
                  AI Receptionist · {playing ? 'typing…' : ended ? 'online' : 'online'}
                </p>
              </div>
            </div>

            {/* chat thread */}
            <div
              ref={chatRef}
              className="relative overflow-y-auto px-4 py-5 space-y-2.5 h-[46vh] lg:h-auto lg:flex-1 min-h-0"
              style={{ background: T.chatBg }}
            >
              {/* faint WhatsApp-style texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-grid" />

              {!started && (
                <div className="relative flex flex-col items-center justify-center h-full text-center gap-4 px-4">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                    style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}4d`, color: ACCENT }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
                    Live walkthrough, not a real transcript
                  </span>
                  <p className="text-white/45 text-sm max-w-xs leading-relaxed">
                    A realistic example of how the AI receptionist handles a storm-damage enquiry, start to finish.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {['Answers WhatsApp instantly', 'Scores every lead', 'Books straight into your CRM'].map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/60"
                      >
                        <CheckCircle2 size={12} style={{ color: ACCENT }} />
                        {f}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setPlay(true)}
                    className="mt-1 inline-flex items-center gap-2 px-6 py-3 rounded-full font-heading font-semibold text-sm text-[#fff] hover:scale-105 active:scale-95 transition-transform"
                    style={{ background: ACCENT, boxShadow: `0 0 24px ${ACCENT}66` }}
                  >
                    <Play size={15} className="ml-0.5" /> Start Demo
                  </button>
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((m, i) => {
                  const out = m.speaker === 'ai'
                  return (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                      className={`relative flex ${out ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[82%] px-3 py-2 rounded-2xl text-[13.5px] leading-snug text-white shadow-sm"
                        style={{
                          background: out ? T.waOut : T.waIn,
                          borderTopRightRadius: out ? 4 : 16,
                          borderTopLeftRadius: out ? 16 : 4,
                        }}
                      >
                        {m.text}
                        <span className="inline-flex items-center gap-1 ml-2 align-bottom text-[10px] text-white/45">
                          {out && <CheckCheck size={13} style={{ color: ACCENT }} />}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* typing indicator */}
              <AnimatePresence>
                {typingSpeaker && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`relative flex ${typingSpeaker === 'ai' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className="px-3.5 py-3 rounded-2xl flex items-center gap-1"
                      style={{ background: typingSpeaker === 'ai' ? T.waOut : T.waIn }}
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          className="w-1.5 h-1.5 rounded-full bg-white/60"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* media controls (styled like a WhatsApp input bar) */}
            <div className="px-4 py-3 border-t border-white/[0.06]" style={{ background: T.inputBar }}>
              <div
                onClick={seek}
                role="slider"
                tabIndex={0}
                aria-label="Seek through the conversation"
                aria-valuemin={0}
                aria-valuemax={Math.round(TOTAL / 1000)}
                aria-valuenow={Math.round(clock / 1000)}
                className="group relative w-full py-1.5 cursor-pointer"
              >
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, background: `linear-gradient(to right, ${ACCENT}, ${ACCENT_2})` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause' : 'Play'}
                  className="w-10 h-10 rounded-full text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  style={{ background: ACCENT, boxShadow: `0 0 24px ${ACCENT}66` }}
                >
                  {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                </button>
                <button
                  onClick={replay}
                  aria-label="Replay"
                  className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setMuted((v) => !v)}
                  aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
                  aria-pressed={!muted}
                  className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <span className="ml-auto font-mono text-[11px] text-white/40 tabular-nums">
                  {fmt(clock)} / {fmt(TOTAL)}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- Right: the real SkyWeb CRM, populating live ---------- */}
          <div className="relative flex flex-col overflow-hidden lg:min-h-0" style={{ background: T.crmBg }}>
            {/* header */}
            <div className={`shrink-0 flex items-center gap-2.5 px-4 lg:pr-14 py-3 border-b ${T.crmBorder}`} style={{ background: T.crmHeaderBg }}>
              <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${T.headerIconBg}`}>
                <Home size={13} className={T.headerIconText} />
              </span>
              <span className={`text-[13px] font-semibold ${T.crmTitle}`}>SkyWeb CRM</span>
              <span className={`ml-auto flex items-center gap-1.5 text-[11px] ${T.crmLive} shrink-0`}>
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${playing ? 'animate-pulse' : ''}`} />
                live
              </span>
            </div>

            {/* scrollable CRM content */}
            <div ref={crmRef} className="overflow-y-auto p-4 space-y-3 lg:flex-1 lg:min-h-0">
              {/* KPI strip — mirrors the dashboard */}
              <div className="grid grid-cols-3 gap-2">
                <KpiTile label="Total Leads" value={totalLeads} Icon={Users} color="#3b82f6" T={T} />
                <KpiTile label="Hot Leads" value={hotLeads} Icon={Flame} color="#f87171" highlight={isHot} T={T} />
                <KpiTile label="Booked" value={bookedCount} Icon={Calendar} color="#22d3ee" T={T} />
              </div>

              {/* Leads table card */}
              <div className={`rounded-xl border overflow-hidden ${T.leadsCard}`} style={{ boxShadow: T.cardShadow }}>
                <div className={`flex items-center justify-between px-4 py-2.5 border-b ${T.crmBorder}`}>
                  <div className="flex items-center gap-2">
                    <Users size={13} className={T.metaText} />
                    <span className={`text-[13px] font-semibold ${T.leadsLabel}`}>Leads</span>
                  </div>
                  <span className={`text-[11px] ${T.leadsCount}`}>{leadCreated ? '1 new' : '—'}</span>
                </div>

                <div className="p-2.5">
                  {!leadCreated ? (
                    <div className={`flex items-center justify-center gap-2 py-9 ${T.emptyState} text-[13px]`}>
                      <Inbox size={15} className="opacity-40" /> Listening for new enquiries…
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl border p-3 ${T.leadCardBase} ${isHot ? T.leadCardBorderHot : T.leadCardBorderNormal}`}
                    >
                      {/* row 1 — identity + score */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isHot ? T.avatarHot : T.avatarNormal}`}>
                            {nm ? nm.charAt(0) : '?'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[13px] font-semibold truncate ${T.name}`}>{nm || 'New lead…'}</span>
                              {isHot && <Flame size={13} className="text-red-400 shrink-0" />}
                            </div>
                            <p className={`text-[11px] truncate ${T.sub}`}>{svc || 'Awaiting details'}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-md border font-bold tabular-nums text-[11px] px-1.5 py-0.5 shrink-0 ${scorePillCls}`}>
                          {isHot && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />}
                          {score}
                        </span>
                      </div>

                      {/* appointment bar (once booked) */}
                      <AnimatePresence>
                        {booked && apptVal && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border overflow-hidden ${T.apptBar}`}
                          >
                            <Calendar size={13} className={`shrink-0 ${T.apptText}`} />
                            <span className={`text-[11px] font-medium truncate ${T.apptText}`}>{apptVal}</span>
                            <span className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-medium shrink-0 ${T.apptConfirmed}`}>CONFIRMED</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* row 2 — status + contact */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={status}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${statusCls}`}
                          >
                            {status}
                          </motion.span>
                        </AnimatePresence>
                        {pc && <span className={`flex items-center gap-1 text-[11px] ${T.metaText}`}><MapPin size={11} />{pc}</span>}
                        {ph && <span className={`flex items-center gap-1 text-[11px] ${T.metaText}`}><Phone size={11} />{ph}</span>}
                        <span className={`text-[11px] ml-auto ${T.lastMeta}`}>Just now</span>
                      </div>

                      {/* row 3 — source + urgency */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${T.sourceBadge}`}>
                          <MessageCircle size={10} /> WhatsApp
                        </span>
                        {urg && <span className={`text-[11px] font-medium ${T.urgencyText}`}>Emergency</span>}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* booked summary */}
              {ended && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-3.5 ${T.endedCard}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <p className={`text-[13px] font-semibold ${T.endedTitle}`}>Emergency job booked</p>
                  </div>
                  <p className={`text-[12px] leading-relaxed ${T.endedBody}`}>
                    Zero staff time. The AI qualified the homeowner, scored the lead HOT, and booked the
                    inspection, and it all landed straight in your CRM.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

/* ===================== Featured card + wrapper =================== */
export default function RooferDemo() {
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
          {/* preview */}
          <div
            onClick={() => setOpen(true)}
            aria-hidden="true"
            className="relative h-56 md:h-auto flex items-center justify-center overflow-hidden order-2 md:order-1"
            style={{ background: `linear-gradient(to bottom right, ${ACCENT}2e, ${ACCENT_2}0a)` }}
          >
            <div className="absolute w-56 h-56 rounded-full border opacity-20" style={{ borderColor: ACCENT, top: '-25%', right: '-12%' }} />
            <div className="absolute w-24 h-24 rotate-45 border opacity-15" style={{ borderColor: ACCENT, bottom: '-8%', left: '8%' }} />

            {/* mini chat preview */}
            <div className="relative flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#fff]"
                style={{ background: `linear-gradient(to bottom right, ${ACCENT}, ${ACCENT_2})`, boxShadow: `0 0 30px ${ACCENT}66` }}
              >
                <MessageCircle size={26} />
              </div>
              <div className="flex flex-col gap-1.5 w-40">
                <span className="self-start h-3.5 rounded-full bg-white/15" style={{ width: '70%' }} />
                <span className="self-end h-3.5 rounded-full" style={{ width: '85%', background: `${ACCENT}80` }} />
                <span className="self-start h-3.5 rounded-full bg-white/15" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-primary/30">
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-[#fff]" style={{ background: ACCENT }}>
                <Play size={14} /> View Demo
              </span>
            </div>
          </div>

          {/* content */}
          <div className="p-7 sm:p-8 order-1 md:order-2 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}25` }}
              >
                Chat AI · Live Demo
              </span>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>

            <h3
              className="font-heading font-bold text-white text-xl sm:text-2xl mb-2 transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              RoofDesk AI Receptionist
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              A WhatsApp AI that answers every enquiry, qualifies the homeowner, scores the lead, and books the
              inspection. It all lands in the roofer's CRM in real time. Watch a storm leak become a booked job.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="self-start relative inline-flex items-center gap-2 px-7 py-3.5 font-heading font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-[#fff]"
              style={{ background: ACCENT, boxShadow: `0 0 30px ${ACCENT}40` }}
            >
              <Play size={15} /> View Demo
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && <DemoModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
