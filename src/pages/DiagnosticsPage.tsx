import { Link } from 'react-router-dom'
import heroArt from '../assets/image_1e11b187.jpg'
import { Icon } from '../data/site.tsx'
import { InnerPageHero } from '../components/InnerPageHero'
import { SectionReveal } from '../components/SectionReveal'

const diagnostics = ['Pathology Laboratory', 'Digital X-Ray', 'ECG', '2D Echo Colour Doppler']

export function DiagnosticsPage() {
  return (
    <>
      <InnerPageHero eyebrow="01 — Diagnostics" title="Clear answers for informed care." description="Diagnostic support at Health Box, using the services currently available to help inform the next step in care." image={heroArt} imageAlt="Health Box diagnostic care" cta={{ label: 'Book an Appointment', to: '/contact#appointment' }} />
      <main className="mx-auto max-w-[1180px] px-5 py-20 sm:py-24">
        <section className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]"><SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">02 — Diagnostic support</p><h2 className="text-4xl font-semibold tracking-[-.05em] text-[#17352d] sm:text-5xl">A clearer next step.</h2></SectionReveal><SectionReveal delay={100} className="max-w-2xl text-base leading-8 text-[#60736b]"><p>Health Box provides diagnostic support across pathology, imaging and investigations currently listed in the clinic content. Speak with the team to understand the right next step for your visit.</p></SectionReveal></section>
        <section className="mt-24 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center"><SectionReveal className="relative min-h-[420px] overflow-hidden bg-[#dce9e2]"><img src={heroArt} alt="Health Box diagnostic environment" className="h-full min-h-[420px] w-full object-cover object-[42%_center] transition-transform duration-700 hover:scale-105" /><div className="absolute bottom-6 left-6 border-l border-[#c9eddb] pl-4 text-xs font-bold uppercase tracking-[.16em] text-white">03 — Available services</div></SectionReveal><SectionReveal delay={100}><div className="border-t border-[#dfe8e1]">{diagnostics.map((item, index) => <div key={item} className="flex items-center gap-4 border-b border-[#dfe8e1] py-5"><span className="font-mono text-xs text-[#91a69b]">0{index + 1}</span><p className="flex-1 text-base font-bold text-[#31584e]">{item}</p><Icon name="scan" size={17} className="text-[#4d7e70]" /></div>)}</div><Link to="/contact#appointment" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">Arrange a visit <Icon name="arrow" size={15} /></Link></SectionReveal></section>
        <section className="mt-24 border-t border-[#dfe8e1] pt-12"><SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">04 — How it works</p><div className="grid gap-8 sm:grid-cols-3">{[['01', 'Discuss', 'Share your needs with the Health Box team.'], ['02', 'Schedule', 'Choose a convenient time for your visit.'], ['03', 'Continue care', 'Use the results to inform the next step with your care team.']].map(([number, title, text]) => <div key={title}><span className="font-mono text-xs text-[#91a69b]">{number}</span><h3 className="mt-5 text-lg font-bold text-[#1d3a31]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6c7a73]">{text}</p></div>)}</div></SectionReveal></section>
        <section className="mt-24 grid gap-8 bg-[#f1f5ef] p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr]"><SectionReveal><p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">05 — With Health Box</p><h2 className="text-3xl font-semibold tracking-[-.04em] text-[#17352d] sm:text-4xl">Diagnostic support connected to the rest of your care.</h2></SectionReveal><SectionReveal delay={90} className="text-base leading-7 text-[#60736b]"><p>Diagnostics sit alongside consultation, physiotherapy and other Health Box services, giving patients one place to begin a considered care journey.</p><Link to="/contact#appointment" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#23675c]">Book an Appointment <Icon name="arrow" size={15} /></Link></SectionReveal></section>
      </main>
    </>
  )
}
