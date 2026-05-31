import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/skyweb-logo-network.png'
import githubIcon from '../assets/github-icon.svg'
import whatsappIcon from '../assets/whatsapp-icon.svg'
import instagramIcon from '../assets/instagram-icon.svg'
import upworkIcon from '../assets/upwork-icon.svg'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#stats' },
]

const socials = [
  { icon: whatsappIcon, href: 'https://wa.me/447950328625', label: 'WhatsApp' },
  { icon: githubIcon, href: 'https://github.com/skyweb', label: 'GitHub' },
  { icon: instagramIcon, href: 'https://www.instagram.com/theskyweb.uk', label: 'Instagram' },
  { icon: upworkIcon, href: 'https://www.upwork.com/freelancers/~01c2a6207a8fe52c62', label: 'Upwork' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2 group"
          >
            <img src={logo} alt="SkyWeb Logo" className="h-10 w-auto" />
            <span className="font-heading font-bold text-lg tracking-tight text-white group-hover:text-accent-teal transition-colors duration-300">
              SkyWeb
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="font-sans text-sm text-white/55 hover:text-white transition-colors duration-300 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-teal group-hover:w-full transition-all duration-300" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="mailto:theskyweb.uk@gmail.com" className="btn-primary text-xs px-5 py-2.5">
              Get a Free Quote
            </a>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center hover:border-accent-teal/30 hover:bg-accent-teal/5 transition-all duration-300"
                >
                  <img src={s.icon} alt={s.label} className="w-[14px] h-[14px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 inset-x-0 bottom-0 z-40 bg-bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(l.href)}
                className="font-heading font-bold text-3xl text-white/80 hover:text-accent-teal transition-colors duration-300"
              >
                {l.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              href="mailto:theskyweb.uk@gmail.com"
              className="btn-primary mt-4"
            >
              Get a Free Quote
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
