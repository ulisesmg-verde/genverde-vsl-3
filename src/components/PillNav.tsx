import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './PillNav.css'

export type NavItem = { label: string; onClick: () => void; cta?: boolean }

// Símbolo de Generación Verde (sin texto)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logoSrc: string = ((typeof window !== 'undefined' && (window as any).GV_ASSETS?.logoSimbolo) || 'img/logo-simbolo.png')

const PETALS = [
  'm50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z',
  'm17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z',
  'm82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z',
  'm17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z',
]

function Pill({ item }: { item: NavItem }) {
  const pillRef = useRef<HTMLButtonElement>(null)
  const circleRef = useRef<HTMLSpanElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const hoverRef = useRef<HTMLSpanElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useLayoutEffect(() => {
    const layout = () => {
      const pill = pillRef.current, circle = circleRef.current
      if (!pill || !circle) return
      const { width: w, height: h } = pill.getBoundingClientRect()
      const R = ((w * w) / 4 + h * h) / (2 * h)
      const D = Math.ceil(2 * R) + 2
      const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
      const originY = D - delta
      circle.style.width = `${D}px`
      circle.style.height = `${D}px`
      circle.style.bottom = `-${delta}px`
      circle.style.left = '50%'
      gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` })
      gsap.set(labelRef.current, { y: 0 })
      gsap.set(hoverRef.current, { y: h + 12, opacity: 0 })

      tlRef.current?.kill()
      const tl = gsap.timeline({ paused: true })
      tl.to(circle, { scale: 3, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0)
      tl.to(labelRef.current, { y: -(h + 8), duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0)
      tl.to(hoverRef.current, { y: 0, opacity: 1, duration: 2, ease: 'power3.easeOut', overwrite: 'auto' }, 0)
      tlRef.current = tl
    }
    layout()
    window.addEventListener('resize', layout)
    document.fonts?.ready.then(layout).catch(() => {})
    return () => window.removeEventListener('resize', layout)
  }, [])

  const enter = () => {
    const tl = tlRef.current
    if (!tl) return
    tweenRef.current?.kill()
    tweenRef.current = tl.tweenTo(tl.duration(), { duration: 0.3, ease: 'power3.easeOut' })
  }
  const leave = () => {
    const tl = tlRef.current
    if (!tl) return
    tweenRef.current?.kill()
    tweenRef.current = tl.tweenTo(0, { duration: 0.2, ease: 'power3.easeOut' })
  }

  return (
    <li>
      <button ref={pillRef} className={`pill ${item.cta ? 'is-cta' : ''}`} onMouseEnter={enter} onMouseLeave={leave} onClick={item.onClick}>
        <span ref={circleRef} className="hover-circle" aria-hidden="true" />
        <span className="label-stack">
          <span ref={labelRef} className="pill-label">{item.label}</span>
          <span ref={hoverRef} className="pill-label-hover" aria-hidden="true">{item.label}</span>
        </span>
      </button>
    </li>
  )
}

export default function PillNav({ items, onLogoClick }: { items: NavItem[]; onLogoClick: () => void }) {
  const logoRef = useRef<HTMLButtonElement>(null)
  const svgRef = useRef<HTMLSpanElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const l1 = useRef<HTMLSpanElement>(null)
  const l2 = useRef<HTMLSpanElement>(null)
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    gsap.fromTo(logoRef.current, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'power3.out' })
    if (itemsRef.current) gsap.fromTo(itemsRef.current, { width: 0 }, { width: 'auto', duration: 0.6, ease: 'power3.out' })
  }, [])

  useEffect(() => {
    gsap.to(l1.current, { rotation: open ? 45 : 0, y: open ? 3 : 0, duration: 0.3, ease: 'power3.out' })
    gsap.to(l2.current, { rotation: open ? -45 : 0, y: open ? -3 : 0, duration: 0.3, ease: 'power3.out' })
    const pop = popRef.current
    if (!pop) return
    if (open) {
      gsap.set(pop, { visibility: 'visible' })
      gsap.fromTo(pop, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' })
    } else {
      gsap.to(pop, { opacity: 0, y: 10, duration: 0.2, ease: 'power3.out', onComplete: () => { gsap.set(pop, { visibility: 'hidden' }) } })
    }
  }, [open])

  return (
    <div className="pill-nav-container">
      <nav className="pill-nav" aria-label="Principal">
        <button
          ref={logoRef}
          className="pill-logo"
          aria-label="Generación Verde — inicio"
          onClick={onLogoClick}
          onMouseEnter={() => gsap.fromTo(svgRef.current, { rotate: 0 }, { rotate: 360, duration: 0.2, ease: 'none' })}
        >
          <span ref={svgRef} className="logo-svg-container">
<img src={logoSrc} alt="" width="26" height="32" style={{ height: 32, width: "auto", display: "block" }} />
          </span>
        </button>

        <div ref={itemsRef} className="pill-nav-items desktop-only">
          <ul className="pill-list">
            {items.map((it) => <Pill key={it.label} item={it} />)}
          </ul>
        </div>

        <button className="mobile-menu-button mobile-only" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <span ref={l1} className="hamburger-line" />
          <span ref={l2} className="hamburger-line" />
        </button>
      </nav>

      <div ref={popRef} className="mobile-menu-popover mobile-only">
        <ul className="mobile-menu-list">
          {items.map((it) => (
            <li key={it.label}>
              <button className="mobile-menu-link" onClick={() => { setOpen(false); it.onClick() }}>{it.label}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
