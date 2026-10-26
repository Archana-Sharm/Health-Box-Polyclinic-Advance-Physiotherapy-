import { Icon, aboutHighlights, clinicImage } from '../data/site.tsx'
import { SectionReveal } from '../components/SectionReveal'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 py-16 sm:py-20">
      <SectionReveal className="mb-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">About us</p>
        <h1 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">A healthcare experience designed around you.</h1>
      </SectionReveal>

      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <SectionReveal delay={100} className="overflow-hidden rounded-[30px] border border-[#e5eae3] bg-white shadow-[0_18px_60px_rgba(20,35,29,0.05)]">
          <img src={clinicImage} alt="Clinic and patient care" className="h-[260px] w-full object-cover sm:h-[320px]" />
          <div className="p-8">
            <p className="text-base leading-7 text-[#5d6d67]">
              Health Box Polyclinic & Advance Physiotherapy Center is built around the belief that healthcare should feel professional, reassuring and personal. We focus on delivering accessible, compassionate care across medical consultations, diagnostic support and rehabilitation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {aboutHighlights.map(([title, text]) => (
                <div key={title} className="rounded-[22px] border border-[#e8ece4] bg-[#f7f9f4] p-4">
                  <p className="text-sm font-bold text-[#1a2a23]">{title}</p>
                  <p className="mt-2 text-xs leading-5 text-[#697d75]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={120} className="rounded-[30px] bg-[#17251e] p-8 text-white shadow-[0_25px_70px_rgba(22,37,30,.12)]">
          <h2 className="text-2xl font-semibold">Mission, vision and patient-first approach</h2>
          <div className="mt-6 space-y-5">
            {[
              ['Our Mission', 'To provide thoughtful, coordinated medical care that supports each patient with clarity, comfort and confidence.'],
              ['Our Vision', 'To create a trusted healthcare environment where advanced clinical support meets compassionate human service.'],
              ['Patient-first approach', 'Every plan is shaped around individual needs, personal goals and recovery-focused outcomes.'],
            ].map(([title, text]) => (
              <div key={title} className="flex gap-3 rounded-[20px] border border-white/8 bg-white/4 p-3">
                <span className="mt-1 grid size-8 place-items-center rounded-full bg-[#dfe85d] text-[#17251e]"><Icon name="check" size={14} /></span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </div>
  )
}
