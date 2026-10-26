import { useEffect, useRef, useState, type TouchEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import heroArt from '../assets/image_1e11b187.jpg'
import doctorPortrait from '../assets/dr. abhishek karmakar.jpeg'
import { Icon, aboutHighlights, clinicAddress, clinicEmail, clinicHours, clinicPhone, services } from '../data/site.tsx'
import { SectionReveal } from '../components/SectionReveal'

const servicesDesktopBreakpoint = '(min-width: 1024px)'

export function HomePage() {
  const location = useLocation()
  const [heroOffset, setHeroOffset] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [servicePosition, setServicePosition] = useState(1)
  const [isServicesCarouselEnabled, setIsServicesCarouselEnabled] = useState(() => !window.matchMedia(servicesDesktopBreakpoint).matches)
  const [servicesCardWidth, setServicesCardWidth] = useState(0)
  const [servicesCardGap, setServicesCardGap] = useState(0)
  const [isServiceTrackTransitionEnabled, setIsServiceTrackTransitionEnabled] = useState(true)
  const servicesCarouselRef = useRef<HTMLDivElement>(null)
  const servicesTrackRef = useRef<HTMLDivElement>(null)
  const servicesPausedRef = useRef(false)
  const servicesResumeRef = useRef<number | undefined>(undefined)
  const servicesAutoPlayTimeoutRef = useRef<number | undefined>(undefined)
  const servicesScheduleAutoPlayRef = useRef<(() => void) | null>(null)
  const servicesTouchStartRef = useRef<{ x: number; y: number } | null>(null)
  const servicesSwipedRef = useRef(false)
  const activeService = (servicePosition + services.length - 1) % services.length
  const servicesCardStyle = isServicesCarouselEnabled && servicesCardWidth > 0
    ? { flex: `0 0 ${servicesCardWidth}px`, width: `${servicesCardWidth}px` }
    : undefined
  const servicesCardStep = servicesCardWidth + servicesCardGap

  const diagnosticServices = ['Pathology Laboratory', 'Digital X-Ray', 'ECG', '2D Echo Colour Doppler']
  const faqs = [
    ['How do I request an appointment?', 'Choose your service, select a preferred date and time, then share your details through the appointment form. Our team will help with the next step.'],
    ['What services are available at Health Box?', 'Health Box brings General Medicine, Cardiology, Diabetology, Rheumatology, Advanced Physiotherapy and Diagnostic Services together in one healthcare environment.'],
    ['Where is Health Box located?', clinicAddress],
    ['What are the clinic opening hours?', clinicHours],
    ['Which diagnostic services are listed?', 'The listed diagnostic services are Pathology Laboratory, Digital X-Ray, ECG and 2D Echo Colour Doppler.'],
    ['What physiotherapy areas are available?', 'The listed areas include pain management, back and neck care, joint pain, sports injury rehabilitation, post-operative rehabilitation, muscle strengthening, and mobility and flexibility.'],
    ['How can I contact Health Box?', `You can call ${clinicPhone} or email ${clinicEmail}.`],
    ['What information should I share when requesting an appointment?', 'The form asks for your name, mobile number, email, selected service, preferred date and time, and an optional message or health concern.'],
  ]

  useEffect(() => {
    const state = location.state as { scrollToAppointment?: boolean } | null
    if (state?.scrollToAppointment) {
      const target = document.getElementById('appointment')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location.state])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const updateHeroOffset = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setHeroOffset(Math.min(window.scrollY * 0.08, 32)))
    }

    window.addEventListener('scroll', updateHeroOffset, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateHeroOffset)
    }
  }, [])

  const pauseServicesCarousel = () => {
    servicesPausedRef.current = true
    window.clearTimeout(servicesResumeRef.current)
    window.clearTimeout(servicesAutoPlayTimeoutRef.current)
  }

  const resumeServicesCarousel = () => {
    window.clearTimeout(servicesResumeRef.current)
    servicesResumeRef.current = window.setTimeout(() => {
      servicesPausedRef.current = false
      servicesScheduleAutoPlayRef.current?.()
    }, 2200)
  }

  const handleServicesCardClick = (index: number) => {
    if (servicesSwipedRef.current) {
      servicesSwipedRef.current = false
      return
    }
    pauseServicesCarousel()
    selectService(index)
    resumeServicesCarousel()
  }

  const stepServicesCarousel = (direction: -1 | 1) => {
    setServicePosition((position) => position + direction)
  }

  const selectService = (index: number) => {
    setServicePosition(index + 1)
  }

  const handleServicesTrackTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
    if (servicePosition > 0 && servicePosition < services.length + 1) return

    setIsServiceTrackTransitionEnabled(false)
    setServicePosition(servicePosition <= 0 ? services.length : 1)
    window.requestAnimationFrame(() => setIsServiceTrackTransitionEnabled(true))
  }

  const handleServicesTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    pauseServicesCarousel()
    const touch = event.touches[0]
    if (touch) servicesTouchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleServicesTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = servicesTouchStartRef.current
    const touch = event.changedTouches[0]
    servicesTouchStartRef.current = null

    if (start && touch && isServicesCarouselEnabled) {
      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y
      if (Math.abs(deltaX) >= 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
        servicesSwipedRef.current = true
        stepServicesCarousel(deltaX < 0 ? 1 : -1)
        window.setTimeout(() => { servicesSwipedRef.current = false }, 500)
      }
    }

    resumeServicesCarousel()
  }

  useEffect(() => {
    const responsiveMode = window.matchMedia(servicesDesktopBreakpoint)
    const updateResponsiveMode = () => setIsServicesCarouselEnabled(!responsiveMode.matches)
    updateResponsiveMode()
    responsiveMode.addEventListener('change', updateResponsiveMode)
    return () => {
      responsiveMode.removeEventListener('change', updateResponsiveMode)
    }
  }, [])

  useEffect(() => {
    const viewport = servicesCarouselRef.current
    const track = servicesTrackRef.current
    if (!isServicesCarouselEnabled || !viewport || !track) return

    const updateCardStep = () => {
      const cardWidth = viewport.clientWidth
      const trackStyles = window.getComputedStyle(track)
      const cardGap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0
      setServicesCardWidth((width) => Math.abs(width - cardWidth) < 0.5 ? width : cardWidth)
      setServicesCardGap((gap) => Math.abs(gap - cardGap) < 0.5 ? gap : cardGap)
    }

    const resizeObserver = new ResizeObserver(updateCardStep)
    resizeObserver.observe(viewport)
    resizeObserver.observe(track)
    const firstCard = track.querySelector<HTMLElement>('.services-mobile-card')
    if (firstCard) resizeObserver.observe(firstCard)
    updateCardStep()

    return () => resizeObserver.disconnect()
  }, [isServicesCarouselEnabled])

  useEffect(() => {
    if (!isServicesCarouselEnabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let mounted = true
    const scheduleAutoPlay = () => {
      window.clearTimeout(servicesAutoPlayTimeoutRef.current)
      if (!mounted || document.hidden || servicesPausedRef.current) return
      servicesAutoPlayTimeoutRef.current = window.setTimeout(() => {
        if (!servicesPausedRef.current && !document.hidden) {
          setServicePosition((position) => position + 1)
        }
        scheduleAutoPlay()
      }, 3800)
    }
    const handleVisibilityChange = () => {
      if (document.hidden) window.clearTimeout(servicesAutoPlayTimeoutRef.current)
      else scheduleAutoPlay()
    }

    servicesScheduleAutoPlayRef.current = scheduleAutoPlay
    scheduleAutoPlay()
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      mounted = false
      window.clearTimeout(servicesAutoPlayTimeoutRef.current)
      window.clearTimeout(servicesResumeRef.current)
      servicesPausedRef.current = false
      servicesScheduleAutoPlayRef.current = null
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isServicesCarouselEnabled])

  return (
    <>
      <section className="cinematic-hero relative isolate min-h-[calc(100svh-34px)] overflow-hidden bg-[#122b25] text-white">
        <div className="cinematic-hero-image absolute inset-0">
          <img
            src={heroArt}
            alt="Health Box healthcare environment"
            className="h-full w-full object-cover object-[58%_center]"
            style={{ transform: `translateY(${heroOffset}px)` }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,30,25,.82)_0%,rgba(10,30,25,.64)_34%,rgba(10,30,25,.22)_72%,rgba(10,30,25,.16)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a211c]/75 via-transparent to-[#0a211c]/20" />

        <div className="relative mx-auto flex min-h-[calc(100svh-34px)] max-w-[1280px] flex-col justify-end px-5 pb-8 pt-28 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12">
          <div className="max-w-[700px]">
            <SectionReveal className="text-[10px] font-bold uppercase tracking-[.2em] text-[#c5e9d9] sm:text-[11px]">
              Health Box Polyclinic &amp; Advance Physiotherapy Center
            </SectionReveal>
            <SectionReveal delay={100} as="h1" className="mt-5 max-w-[650px] text-[46px] font-extrabold leading-[.96] tracking-[-.06em] text-white sm:text-6xl lg:text-[78px]">
              <span className="block">Complete Healthcare.</span>
              <span className="block text-[#c9f0dc]">For a Healthier, Active Life.</span>
            </SectionReveal>
            <SectionReveal delay={190} as="p" className="mt-6 max-w-[540px] text-base leading-7 text-white/78 sm:text-lg">
              Patient-focused healthcare, advanced physiotherapy, preventive care and diagnostic support — all under one roof.
            </SectionReveal>

            <SectionReveal delay={280} className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/contact#appointment" className="cta-primary inline-flex items-center gap-2 rounded-full bg-[#d9f2e2] px-6 py-3.5 text-sm font-bold text-[#14382e] shadow-[0_14px_30px_rgba(5,25,20,.18)] hover:bg-white">
                Book an Appointment <Icon name="arrow" size={17} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 border-b border-white/55 pb-1 text-sm font-bold text-white transition-colors hover:border-[#c9f0dc] hover:text-[#c9f0dc]">
                Explore Our Services
              </Link>
            </SectionReveal>
          </div>

          <SectionReveal delay={390} className="mt-16 flex w-full items-center gap-4 border-t border-white/30 pt-5 text-[10px] font-bold uppercase tracking-[.18em] text-white/80 sm:gap-6 sm:text-[11px]">
            <Link to="/services" className="transition-colors hover:text-[#c9f0dc]">Medical Consultation</Link>
            <span className="h-px w-8 bg-white/45 sm:w-16" aria-hidden="true" />
            <Link to="/physiotherapy" className="transition-colors hover:text-[#c9f0dc]">Physiotherapy</Link>
            <span className="h-px w-8 bg-white/45 sm:w-16" aria-hidden="true" />
            <Link to="/diagnostics" className="transition-colors hover:text-[#c9f0dc]">Diagnostics</Link>
          </SectionReveal>
        </div>
      </section>

      <section className="border-y border-[#e6eae3] bg-white">
        <div className="mx-auto grid max-w-[1180px] gap-0 px-5 sm:grid-cols-3">
          {[
            ['pin', 'Visit our clinic', 'Conveniently located in your area'],
            ['clock', 'Open hours', clinicHours],
            ['phone', 'Talk to us', clinicPhone],
          ].map(([icon, title, text], index) => (
            <SectionReveal key={title} delay={index * 80} className="flex items-center gap-4 border-[#e6eae3] py-6 sm:border-l sm:first:border-l-0 sm:px-6 sm:py-8">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#edf3cf] text-[#758d0f]"><Icon name={icon as any} size={19} /></span>
              <div><p className="text-sm font-bold text-[#1a2a23]">{title}</p><p className="mt-1 text-xs leading-5 text-[#748078]">{text}</p></div>
            </SectionReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24">
        <SectionReveal className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#8ba312]">Services</p>
          <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-.05em] text-[#17352d] sm:text-6xl">Care that meets you where you are.</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#657870]">Explore the care available at Health Box.</p>
        </SectionReveal>

        <div className="mt-12 lg:mt-16">
          <div className="services-carousel-controls mb-3 justify-end gap-2" style={{ display: isServicesCarouselEnabled ? 'flex' : 'none' }}>
            <button type="button" aria-label="Previous service" onClick={() => { pauseServicesCarousel(); stepServicesCarousel(-1); resumeServicesCarousel() }} className="grid size-9 place-items-center border border-[#dce5df] bg-white text-lg leading-none text-[#23675c] transition-colors hover:border-[#2e756b] hover:bg-[#e7f2eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2e756b]">←</button>
            <button type="button" aria-label="Next service" onClick={() => { pauseServicesCarousel(); stepServicesCarousel(1); resumeServicesCarousel() }} className="grid size-9 place-items-center border border-[#dce5df] bg-white text-lg leading-none text-[#23675c] transition-colors hover:border-[#2e756b] hover:bg-[#e7f2eb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2e756b]">→</button>
          </div>
          <div
            ref={servicesCarouselRef}
            onTouchStart={handleServicesTouchStart}
            onTouchEnd={handleServicesTouchEnd}
            onTouchCancel={() => { servicesTouchStartRef.current = null; resumeServicesCarousel() }}
            onFocus={pauseServicesCarousel}
            onBlur={resumeServicesCarousel}
            className={`services-mobile-selector w-full min-w-0 border-y border-[#dce5df] py-3 lg:hidden ${isServicesCarouselEnabled ? 'services-carousel-viewport' : 'overflow-x-auto'}`}
          >
            <div
              ref={servicesTrackRef}
              className="services-carousel-track flex w-max min-w-full flex-nowrap gap-3"
              onTransitionEnd={handleServicesTrackTransitionEnd}
              style={isServicesCarouselEnabled && servicesCardStep > 0 ? {
                transform: `translate3d(calc(-${servicePosition * servicesCardStep}px - 1px), 0, 0)`,
                transition: isServiceTrackTransitionEnabled ? 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
              } : undefined}
            >
              {isServicesCarouselEnabled && <div aria-hidden="true" style={servicesCardStyle} className={`services-mobile-card flex min-h-[76px] shrink-0 flex-col justify-center gap-2 border px-4 py-3 text-left text-sm font-bold leading-tight ${activeService === services.length - 1 ? 'border-[#2e756b] bg-[#e7f2eb] text-[#1e5d51]' : 'border-[#dce5df] bg-white text-[#6c8076]'}`}>
                <span className="font-mono text-[10px] tracking-[.12em] text-[#9aaa9f]">06</span>{services[services.length - 1].title}
              </div>}
              {services.map((service, index) => (
                <button key={service.title} data-service-index={index} style={servicesCardStyle} type="button" aria-pressed={activeService === index} onClick={() => handleServicesCardClick(index)} className={`services-mobile-card flex min-h-[76px] shrink-0 snap-start flex-col justify-center gap-2 border px-4 py-3 text-left text-sm font-bold leading-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2e756b] ${activeService === index ? 'border-[#2e756b] bg-[#e7f2eb] text-[#1e5d51]' : 'border-[#dce5df] bg-white text-[#6c8076]'}`}>
                  <span className="font-mono text-[10px] tracking-[.12em] text-[#9aaa9f]">0{index + 1}</span>{service.title}
                </button>
              ))}
              {isServicesCarouselEnabled && <div aria-hidden="true" style={servicesCardStyle} className={`services-mobile-card flex min-h-[76px] shrink-0 flex-col justify-center gap-2 border px-4 py-3 text-left text-sm font-bold leading-tight ${activeService === 0 ? 'border-[#2e756b] bg-[#e7f2eb] text-[#1e5d51]' : 'border-[#dce5df] bg-white text-[#6c8076]'}`}>
                <span className="font-mono text-[10px] tracking-[.12em] text-[#9aaa9f]">01</span>{services[0].title}
              </div>}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[.46fr_1.54fr] lg:items-stretch lg:gap-12">
            <nav aria-label="Health Box services" className="hidden border-t border-[#dce5df] lg:block">
              {services.map((service, index) => (
                <button key={service.title} type="button" aria-pressed={activeService === index} onMouseEnter={() => selectService(index)} onFocus={() => selectService(index)} onClick={() => selectService(index)} className={`group relative flex w-full items-center gap-4 border-b border-[#dce5df] py-5 text-left outline-none transition-all duration-500 focus-visible:bg-[#edf6f0] ${activeService === index ? 'pl-4 text-[#1d5e52]' : 'text-[#75877f] hover:pl-2 hover:text-[#315d52]'}`}>
                  <span className={`absolute left-0 top-0 h-full w-0.5 bg-[#79ad9d] transition-transform duration-500 ${activeService === index ? 'scale-y-100' : 'scale-y-0'}`} />
                  <span className="w-8 shrink-0 font-mono text-xs">0{index + 1}</span>
                  <span className="min-w-0 flex-1 text-sm font-bold sm:text-base">{service.title}</span>
                  <span className={`text-[#2e756b] transition-all duration-500 ${activeService === index ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}><Icon name="arrow" size={17} /></span>
                </button>
              ))}
              <Link to="/services" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">View All Services <Icon name="arrow" size={15} /></Link>
            </nav>

            <div className="relative min-h-[510px] overflow-hidden bg-[#173a31] sm:min-h-[570px]">
              <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-[#b8e2cf]/20" />
              <div className="pointer-events-none absolute -right-8 top-16 size-48 rounded-full border border-[#b8e2cf]/10" />
              <div className="pointer-events-none absolute bottom-8 left-8 size-3 rounded-full bg-[#b8e2cf]/50 shadow-[0_0_0_16px_rgba(184,226,207,.05),0_0_0_32px_rgba(184,226,207,.03)]" />

              <img src={heroArt} alt="Health Box healthcare environment" className="absolute inset-0 h-full w-full object-cover object-[58%_center] opacity-55 transition-[opacity,transform,object-position] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `scale(${activeService === 4 ? 1.08 : activeService === 5 ? 1.05 : 1.02})`, objectPosition: `${50 + activeService * 7}% center` }} />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,39,31,.92)_0%,rgba(19,58,49,.7)_48%,rgba(19,58,49,.26)_100%)]" />
              <div key={services[activeService].title} className="relative flex min-h-[510px] flex-col justify-end p-7 text-white animate-[routeFadeUp_600ms_var(--ease-standard)] sm:min-h-[570px] sm:p-12">
                <p className="font-mono text-sm tracking-[.2em] text-[#b8e2cf]">0{activeService + 1}</p>
                <h3 className="mt-5 max-w-2xl text-4xl font-semibold leading-[.98] tracking-[-.05em] sm:text-6xl">{services[activeService].title}</h3>
                <p className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg">{services[activeService].text}</p>
                <Link to={services[activeService].title === 'Advanced Physiotherapy' ? '/physiotherapy' : services[activeService].title === 'Diagnostic Services' ? '/diagnostics' : '/services'} className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-[#b8e2cf]/70 pb-2 text-sm font-bold text-[#d6f1e0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d6f1e0] focus-visible:outline-offset-4">
                  Explore Service <span className="transition-transform duration-300 group-hover:translate-x-1"><Icon name="arrow" size={17} /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f1f5ef] py-20 sm:py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <SectionReveal className="flex flex-wrap items-end justify-between gap-6 border-b border-[#cddbd2] pb-8">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#52766b]">Our specialists</p><h2 className="text-4xl font-semibold tracking-[-.05em] text-[#17352d] sm:text-5xl">Meet Our Specialists</h2></div>
            <p className="max-w-md text-sm leading-6 text-[#62766d]">Experienced healthcare professionals focused on personalized care.</p>
          </SectionReveal>
          <SectionReveal delay={100} className="mt-8 grid gap-8 border-b border-[#cddbd2] pb-8 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
            <div className="relative min-h-[280px] overflow-hidden bg-[#dbe9e0] sm:min-h-[360px]"><img src={doctorPortrait} alt="Dr. Abhishek Karmalkar" className="h-full min-h-[280px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:min-h-[360px]" /><span className="absolute bottom-5 left-5 border-l border-[#c6eddb] pl-3 text-xs font-bold uppercase tracking-[.16em] text-white">Health Box team</span></div>
            <div className="flex flex-col justify-center border border-dashed border-[#aebfb4] bg-white/65 p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#52766b]">Our specialist</p><h3 className="mt-4 text-2xl font-semibold tracking-[-.03em] text-[#1b3b32] sm:text-3xl">Dr. Abhishek Karmalkar</h3><div className="mt-7 flex flex-wrap gap-5"><Link to="/contact#appointment" className="inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">Book Appointment <Icon name="arrow" size={15} /></Link><span className="text-sm font-semibold text-[#8a9d94]">View All Specialists <span aria-hidden="true">→</span></span></div></div>
          </SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <SectionReveal className="group relative min-h-[460px] overflow-hidden bg-[#dbe9e0] sm:min-h-[560px]"><img src={heroArt} alt="Health Box healthcare environment" className="h-full min-h-[460px] w-full object-cover object-[66%_center] transition-transform duration-700 group-hover:scale-105 sm:min-h-[560px]" /><div className="absolute inset-0 bg-gradient-to-t from-[#102b24]/65 via-transparent to-transparent" /><div className="absolute bottom-6 left-6 text-xs font-bold uppercase tracking-[.17em] text-white/85">Care, connected</div></SectionReveal>
          <SectionReveal delay={100}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Why Health Box</p>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-.05em] text-[#17352d] sm:text-5xl">Care Designed Around You</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#60736b]">Healthcare that brings consultation, physiotherapy and diagnostic support together in one place.</p>
            <p className="mt-8 text-2xl font-semibold leading-tight tracking-[-.04em] text-[#2b5c50] sm:text-3xl">More than a consultation.<br />A complete care experience.</p>
            <div className="mt-9 border-t border-[#dfe8e1]">{['Patient-focused care', 'Personalized treatment', 'Multiple services under one roof', 'Modern professional facilities', 'Convenient Chinchwad location', 'Preventive and long-term wellness focus'].map((item, index) => <div key={item} className="group flex items-center gap-4 border-b border-[#dfe8e1] py-4 text-sm font-semibold text-[#35584e]"><span className="grid size-5 place-items-center rounded-full bg-[#dcefe4] text-[#327065] transition-transform duration-300 group-hover:scale-110"><Icon name="check" size={12} /></span><span>{item}</span><span className="ml-auto h-px w-0 bg-[#8ebcac] transition-all duration-500 group-hover:w-8" /></div>)}</div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">Discover Health Box <Icon name="arrow" size={15} /></Link>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-[#16342d] py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#bde7d3]">Movement & recovery</p><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Advanced Physiotherapy</h2><p className="mt-6 max-w-md text-base leading-7 text-white/70">Recovery-focused therapies for pain reduction, mobility and strength, shaped around your movement goals.</p><Link to="/physiotherapy" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d9f2e2] px-5 py-3 text-sm font-bold text-[#16342d]">Explore Physiotherapy <Icon name="arrow" size={16} /></Link></SectionReveal>
          <SectionReveal delay={100} className="relative min-h-[320px] overflow-hidden bg-[#28554b]"><img src={heroArt} alt="Health Box physiotherapy care" className="h-full min-h-[320px] w-full object-cover object-[38%_center] opacity-70 transition-transform duration-700 hover:scale-105" /><div className="absolute inset-0 bg-[#16342d]/35" /><div className="absolute bottom-5 left-5 border-l border-[#bde7d3] pl-4 text-sm text-white/85">Movement, recovery and mobility</div></SectionReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24">
        <SectionReveal className="mb-10"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Inside Health Box</p><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Our Clinic</h2></SectionReveal>
        <div className="grid gap-4 md:grid-cols-[1.35fr_.65fr]">
          <SectionReveal className="group relative min-h-[340px] overflow-hidden bg-[#dce9e2]"><img src={heroArt} alt="Health Box clinic environment" className="h-full min-h-[340px] w-full object-cover object-[70%_center] transition-transform duration-700 group-hover:scale-105" /></SectionReveal>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1"><SectionReveal delay={80} className="flex min-h-[160px] flex-col justify-end bg-[#edf4ef] p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#5a7a70]">A considered environment</p><p className="mt-3 text-lg font-semibold text-[#24443b]">Professional, reassuring and personal care.</p></SectionReveal><SectionReveal delay={140} className="flex min-h-[160px] flex-col justify-end bg-[#dcebe4] p-6"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#5a7a70]">One healthcare roof</p><p className="mt-3 text-lg font-semibold text-[#24443b]">Medical, rehabilitation and diagnostic support.</p></SectionReveal></div>
        </div>
      </section>

      <section className="bg-[#f4f6f1] py-20 sm:py-24"><div className="mx-auto grid max-w-[1180px] gap-10 px-5 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Diagnostics</p><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Clear answers for informed care.</h2><p className="mt-5 max-w-md text-base leading-7 text-[#60736b]">Diagnostic support for clearer treatment decisions, using the services currently listed by Health Box.</p><Link to="/diagnostics" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">Explore Diagnostics <Icon name="arrow" size={15} /></Link></SectionReveal><div className="grid gap-3 sm:grid-cols-2">{diagnosticServices.map((item, index) => <SectionReveal key={item} delay={index * 70} className="border border-[#dfe8e1] bg-white p-5"><span className="font-mono text-xs text-[#91a69b]">0{index + 1}</span><p className="mt-8 text-base font-bold text-[#1d3a31]">{item}</p></SectionReveal>)}</div></div></section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24"><SectionReveal className="mx-auto max-w-2xl border-y border-[#dfe8e1] py-12 text-center"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Patient voices</p><h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">What Our Patients Say</h2><p className="mt-5 text-sm leading-6 text-[#687b73]">Verified testimonials will appear here when patient feedback is added to the project. We do not display unverified quotes or ratings.</p></SectionReveal></section>

      <section className="bg-white py-20 sm:py-24"><div className="mx-auto max-w-[820px] px-5"><SectionReveal className="mb-10"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Questions</p><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Frequently Asked Questions</h2></SectionReveal><div className="border-t border-[#dfe8e1]">{faqs.map(([question, answer], index) => { const isOpen = openFaq === index; return <SectionReveal key={question} delay={index * 70} className="border-b border-[#dfe8e1]"><button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-bold text-[#1b382f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2e756b]"><span>{question}</span><span className={`text-2xl font-normal text-[#4d786c] transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span></button><div id={`faq-answer-${index}`} className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}><p className="min-h-0 overflow-hidden pb-5 text-sm leading-6 text-[#687b73]">{answer}</p></div></SectionReveal> })}</div></div></section>

      <section id="appointment" className="bg-[#f1f5ef] py-20 sm:py-24"><div className="mx-auto grid max-w-[1180px] gap-8 px-5 lg:grid-cols-[.75fr_1.25fr]"><SectionReveal className="p-2 sm:p-5"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Appointment</p><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Let’s plan your care.</h2><p className="mt-5 text-sm leading-6 text-[#677d74]">Share your details and our team will help you book the right consultation, therapy session or diagnostic visit.</p><div className="mt-8 space-y-4 text-sm font-semibold text-[#1a2a23]">{['Choose your service', 'Select preferred date & time', 'Provide your details'].map((item, index) => <div key={item} className="flex items-center gap-3 border-b border-[#dfe8e1] py-3"><span className="font-mono text-xs text-[#78958a]">0{index + 1}</span>{item}</div>)}</div></SectionReveal><SectionReveal className="border border-[#dfe8e1] bg-white p-6 sm:p-8"><form onSubmit={(event) => event.preventDefault()} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Full Name<input required placeholder="Your name" className="mt-2 w-full border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]" /></label><label className="text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Mobile Number<input required type="tel" placeholder="+91" className="mt-2 w-full border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]" /></label><label className="text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Email<input required type="email" placeholder="you@example.com" className="mt-2 w-full border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]" /></label><label className="text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Service<select className="mt-2 w-full border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]"><option>General Medicine</option><option>Cardiology</option><option>Diabetology</option><option>Rheumatology</option><option>Physiotherapy</option><option>Diagnostics</option></select></label><label className="text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Preferred Date<input required type="date" className="mt-2 w-full border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]" /></label><label className="text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Preferred Time<input required type="time" className="mt-2 w-full border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]" /></label></div><label className="block text-xs font-bold uppercase tracking-[.12em] text-[#536058]">Message / Health Concern<textarea rows={4} placeholder="Tell us how we can help" className="mt-2 w-full resize-none border-b border-[#cfdcd4] bg-transparent px-1 py-3.5 text-sm font-normal text-[#1b2a23] outline-none transition focus:border-[#2e756b]" /></label><button type="submit" className="cta-primary flex items-center justify-center gap-2 rounded-full bg-[#15231d] px-6 py-3.5 text-sm font-bold text-white">Book Appointment <Icon name="arrow" size={17} /></button></form></SectionReveal></div></section>

      <section className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-stretch"><SectionReveal className="border border-[#dfe8e1] bg-white p-7 sm:p-9"><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">Find us</p><h2 className="text-3xl font-semibold tracking-[-.04em]">Visit Health Box</h2><div className="mt-7 space-y-5 text-sm leading-6 text-[#64766e]"><p className="flex gap-3"><Icon name="pin" size={19} /> <span>{clinicAddress}</span></p><p className="flex gap-3"><Icon name="phone" size={19} /> <span>{clinicPhone}</span></p><p className="flex gap-3"><Icon name="clock" size={19} /> <span>{clinicHours}</span></p><p className="flex gap-3"><Icon name="calendar" size={19} /> <span>{clinicEmail}</span></p></div><a href="https://www.google.com/maps/search/?api=1&query=Health+Box+Polyclinic+%26+Advance+Physiotherapy+Center+Kohinoor+Majestic+1st+Floor+Near+Thermax+Chowk+Chinchwad+Pune+411019+Maharashtra+India" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#15231d] px-5 py-3 text-sm font-bold text-white">Get Directions <Icon name="arrow" size={15} /></a></SectionReveal><SectionReveal delay={100} className="min-h-[360px] overflow-hidden border border-[#dfe8e1] bg-white"><iframe title="Health Box Polyclinic location map" src="https://www.google.com/maps?q=Health%20Box%20Polyclinic%20%26%20Advance%20Physiotherapy%20Center%2C%20Kohinoor%20Majestic%2C%201st%20Floor%2C%20Near%20Thermax%20Chowk%2C%20Chinchwad%2C%20Pune%20411019%2C%20Maharashtra%2C%20India&z=15&output=embed" className="h-full min-h-[360px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></SectionReveal></div></section>

      <section className="bg-[#dcebe3] py-16"><SectionReveal className="mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center"><div><h2 className="text-3xl font-semibold tracking-[-.04em] text-[#17392f]">Ready to Take the Next Step?</h2><p className="mt-2 text-sm text-[#557269]">Book your appointment with Health Box today.</p></div><Link to="/contact#appointment" className="inline-flex items-center gap-2 rounded-full bg-[#15231d] px-5 py-3 text-sm font-bold text-white">Book an Appointment <Icon name="arrow" size={16} /></Link></SectionReveal></section>
    </>
  )
}
