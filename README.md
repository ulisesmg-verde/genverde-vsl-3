# Generación Verde · Landing VSL

Landing para remodelaciones residenciales de alto nivel (jardines verticales, azoteas verdes y paisajismo).
React + Vite + Tailwind CSS v4 + GSAP.

## Publicar
- **Vercel:** Add New › Project › importar este repositorio › Deploy (usa `vercel.json`).
- **Netlify:** Add new site › Import an existing project › GitHub › este repositorio › Deploy (usa `netlify.toml`).
Build: `npm run build` · Carpeta de salida: `dist`.

## Pruebas A/B del hero
- **A (por defecto):** video que avanza con el scroll (alojado en Wistia).
- **B:** foto fija con titular que sube. Se ve agregando `?hero=b` a la URL.
- Para que el sitio completo use la B, define la variable de entorno `VITE_HERO=B` en Vercel/Netlify.

## Qué editar
- `src/config.ts`: videos de Wistia, formulario de GoHighLevel, fotos, correo.
- `src/components/VslSections.tsx`: textos y secciones debajo del hero.
- `public/img/`: fotos de proyectos.

## Desarrollo local
```
npm install
npm run dev
```
