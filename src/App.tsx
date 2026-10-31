import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import ScrollVideo from './components/ScrollVideo'
import ScrollFloat from './components/ScrollFloat'
import GlassPanel from './components/GlassPanel'
import PillNav, { type NavItem } from './components/PillNav'
import HeroImage from './components/HeroImage'
import VslSections from './components/VslSections'
import { CONFIG } from './config'

gsap.registerPlugin(ScrollToPlugin)

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const isB = CONFIG.heroVariant === 'B'

  const scrollTo = (target: number | string, duration = 3) =>
    gsap.to(window, { duration, scrollTo: target, ease: 'power3.inOut' })

  const heroEnd = () => (heroRef.current ? heroRef.current.offsetHeight - window.innerHeight : 0)

  const items: NavItem[] = [
    { label: 'Inicio', onClick: () => scrollTo(0) },
    { label: 'Nosotros', onClick: () => scrollTo(heroEnd()) },
    { label: 'Video', onClick: () => scrollTo('#video', 2) },
    { label: 'Solicitar Asesoría', onClick: () => scrollTo('#contacto', 2), cta: true },
  ]

  return (
    <main className="font-sans">
      <PillNav items={items} onLogoClick={() => scrollTo(0)} />
      {isB ? (
        <div ref={heroRef} style={{ position: 'relative', height: '260vh' }}>
          <HeroImage />
        </div>
      ) : (
        <>
          <ScrollVideo src={CONFIG.heroVideo} triggerRef={heroRef} />
          <div ref={heroRef} style={{ position: 'relative', height: '500vh' }}>
            <ScrollFloat>{`Dele vida\na su espacio`}</ScrollFloat>
            <GlassPanel containerRef={heroRef} />
          </div>
        </>
      )}
      <VslSections />
    </main>
  )
}
