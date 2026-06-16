import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, X, RotateCcw, Scissors, ArrowUpRight,
  CalendarClock, CheckCheck, User, UserCheck, Smartphone, MessageSquare, CalendarCheck,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * Conversation transcript (subtitles).
 * speaker: 'ai' = Skyweb Barbers receptionist, 'caller' = customer
 * `start` = exact second this line begins, converted from the CapCut
 * timeline (HH:MM:SS:FF @ 30fps → SS + FF/30). Each line stays on
 * screen until the next begins.
 * ------------------------------------------------------------------ */
const LINES = [
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

/* convenient lookup: CUES[i] = second line i begins */
const CUES = LINES.map((l) => l.start)

/* Captured cards — `afterLine` is the 0-based line index; the card appears
 * once the call has reached (activeLine >= afterLine) — i.e. just after the
 * detail it summarises has been spoken, so they trickle in naturally. */
const CARDS = [
  { afterLine: 2,  Icon: Scissors,       label: 'Service',      value: 'Skin Fade' },
  { afterLine: 4,  Icon: UserCheck,      label: 'Barber',       value: 'Marco' },
  { afterLine: 6,  Icon: CalendarClock,  label: 'Booking Time', value: 'Sat · 2:30 PM' },
  { afterLine: 6,  Icon: CheckCheck,     label: 'Slot',         value: 'Confirmed' },
  { afterLine: 8,  Icon: User,           label: 'Customer',     value: 'Danny Brooks' },
  { afterLine: 10, Icon: Smartphone,     label: 'Reminder To',  value: '··· ··· 0148' },
  { afterLine: 11, Icon: MessageSquare,  label: 'Action',       value: 'Confirmation Text Sent' },
  { afterLine: 11, Icon: CalendarCheck,  label: 'Action',       value: 'Calendar Updated' },
]

const AUDIO_SRC = '/barber-demo.mp3'

/* amber / gold accent — gives this demo its own presence alongside the
 * teal dental demo while staying in the Skyweb dark-glass language */
const ACCENT = '#f5b342'
const ACCENT_2 = '#e0843c'

const fmt = (s) => {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

/* ============================ Modal ============================== */
function DemoModal({ onClose }) {
  const audioRef = useRef(null)
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const analyserRef = useRef(null)
  const sourceRef = useRef(null)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const activeLineRef = useRef(-1)

  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeLine, setActiveLine] = useState(-1)
  const [ended, setEnded] = useState(false)

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
        analyser.fftSize = 128
        analyser.smoothingTimeConstant = 0.8
        sourceRef.current.connect(analyser)
        analyser.connect(ctx.destination)
        analyserRef.current = analyser
      }
    } catch {
      /* visualiser is optional — ignore if routing fails */
    }
  }, [])

  /* draw loop: linear equaliser + subtitle/card sync */
  const tick = useCallback(() => {
    const audio = audioRef.current
    const canvas = canvasRef.current
    if (audio) {
      const t = audio.currentTime
      // throttle the clock/progress state to ~10fps so we don't re-render every frame
      if (Math.abs(t - lastTimeRef.current) >= 0.1) {
        lastTimeRef.current = t
        setTime(t)
      }
      // resolve the active line from the fixed cue table; only set state when it changes
      let idx = -1
      for (let i = 0; i < CUES.length; i++) { if (t >= CUES[i]) idx = i; else break }
      if (idx !== activeLineRef.current) {
        activeLineRef.current = idx
        setActiveLine(idx)
      }
    }

    if (canvas) {
      const dpr = window.devicePixelRatio || 1
      const W = canvas.clientWidth || 320
      const H = 132
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
        canvas.width = Math.round(W * dpr)
        canvas.height = Math.round(H * dpr)
      }
      const c = canvas.getContext('2d')
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, W, H)

      const cy = H / 2
      const bars = 44
      const gap = 4
      const bw = Math.max(2, (W - gap * (bars - 1)) / bars)
      const analyser = analyserRef.current
      let freq
      if (analyser) {
        freq = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(freq)
      }

      let amp = 0
      for (let i = 0; i < bars; i++) {
        let v
        if (freq) {
          // bias toward the lower-mid bins where the voice energy sits
          const bin = Math.floor((i / bars) * (freq.length * 0.7))
          v = freq[bin] / 255
        } else {
          // synthetic idle / playing motion when analyser unavailable
          const base = isPlaying ? 0.3 : 0.08
          v = base + (isPlaying
            ? Math.abs(Math.sin(Date.now() / 220 + i * 0.45)) * 0.55
            : 0.05 * Math.sin(Date.now() / 700 + i))
        }
        amp += v
        const h = Math.max(bw * 0.6, v * (H * 0.5))
        const x = i * (bw + gap)
        const y = cy - h / 2
        const alpha = 0.4 + v * 0.6
        const grad = c.createLinearGradient(0, y, 0, y + h)
        grad.addColorStop(0, `rgba(245, 179, 66, ${alpha})`)
        grad.addColorStop(1, `rgba(224, 132, 60, ${alpha * 0.7})`)
        c.fillStyle = grad
        if (c.roundRect) {
          c.beginPath()
          c.roundRect(x, y, bw, h, bw / 2)
          c.fill()
        } else {
          c.fillRect(x, y, bw, h)
        }
      }

      // soft centre baseline that brightens with overall amplitude
      amp = amp / bars
      const lineGrad = c.createLinearGradient(0, 0, W, 0)
      lineGrad.addColorStop(0, 'rgba(245,179,66,0)')
      lineGrad.addColorStop(0.5, `rgba(245,179,66,${0.2 + amp * 0.4})`)
      lineGrad.addColorStop(1, 'rgba(245,179,66,0)')
      c.fillStyle = lineGrad
      c.fillRect(0, cy - 0.75, W, 1.5)
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [isPlaying])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [tick])

  /* cleanup audio context on unmount */
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      const audio = audioRef.current
      if (audio) { audio.pause() }
      const ctx = ctxRef.current
      if (ctx && ctx.state !== 'closed') ctx.close().catch(() => {})
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
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
    if (!audio) return
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
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setEnded(false)
  }

  const seekKey = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    if (e.key === 'ArrowRight') { e.preventDefault(); audio.currentTime = Math.min(duration, audio.currentTime + 5); setEnded(false) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); audio.currentTime = Math.max(0, audio.currentTime - 5); setEnded(false) }
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); togglePlay() }
  }

  const line = activeLine >= 0 && activeLine < LINES.length ? LINES[activeLine] : null
  const progress = duration ? Math.min(100, (time / duration) * 100) : 0
  const visibleCards = CARDS.filter((card) => activeLine >= card.afterLine)

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="AI Barbershop Receptionist voice demo"
        style={{ boxShadow: `0 0 80px ${ACCENT}1a` }}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-bg-secondary/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl"
      >
        <audio
          ref={audioRef}
          src={AUDIO_SRC}
          preload="auto"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={(e) => {
            setIsPlaying(false)
            setEnded(true)
            lastTimeRef.current = e.currentTarget.duration
            setTime(e.currentTarget.duration)
          }}
        />

        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close demo"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/60 hover:text-white transition-colors"
          style={{ '--tw-ring-color': ACCENT }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}80`)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
        >
          <X size={16} />
        </button>

        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          {/* ---------- Left: the call ---------- */}
          <div className="relative p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `linear-gradient(to bottom right, ${ACCENT}12, transparent)` }}
            />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* header (pr clears the close button on mobile, where this is the top row) */}
            <div className="relative flex items-center gap-3 mb-7 pr-12 lg:pr-0">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-bg-primary"
                style={{ background: `linear-gradient(to bottom right, ${ACCENT}, ${ACCENT_2})`, boxShadow: `0 0 24px ${ACCENT}59` }}
              >
                <Scissors size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-white text-sm leading-tight truncate">Skyweb Barbers</p>
                <p className="text-white/40 text-xs truncate">AI Receptionist</p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider" style={{ color: ACCENT }}>
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'animate-pulse' : ''}`} style={{ background: ACCENT }} />
                {isPlaying ? 'Live' : ended ? 'Ended' : 'Ready'}
              </span>
            </div>

            {/* visualiser — centred linear equaliser */}
            <div className="relative flex items-center justify-center my-2">
              <canvas ref={canvasRef} className="w-full select-none" style={{ height: 132 }} />
            </div>

            {/* subtitle — crossfade (grid-stacked so a long caption grows the row
                instead of overflowing up into the visualiser) */}
            <div className="grid items-end min-h-[112px] mt-2">
              <AnimatePresence>
                {line ? (
                  <motion.div
                    key={activeLine}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="col-start-1 row-start-1 self-end"
                  >
                    <span
                      className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded mb-2 border"
                      style={
                        line.speaker === 'ai'
                          ? { background: `${ACCENT}26`, color: ACCENT, borderColor: `${ACCENT}40` }
                          : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.1)' }
                      }
                    >
                      {line.speaker === 'ai' ? 'AI Receptionist' : 'Caller'}
                    </span>
                    <p className={`text-[15px] leading-relaxed ${line.speaker === 'ai' ? 'text-white' : 'text-white/70'}`}>
                      {line.text}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="col-start-1 row-start-1 self-end text-white/35 text-sm"
                  >
                    Press play to hear a real booking handled end-to-end by the AI receptionist.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* controls */}
            <div className="relative mt-6">
              <div
                onClick={seek}
                onKeyDown={seekKey}
                role="slider"
                tabIndex={0}
                aria-label="Seek through the call"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration) || 0}
                aria-valuenow={Math.round(time)}
                className="group relative w-full py-2 rounded focus:outline-none"
              >
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-150"
                    style={{ width: `${progress}%`, background: `linear-gradient(to right, ${ACCENT}, ${ACCENT_2})` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="w-12 h-12 rounded-full text-bg-primary flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                  style={{ background: ACCENT, boxShadow: `0 0 30px ${ACCENT}73` }}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <button
                  onClick={replay}
                  aria-label="Replay"
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${ACCENT}80`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                >
                  <RotateCcw size={15} />
                </button>
                <span className="ml-auto font-mono text-xs text-white/40 tabular-nums">
                  {fmt(time)} / {fmt(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- Right: live booking feed ---------- */}
          <div className="p-7 sm:p-9 bg-white/[0.012]">
            {/* lg:pr clears the close button on desktop, where this is the top-right row */}
            <div className="flex items-center justify-between mb-5 lg:pr-10">
              <p className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: ACCENT }}>Captured by AI</p>
              <span className="text-[10px] font-mono text-white/30">{visibleCards.length}/{CARDS.length}</span>
            </div>

            <div className="space-y-3">
              <AnimatePresence>
                {visibleCards.map((card) => (
                  <motion.div
                    key={card.label + card.value}
                    layout
                    initial={{ opacity: 0, x: 24, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
                  >
                    <div
                      className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${ACCENT}1f`, border: `1px solid ${ACCENT}33`, color: ACCENT }}
                    >
                      <card.Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">{card.label}</p>
                      <p className="text-sm text-white font-medium truncate">{card.value}</p>
                    </div>
                    <CheckCheck size={14} className="ml-auto shrink-0" style={{ color: `${ACCENT}b3` }} />
                  </motion.div>
                ))}
              </AnimatePresence>

              {visibleCards.length === 0 && (
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 rounded-xl border border-dashed border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/30 mb-3">
                    <CalendarCheck size={18} />
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Booking details appear here in real time as the call progresses.
                  </p>
                </div>
              )}
            </div>

            {ended && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl"
                style={{ background: `${ACCENT}1a`, border: `1px solid ${ACCENT}40` }}
              >
                <p className="text-sm text-white font-medium mb-0.5">Appointment booked ✓</p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Zero staff time. The AI greeted the caller, matched them to their barber, booked the slot and sent a confirmation text — all in under a minute.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

/* ===================== Featured card + wrapper =================== */
export default function BarberDemo() {
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
        {/* content left, preview right — mirrored from the dental demo for visual rhythm */}
        <div className="grid md:grid-cols-2">
          {/* content */}
          <div className="p-7 sm:p-8 order-1 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}25` }}
              >
                Voice AI · Live Demo
              </span>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>

            <h3
              className="font-heading font-bold text-white text-xl sm:text-2xl mb-2 transition-colors duration-300"
              onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              FrontDesk for Barbers
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              A voice AI that answers the phone, books the right barber, captures the customer's details and texts a confirmation — listen to a real call handled end-to-end.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {['ElevenLabs', 'Twilio', 'n8n', 'SMS'].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/35 font-mono">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setOpen(true)}
              className="self-start relative inline-flex items-center gap-2 px-7 py-3.5 font-heading font-semibold text-sm rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-bg-primary"
              style={{ background: ACCENT, boxShadow: `0 0 30px ${ACCENT}40` }}
            >
              <Play size={15} /> View Demo
            </button>
          </div>

          {/* preview (mouse shortcut to open; the labelled button is the a11y control) */}
          <div
            onClick={() => setOpen(true)}
            aria-hidden="true"
            className="relative h-56 md:h-auto flex items-center justify-center overflow-hidden order-2"
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

            {/* mini call preview */}
            <div className="relative flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-bg-primary"
                style={{ background: `linear-gradient(to bottom right, ${ACCENT}, ${ACCENT_2})`, boxShadow: `0 0 30px ${ACCENT}66` }}
              >
                <Scissors size={26} />
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

            {/* hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-primary/30">
              <span
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm text-bg-primary"
                style={{ background: ACCENT }}
              >
                <Play size={14} /> View Demo
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
