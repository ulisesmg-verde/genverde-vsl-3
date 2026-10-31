import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MARQUEE } from './GlassPanel'
import { CONFIG } from '../config'

gsap.registerPlugin(ScrollTrigger)

/** Hero B: foto fija. El titular sube y se desvanece; después sube un recuadro verde botella del tamaño de su contenido. */
export default function HeroImage() {
  const stickyRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    // El contenedor alto (260vh) es el padre del bloque fijo
    const box = stickyRef.current?.parentElement
    if (!box) return
    const ctx = gsap.context(() => {
      const st = { trigger: box, start: 'top top', end: 'bottom bottom', scrub: 1 }
      const tl = gsap.timeline({ scrollTrigger: st })
      // 0 → 0.5: el titular sube y desaparece a media página
      tl.fromTo(titleRef.current, { y: 0, opacity: 1 }, { y: () => -window.innerHeight * 0.5, opacity: 0, ease: 'power1.in', duration: 0.5 }, 0)
      // 0.45 → 0.9: sube el recuadro verde botella
      tl.fromTo(panelRef.current, { y: () => window.innerHeight }, { y: 0, ease: 'power2.out', duration: 0.45 }, 0.45)
      tl.to({}, { duration: 0.1 })
      // zoom suave de la foto durante todo el recorrido
      gsap.fromTo(bgRef.current, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { ...st, scrub: true } })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-tinta">
      <img
        ref={bgRef}
        src={CONFIG.heroImage}
        alt="Jardín vertical y jardinera diseñados por Generación Verde en CDMX"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/55" />

      {/* Titular */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-8">
        <h1
          ref={titleRef}
          className="font-dirtyline text-white uppercase"
          style={{ fontSize: 'clamp(4rem, 15vw, 317px)', lineHeight: 0.85, textShadow: '0 4px 40px rgba(0,0,0,0.25)' }}
        >
          Dele vida<br />a su espacio
        </h1>
      </div>

      {/* Recuadro verde botella: solo el alto de su contenido */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center px-3 pb-3 md:px-6 md:pb-8">
        <div ref={panelRef} className="w-full max-w-[1100px] overflow-hidden rounded-3xl bg-tinta text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]">
          <div className="px-5 pt-6 pb-5 text-center md:px-12 md:pt-10 md:pb-8">
            <p className="mb-2 font-serif text-sm italic text-white/70 md:mb-4 md:text-lg">Generación Verde · 15 años</p>
            <h2 className="mx-auto max-w-[950px] font-serif text-[28px] leading-[1.08] tracking-tight md:text-6xl lg:text-[72px] lg:leading-[1]">
              Muros que <span className="italic text-dorado">respiran</span>, azoteas que <span className="italic">florecen</span> y jardines que <span className="italic">maduran</span> en su espacio.
            </h2>
          </div>
          <div className="overflow-hidden border-t border-white/10 py-3 md:py-5">
            <div className="flex w-max animate-marquee">
              {Array.from({ length: 4 }).flatMap((_, r) =>
                MARQUEE.map((name) => (
                  <span key={`${r}-${name}`} className="mx-6 whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-widest text-white opacity-40 md:mx-8 md:text-sm">
                    {name}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
