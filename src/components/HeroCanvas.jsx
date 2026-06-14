import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const W = canvas.clientWidth || window.innerWidth
    const H = canvas.clientHeight || window.innerHeight

    // Phones pay 4x CPU throttling in Lighthouse and often have a 2.5–3x DPR, so
    // a lighter particle field + a lower pixel-ratio cap cuts the per-frame GPU/CPU
    // cost without changing the wireframe's look. Desktop keeps the full scene.
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 4

    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1)
    const edges = new THREE.EdgesGeometry(icoGeo)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00e5c0, transparent: true, opacity: 0.55 })
    const wireframe = new THREE.LineSegments(edges, lineMat)
    scene.add(wireframe)

    const innerGeo = new THREE.IcosahedronGeometry(0.7, 0)
    const innerEdges = new THREE.EdgesGeometry(innerGeo)
    const innerMat = new THREE.LineBasicMaterial({ color: 0xff5722, transparent: true, opacity: 0.3 })
    const innerFrame = new THREE.LineSegments(innerEdges, innerMat)
    scene.add(innerFrame)

    const particleCount = isMobile ? 280 : 600
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

    const ringGeo = new THREE.TorusGeometry(2, 0.004, 2, 100)
    const ringMat = new THREE.LineBasicMaterial({ color: 0x00e5c0, transparent: true, opacity: 0.15 })
    const ring = new THREE.LineLoop(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    let rafId = 0
    let tick = 0
    let active = false

    const renderFrame = () => {
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

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      renderFrame()
    }
    const start = () => {
      if (active || reduceMotion) return
      active = true
      animate()
    }
    const stop = () => {
      active = false
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    // Pause the render loop while the hero is scrolled out of view or the tab is
    // hidden — no point burning the GPU on a canvas nobody is looking at. Honour
    // reduced-motion by drawing a single static frame instead of animating.
    let onScreen = true
    const update = () => {
      if (onScreen && !document.hidden) start()
      else stop()
    }
    const io = new IntersectionObserver(
      ([entry]) => { onScreen = entry.isIntersecting; update() },
      { threshold: 0 },
    )
    io.observe(canvas)
    document.addEventListener('visibilitychange', update)

    if (reduceMotion) renderFrame() // one still frame, no loop
    else update()

    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      if (reduceMotion) renderFrame()
    }
    window.addEventListener('resize', onResize)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', update)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="absolute inset-0 threejs-glow" style={{ animation: 'fadeInCanvas 1.2s ease forwards' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
