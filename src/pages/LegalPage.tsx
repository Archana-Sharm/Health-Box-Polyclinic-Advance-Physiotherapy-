import { Link, useParams } from 'react-router-dom'
import { brandName } from '../data/site.tsx'

export function LegalPage() {
  const { type } = useParams()
  const title = type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'

  return (
    <div className="mx-auto max-w-[820px] px-5 py-20 sm:py-28">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#8ba312]">{brandName}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-[#17352d] sm:text-5xl">{title}</h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-[#64776e]">
        {title} information will be published here by Health Box. Please contact the clinic directly if you need clarification before this page is updated.
      </p>
      <Link to="/contact" className="mt-8 inline-flex items-center rounded-full bg-[#15231d] px-5 py-3 text-sm font-bold text-white">
        Contact Health Box
      </Link>
    </div>
  )
}
