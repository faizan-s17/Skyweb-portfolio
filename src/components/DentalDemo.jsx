import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, X, RotateCcw, PhoneCall, ArrowUpRight,
  Stethoscope, CalendarClock, CheckCheck, User, ShieldCheck, MailCheck, CalendarCheck,
} from 'lucide-react'

/* ------------------------------------------------------------------ *
 * Conversation transcript (subtitles).
 * speaker: 'ai' = Smile Dental Clinic receptionist, 'patient' = caller
 * `start` = exact second this line begins (from the recording timeline,
 * HH:MM:SS:FF @ 30fps). Each line stays on screen until the next begins.
 * ------------------------------------------------------------------ */
const LINES = [
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

/* convenient lookup: CUES[i] = second line i begins */
const CUES = LINES.map((l) => l.start)

/* Booking cards — `afterLine` is 1-based: the card appears the moment that
 * line finishes, i.e. at the start of the following line (CUES[afterLine]). */
const CARDS = [
  { afterLine: 3,  Icon: Stethoscope,   label: 'Request Type',  value: 'Tooth Pain' },
  { afterLine: 5,  Icon: CalendarClock, label: 'Booking Time',  value: 'Thu, Jun 12 · 10:00 AM GMT' },
  { afterLine: 6,  Icon: CheckCheck,    label: 'Slot',          value: 'Confirmed' },
  { afterLine: 8,  Icon: User,          label: 'Patient',       value: 'James Whitfield' },
  { afterLine: 12, Icon: ShieldCheck,   label: 'Insurance',     value: 'Bupa Dental' },
  { afterLine: 15, Icon: MailCheck,     label: 'Action',        value: 'Confirmation Email Sent' },
  { afterLine: 15, Icon: CalendarCheck, label: 'Action',        value: 'Calendar Updated' },
]

const AUDIO_SRC = '/dental-demo.mp3'

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
        analyser.smoothingTimeConstant = 0.78
        sourceRef.current.connect(analyser)
        analyser.connect(ctx.destination)
        analyserRef.current = analyser
      }
    } catch {
      /* visualiser is optional — ignore if routing fails */
    }
  }, [])

  /* draw loop: visualiser + subtitle/card sync */
  const tick = useCallback(function tickFrame() {
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
      const size = 200
      if (canvas.width !== size * dpr) { canvas.width = size * dpr; canvas.height = size * dpr }
      const c = canvas.getContext('2d')
      c.setTransform(dpr, 0, 0, dpr, 0, 0)
      c.clearRect(0, 0, size, size)
      const cx = size / 2, cy = size / 2
      const bars = 56
      const inner = 56
      const analyser = analyserRef.current
      let amp = 0

      let freq
      if (analyser) {
        freq = new Uint8Array(analyser.frequencyBinCount)
        analyser.getByteFrequencyData(freq)
      }

      for (let i = 0; i < bars; i++) {
        const ang = (i / bars) * Math.PI * 2 - Math.PI / 2
        let v
        if (freq) {
          v = freq[i % freq.length] / 255
        } else {
          // synthetic idle / playing motion when analyser unavailable
          const base = isPlaying ? 0.35 : 0.12
          v = base + (isPlaying ? Math.abs(Math.sin(Date.now() / 200 + i * 0.5)) * 0.5 : 0.04 * Math.sin(Date.now() / 600 + i))
        }
        amp += v
        const len = inner + v * 42
        const x1 = cx + Math.cos(ang) * inner
        const y1 = cy + Math.sin(ang) * inner
        const x2 = cx + Math.cos(ang) * len
        const y2 = cy + Math.sin(ang) * len
        const alpha = 0.35 + v * 0.65
        c.strokeStyle = `rgba(0, 229, 192, ${alpha})`
        c.lineWidth = 2.5
        c.lineCap = 'round'
        c.beginPath()
        c.moveTo(x1, y1)
        c.lineTo(x2, y2)
        c.stroke()
      }

      // central glowing orb pulses with overall amplitude
      amp = amp / bars
      const r = 40 + amp * 16
      const grad = c.createRadialGradient(cx, cy, 0, cx, cy, r)
      grad.addColorStop(0, `rgba(0, 229, 192, ${0.9})`)
      grad.addColorStop(0.6, `rgba(0, 180, 216, ${0.35})`)
      grad.addColorStop(1, 'rgba(0, 180, 216, 0)')
      c.fillStyle = grad
      c.beginPath()
      c.arc(cx, cy, r, 0, Math.PI * 2)
      c.fill()
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
  // a card shows once the call has passed the line it summarises (activeLine is 0-based,
  // afterLine is the 1-based line number == the 0-based index of the following line)
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
        aria-label="AI Dental Receptionist voice demo"
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-bg-secondary/95 backdrop-blur-xl rounded-3xl border border-white/10 teal-glow shadow-2xl"
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
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:border-accent-teal/50 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="grid lg:grid-cols-[1.15fr_1fr]">
          {/* ---------- Left: the call ---------- */}
          <div className="relative p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/[0.06] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00e5c0]/[0.07] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            {/* header (pr clears the close button on mobile, where this is the top row) */}
            <div className="relative flex items-center gap-3 mb-7 pr-12 lg:pr-0">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00e5c0] to-[#00b4d8] flex items-center justify-center text-bg-primary shadow-[0_0_24px_rgba(0,229,192,0.35)]">
                <PhoneCall size={18} />
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-white text-sm leading-tight truncate">Smile Dental Clinic</p>
                <p className="text-white/40 text-xs truncate">AI Receptionist</p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-accent-teal">
                <span className={`w-1.5 h-1.5 rounded-full bg-accent-teal ${isPlaying ? 'animate-pulse' : ''}`} />
                {isPlaying ? 'Live' : ended ? 'Ended' : 'Ready'}
              </span>
            </div>

            {/* visualiser */}
            <div className="relative flex items-center justify-center my-2">
              <canvas ref={canvasRef} style={{ width: 200, height: 200 }} className="select-none" />
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
                      className={`inline-block text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded mb-2 ${
                        line.speaker === 'ai'
                          ? 'bg-accent-teal/15 text-accent-teal border border-accent-teal/25'
                          : 'bg-white/[0.06] text-white/60 border border-white/10'
                      }`}
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
                    Press play to hear a live booking handled end-to-end by the AI receptionist.
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
                className="group relative w-full py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/50"
              >
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#00e5c0] to-[#00b4d8] transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="w-12 h-12 rounded-full bg-accent-teal text-bg-primary flex items-center justify-center hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,192,0.45)] active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>
                <button
                  onClick={replay}
                  aria-label="Replay"
                  className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:border-accent-teal/50 flex items-center justify-center transition-colors"
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
              <p className="section-label">Captured by AI</p>
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
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-accent-teal/12 border border-accent-teal/20 flex items-center justify-center text-accent-teal">
                      <card.Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/35">{card.label}</p>
                      <p className="text-sm text-white font-medium truncate">{card.value}</p>
                    </div>
                    <CheckCheck size={14} className="ml-auto text-accent-teal/70 shrink-0" />
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
                className="mt-6 p-4 rounded-xl bg-accent-teal/10 border border-accent-teal/25"
              >
                <p className="text-sm text-white font-medium mb-0.5">Appointment booked ✓</p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Zero staff time. The AI qualified the caller, booked the slot, captured insurance and sent confirmation — all in under 90 seconds.
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
export default function DentalDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="group md:col-span-2 card-glass overflow-hidden hover:border-white/[0.12] transition-colors duration-500 teal-glow"
      >
        <div className="grid md:grid-cols-2">
          {/* preview (mouse shortcut to open; the labelled button below is the a11y control) */}
          <div
            onClick={() => setOpen(true)}
            aria-hidden="true"
            className="relative h-56 md:h-auto bg-gradient-to-br from-[#00e5c0]/[0.18] to-[#00b4d8]/[0.04] flex items-center justify-center overflow-hidden order-2 md:order-1"
          >
            <div
              className="absolute w-56 h-56 rounded-full border opacity-20"
              style={{ borderColor: '#00e5c0', top: '-25%', right: '-12%' }}
            />
            <div
              className="absolute w-24 h-24 rotate-45 border opacity-15"
              style={{ borderColor: '#00e5c0', bottom: '-8%', left: '8%' }}
            />

            {/* mini call preview */}
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00e5c0] to-[#00b4d8] flex items-center justify-center text-bg-primary shadow-[0_0_30px_rgba(0,229,192,0.4)]">
                <PhoneCall size={26} />
              </div>
              <div className="flex items-end gap-1 h-7">
                {[0.5, 0.9, 0.4, 1, 0.65, 0.85, 0.45, 0.95, 0.55].map((h, i) => (
                  <span
                    key={i}
                    className="dm-bar w-1 rounded-full bg-accent-teal/70"
                    style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
                  />
                ))}
              </div>
            </div>

            {/* hover CTA */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-bg-primary/30">
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm bg-accent-teal text-bg-primary">
                <Play size={14} /> View Demo
              </span>
            </div>
          </div>

          {/* content */}
          <div className="p-7 sm:p-8 order-1 md:order-2 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md"
                style={{ background: '#00e5c015', color: '#00e5c0', border: '1px solid #00e5c025' }}
              >
                Voice AI · Live Demo
              </span>
              <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>

            <h3 className="font-heading font-bold text-white text-xl sm:text-2xl mb-2 group-hover:text-accent-teal transition-colors duration-300">
              FrontDesk for Dental
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-5">
              A voice AI that answers the phone, qualifies the patient, books the appointment, captures insurance and sends confirmation — listen to a real call handled end-to-end.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {['ElevenLabs', 'Twilio', 'n8n', 'Calendar'].map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/35 font-mono">
                  {t}
                </span>
              ))}
            </div>

            <button onClick={() => setOpen(true)} className="btn-primary self-start">
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
