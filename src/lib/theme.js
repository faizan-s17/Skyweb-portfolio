import { useEffect, useState } from 'react'

/* Tracks whether <html> currently has the `light` class, and stays in sync
 * with the Navbar's theme toggle (which lives elsewhere in the tree) via a
 * MutationObserver, so page content updates immediately when the user flips
 * the theme instead of only on next load. */
export function useIsLight() {
  const [isLight, setIsLight] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('light'),
  )
  useEffect(() => {
    const el = document.documentElement
    const observer = new MutationObserver(() => setIsLight(el.classList.contains('light')))
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return isLight
}

/* The brand accent palette was tuned for the dark theme (bright, saturated
 * hues on near-black). On a white/light background those same hex values
 * fall below WCAG AA contrast when used as literal text or icon color
 * (e.g. #00e5c0 is only ~1.6:1 on white). This maps each accent to a deepened
 * variant that keeps the same hue but clears 4.5:1 on a light background. */
const LIGHT_SAFE = {
  '#00e5c0': '#00806c',
  '#f5a623': '#8a5a00',
  '#00b4d8': '#00708f',
  '#10b981': '#047857',
  '#4f9cf9': '#1d4ed8',
  '#ff5722': '#b23a12',
  '#a855f7': '#7e22ce',
}

export function accentColor(hex, isLight) {
  if (!isLight) return hex
  return LIGHT_SAFE[hex] || hex
}
