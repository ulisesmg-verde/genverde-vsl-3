import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, ArrowUpRight, ArrowRight, Plus, Droplets } from 'lucide-react'
import { CONFIG } from '../config'

gsap.registerPlugin(ScrollTrigger)

/* ───────── Piezas comunes ───────── */

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-oro-oscuro mb-5">{children}</p>
)

const CtaButton = ({ label = 'Solicitar Asesoría', light = false }: { label?: string; light?: boolean }) => (
  <a
    href="#contacto"
    className={`group inline-flex items-center gap-3 rounded-full px-7 py-4 font-sans text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-dorado focus-visible:ring-offset-2 ${light ? 'bg-dorado text-tinta hover:bg-white' : 'bg-tinta text-white hover:bg-dorado hover:text-tinta'}`}
  >
    {label}
    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
  </a>
)

/** Las 4 hojas del logo, como elemento gráfico */
const Petals = ({ className = '', fill = 'currentColor' }: { className?: string; fill?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill={fill} aria-hidden="true">
    <path d="m50,50c0,18.2,14.77,32.98,32.97,32.98,0-18.2-14.77-32.98-32.97-32.98Z" />
    <path d="m17.02,82.98c18.2,0,32.98-14.77,32.98-32.98-18.2,0-32.98,14.77-32.98,32.98Z" />
    <path d="m82.98,17.02c-18.2,0-32.97,14.77-32.97,32.97,18.2,0,32.97-14.77,32.97-32.97Z" />
    <path d="m17.02,17.02c0,18.2,14.77,32.97,32.98,32.97,0-18.2-14.77-32.97-32.98-32.97Z" />
  </svg>
)

/* ───────── VSL ───────── */

function VslPlayer() {
  const [playing, setPlaying] = useState(false)
  const id = CONFIG.vslWistiaId

  return (
    <div className="relative aspect-video w-full max-w-full overflow-hidden rounded-[28px] bg-tinta shadow-[0_40px_100px_-40px_rgba(22,48,42,0.55)]">
      {playing ? (
        <iframe
          src={`https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&playerColor=C9A85D&videoFoam=true`}
          title="Generación Verde · Así se diseña un jardín vertical que dura décadas"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-tinta">
            {CONFIG.vslPoster && <img src={CONFIG.vslPoster} alt="" className="h-full w-full object-cover opacity-70" />}
            <div className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-tinta/20 to-transparent" />
          </div>
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-white"
            aria-label="Reproducir video"
          >
            <span className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-dorado text-tinta transition-transform duration-500 hover:scale-110">
              <Play size={34} fill="currentColor" className="ml-1" />
            </span>
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.2em] text-white/80">Ver el video · con sonido</span>
          </button>
        </>
      )}
    </div>
  )
}

/* ───────── Servicios: tarjetas inclinadas ───────── */

const SERVICES = [
  {
    title: 'Jardines verticales',
    line: 'Muros vivos interiores y exteriores',
    tag: 'Desde 10 m²',
    img: CONFIG.img.jardinVertical,
    bg: 'bg-hoja',
    key: 'jardin',
  },
  {
    title: 'Azoteas verdes',
    line: 'Su losa, convertida en jardín habitable',
    tag: 'Impermeabilización + cargas',
    img: CONFIG.img.azotea,
    bg: 'bg-trigo',
    key: 'azotea',
  },
  {
    title: 'Paisajismo',
    line: 'Terrazas, patios y jardines',
    tag: 'Especies para su luz y clima',
    img: CONFIG.img.paisajismo,
    bg: 'bg-cielo',
    key: 'paisajismo',
  },
]

function ServiceCards() {
  return (
    <div className="svc-stage grid gap-6 md:grid-cols-3 md:gap-8 md:pt-6">
      {SERVICES.map((s, i) => (
        <div key={s.title} data-card={s.key} className={`svc-drop will-change-transform ${i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-6' : ''}`}>
          <a
            href="#contacto"
            style={{ ['--rot-m' as string]: `${[-2, 1.5, -1][i]}deg` }}
            className={`svc-card group relative flex flex-col overflow-hidden rounded-[32px] ${s.bg} p-7 md:h-[480px] shadow-[0_30px_60px_-30px_rgba(22,48,42,0.35)]`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-serif text-[32px] leading-[1] text-tinta">{s.title}</h4>
                <p className="mt-3 font-sans text-sm text-tinta">{s.line}</p>
                <p className="mt-1 font-sans text-sm text-tinta-suave">{s.tag}</p>
              </div>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-tinta text-white transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={22} />
              </span>
            </div>
            <img src={s.img} alt={s.title} loading="lazy" className="mt-6 h-60 w-full min-h-0 flex-1 rounded-[22px] object-cover md:h-auto" />
          </a>
        </div>
      ))}
    </div>
  )
}

/* ───────── Datos ───────── */

const STEPS = [
  { t: 'Asesoría de Paisaje', d: 'Visitamos su obra y revisamos planos, luz, cargas e instalaciones con su arquitecto.' },
  { t: 'Diseño y propuesta', d: 'Paleta vegetal, sistema constructivo, riego y una visualización de su espacio.' },
  { t: 'Instalación coordinada', d: 'Preparaciones hidráulicas y eléctricas antes de acabados. Nada se rompe después.' },
  { t: 'Mantenimiento', d: 'Riego automatizado con depósito, bomba y timer, y un plan para que el jardín madure.' },
]

const STATS = [
  {
    n: '15+', unit: 'AÑOS', d: 'integrando naturaleza viva en la arquitectura de la Ciudad de México.',
    img: CONFIG.img.roma, cap: 'Jardín vertical de más de 13 años en la colonia Roma, CDMX',
    color: 'text-salvia', petal: 'text-hoja',
  },
  {
    n: '10', unit: 'm²', d: 'es la superficie desde la que diseñamos un jardín vertical.',
    img: CONFIG.img.polanco, cap: 'Jardín vertical de 10 m² en Polanco, CDMX',
    color: 'text-oro-oscuro', petal: 'text-trigo',
  },
  {
    n: '7,000+', unit: 'm²', d: 'instalados de jardines verticales y azoteas verdes.',
    img: CONFIG.img.reforma, cap: 'Jardín vertical de 12 años con más de 800 m² en Reforma, CDMX',
    color: 'text-tinta', petal: 'text-cielo',
  },
]

const FAQ = [
  {
    q: '¿Un jardín vertical genera humedad en mi muro?',
    a: 'No. El jardín se monta sobre una estructura de acero separada del muro, con una placa impermeable de 6 mm y dos capas de geotextil. El agua sobrante regresa a un depósito de acero en la base y se recircula.',
  },
  {
    q: '¿Por qué conviene hacerlo durante la remodelación?',
    a: 'Porque la toma de agua, el contacto eléctrico para la bomba, las cargas y la impermeabilización se resuelven antes de los acabados. Hacerlo después implica romper lo que ya está terminado.',
  },
  {
    q: '¿Trabajan con mi arquitecto o constructor?',
    a: 'Sí. Nos integramos al equipo de su proyecto: revisamos planos, coordinamos fechas y entregamos especificaciones técnicas para la obra.',
  },
  {
    q: '¿Cuánto mantenimiento requiere?',
    a: 'El riego es automático. Ofrecemos planes de mantenimiento periódico para poda, nutrición y revisión del sistema, ajustados al tamaño de su jardín.',
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-tinta/10 border-y border-tinta/10">
      {FAQ.map((f, i) => (
        <div key={f.q}>
          <button
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-serif text-2xl md:text-3xl text-tinta">{f.q}</span>
            <Plus className={`shrink-0 text-oro-oscuro transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
          </button>
          <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
            <p className="overflow-hidden font-sans text-base md:text-lg leading-relaxed text-tinta-suave max-w-3xl">{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ───────── Formulario GoHighLevel (INLINE) ───────── */

function GhlForm() {
  const id = CONFIG.ghlFormId
  useEffect(() => {
    if (document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) return
    const s = document.createElement('script')
    s.src = 'https://link.msgsndr.com/js/form_embed.js'
    s.async = true
    document.body.appendChild(s)
  }, [])

  return (
    <div className="ghl-form-wrap">
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${id}`}
        style={{ width: '100%', height: `${CONFIG.ghlFormHeight}px`, border: 'none', borderRadius: '3px' }}
        id={`inline-${id}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Form VSL"
        data-height={String(CONFIG.ghlFormHeight)}
        data-layout-iframe-id={`inline-${id}`}
        data-form-id={id}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="Form VSL"
      />
    </div>
  )
}

/* ───────── Página ───────── */

export default function VslSections() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      // Tarjetas de servicios: caen desde arriba y se acomodan, cada una a su ritmo (sin fijar el scroll)
      mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, (c) => {
        const desktop = c.conditions?.desktop
        const cards = gsap.utils.toArray<HTMLElement>('#servicios .svc-drop')
        const plan = [
          { y: -420, x: -60, r: -18, start: 'top 95%', end: 'top 45%', ease: 'bounce.out', endR: -2 },
          { y: -560, x: 40, r: 14, start: 'top 98%', end: 'top 30%', ease: 'back.out(1.7)', endR: 1.5 },
          { y: -340, x: 80, r: 22, start: 'top 90%', end: 'top 52%', ease: 'power4.out', endR: -1 },
        ]
        cards.forEach((el, i) => {
          const p = plan[i % plan.length]
          const k = desktop ? 1 : 0.35
          gsap.fromTo(el,
            { y: p.y * k, x: p.x * k, rotation: p.r, opacity: 0 },
            {
              y: 0, x: 0, rotation: desktop ? p.endR : 0, opacity: 1, ease: p.ease,
              scrollTrigger: { trigger: '#servicios .svc-stage', start: p.start, end: p.end, scrub: 0.6 + i * 0.35 },
            })
        })
      })

      // Inversión: el panel sube sobre la foto, como en el hero
      const inv = root.current?.querySelector<HTMLElement>('.inv-section')
      if (inv) {
        gsap.fromTo(inv.querySelector('.inv-panel'), { y: '110vh' }, {
          y: 0, ease: 'none',
          scrollTrigger: { trigger: inv, start: 'top top', end: '55% bottom', scrub: 1.2 },
        })
        gsap.fromTo(inv.querySelector('.inv-bg'), { scale: 1.12 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: inv, start: 'top bottom', end: 'bottom bottom', scrub: true },
        })
      }

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
    }, root)
    return () => { ctx.revert(); mm.revert() }
  }, [])

  const wrap = 'mx-auto max-w-[1250px] px-4 md:px-8'

  return (
    <div ref={root} className="relative z-30 bg-papel text-tinta">
      {/* VSL — banda de color arriba, como en la referencia */}
      <section id="video" className="relative">
        <div className="absolute inset-x-0 top-0 h-[38%] bg-hoja" aria-hidden="true" />
        <div className={`${wrap} relative pt-28 md:pt-36 pb-24 md:pb-32`}>
          <div className="reveal mx-auto max-w-4xl text-center mb-12 md:mb-16">
            <Eyebrow>Paso 1 · Vea este video</Eyebrow>
            <h2 className="font-sans font-light text-4xl md:text-6xl leading-[1.05] tracking-tight text-balance">
              Así se diseña un jardín vertical que dura{' '}
              <span className="font-serif italic font-normal">décadas</span>,{' '}
              <span className="font-semibold">no temporadas.</span>
            </h2>
          </div>
          <div className="reveal"><VslPlayer /></div>
          <div className="reveal mt-10 flex flex-col items-center gap-4 text-center">
            <CtaButton />
            <p className="font-sans text-sm text-tinta-suave">Paso 2 · Agende una visita a su obra sin costo</p>
          </div>
        </div>
      </section>

      {/* Problema — titular y texto a la izquierda, foto a la derecha */}
      <section className="bg-bruma">
        <div className={`${wrap} grid gap-12 py-24 md:py-32 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:items-center`}>
          <div className="min-w-0">
            <h3 className="reveal font-sans font-bold uppercase text-4xl md:text-6xl leading-[0.95] tracking-tight text-tinta text-balance mb-10">
              El jardín que se piensa al final <span className="font-serif italic font-normal normal-case text-oro-oscuro">se nota.</span>
            </h3>
            <div className="reveal space-y-6 font-sans text-lg leading-relaxed text-tinta-suave max-w-xl">
              <p>Mármol, carpintería, iluminación: todo se decide con cuidado. Y las plantas se dejan para “cuando termine la obra”.</p>
              <p>Entonces no hay toma de agua donde se necesita, la losa no se preparó, el muro ya tiene acabado y el jardín termina siendo unas macetas, o un muro que se seca en meses.</p>
              <p className="text-tinta font-medium">Su casa merece que la naturaleza esté en los planos, no en la lista de pendientes.</p>
            </div>
          </div>
          <figure className="reveal relative">
            <img
              src={CONFIG.img.muroExterior}
              alt="Jardín vertical exterior de doble altura diseñado desde la obra"
              loading="lazy"
              className="aspect-[3/4] w-full max-w-full rounded-[28px] object-cover shadow-[0_40px_80px_-40px_rgba(22,48,42,0.45)]"
            />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-papel/90 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-tinta backdrop-blur">
              Muro vivo exterior · doble altura
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Servicios — las tarjetas caen y se acomodan con el scroll */}
      <section id="servicios" className="overflow-x-clip">
        <div className={`${wrap} py-24 md:py-32`}>
          <div className="reveal mb-14 md:mb-16 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
            <div className="min-w-0">
              <Eyebrow>Lo que hacemos</Eyebrow>
              <h3 className="font-sans font-light text-5xl md:text-7xl leading-[0.98] tracking-tight text-balance">
                Naturaleza viva,
                <span className="block font-serif italic font-normal">resuelta como</span>
                <span className="block font-bold">arquitectura.</span>
              </h3>
            </div>
            <div className="min-w-0">
              <p className="max-w-md font-sans text-lg leading-relaxed text-tinta-suave">
                Estructura de acero, placa impermeable de 6 mm de material reciclado y doble capa de geotextil. Su muro nunca toca la humedad.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-bruma px-5 py-3 font-sans text-sm text-tinta">
                <Droplets size={18} className="text-oro-oscuro" />
                Riego automatizado en todos nuestros sistemas
              </div>
            </div>
          </div>
          <ServiceCards />
          <div className="reveal mt-12 flex justify-center md:mt-16">
            <CtaButton label="Solicitar Asesoría de Paisaje" />
          </div>
        </div>
      </section>

      {/* Proceso — barra de pasos, como la fila de cifras de la referencia */}
      <section id="proceso" className="bg-bruma">
        <div className={`${wrap} py-24 md:py-32`}>
          <div className="reveal mb-12 md:mb-16 grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
            <div className="min-w-0">
              <h3 className="font-sans font-bold uppercase text-4xl md:text-6xl leading-[0.95] tracking-tight">
                Cuatro pasos,<br />
                <span className="font-serif italic font-normal normal-case text-oro-oscuro">cero improvisación.</span>
              </h3>
              <p className="mt-6 max-w-sm font-sans text-base text-tinta-suave">Entramos a su obra en el momento correcto, junto a su arquitecto. Y seguimos después: nuestro equipo da mantenimiento a cualquier altura.</p>
            </div>
            <figure className="relative">
              <img
                src={CONFIG.img.mantenimiento}
                alt="Técnico de Generación Verde dando mantenimiento a un jardín en altura"
                loading="lazy"
                className="aspect-[4/3] w-full max-w-full rounded-[28px] object-cover"
              />
              <figcaption className="absolute bottom-5 left-5 rounded-full bg-papel/90 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-tinta backdrop-blur">
                Mantenimiento en altura
              </figcaption>
            </figure>
          </div>
          <ol className="reveal grid overflow-hidden rounded-[28px] border border-tinta/10 bg-papel md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="border-tinta/10 p-8 md:p-9 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:border-l">
                <span className="font-sans text-5xl font-light tabular-nums text-salvia">{i + 1}</span>
                <h4 className="mt-6 mb-3 font-sans text-lg font-semibold">{s.t}</h4>
                <p className="font-sans text-base leading-relaxed text-tinta-suave">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trayectoria — cifras escalonadas */}
      <section>
        <div className={`${wrap} py-24 md:py-32`}>
          <div className="reveal grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16 mb-16 md:mb-20">
            <h3 className="font-sans font-bold uppercase text-4xl md:text-6xl leading-[0.95] tracking-tight text-balance">
              Más de 15 años integrando naturaleza en arquitectura.
            </h3>
            <div className="space-y-5 font-sans text-lg leading-relaxed text-tinta-suave max-w-xl">
              <p>Ingenieros, biólogos y paisajistas en un mismo equipo, desde los planos hasta el primer brote.</p>
              <p>Diseñamos cada sistema para el muro, la losa y la luz reales de su casa, y lo dejamos funcionando con riego automático.</p>
              <a href="#contacto" className="inline-flex items-center gap-3 font-sans text-sm font-semibold text-tinta">
                Solicitar Asesoría
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-tinta/30"><ArrowUpRight size={14} /></span>
              </a>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3 md:items-start">
            {STATS.map((s, i) => (
              <div
                key={s.n}
                className={`reveal relative flex flex-col overflow-hidden rounded-[24px] bg-bruma p-6 md:p-8 ${i === 1 ? 'md:mt-20' : ''}`}
              >
                <Petals className={`absolute right-5 top-5 h-14 w-14 ${s.petal}`} />
                <p className={`relative font-sans text-6xl md:text-7xl font-bold leading-none tracking-tight tabular-nums ${s.color}`}>
                  {s.n}
                  <span className="block text-4xl md:text-5xl">{s.unit}</span>
                </p>
                <p className="relative mt-4 max-w-[28ch] font-sans text-sm leading-relaxed text-tinta-suave">{s.d}</p>
                <figure className="mt-6">
                  <img src={s.img} alt={s.cap} loading="lazy" className="aspect-[4/3] w-full max-w-full rounded-[16px] object-cover" />
                  <figcaption className="mt-3 font-sans text-xs leading-snug text-tinta-suave">{s.cap}</figcaption>
                </figure>
              </div>
            ))}
          </div>
          <div className="reveal mt-12 flex justify-center md:mt-16">
            <CtaButton label="Solicitar Asesoría de Paisaje" />
          </div>
        </div>
      </section>

      {/* Inversión — foto fija de fondo y panel de vidrio que sube con el scroll */}
      <section className="inv-section relative h-[220vh] bg-tinta">
        <div className="sticky top-0 h-screen overflow-hidden">
          <img src={CONFIG.img.inversion} alt="Sala con jardín vertical exterior y alberca diseñados por Generación Verde" className="inv-bg absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/10" aria-hidden="true" />
          <div className="absolute inset-0 flex items-end justify-center px-4 pb-6 md:pb-12">
            <div
              className="inv-panel relative w-full max-w-[1000px] overflow-hidden rounded-3xl px-6 py-10 text-center text-white md:px-14 md:py-12"
              style={{ backgroundColor: '#16302A', boxShadow: '0 40px 100px -30px rgba(0,0,0,0.6)' }}
            >
              <p className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-dorado mb-5">Inversión</p>
              <h3 className="mx-auto max-w-4xl font-sans font-light text-5xl md:text-7xl leading-[0.98] tracking-tight mb-6 text-balance">
                Jardines verticales <span className="font-bold">desde 10 m²</span>
              </h3>
              <p className="mx-auto max-w-2xl font-sans text-base md:text-lg leading-relaxed text-white/80 mb-10">
                El valor final depende de la superficie, el sistema y el acceso. En la Asesoría de Paisaje le entregamos un rango claro antes de diseñar.
              </p>
              <CtaButton light />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`${wrap} py-24 md:py-32`}>
        <div className="reveal mb-10"><Eyebrow>Preguntas frecuentes</Eyebrow></div>
        <div className="reveal"><Faq /></div>
      </section>

      {/* Contacto + formulario GHL */}
      <section id="contacto" className="bg-bruma">
        <div className={`${wrap} grid gap-14 py-24 md:py-32 md:grid-cols-[0.9fr_1.1fr] md:items-start`}>
          <div className="reveal">
            <Eyebrow>Asesoría de Paisaje · sin costo</Eyebrow>
            <h3 className="font-sans font-light text-5xl md:text-7xl leading-[0.98] tracking-tight mb-6 text-balance">
              Agende su <span className="font-serif italic font-normal">Asesoría</span> <span className="font-bold">de Paisaje.</span>
            </h3>
            <p className="font-sans text-lg leading-relaxed text-tinta-suave max-w-md">
              Cuéntenos en qué etapa está su remodelación. Revisamos su proyecto y le decimos qué conviene preparar ahora para no romper nada después.
            </p>
            <figure className="mt-10 hidden max-w-sm md:block">
              <img
                src={CONFIG.img.muroInterior}
                alt="Jardín vertical sembrado en 2015 en oficinas, CDMX"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[28px] object-cover"
              />
              <figcaption className="mt-3 font-sans text-xs leading-snug text-tinta-suave">Jardín vertical sembrado en 2015 en oficinas, CDMX</figcaption>
            </figure>
          </div>
          <div className="reveal"><GhlForm /></div>
        </div>
      </section>

      <footer className="bg-tinta text-white">
        <div className={`${wrap} flex flex-col gap-4 py-10 font-sans text-sm text-white/60 md:flex-row md:items-center md:justify-between`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
            <img src={CONFIG.img.logo} alt="Generación Verde" width={775} height={255} className="h-10 w-auto max-w-none shrink-0 self-start object-contain md:h-12 md:self-center" />
            <p>© {new Date().getFullYear()} Generación Verde · Ciudad de México</p>
          </div>
          <p className="flex gap-6">
            <a className="hover:text-dorado" href="https://generacionverde.mx">generacionverde.mx</a>
            <a className="hover:text-dorado" href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
