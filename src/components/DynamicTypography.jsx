import { useEffect, useRef } from 'react'

/**
 * Cursor-reactive "wobble" wordmark.
 *
 * The letters act as a mask filled with bright teal vertical lines. They drift on
 * a gentle ambient sway by default, but while the cursor hovers the band the lines
 * bend toward the pointer, ripple around it, and thicken near it — easing back to
 * calm when the cursor leaves. Tuned for the dark SkyWeb theme:
 *   - responsive to its container (no fixed 900×500 box)
 *   - devicePixelRatio capped at 2 so it stays crisp without over-rendering
 *   - waits for the Space Grotesk web font before drawing so the mask matches
 *     the rest of the site's headings
 *   - animation pauses while off-screen and honours prefers-reduced-motion
 */
export default function DynamicTypography({ text = 'SKYWEB' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const FONT = "800 %dpx 'Space Grotesk', 'Space Grotesk Fallback', system-ui, sans-serif"

    // Honour reduced-motion as a slow, gentle drift rather than a hard freeze,
    // so the wordmark still feels alive without a jarring animation.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const speed = reduceMotion ? 0.006 : 0.03

    let raf = 0
    let time = 0
    // Start visible so the wobble runs on its own from first paint; the
    // IntersectionObserver below only *pauses* it once it scrolls off-screen.
    let visible = true

    // Pointer-reactive state. `influence` eases between 0 (idle) and 1 (hovering)
    // so the cursor effect fades in/out instead of snapping.
    let pointerX = canvas.offsetWidth / 2
    let pointerY = canvas.offsetHeight / 2
    let targetInfluence = 0
    let influence = 0

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // --- 1. Lay down the teal lines, bending them toward the cursor ---
      ctx.save()
      ctx.strokeStyle = '#00e5c0'
      ctx.lineCap = 'round'

      const step = Math.max(8, Math.round(w / 90))
      const baseWidth = Math.max(4, w * 0.006)
      const ambAmp = h * 0.035 // subtle always-on sway
      const radius = Math.max(150, w * 0.28) // how far the cursor's pull reaches
      const px = pointerX
      const py = pointerY
      const inf = influence

      for (let x = -step; x <= w + step; x += step) {
        const amb = Math.sin(x * 0.03 + time) * ambAmp

        // Proximity to the cursor: 0 far away → 1 right at it (smoothstep).
        let prox = 1 - Math.abs(x - px) / radius
        prox = prox > 0 ? prox * prox * (3 - 2 * prox) : 0
        const k = prox * inf

        // Pull toward the cursor's x and ripple outward from it.
        const lean = (px - x) * 0.4 * k
        const ripple = Math.sin(Math.abs(x - px) * 0.05 - time * 4) * (h * 0.06) * k

        const topX = x + amb
        const botX = x - amb
        const ctrlX = x + amb * 0.5 + lean + ripple
        // The bend's apex drifts toward the cursor's vertical position.
        const ctrlY = h * 0.5 + (py - h * 0.5) * 0.45 * k

        ctx.lineWidth = baseWidth + baseWidth * 0.8 * k // thickens near the cursor
        ctx.beginPath()
        ctx.moveTo(topX, h * 0.08)
        ctx.quadraticCurveTo(ctrlX, ctrlY, botX, h * 0.92)
        ctx.stroke()
      }

      // --- 2. Clip those lines to the letter shapes in a single pass ---
      // destination-in keeps existing pixels only where this fillText is opaque.
      // It must be ONE fillText call so the whole wordmark masks at once.
      let fontSize = h * 0.72
      ctx.font = FONT.replace('%d', fontSize)
      const targetW = w * 0.82
      const measured = ctx.measureText(text).width || targetW
      fontSize = Math.min(fontSize, (targetW / measured) * fontSize)
      ctx.font = FONT.replace('%d', fontSize)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.globalCompositeOperation = 'destination-in'
      ctx.fillStyle = '#000' // colour is irrelevant here — only its coverage masks
      ctx.fillText(text, w / 2, h / 2)
      ctx.restore()

      // --- 3. Faint cyan pinstripes, painted behind the wordmark ---
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over'
      ctx.strokeStyle = 'rgba(34,211,238,0.10)'
      ctx.lineWidth = 1
      for (let x = 0; x <= w; x += 9) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      ctx.restore()
    }

    const loop = () => {
      influence += (targetInfluence - influence) * 0.08 // ease hover in/out
      draw()
      time += speed
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (raf || !visible) return
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onResize = () => {
      resize()
      draw()
    }
    window.addEventListener('resize', onResize)

    // Pointer events drive the cursor-reactive bend. pointer* covers mouse + touch.
    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointerX = e.clientX - r.left
      pointerY = e.clientY - r.top
    }
    const onPointerEnter = () => { targetInfluence = 1 }
    const onPointerLeave = () => { targetInfluence = 0 }
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerenter', onPointerEnter)
    canvas.addEventListener('pointerleave', onPointerLeave)

    const init = () => {
      resize()
      draw()
      start()
    }
    // Draw once the heading font is ready so the mask isn't a fallback glyph.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(init)
    else init()

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerenter', onPointerEnter)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [text])

  return (
    <section className="relative py-12 md:py-16 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="threejs-glow">
          <canvas
            ref={canvasRef}
            className="block w-full h-[clamp(100px,17vw,230px)]"
            role="img"
            aria-label={`${text} animated wordmark`}
          />
        </div>
      </div>
    </section>
  )
}
