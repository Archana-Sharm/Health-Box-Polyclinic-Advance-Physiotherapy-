import { SectionReveal } from '../components/SectionReveal'
import { Icon, physiotherapyImage } from '../data/site.tsx'
import { Link } from 'react-router-dom'
import { InnerPageHero } from '../components/InnerPageHero'

const therapies = [
  'Pain Management',
  'Back & Neck Care',
  'Joint Pain',
  'Sports Injury Rehabilitation',
  'Post-Operative Rehabilitation',
  'Muscle Strengthening',
  'Mobility & Flexibility',
]

export function PhysiotherapyPage() {
  return (
    <>
      <InnerPageHero eyebrow="01 — Advanced Physiotherapy" title="Move better. Recover better." description="Recovery-focused physiotherapy support for movement, mobility and strength, shaped around your care goals." image={physiotherapyImage} imageAlt="Physiotherapy rehabilitation treatment" cta={{ label: 'Book an Assessment', to: '/contact#appointment' }} />
      <main className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24">
        <section className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]"><SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">02 — Introduction</p><h2 className="text-4xl font-semibold tracking-[-.05em] text-[#17352d] sm:text-5xl">Support for the way you move.</h2></SectionReveal><SectionReveal delay={100} className="text-base leading-8 text-[#60736b]"><p>Advanced Physiotherapy at Health Box is focused on pain reduction, mobility and strength. Care is shaped around everyday movement, recovery and the needs of each person.</p><Link to="/contact#appointment" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">Book an Appointment <Icon name="arrow" size={15} /></Link></SectionReveal></section>
        <section className="mt-24 grid gap-x-10 gap-y-0 border-t border-[#dfe8e1] sm:grid-cols-2 lg:grid-cols-3">{therapies.map((title, index) => <SectionReveal key={title} delay={index * 60} className="border-b border-[#dfe8e1] py-7 sm:px-5 sm:first:pl-0"><span className="font-mono text-xs text-[#91a69b]">0{index + 1}</span><h2 className="mt-5 text-lg font-bold text-[#1d3a31]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#6c7a73]">Customized physiotherapy approaches focused on restoring movement, reducing pain and improving strength for daily life and recovery.</p></SectionReveal>)}</section>
        <section className="mt-24 grid gap-12 bg-[#16342d] p-7 text-white sm:p-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#bde7d3]">03 — Approach</p><h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-5xl">A considered route back to movement.</h2><p className="mt-6 max-w-md text-base leading-7 text-white/70">From pain management and joint pain to mobility, flexibility and strengthening, the physiotherapy focus stays connected to daily life and recovery.</p></SectionReveal><SectionReveal delay={100} className="relative min-h-[330px] overflow-hidden"><img src={physiotherapyImage} alt="Physiotherapy treatment" className="h-full min-h-[330px] w-full object-cover transition-transform duration-700 hover:scale-105" /><div className="absolute inset-0 bg-[#16342d]/30" /></SectionReveal></section>
      </main>
      <section className="bg-[#dcebe3] py-14"><div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center"><h2 className="text-2xl font-semibold text-[#17392f]">Ready to plan your movement care?</h2><Link to="/contact#appointment" className="inline-flex items-center gap-2 rounded-full bg-[#15231d] px-5 py-3 text-sm font-bold text-white">Book an Appointment <Icon name="arrow" size={15} /></Link></div></section>
    </>
  )
}
