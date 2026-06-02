import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 50, suffix: '+', label: 'Projects Delivered', color: '#00e5c0' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', color: '#ff5722' },
  { value: 3, suffix: 'x', label: 'Average ROI Growth', color: '#f5a623' },
  { value: 24, suffix: '/7', label: 'AI Support Available', color: '#00b4d8' },
]

function Counter({ value, suffix, color }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = 16
    const increment = value / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, step)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <span ref={ref} className="font-heading font-bold text-5xl md:text-6xl" style={{ color, fontVariantNumeric: 'tabular-nums' }}>
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent-teal/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-label mb-4">Our Track Record</p>
          <h2 className="section-title text-[clamp(1.8rem,4vw,3rem)]">
            Numbers That <span className="text-gradient-teal">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-bg-secondary px-8 py-10 flex flex-col items-center text-center gap-2 group hover:bg-bg-card transition-colors duration-300"
            >
              <Counter value={s.value} suffix={s.suffix} color={s.color} />
              <span className="text-white/40 text-sm font-sans mt-1">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
