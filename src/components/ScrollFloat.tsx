import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollFloat.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollFloat({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  const content = useMemo(
    () =>
      children.split('\n').map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((word, wi, arr) => (
            <span key={wi}>
              <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((c, ci) => (
                  <span key={ci} className="char">{c}</span>
                ))}
              </span>
              {wi < arr.length - 1 && ' '}
            </span>
          ))}
        </span>
      )),
    [children]
  )

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.char'),
        { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, transformOrigin: '50% 0%' },
        {
          opacity: 0, yPercent: 250, scaleY: 1.2, scaleX: 0.9,
          duration: 1, ease: 'power2.inOut', stagger: 0.05,
          scrollTrigger: { trigger: document.body, start: 'top top', end: '+=1000', scrub: 1.5 },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 z-10 flex flex-col justify-end p-4 md:p-8 pointer-events-none">
      <h1
        ref={ref}
        className="scroll-float-text font-dirtyline text-white uppercase"
        style={{ fontSize: 'clamp(4rem, 15vw, 317px)', lineHeight: 0.85, letterSpacing: '0%' }}
      >
        <span className="sr-only">{children.replace('\n', ' ')}</span>
        <span aria-hidden="true">{content}</span>
      </h1>
    </div>
  )
}
