import { lazy, Suspense, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  const sectionRef = useRef(null)
  const spotlightRef = useRef(null)
  const dotRef = useRef(null)

  // Spotlight cursor — only active while the pointer is over the hero.
  useEffect(() => {
    const section = sectionRef.current
    const spot = spotlightRef.current
    const dot = dotRef.current
    if (!section || !spot) return

    let raf
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2
    let sx = tx, sy = ty
    let visible = false
    const lerp = (a, b, t) => a + (b - a) * t

    const setVisible = (v) => {
      if (visible === v) return
      visible = v
      spot.style.opacity = v ? '1' : '0'
      if (dot) dot.style.opacity = v ? '1' : '0'
    }

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY
      if (dot) { dot.style.left = tx + 'px'; dot.style.top = ty + 'px' }
      setVisible(true)
    }
    const onLeave = () => setVisible(false)

    const loop = () => {
      sx = lerp(sx, tx, 0.18); sy = lerp(sy, ty, 0.18)
      spot.style.left = sx + 'px'; spot.style.top = sy + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Spotlight cursor — soft teal light that follows the pointer (hero only) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="hidden md:block fixed w-[460px] h-[460px] rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,192,0.16) 0%, rgba(0,229,192,0.05) 32%, transparent 66%)',
          transform: 'translate(-50%,-50%)',
          mixBlendMode: 'screen',
          transition: 'opacity 0.3s ease',
          zIndex: 5,
        }}
      />
      {/* Precise pointer dot inside the spotlight */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="hidden md:block fixed w-[8px] h-[8px] rounded-full pointer-events-none opacity-0"
        style={{
          background: '#00e5c0',
          transform: 'translate(-50%,-50%)',
          boxShadow: '0 0 10px rgba(0,229,192,0.9)',
          transition: 'opacity 0.3s ease',
          zIndex: 40,
        }}
      />

      {/* Three.js canvas — lazy loaded so it doesn't block initial paint */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-[8%] w-8 h-8 border border-accent-teal/30 rotate-45"
      />
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-48 right-[10%] w-5 h-5 bg-accent-orange/20 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-36 left-[15%] w-6 h-6 border border-white/10 rotate-12"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-48 right-[12%] w-10 h-10 border border-accent-teal/20 rotate-45"
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-24">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-teal/20 bg-accent-teal/5 mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
          <span className="section-label text-[11px]">Digital Agency · Est. 2026</span>
        </motion.div>

        {/* Headline — no blur so LCP is measured at first paint, not animation end */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-heading font-bold text-[clamp(2.8rem,8vw,6rem)] leading-[1.05] tracking-tight mb-6"
        >
          We Build{' '}
          <span className="relative inline-block">
            <span className="text-gradient-teal">Intelligent</span>
          </span>
          <br />
          Digital Experiences
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-white/50 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          UI/UX design, AI automation, intelligent agents, SEO & chatbots: everything your
          business needs to grow fast and convert better.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <a href="#services" className="btn-primary" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Explore Services <ArrowRight size={16} />
          </a>
          <a href="https://wa.me/447950328625" target="_blank" rel="noreferrer" className="btn-outline">
            WhatsApp Us
          </a>
        </motion.div>

        {/* Tags */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-wrap justify-center gap-2"
        >
          {['UI/UX Design', 'AI Automation', 'AI Agents', 'SEO', 'Chatbots'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-mono tracking-wide"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[11px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  )
}
