import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}: SectionRevealProps) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const target = ref.current

    if (!target || prefersReducedMotion) {
      if (target) target.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref}
      data-reveal
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  )
}
