import { Link } from 'react-router-dom'
import { Icon } from '../data/site.tsx'
import { SectionReveal } from './SectionReveal'

type InnerPageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image: string
  cta?: { label: string; to: string }
  imageAlt: string
}

export function InnerPageHero({ eyebrow, title, description, image, cta, imageAlt }: InnerPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#eef4ef]">
      <div className="mx-auto grid min-h-[470px] max-w-[1180px] items-stretch gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col justify-center py-6">
          <SectionReveal><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#52766b] sm:text-[11px]">{eyebrow}</p></SectionReveal>
          <SectionReveal delay={90} as="h1" className="mt-5 max-w-xl text-5xl font-extrabold leading-[.98] tracking-[-.06em] text-[#17352d] sm:text-6xl">{title}</SectionReveal>
          <SectionReveal delay={170} as="p" className="mt-6 max-w-lg text-base leading-7 text-[#60736b] sm:text-lg">{description}</SectionReveal>
          {cta && <SectionReveal delay={250} className="mt-8"><Link to={cta.to} className="cta-primary inline-flex items-center gap-2 rounded-full bg-[#15231d] px-5 py-3.5 text-sm font-bold text-white">{cta.label} <Icon name="arrow" size={16} /></Link></SectionReveal>}
        </div>
        <SectionReveal delay={110} className="relative min-h-[310px] overflow-hidden bg-[#d7e8de] lg:min-h-[430px]"><img src={image} alt={imageAlt} className="h-full min-h-[310px] w-full object-cover object-[62%_center] transition-transform duration-700 hover:scale-105 lg:min-h-[430px]" /><div className="absolute inset-0 bg-gradient-to-r from-[#173a31]/25 to-transparent" /></SectionReveal>
      </div>
    </section>
  )
}
