import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import * as THREE from 'three'

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Hero() {
  const canvasRef = useRef(null)
  const spotlightRef = useRef(null)

  /* ── Three.js scene ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.clientWidth
    const H = canvas.clientHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 4

    /* Icosahedron wireframe */
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const edges = new THREE.EdgesGeometry(icoGeo)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5c0, transparent: true, opacity: 0.55 })
    const wireframe = new THREE.LineSegments(edges, lineMat)
    scene.add(wireframe)

    /* Inner icosahedron (smaller, faster) */
    const innerGeo = new THREE.IcosahedronGeometry(0.7, 0)
    const innerEdges = new THREE.EdgesGeometry(innerGeo)
    const innerMat = new THREE.LineBasicMaterial({ color: 0xff5722, transparent: true, opacity: 0.3 })
    const innerFrame = new THREE.LineSegments(innerEdges, innerMat)
    scene.add(innerFrame)

    /* Particle cloud */
    const particleCount = 600
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pMat = new THREE.PointsMaterial({ color: 0x00e5c0, size: 0.025, transparent: true, opacity: 0.5 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    /* Ambient ring */
    const ringGeo = new THREE.TorusGeometry(2, 0.004, 2, 100)
    const ringMat = new THREE.LineBasicMaterial({ color: 0x00e5c0, transparent: true, opacity: 0.15 })
    const ring = new THREE.LineLoop(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    /* Mouse state */
    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    /* Animation loop */
    let rafId
    let tick = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      tick += 0.005

      wireframe.rotation.x += (my * 0.25 - wireframe.rotation.x) * 0.04
      wireframe.rotation.y += (mx * 0.4 + tick - wireframe.rotation.y) * 0.04

      innerFrame.rotation.x -= 0.008
      innerFrame.rotation.y += 0.012

      particles.rotation.y += 0.0008
      particles.rotation.x += (my * 0.05 - particles.rotation.x) * 0.02

      ring.rotation.z += 0.003

      renderer.render(scene, camera)
    }
    animate()

    /* Resize */
    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  /* ── Cursor spotlight ── */
  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const onMove = (e) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-100" />

      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        className="fixed w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,192,0.06) 0%, transparent 65%)',
          transform: 'translate(-50%,-50%)',
          zIndex: 1,
        }}
      />

      {/* Three.js canvas */}
      <div className="absolute inset-0 threejs-glow">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

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
          <span className="section-label text-[11px]">Digital Agency · Est. 2024</span>
        </motion.div>

        {/* Headline */}
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
          UI/UX design, AI automation, intelligent agents, SEO & chatbots — everything your
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
        transition={{ delay: 2 }}
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
