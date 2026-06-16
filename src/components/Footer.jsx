import { motion } from 'framer-motion'
import logo from '../assets/skyweb-logo-network.png'
import githubIcon from '../assets/github-icon.svg'
import whatsappIcon from '../assets/whatsapp-icon.svg'
import instagramIcon from '../assets/instagram-icon.svg'
import upworkIcon from '../assets/upwork-icon.svg'

const links = {
  Services: ['UI/UX Design', 'AI Automation', 'AI Agents', 'SEO', 'Chatbots'],
  Company: ['About Us', 'Our Work', 'Process', 'Careers'],
  Contact: ['theskyweb.uk@gmail.com', 'WhatsApp', 'GitHub', 'Instagram'],
}

const socials = [
  { icon: whatsappIcon, href: 'https://wa.me/447950328625', label: 'WhatsApp', isLucide: false },
  { icon: githubIcon, href: 'https://github.com/skyweb', label: 'GitHub', isLucide: false },
  { icon: instagramIcon, href: 'https://www.instagram.com/theskyweb.uk', label: 'Instagram', isLucide: false },
  { icon: upworkIcon, href: 'https://www.upwork.com/freelancers/~01c2a6207a8fe52c62', label: 'Upwork', isLucide: false },
]

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-bg-primary border-t border-white/[0.05] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <img src={logo} alt="SkyWeb Logo" width="40" height="40" className="h-10 w-auto" />
              <span className="font-heading font-bold text-lg text-white">SkyWeb</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6 max-w-xs">
              A UK-based digital agency building intelligent products — UI, AI automation, and growth tools for modern businesses.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/[0.07] bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-accent-teal hover:border-accent-teal/30 hover:bg-accent-teal/5 transition-all duration-300"
                >
                  {s.isLucide ? (
                    <s.icon size={15} />
                  ) : (
                    <img src={s.icon} alt={s.label} width="15" height="15" className="w-[15px] h-[15px]" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-white text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={
                        item === 'theskyweb.uk@gmail.com'
                          ? 'mailto:theskyweb.uk@gmail.com'
                          : item === 'WhatsApp'
                          ? 'https://wa.me/447950328625'
                          : item === 'GitHub'
                          ? 'https://github.com/skyweb'
                          : item === 'Instagram'
                          ? 'https://www.instagram.com/theskyweb.uk'
                          : '#'
                      }
                      target={['WhatsApp', 'GitHub', 'Instagram'].includes(item) ? '_blank' : undefined}
                      rel="noreferrer"
                      className="text-white/35 hover:text-accent-teal text-sm transition-colors duration-300 truncate block"
                    >
                      {item === 'theskyweb.uk@gmail.com' ? 'theskyweb.uk@gmail.com' : item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-mono">
            © 2026 SkyWeb. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => onNavigate?.('privacy')}
              className="text-white/20 hover:text-white/50 text-xs font-mono transition-colors duration-300 bg-none border-none cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate?.('terms')}
              className="text-white/20 hover:text-white/50 text-xs font-mono transition-colors duration-300 bg-none border-none cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
