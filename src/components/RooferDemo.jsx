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

/* storm / sky blue — distinct from the teal dental + gold barber demos,
 * and on-theme for "SkyWeb" + roofing (sky, weather, storms) */
const ACCENT = '#4f9cf9'
const ACCENT_2 = '#2f6fd6'

/* WhatsApp dark-theme bubble colours for authenticity */
const WA_OUT = '#075e54cc' // our side (AI) — green
const WA_IN = '#202c33'    // customer side — grey
const WA_BG = '#0b141a'

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
function KpiTile({ label, value, Icon, color, highlight }) {
  return (
    <div className={`rounded-xl border bg-[#0f0f10] px-2.5 py-2.5 ${highlight ? 'border-red-500/30' : 'border-zinc-800/60'}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider truncate">{label}</span>
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
            className="block text-lg font-bold text-zinc-100 tabular-nums leading-none"
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

  /* auto-start shortly after open */
  useEffect(() => {
    const t = setTimeout(() => setPlay(true), 600)
    return () => clearTimeout(t)
  }, [setPlay])

  /* derive everything from the clock */
  const messages = useMemo(() => BEATS.filter((b) => clock >= b.msgAt), [clock])
  const typingSpeaker = useMemo(() => {
    const b = BEATS.find((x) => clock >= x.typingStart && clock < x.msgAt)
    return b ? b.speaker : null
  }, [clock])
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
    ? 'bg-red-500/10 border-red-500/30 text-red-400'
    : score >= 50 ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
    : score >= 25 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
    : 'bg-zinc-800 border-zinc-700 text-zinc-500'
  const statusCls = booked
    ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    : 'text-blue-400 bg-blue-500/10 border-blue-500/30'

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
              className="relative flex items-center gap-3 px-5 py-3.5 pr-12 lg:pr-5"
              style={{ background: '#1f2c33' }}
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
              style={{ background: WA_BG }}
            >
              {/* faint WhatsApp-style texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-grid" />

              {messages.length === 0 && !typingSpeaker && (
                <div className="relative flex items-center justify-center h-full">
                  <p className="text-white/30 text-sm">Starting conversation…</p>
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
                          background: out ? WA_OUT : WA_IN,
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
                      style={{ background: typingSpeaker === 'ai' ? WA_OUT : WA_IN }}
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
            <div className="px-4 py-3 border-t border-white/[0.06]" style={{ background: '#1f2c33' }}>
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
          <div className="relative bg-[#0f0f10] flex flex-col overflow-hidden lg:min-h-0">
            {/* header */}
            <div className="shrink-0 flex items-center gap-2.5 px-4 lg:pr-14 py-3 border-b border-zinc-800 bg-[#161618]">
              <span className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-blue-500/15">
                <Home size={13} className="text-blue-400" />
              </span>
              <span className="text-[13px] font-semibold text-zinc-100">SkyWeb CRM</span>
              <span className="ml-auto flex items-center gap-1.5 text-[11px] text-emerald-400 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${playing ? 'animate-pulse' : ''}`} />
                live
              </span>
            </div>

            {/* scrollable CRM content */}
            <div ref={crmRef} className="overflow-y-auto p-4 space-y-3 lg:flex-1 lg:min-h-0">
              {/* KPI strip — mirrors the dashboard */}
              <div className="grid grid-cols-3 gap-2">
                <KpiTile label="Total Leads" value={totalLeads} Icon={Users} color="#3b82f6" />
                <KpiTile label="Hot Leads" value={hotLeads} Icon={Flame} color="#f87171" highlight={isHot} />
                <KpiTile label="Booked" value={bookedCount} Icon={Calendar} color="#22d3ee" />
              </div>

              {/* Leads table card */}
              <div className="rounded-xl border border-zinc-800/60 bg-[#0f0f10] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/60">
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-zinc-500" />
                    <span className="text-[13px] font-semibold text-zinc-200">Leads</span>
                  </div>
                  <span className="text-[11px] text-zinc-600">{leadCreated ? '1 new' : '—'}</span>
                </div>

                <div className="p-2.5">
                  {!leadCreated ? (
                    <div className="flex items-center justify-center gap-2 py-9 text-zinc-600 text-[13px]">
                      <Inbox size={15} className="opacity-40" /> Listening for new enquiries…
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`rounded-xl border bg-[#0f0f10] p-3 ${isHot ? 'border-red-500/30' : 'border-zinc-800/60'}`}
                    >
                      {/* row 1 — identity + score */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isHot ? 'bg-red-500/15 text-red-300' : 'bg-zinc-800 text-zinc-400'}`}>
                            {nm ? nm.charAt(0) : '?'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[13px] font-semibold text-zinc-200 truncate">{nm || 'New lead…'}</span>
                              {isHot && <Flame size={13} className="text-red-400 shrink-0" />}
                            </div>
                            <p className="text-[11px] text-zinc-500 truncate">{svc || 'Awaiting details'}</p>
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
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 overflow-hidden"
                          >
                            <Calendar size={13} className="text-cyan-400 shrink-0" />
                            <span className="text-[11px] text-cyan-300 font-medium truncate">{apptVal}</span>
                            <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium shrink-0">CONFIRMED</span>
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
                        {pc && <span className="flex items-center gap-1 text-[11px] text-zinc-500"><MapPin size={11} />{pc}</span>}
                        {ph && <span className="flex items-center gap-1 text-[11px] text-zinc-500"><Phone size={11} />{ph}</span>}
                        <span className="text-[11px] text-zinc-700 ml-auto">Just now</span>
                      </div>

                      {/* row 3 — source + urgency */}
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border bg-emerald-500/10 border-emerald-500/20 text-emerald-400">
                          <MessageCircle size={10} /> WhatsApp
                        </span>
                        {urg && <span className="text-[11px] font-medium text-red-400">Emergency</span>}
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
                  className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-3.5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <p className="text-[13px] text-zinc-100 font-semibold">Emergency job booked</p>
                  </div>
                  <p className="text-zinc-400 text-[12px] leading-relaxed">
                    Zero staff time — the AI qualified the homeowner, scored the lead HOT and booked the
                    inspection, all landing in your CRM automatically.
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
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
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
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-white" style={{ background: ACCENT }}>
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
              A WhatsApp AI that answers every enquiry, qualifies the homeowner, scores the lead and books the
              inspection — and it all lands in the roofer's CRM in real time. Watch a storm leak become a booked job.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="self-start relative inline-flex items-center gap-2 px-7 py-3.5 font-heading font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-white"
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
