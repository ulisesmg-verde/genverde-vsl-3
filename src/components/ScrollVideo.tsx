import { useEffect, useRef, useState, type RefObject } from 'react'
import Hls from 'hls.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  src: string
  className?: string
  /** Elemento cuyo scroll controla el video. Por defecto, todo el documento. */
  triggerRef?: RefObject<HTMLElement | null>
}

export default function ScrollVideo({ src, className = '', triggerRef }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  // Carga del video (HLS o MP4)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let hls: Hls | null = null
    const isHls = /\.m3u8(\?|$)/.test(src)

    if (isHls && Hls.isSupported()) {
      hls = new Hls({
        maxBufferLength: 120,
        maxMaxBufferLength: 600,
        maxBufferSize: 200 * 1024 * 1024,
        startPosition: 0,
        capLevelToPlayerSize: false,
        startLevel: -1,
        autoStartLoad: true,
      })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!hls) return
        const maxLevel = hls.levels.length - 1
        hls.currentLevel = maxLevel
        hls.startLevel = maxLevel
      })
      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        if (!video.duration || !video.buffered.length) return
        const end = video.buffered.end(video.buffered.length - 1)
        setProgress(Math.min(100, Math.round((end / video.duration) * 100)))
      })
    } else {
      // Safari (HLS nativo) o MP4 progresivo
      video.src = src
      const onProgress = () => {
        if (!video.duration || !video.buffered.length) return
        const end = video.buffered.end(video.buffered.length - 1)
        setProgress(Math.min(100, Math.round((end / video.duration) * 100)))
      }
      video.addEventListener('progress', onProgress)
    }

    const onCanPlay = () => {
      setReady(true)
      ScrollTrigger.refresh()
    }
    video.addEventListener('canplay', onCanPlay)
    // Safety net: nunca dejar al usuario atrapado en el loader
    const fallback = window.setTimeout(() => setReady(true), 8000)

    return () => {
      window.clearTimeout(fallback)
      video.removeEventListener('canplay', onCanPlay)
      hls?.destroy()
    }
  }, [src])

  // Scroll → posición del video (con throttle de seeks)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let currentTarget = 0
    let seekPending = false
    let rafId = 0

    const doSeek = () => {
      if (!video.duration) return
      if (video.seeking) {
        seekPending = true
        return
      }
      // Solo actualizamos el frame cuando el navegador terminó de pintar el anterior
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!video.seeking) video.currentTime = currentTarget
      })
    }

    const onSeeked = () => {
      if (seekPending) {
        seekPending = false
        doSeek()
      }
    }
    video.addEventListener('seeked', onSeeked)

    const st = ScrollTrigger.create({
      trigger: triggerRef?.current ?? document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const duration = video.duration || 0
        currentTarget = Math.min(self.progress * duration, Math.max(0, duration - 0.05))
        doSeek()
      },
    })

    return () => {
      cancelAnimationFrame(rafId)
      video.removeEventListener('seeked', onSeeked)
      st.kill()
    }
  }, [triggerRef])

  // Parallax con el mouse
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const onMove = (e: MouseEvent) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 2
      const moveY = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(wrapper, { x: moveX * -30, y: moveY * -30, duration: 1.5, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={wrapperRef} className={`fixed top-0 left-0 w-full h-full z-0 scale-[1.05] origin-center ${className}`}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-[1.35]"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Viñeta para legibilidad del texto */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>
      {!ready && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <p className="text-white text-2xl font-sans">Cargando… {progress}%</p>
        </div>
      )}
    </>
  )
}
