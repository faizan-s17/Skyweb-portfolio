import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, X, RotateCcw, PhoneCall, ArrowUpRight, Waypoints, Clock,
  Stethoscope, CalendarClock, CheckCheck, User, ShieldCheck, MailCheck, CalendarCheck,
  Scissors, UserCheck, Smartphone, MessageSquare, Sparkles, Flower2, CheckCircle2,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * Per-niche themes. Each demo drives the whole modal's colour — the
 * spectrum bars, cards, controls and header all read from here, so
 * clicking a niche re-skins the experience.
 *   main/deep = hex accents · the *Rgb strings feed the canvas gradients
 * ------------------------------------------------------------------ */
const THEMES = {
  dental: { main: '#4f9cf9', deep: '#2f6bff', top: '143,192,255', mid: '79,156,249', low: '47,107,255', glow: '79,156,249' },
  barber: { main: '#f5b342', deep: '#e0843c', top: '255,214,140', mid: '245,179,66', low: '224,132,60', glow: '245,179,66' },
  medspa: { main: '#c084fc', deep: '#a855f7', top: '216,180,254', mid: '192,132,252', low: '168,85,247', glow: '192,132,252' },
  salon:  { main: '#f472b6', deep: '#ec4899', top: '249,168,212', mid: '244,114,182', low: '236,72,153', glow: '244,114,182' },
}

const rgba = (rgb, a) => `rgba(${rgb},${a})`

/* The player follows the site theme. Pinning the theme tokens on the modal
 * root re-points every text-white/x, bg-white/x and border-white/x utility
 * inside it, and `surfaceset()` supplies the handful of literal backgrounds
 * (navy stage, panels, scrims) that can't be expressed as tokens. */
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

/* literal surfaces + foreground-ink alpha helper for the current theme */
const surfaceset = (light, glow) =>
  light
    ? {
        stage: 'radial-gradient(120% 100% at 50% 0%, #ffffff 0%, #eef3f9 45%, #e4ecf5 100%)',
        rail: 'rgba(255,255,255,0.62)',
        footer: 'rgba(255,255,255,0.72)',
        scrim: 'linear-gradient(to top, rgba(238,243,249,0.92) 12%, rgba(238,243,249,0.4) 55%, transparent)',
        backdrop: 'rgba(11,18,32,0.45)',
        card: '#ffffff',
        cardShadow: '0 1px 2px rgba(11,18,32,0.06), 0 8px 22px rgba(11,18,32,0.07)',
        ink: '11,18,32',
      }
    : {
        stage: 'radial-gradient(120% 100% at 50% 0%, #0a1224 0%, #070c1a 45%, #04070f 100%)',
        rail: 'rgba(6,11,26,0.55)',
        footer: 'rgba(4,7,15,0.6)',
        scrim: 'linear-gradient(to top, rgba(4,7,15,0.9) 12%, rgba(4,7,15,0.35) 55%, transparent)',
        backdrop: 'rgba(3,6,15,0.9)',
        card: 'rgba(255,255,255,0.035)',
        cardShadow: `0 0 26px rgba(${glow},0.05)`,
        ink: '255,255,255',
      }

/* ------------------------------------------------------------------ *
 * DENTAL — transcript + captured cards. DO NOT retime.
 * `start` = second each line begins; each stays until the next begins.
 * ------------------------------------------------------------------ */
const DENTAL_LINES = [
  { start: 0.00,  speaker: 'ai',      text: 'Thank you for calling Smile Dental Clinic. How can I help you today?' },
  { start: 3.17,  speaker: 'patient', text: "Hi, I've been having really bad tooth pain for a couple of days. I was hoping to get an appointment." },
  { start: 8.30,  speaker: 'ai',      text: "I'm sorry to hear that. I can help you with that. Is this your first time visiting us?" },
  { start: 12.90, speaker: 'patient', text: 'Yes, first time.' },
  { start: 14.17, speaker: 'ai',      text: 'No problem, welcome. Let me check availability for you. We have an opening this Thursday the twelfth at ten in the morning. Does that work for you?' },
  { start: 22.80, speaker: 'patient', text: 'Thursday works, yeah.' },
  { start: 24.27, speaker: 'ai',      text: 'Great. Can I take your full name please?' },
  { start: 26.53, speaker: 'patient', text: "It's James Whitfield." },
  { start: 28.00, speaker: 'ai',      text: 'And could I get a phone number and email address for you?' },
  { start: 30.83, speaker: 'patient', text: "Sure, it's 07911 223 456. And my email is james.whitfield@gmail.com." },
  { start: 38.93, speaker: 'ai',      text: 'Perfect. And do you have any insurance, or will you be paying privately?' },
  { start: 42.90, speaker: 'patient', text: "I've got Bupa dental cover." },
  { start: 44.40, speaker: 'ai',      text: 'Brilliant, I\'ve noted that. Just to confirm — I have James Whitfield booked in for tooth pain treatment this Thursday the twelfth at ten in the morning. Shall I go ahead and confirm that for you?' },
  { start: 54.27, speaker: 'patient', text: 'Yes please.' },
  { start: 55.30, speaker: 'ai',      text: "All done. You'll receive a confirmation email shortly. Is there anything else I can help you with today?" },
  { start: 60.77, speaker: 'patient', text: "No, that's great. Thank you." },
  { start: 62.30, speaker: 'ai',      text: 'Thank you for calling Smile Dental Clinic. Take care.' },
]
const DENTAL_CARDS = [
  { afterLine: 3,  Icon: Stethoscope,   label: 'Request Type',  value: 'Tooth Pain',       sub: 'Urgent' },
  { afterLine: 5,  Icon: CalendarClock, label: 'Booking Time',  value: 'Thu, Jun 12',      sub: '10:00 AM GMT' },
  { afterLine: 6,  Icon: CheckCheck,    label: 'Slot',          value: 'Confirmed',        sub: 'Available' },
  { afterLine: 8,  Icon: User,          label: 'Patient',       value: 'James Whitfield',  sub: 'New patient' },
  { afterLine: 12, Icon: ShieldCheck,   label: 'Insurance',     value: 'Bupa Dental',      sub: 'Verified' },
  { afterLine: 15, Icon: MailCheck,     label: 'Confirmation',  value: 'Email Sent',       sub: 'Instant' },
  { afterLine: 15, Icon: CalendarCheck, label: 'Calendar',      value: 'Slot Updated',     sub: 'Synced' },
]

/* ------------------------------------------------------------------ *
 * BARBER — transcript + captured cards. DO NOT retime.
 * ------------------------------------------------------------------ */
const BARBER_LINES = [
  { start: 0.00,  speaker: 'ai',     text: 'Hi, thanks for calling Skyweb Barbers. How can I help?' },
  { start: 3.27,  speaker: 'caller', text: "Hi — I'd like to book a skin fade, hopefully for Saturday if you have anything." },
  { start: 7.83,  speaker: 'ai',     text: 'Sure, I can help with that. Have you been in with us before?' },
  { start: 10.87, speaker: 'caller', text: 'Yeah, I usually go to Marco.' },
  { start: 12.70, speaker: 'ai',     text: 'Great. Let me take a look... Marco has two thirty on Saturday — does that work for you?' },
  { start: 17.80, speaker: 'caller', text: "Yeah, two thirty's good." },
  { start: 19.33, speaker: 'ai',     text: 'Perfect. Can I get your name?' },
  { start: 20.67, speaker: 'caller', text: "It's Danny Brooks." },
  { start: 21.97, speaker: 'ai',     text: 'Thanks, Danny. And the best number for your reminder?' },
  { start: 24.93, speaker: 'caller', text: "Sure — it's five five five, zero one, four eight." },
  { start: 28.37, speaker: 'ai',     text: "Got it, Danny. Your booking is confirmed — a skin fade with Marco this Saturday at two thirty. I'll send your booking details over by text shortly." },
  { start: 38.23, speaker: 'caller', text: 'Perfect, thank you.' },
  { start: 39.77, speaker: 'ai',     text: 'Thank you for choosing Skyweb Barbers, Danny. We look forward to seeing you on Saturday.' },
]
const BARBER_CARDS = [
  { afterLine: 2,  Icon: Scissors,      label: 'Service',      value: 'Skin Fade',     sub: 'Haircut' },
  { afterLine: 4,  Icon: UserCheck,     label: 'Barber',       value: 'Marco',         sub: 'Regular' },
  { afterLine: 6,  Icon: CalendarClock, label: 'Booking Time', value: 'Sat · 2:30 PM', sub: 'Confirmed' },
  { afterLine: 6,  Icon: CheckCheck,    label: 'Slot',         value: 'Confirmed',     sub: 'Available' },
  { afterLine: 8,  Icon: User,          label: 'Customer',     value: 'Danny Brooks',  sub: 'Returning' },
  { afterLine: 10, Icon: Smartphone,    label: 'Reminder To',  value: '··· ··· 0148',  sub: 'SMS' },
  { afterLine: 11, Icon: MessageSquare, label: 'Confirmation', value: 'Text Sent',     sub: 'Instant' },
  { afterLine: 11, Icon: CalendarCheck, label: 'Calendar',     value: 'Slot Updated',  sub: 'Synced' },
]

/* ------------------------------------------------------------------ *
 * The niches. Dental + Barber are live; Med Spas + Salons are recorded
 * placeholders (no audio yet) that still re-skin the stage on click.
 * ------------------------------------------------------------------ */
const DEMOS = [
  {
    id: 'dental', label: 'Dental Clinics', Icon: Stethoscope, company: 'Smile Dental Clinic',
    audio: '/dental-demo.mp3', ready: true, theme: THEMES.dental, lines: DENTAL_LINES, cards: DENTAL_CARDS,
    intro: 'Press play to hear a real inbound call, answered, qualified, and booked end-to-end by the AI receptionist.',
    booked: 'Zero staff time. The AI qualified the caller, booked the slot, captured insurance, and sent confirmation, all in under 90 seconds.',
    features: ['Answers instantly, 24/7', 'Books the appointment live', 'Captures insurance & contact info'],
  },
  {
    id: 'barber', label: 'Barbershops', Icon: Scissors, company: 'Skyweb Barbers',
    audio: '/barber-demo.mp3', ready: true, theme: THEMES.barber, lines: BARBER_LINES, cards: BARBER_CARDS,
    intro: 'Press play to hear a real booking, answered, matched to the right barber, and confirmed by text.',
    booked: 'Zero staff time. The AI greeted the caller, matched them to their barber, booked the slot, and sent a confirmation text, all in under a minute.',
    features: ['Answers instantly, 24/7', 'Matches the right barber', 'Texts a confirmation automatically'],
  },
  { id: 'medspa', label: 'Med Spas',      Icon: Sparkles, ready: false, theme: THEMES.medspa },
  { id: 'salon',  label: 'Salons & Spas', Icon: Flower2,  ready: false, theme: THEMES.salon },
]
// precompute cue tables for the live demos
DEMOS.forEach((d) => { if (d.lines) d.cues = d.lines.map((l) => l.start) })

const fmt = (s) => {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* rounded-rect path helper for the canvas spectrum */
function roundRectPath(c, x, y, w, h, r) {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2))
  c.beginPath()
  c.moveTo(x + rr, y)
  c.arcTo(x + w, y, x + w, y + h, rr)
  c.arcTo(x + w, y + h, x, y + h, rr)
  c.arcTo(x, y + h, x, y, rr)
  c.arcTo(x, y, x + w, y, rr)
  c.closePath()
}

/* ============================ Modal ============================== */
function DemoModal({ onClose, initialId = 'dental' }) {
  const audioRef = useRef(null)
  const voiceCanvasRef = useRef(null)
  const ctxRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const activeLineRef = useRef(-1)
  const pendingPlayRef = useRef(false)
  // true once the user has pressed play, replay, or seeked at least once —
  // distinguishes "genuinely idle" from "paused mid-call", so the tick loop
  // below knows when it's safe to start tracking cues (see tick's guard).
  const interactedRef = useRef(false)

  const [activeId, setActiveId] = useState(initialId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeLine, setActiveLine] = useState(-1)
  const [ended, setEnded] = useState(false)

  const demo = DEMOS.find((d) => d.id === activeId) || DEMOS[0]
  const t = demo.theme
  const demoRef = useRef(demo)
  useEffect(() => { demoRef.current = demo }, [demo])

  // follow the site theme (read once — the toggle lives behind the modal, so it
  // can't change while the player is open)
  const [light] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('light'),
  )
  const STAGE = light ? LIGHT_STAGE : DARK_STAGE
  const surf = surfaceset(light, t.glow)
  const ink = (a) => `rgba(${surf.ink},${a})`

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

  /* wire up the reactive visualiser (guarded for StrictMode double-mount) */
  const ensureGraph = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    try {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!ctxRef.current) ctxRef.current = new AC()
      const ctx = ctxRef.current
      if (!sourceRef.current) {
        sourceRef.current = ctx.createMediaElementSource(audio)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 256
        analyser.smoothingTimeConstant = 0.8
        sourceRef.current.connect(analyser)
        analyser.connect(ctx.destination)
        analyserRef.current = analyser
      }
    } catch {
      /* visualiser is optional — ignore if routing fails */
    }
  }, [])

  /* draw loop: centred voice line + subtitle/card sync */
  const tick = useCallback(function tickFrame() {
    const audio = audioRef.current
    const dm = demoRef.current
    // only track the clock/subtitles once the user has interacted at least
    // once — a paused, never-played audio element already reports currentTime
    // 0, which is >= the very first cue (0.00s), so without this guard
    // activeLine jumps to 0 on mount and skips straight past the idle intro
    // before anyone presses play. Gating on interactedRef (not isPlaying)
    // keeps seeking-while-paused working, since seeking doesn't set isPlaying.
    // A not-ready niche must not inherit the previous call's position either,
    // hence the dm.ready check.
    if (audio && dm && dm.ready && interactedRef.current) {
      const t2 = audio.currentTime
      if (Math.abs(t2 - lastTimeRef.current) >= 0.1) {
        lastTimeRef.current = t2
        setTime(t2)
      }
      const cues = dm.cues
      if (cues) {
        let idx = -1
        for (let i = 0; i < cues.length; i++) { if (t2 >= cues[i]) idx = i; else break }
        if (idx !== activeLineRef.current) {
          activeLineRef.current = idx
          setActiveLine(idx)
        }
      }
    }

    const th = (dm && dm.theme) || THEMES.dental
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const analyser = analyserRef.current
    let freq
    if (analyser && isPlaying) {
      freq = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(freq)
    }

    /* ---- centred voice line: the call's "presence" in the middle of the
       stage. Bars mirror around a glowing wire and taper to the edges. ---- */
    const vc = voiceCanvasRef.current
    if (vc) {
      const w = vc.clientWidth
      const h = vc.clientHeight
      if (w > 0 && h > 0) {
        if (vc.width !== Math.round(w * dpr) || vc.height !== Math.round(h * dpr)) {
          vc.width = Math.round(w * dpr)
          vc.height = Math.round(h * dpr)
        }
        const c = vc.getContext('2d')
        c.setTransform(dpr, 0, 0, dpr, 0, 0)
        c.clearRect(0, 0, w, h)

        const cy = h / 2
        const bars = 56
        const gap = 5
        const bw = Math.max(2, (w - gap * (bars - 1)) / bars)
        const mid = (bars - 1) / 2
        const now = Date.now()

        // pass 1 — resolve each bar's level so the glow can react to the average
        const vals = new Array(bars)
        let amp = 0
        for (let i = 0; i < bars; i++) {
          const d = Math.abs(i - mid) / mid           // 0 centre → 1 edges
          const envelope = Math.cos((d * Math.PI) / 2) // taper the line off at the edges
          let v
          if (freq) {
            const bin = Math.floor(d * freq.length * 0.65)
            v = (freq[bin] || 0) / 255
          } else {
            const base = isPlaying ? 0.3 : 0.1
            v = base + Math.abs(Math.sin(now / 260 + i * 0.4)) * (isPlaying ? 0.5 : 0.06)
          }
          vals[i] = v * envelope
          amp += v
        }
        amp /= bars

        // soft breathing glow behind the line
        const glow = c.createRadialGradient(w / 2, cy, 0, w / 2, cy, Math.max(w * 0.42, 1))
        glow.addColorStop(0, rgba(th.mid, 0.1 + amp * 0.16))
        glow.addColorStop(1, rgba(th.mid, 0))
        c.fillStyle = glow
        c.fillRect(0, 0, w, h)

        // the bars themselves, mirrored around the centre wire
        for (let i = 0; i < bars; i++) {
          const v = vals[i]
          const bh = Math.max(2, v * h * 0.86)
          const x = i * (bw + gap)
          const y = cy - bh / 2
          const g = c.createLinearGradient(0, y, 0, y + bh)
          g.addColorStop(0, rgba(th.top, 0.35 + v * 0.5))
          g.addColorStop(0.5, rgba(th.mid, 0.55 + v * 0.45))
          g.addColorStop(1, rgba(th.low, 0.35 + v * 0.5))
          c.fillStyle = g
          roundRectPath(c, x, y, bw, bh, bw / 2)
          c.fill()
        }

        // the wire running through the middle, brightening with the voice
        const wire = c.createLinearGradient(0, 0, w, 0)
        wire.addColorStop(0, rgba(th.mid, 0))
        wire.addColorStop(0.5, rgba(th.top, 0.3 + amp * 0.5))
        wire.addColorStop(1, rgba(th.mid, 0))
        c.fillStyle = wire
        c.fillRect(0, cy - 0.75, w, 1.5)
      }
    }

    rafRef.current = requestAnimationFrame(tickFrame)
  }, [isPlaying])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  /* cleanup audio context on unmount */
  useEffect(() => {
    const audio = audioRef.current
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (audio) { audio.pause() }
      const ctx = ctxRef.current
      if (ctx && ctx.state !== 'closed') ctx.close().catch(() => {})
    }
  }, [])

  /* after switching to a live demo (via a niche click) auto-start it */
  useEffect(() => {
    if (!pendingPlayRef.current) return
    pendingPlayRef.current = false
    const audio = audioRef.current
    if (!audio) return
    interactedRef.current = true
    const start = async () => {
      ensureGraph()
      if (ctxRef.current && ctxRef.current.state === 'suspended') {
        try { await ctxRef.current.resume() } catch { /* noop */ }
      }
      try { await audio.play(); setIsPlaying(true) } catch { /* user can press play */ }
    }
    start()
  }, [activeId, ensureGraph])

  const switchDemo = (id) => {
    if (id === activeId) return
    const next = DEMOS.find((d) => d.id === id)
    if (!next) return
    const audio = audioRef.current
    if (audio) audio.pause()
    setIsPlaying(false)
    setEnded(false)
    setTime(0)
    setDuration(0)
    setActiveLine(-1)
    lastTimeRef.current = 0
    activeLineRef.current = -1
    interactedRef.current = false
    pendingPlayRef.current = next.ready
    setActiveId(id)
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !demo.ready) return
    interactedRef.current = true
    ensureGraph()
    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      try { await ctxRef.current.resume() } catch { /* noop */ }
    }
    if (audio.paused) {
      if (ended) { audio.currentTime = 0; setEnded(false) }
      try { await audio.play(); setIsPlaying(true) } catch { /* noop */ }
    } else {
      audio.pause(); setIsPlaying(false)
    }
  }

  const replay = async () => {
    const audio = audioRef.current
    if (!audio || !demo.ready) return
    interactedRef.current = true
    ensureGraph()
    if (ctxRef.current && ctxRef.current.state === 'suspended') {
      try { await ctxRef.current.resume() } catch { /* noop */ }
    }
    audio.currentTime = 0
    setEnded(false)
    try { await audio.play(); setIsPlaying(true) } catch { /* noop */ }
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration || !demo.ready) return
    interactedRef.current = true
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setEnded(false)
  }

  const seekKey = (e) => {
    const audio = audioRef.current
    if (!audio || !duration || !demo.ready) return
    interactedRef.current = true
    if (e.key === 'ArrowRight') { e.preventDefault(); audio.currentTime = Math.min(duration, audio.currentTime + 5); setEnded(false) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - 5); setEnded(false) }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); togglePlay() }
  }

  const progress = duration ? Math.min(100, (time / duration) * 100) : 0
  const cards = demo.cards || []
  const visibleCards = demo.ready ? cards.filter((card) => activeLine >= card.afterLine) : []
  const lines = demo.lines || []
  const winStart = activeLine >= 0 ? Math.max(0, activeLine - 2) : 0
  const subWindow = (demo.ready && activeLine >= 0) ? lines.slice(winStart, activeLine + 1) : []
  const status = !demo.ready ? 'Soon' : isPlaying ? 'Live' : ended ? 'Ended' : 'Ready'

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[120] flex items-center justify-center sm:p-4 md:p-6"
      style={STAGE}
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 backdrop-blur-md" style={{ background: surf.backdrop }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="SkyWeb FrontDesk AI Receptionist voice demo"
        className="relative w-full h-full sm:h-auto sm:max-w-6xl sm:max-h-[92vh] flex flex-col overflow-hidden sm:rounded-3xl border border-white/10"
        style={{
          background: surf.stage,
          boxShadow: `0 0 140px ${rgba(t.glow, 0.14)}`,
        }}
      >
        {/* ---- ambience ---- */}
        <div className="absolute inset-0 pointer-events-none bg-grid opacity-[0.12]" />
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[60%] rounded-full pointer-events-none blur-3xl transition-colors duration-500"
          style={{ background: `radial-gradient(circle, ${rgba(t.glow, 0.18)}, transparent 70%)` }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ background: surf.scrim }}
        />

        <audio
          ref={audioRef}
          src={demo.ready ? demo.audio : undefined}
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={(e) => {
            setIsPlaying(false)
            setEnded(true)
            lastTimeRef.current = e.currentTarget.duration
            setTime(e.currentTarget.duration)
          }}
        />

        {/* ============ header ============ */}
        <div className="relative z-10 flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-white/[0.07]">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#fff] shrink-0 transition-colors duration-500"
            style={{ background: `linear-gradient(135deg, ${t.main}, ${t.deep})`, boxShadow: `0 0 22px ${rgba(t.glow, 0.4)}` }}
          >
            <demo.Icon size={17} />
          </span>
          <div className="min-w-0">
            <p className="font-heading font-bold text-white text-sm leading-tight truncate">
              SkyWeb <span style={{ color: t.main }}>FrontDesk</span>
            </p>
            <p className="text-white/40 text-xs truncate">
              AI Voice Receptionist{demo.company ? ` · ${demo.company}` : ` · ${demo.label}`}
            </p>
          </div>

          <span
            className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors duration-500"
            style={{ background: rgba(t.glow, 0.12), border: `1px solid ${rgba(t.glow, 0.3)}`, color: t.main }}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ background: t.main }} />
            {status}
          </span>
          <button
            onClick={onClose}
            aria-label="Close demo"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/60 hover:text-white transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* ============ body ============ */}
        <div className="relative z-10 flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[clamp(210px,19vw,260px)_1fr_clamp(270px,23vw,330px)] overflow-y-auto lg:overflow-hidden">

          {/* ---- left rail: niches (click to switch) ---- */}
          <aside
            className="order-1 lg:order-none border-b lg:border-b-0 lg:border-r border-white/[0.07] p-4 sm:p-5 lg:overflow-y-auto"
            style={{ background: surf.rail }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Waypoints size={14} style={{ color: t.main }} />
              <p className="section-label" style={{ color: t.main }}>One agent · any business</p>
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-4 hidden lg:block">
              Same receptionist, different front desk. Tap a niche to switch the live call.
            </p>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {DEMOS.map((n) => {
                const isActive = n.id === activeId
                const nt = n.theme
                return (
                  <button
                    key={n.id}
                    onClick={() => switchDemo(n.id)}
                    aria-pressed={isActive}
                    className="shrink-0 flex items-center gap-2.5 rounded-xl px-3 py-2.5 border text-left transition-colors"
                    style={
                      isActive
                        ? { background: rgba(nt.glow, 0.12), borderColor: rgba(nt.glow, 0.4) }
                        : { background: ink(0.03), borderColor: ink(0.09), opacity: n.ready ? 1 : 0.7 }
                    }
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={
                        isActive
                          ? { background: `linear-gradient(135deg, ${nt.main}, ${nt.deep})`, color: '#fff' }
                          : { background: ink(0.06), color: ink(0.55) }
                      }
                    >
                      <n.Icon size={15} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium text-white/85 whitespace-nowrap lg:whitespace-normal">{n.label}</p>
                      {isActive && n.ready ? (
                        <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider" style={{ color: nt.main }}>
                          <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: nt.main }} />
                          Now playing
                        </span>
                      ) : n.ready ? (
                        <span className="text-[9px] font-mono uppercase tracking-wider text-white/35">Tap to play</span>
                      ) : (
                        <span className="flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-white/30">
                          <Clock size={9} /> Coming soon
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </aside>

          {/* ---- center stage ---- */}
          <section className="order-2 lg:order-none relative flex flex-col items-center justify-end px-5 sm:px-8 pt-8 pb-6 min-h-[42vh] lg:min-h-0">
            {demo.ready ? (
              <>
                {/* listening indicator */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="flex items-end gap-0.5 h-4">
                    {[0.5, 0.85, 0.4, 1, 0.6].map((hgt, i) => (
                      <span
                        key={i}
                        className={`w-0.5 rounded-full ${isPlaying ? 'dm-bar' : ''}`}
                        style={{ height: `${hgt * 100}%`, background: t.main, animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
                    {isPlaying ? 'Listening' : ended ? 'Call complete' : 'Ready to call'}
                  </span>
                </div>

                {/* centred voice line — the live "presence" of the call */}
                <div className="flex-1 w-full flex items-center justify-center min-h-[110px] pointer-events-none">
                  <canvas
                    ref={voiceCanvasRef}
                    className="w-full max-w-xl h-[130px] select-none"
                    aria-hidden="true"
                  />
                </div>

                {/* scrolling subtitles */}
                <div className="w-full max-w-2xl text-center min-h-[130px] flex flex-col justify-end gap-2">
                  <AnimatePresence initial={false}>
                    {subWindow.length > 0 ? (
                      subWindow.map((l, idx) => {
                        const globalIdx = winStart + idx
                        const isCurrent = globalIdx === activeLine
                        return (
                          <motion.div
                            key={`${demo.id}-${globalIdx}`}
                            layout
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: isCurrent ? 1 : 0.32, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                          >
                            {isCurrent && (
                              <span
                                className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded mb-2"
                                style={
                                  l.speaker === 'ai'
                                    ? { background: rgba(t.glow, 0.15), color: t.main, border: `1px solid ${rgba(t.glow, 0.3)}` }
                                    : { background: ink(0.06), color: ink(0.6), border: `1px solid ${ink(0.12)}` }
                                }
                              >
                                {l.speaker === 'ai' ? 'AI Receptionist' : 'Caller'}
                              </span>
                            )}
                            <p
                              className={`${isCurrent ? 'text-white font-semibold text-lg sm:text-xl leading-snug' : 'text-white/45 text-sm sm:text-base leading-snug'} ${l.speaker === 'ai' ? 'italic' : ''}`}
                            >
                              {l.text}
                            </p>
                          </motion.div>
                        )
                      })
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-4"
                      >
                        <span
                          className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                          style={{ background: rgba(t.glow, 0.12), border: `1px solid ${rgba(t.glow, 0.3)}`, color: t.main }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: t.main }} />
                          Real recorded call, not scripted
                        </span>
                        <p className="text-white/45 text-base sm:text-lg leading-relaxed max-w-lg">
                          {demo.intro}
                        </p>
                        {demo.features && (
                          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                            {demo.features.map((f) => (
                              <span
                                key={f}
                                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                                style={{ background: ink(0.04), border: `1px solid ${ink(0.09)}`, color: ink(0.65) }}
                              >
                                <CheckCircle2 size={12} style={{ color: t.main }} />
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* coming-soon placeholder for un-recorded niches */
              <div className="w-full flex-1 flex flex-col items-center justify-center text-center gap-4 py-10">
                <span
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#fff]"
                  style={{ background: `linear-gradient(135deg, ${t.main}, ${t.deep})`, boxShadow: `0 0 30px ${rgba(t.glow, 0.4)}` }}
                >
                  <demo.Icon size={28} />
                </span>
                <div>
                  <p className="font-heading font-bold text-white text-lg sm:text-xl mb-1.5">{demo.label} demo: coming soon</p>
                  <p className="text-white/45 text-sm max-w-md leading-relaxed">
                    We haven't recorded this one yet. The <span style={{ color: THEMES.dental.main }}>dental</span> and{' '}
                    <span style={{ color: THEMES.barber.main }}>barbershop</span> calls are live now. Try those, or check back soon.
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full"
                  style={{ background: rgba(t.glow, 0.12), border: `1px solid ${rgba(t.glow, 0.3)}`, color: t.main }}
                >
                  <Clock size={12} /> In production
                </span>
              </div>
            )}
          </section>

          {/* ---- right rail: captured pop-ups ---- */}
          <aside
            className="order-3 lg:order-none border-t lg:border-t-0 lg:border-l border-white/[0.07] p-4 sm:p-5 lg:overflow-y-auto"
            style={{ background: surf.rail }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="section-label" style={{ color: t.main }}>Captured by AI</p>
              <span className="text-[10px] font-mono text-white/30">{visibleCards.length}/{demo.ready ? cards.length : 0}</span>
            </div>

            {ended && demo.ready && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 rounded-xl"
                style={{ background: rgba(t.glow, 0.1), border: `1px solid ${rgba(t.glow, 0.28)}` }}
              >
                <p className="text-sm text-white font-semibold mb-0.5">Appointment booked ✓</p>
                <p className="text-white/55 text-xs leading-relaxed">{demo.booked}</p>
              </motion.div>
            )}

            <div className="space-y-2.5">
              <AnimatePresence>
                {visibleCards.map((card) => (
                  <motion.div
                    key={`${demo.id}-${card.label}-${card.value}`}
                    layout
                    initial={{ opacity: 0, x: 26, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="flex items-center gap-3 p-3 rounded-2xl"
                    style={{ background: surf.card, border: `1px solid ${rgba(t.glow, 0.16)}`, boxShadow: surf.cardShadow }}
                  >
                    <span
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#fff]"
                      style={{ background: `linear-gradient(135deg, ${t.main}, ${t.deep})`, boxShadow: `0 0 16px ${rgba(t.glow, 0.35)}` }}
                    >
                      <card.Icon size={16} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-white/40">{card.label}</p>
                      <p className="text-sm text-white font-semibold leading-tight truncate">
                        {card.value}
                        {card.sub && <span className="text-white/40 font-normal"> · {card.sub}</span>}
                      </p>
                    </div>
                    <CheckCheck size={14} className="shrink-0" style={{ color: t.main }} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {visibleCards.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-9 px-4 rounded-xl border border-dashed border-white/[0.09]">
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 mb-3">
                    <CalendarCheck size={18} />
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {demo.ready
                      ? 'Booking details pop in here in real time as the call progresses.'
                      : 'Nothing captured yet. This demo hasn\'t been recorded.'}
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ============ footer controls ============ */}
        <div className="relative z-10 px-4 sm:px-6 py-3.5 border-t border-white/[0.07]" style={{ background: surf.footer }}>
          <div
            onClick={seek}
            onKeyDown={seekKey}
            role="slider"
            tabIndex={demo.ready ? 0 : -1}
            aria-label="Seek through the call"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration) || 0}
            aria-valuenow={Math.round(time)}
            aria-disabled={!demo.ready}
            className="group relative w-full py-1.5 rounded focus:outline-none focus-visible:ring-2"
            style={{ '--tw-ring-color': rgba(t.glow, 0.5), cursor: demo.ready ? undefined : 'default' }}
          >
            <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-150"
                style={{ width: `${progress}%`, background: `linear-gradient(to right, ${t.main}, ${t.deep})` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2.5">
            <button
              onClick={togglePlay}
              disabled={!demo.ready}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-12 h-12 rounded-full flex items-center justify-center text-[#061024] hover:scale-105 active:scale-95 transition-transform disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-default"
              style={{ background: t.main, boxShadow: `0 0 28px ${rgba(t.glow, 0.45)}` }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button
              onClick={replay}
              disabled={!demo.ready}
              aria-label="Replay"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-default"
            >
              <RotateCcw size={15} />
            </button>
            <span className="hidden sm:block text-white/35 text-xs">
              {!demo.ready
                ? 'This demo hasn\'t been recorded yet.'
                : isPlaying
                  ? 'Real call, handled end-to-end. No staff, no hold time.'
                  : 'Press play to start the live call.'}
            </span>
            <span className="ml-auto font-mono text-xs text-white/40 tabular-nums">
              {fmt(demo.ready ? time : 0)} / {fmt(demo.ready ? duration : 0)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

/* ===================== Featured card + wrapper =================== */
export default function DentalDemo() {
  const [open, setOpen] = useState(false)
  const BLUE = THEMES.dental.main
  const BLUE_DEEP = THEMES.dental.deep

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="group md:col-span-2 card-glass overflow-hidden hover:border-white/[0.12] transition-colors duration-500"
        style={{ boxShadow: '0 0 80px rgba(79,156,249,0.08)' }}
      >
        <div className="grid md:grid-cols-2">
          {/* preview (mouse shortcut to open; the labelled button below is the a11y control) */}
          <div
            onClick={() => setOpen(true)}
            aria-hidden="true"
            className="relative h-56 md:h-auto flex items-center justify-center overflow-hidden order-2 md:order-1"
            style={{ background: 'linear-gradient(135deg, rgba(79,156,249,0.18), rgba(47,107,255,0.04))' }}
          >
            <div className="absolute w-56 h-56 rounded-full border opacity-20" style={{ borderColor: BLUE, top: '-25%', right: '-12%' }} />
            <div className="absolute w-24 h-24 rotate-45 border opacity-15" style={{ borderColor: BLUE, bottom: '-8%', left: '8%' }} />

            {/* mini call preview */}
            <div className="relative flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#fff]"
                style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_DEEP})`, boxShadow: '0 0 30px rgba(79,156,249,0.45)' }}
              >
                <PhoneCall size={26} />
              </div>
              <div className="flex items-end gap-1 h-7">
                {[0.5, 0.9, 0.4, 1, 0.65, 0.85, 0.45, 0.95, 0.55].map((h, i) => (
                  <span
                    key={i}
                    className="dm-bar w-1 rounded-full"
                    style={{ height: `${h * 100}%`, background: 'rgba(79,156,249,0.75)', animationDelay: `${i * 0.09}s` }}
                  />
                ))}
              </div>
            </div>

            {/* hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-primary/30">
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-[#061024]" style={{ background: BLUE }}>
                <Play size={14} /> Play Live Demo
              </span>
            </div>
          </div>

          {/* content */}
          <div className="p-7 sm:p-8 order-1 md:order-2 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ background: 'rgba(79,156,249,0.1)', color: BLUE, border: '1px solid rgba(79,156,249,0.22)' }}
              >
                Voice AI · Live Demo
              </span>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>

            <h3 className="font-heading font-bold text-white text-xl sm:text-2xl mb-2 transition-colors duration-300">
              AI Voice Receptionist
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              One AI agent answers every call, qualifies the caller, books the appointment, and captures the details.
              Deploy it for dental, barbershops, med spas, and beyond. Hit play, then switch niche right inside the demo.
            </p>

            <button
              onClick={() => setOpen(true)}
              className="self-start inline-flex items-center gap-2 px-7 py-3.5 font-heading font-semibold text-sm rounded-full text-[#061024] transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: BLUE, boxShadow: '0 0 30px rgba(79,156,249,0.4)' }}
            >
              <Play size={15} /> Play Live Demo
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
