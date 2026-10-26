import { useState } from 'react'
import { Link } from 'react-router-dom'
import heroArt from '../assets/image_1e11b187.jpg'
import { Icon, services } from '../data/site.tsx'
import { InnerPageHero } from '../components/InnerPageHero'
import { SectionReveal } from '../components/SectionReveal'

export function SpecialitiesPage() {
  const [active, setActive] = useState(0)
  const service = services[active]
  const href = service.title === 'Advanced Physiotherapy' ? '/physiotherapy' : service.title === 'Diagnostic Services' ? '/diagnostics' : '/services'

  return (
    <>
      <InnerPageHero eyebrow="01 — Services" title="Care that meets you where you are." description="Explore the care available at Health Box, from everyday medical consultation to advanced physiotherapy and diagnostics." image={heroArt} imageAlt="Health Box healthcare environment" cta={{ label: 'Book an Appointment', to: '/contact#appointment' }} />
      <main className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24">
        <SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">02 — Explore care</p><h2 className="text-4xl font-semibold tracking-[-.05em] text-[#17352d] sm:text-5xl">One place for connected support.</h2></SectionReveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[.42fr_1.58fr] lg:gap-12">
          <nav aria-label="Service exploration" className="border-t border-[#dfe8e1]">{services.map((item, index) => <button type="button" key={item.title} onClick={() => setActive(index)} onFocus={() => setActive(index)} className={`flex w-full items-center gap-4 border-b border-[#dfe8e1] py-5 text-left transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2e756b] ${active === index ? 'pl-4 text-[#1d5e52]' : 'text-[#75877f] hover:pl-2'}`} aria-pressed={active === index}><span className="font-mono text-xs">0{index + 1}</span><span className="flex-1 text-sm font-bold">{item.title}</span><Icon name="arrow" size={15} /></button>)}</nav>
          <SectionReveal className="relative min-h-[500px] overflow-hidden bg-[#173a31] text-white"><img src={heroArt} alt="Health Box care" className="absolute inset-0 h-full w-full object-cover opacity-55 transition-all duration-700" style={{ objectPosition: `${55 + active * 7}% center`, transform: `scale(${1.02 + active * .01})` }} /><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,39,31,.92),rgba(19,58,49,.28))]" /><div key={service.title} className="relative flex min-h-[500px] flex-col justify-end p-7 animate-[routeFadeUp_600ms_var(--ease-standard)] sm:p-12"><p className="font-mono text-sm tracking-[.2em] text-[#b8e2cf]">0{active + 1}</p><h3 className="mt-5 max-w-2xl text-4xl font-semibold leading-none tracking-[-.05em] sm:text-6xl">{service.title}</h3><p className="mt-6 max-w-lg text-base leading-7 text-white/75">{service.text}</p><Link to={href} className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-[#b8e2cf]/70 pb-2 text-sm font-bold text-[#d6f1e0]">Explore Service <span className="transition-transform group-hover:translate-x-1"><Icon name="arrow" size={17} /></span></Link></div></SectionReveal>
        </div>
        <SectionReveal className="mt-24 border-t border-[#dfe8e1] pt-10"><p className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-.04em] text-[#315b50] sm:text-3xl">Every service is part of a considered care experience, with clear next steps when you are ready.</p></SectionReveal>
      </main>
    </>
  )
}
