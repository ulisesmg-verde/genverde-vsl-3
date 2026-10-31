import { useLayoutEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const MARQUEE = [
  'JARDINES VERTICALES',
  'AZOTEAS VERDES',
  'PAISAJISMO',
  'RIEGO AUTOMATIZADO',
  'POLANCO',
  'LOMAS DE CHAPULTEPEC',
  'SANTA FE',
  'MANTENIMIENTO',
]

export default function GlassPanel({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const container = containerRef.current
    if (!wrap || !container) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { y: '100%' },
        {
          y: '0%', ease: 'none',
          scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom bottom', scrub: 1.5 },
        }
      )
    })
    return () => ctx.revert()
  }, [containerRef])

  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const onMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 2
      const moveY = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(panel, {
        x: moveX * 20, y: moveY * 20, rotationY: moveX * 4, rotationX: -moveY * 4,
        ease: 'power3.out', duration: 1,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="nosotros" className="absolute bottom-0 left-0 w-full h-screen z-20 flex items-center justify-center px-4 pointer-events-none">
      <div ref={wrapRef} className="w-full max-w-[1250px] h-[900px] max-h-[85vh] pointer-events-auto" style={{ perspective: '1000px' }}>
        <div
          ref={panelRef}
          className="w-full h-full flex flex-col justify-between rounded-3xl relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.16)',
            backdropFilter: 'blur(160px)',
            WebkitBackdropFilter: 'blur(160px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">
            <p className="font-serif italic text-white/70 text-base md:text-lg mb-4 md:mb-6">Generación Verde · 15 años</p>
            <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-[96px] leading-[1.1] lg:leading-[0.98] tracking-tight w-full max-w-[1050px] mx-auto">
              Muros que <span className="italic text-dorado">respiran</span>, azoteas que <span className="italic">florecen</span> y jardines que <span className="italic">maduran</span> en su espacio.
            </h2>
          </div>

          <div className="border-t border-white/10 py-6 overflow-hidden">
            <div className="flex w-max animate-marquee">
              {Array.from({ length: 4 }).flatMap((_, r) =>
                MARQUEE.map((name) => (
                  <span
                    key={`${r}-${name}`}
                    className="mx-8 text-white opacity-40 hover:opacity-100 transition-opacity duration-300 uppercase font-sans font-semibold text-sm tracking-widest whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
