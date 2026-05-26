const items = [
  'UI/UX Design', '·', 'AI Automation', '·', 'Lead Agents', '·',
  'Voice Agents', '·', 'SEO Optimization', '·', 'Chatbots', '·',
  'Marketing Automation', '·', 'Appointment Agents', '·',
]

export default function MarqueeBand() {
  const doubled = [...items, ...items]
  return (
    <div className="relative py-5 overflow-hidden bg-accent-teal/5 border-y border-accent-teal/10">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`mx-6 whitespace-nowrap font-heading font-semibold text-sm tracking-wide ${
              item === '·' ? 'text-accent-teal' : 'text-white/30'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
