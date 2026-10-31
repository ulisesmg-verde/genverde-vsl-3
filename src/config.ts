// ⚙️ Ajuste aquí los datos del negocio antes de publicar
// En GoHighLevel las URLs de los archivos se definen en window.GV_ASSETS (ver ghl/README-GHL.md)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const A: Record<string, string> = (typeof window !== 'undefined' && (window as any).GV_ASSETS) || {}

export const CONFIG = {
  // Prueba A/B del hero: 'A' = video con scroll · 'B' = foto fija
  heroVariant: (A.heroVariant || (import.meta.env.VITE_HERO as string) ||
    (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hero')) || 'A').toUpperCase(),
  heroImage: A.heroImage || 'img/hero-b.webp',
  // Video de fondo del hero (scroll-scrub). Acepta .mp4 o .m3u8 (HLS)
  heroVideo: A.heroVideo || (import.meta.env.VITE_HERO_VIDEO as string) ||
    // HeroGV.mp4 en Wistia (archivo original): https://generacionverde.wistia.com/medias/m9h4trcj1e
    'https://embed-ssl.wistia.com/deliveries/01a9a615ff5accb4bdd3d93cdc24be93/HeroGV.mp4',
  // Video de ventas (VSL) con audio. Ponga aquí su export final (mp4 o m3u8)
  vslVideo: A.vslVideo || '',
  // Video de ventas en Wistia (id de https://generacionverde.wistia.com/medias/oqm7iwgiig)
  vslWistiaId: A.vslWistiaId || 'oqm7iwgiig',
  vslPoster: A.vslPoster || 'img/vsl-poster.webp',
  // Formulario de GoHighLevel (tipo INLINE)
  ghlFormId: '0YLBU4SUWD3unyBb56k7',
  ghlFormHeight: 602,
  // Fotos de proyectos de Generación Verde (en /public/img)
  img: {
    muroExterior: A.muroExterior || 'img/muro-exterior.webp',
    mantenimiento: A.mantenimiento || 'img/mantenimiento.webp',
    muroInterior: A.muroInterior || 'img/muro-interior.webp',
    jardinVertical: A.jardinVertical || 'img/jardin-vertical.webp',
    azotea: A.azotea || 'img/azotea.webp',
    paisajismo: A.paisajismo || 'img/paisajismo.webp',
    roma: A.roma || 'img/roma-13anos.webp',
    pedregal: A.pedregal || 'img/pedregal-200m2.webp',
    polanco: A.polanco || 'img/polanco-10m2.webp',
    reforma: A.reforma || 'img/reforma-800m2.webp',
    inversion: A.inversion || 'img/inversion-jv.webp',
    logo: A.logo || 'img/logo-generacion-verde.png',
  },
  // WhatsApp en formato internacional sin "+" ni espacios, ej. 5215512345678
  whatsapp: '52XXXXXXXXXX',
  email: 'contacto@generacionverde.mx',
}
