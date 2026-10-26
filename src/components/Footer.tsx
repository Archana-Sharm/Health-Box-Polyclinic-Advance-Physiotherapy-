import { Link } from 'react-router-dom'
import logo from '../imports/logo.jpeg'
import { Icon, brandName, clinicAddress, clinicEmail, clinicHours, clinicPhone, services } from '../data/site.tsx'

export function Footer() {
  return (
    <footer id="contact" className="bg-[#101c18] text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr_1fr_1.2fr]">
        <div>
          <div className="inline-flex items-center rounded-xl bg-white p-2 shadow-[0_14px_36px_rgba(0,0,0,0.12)]">
            <img src={logo} alt={brandName} className="h-12 w-auto max-w-[210px] object-contain" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">Patient-focused healthcare, advanced physiotherapy, preventive care and diagnostic support under one roof.</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.14em] text-[#dfe85d]">Quick links</h3>
          <div className="mt-4 space-y-3 text-sm text-white/60">
            <Link className="block hover:text-white" to="/about">About us</Link>
            <Link className="block hover:text-white" to="/services">Services</Link>
            <Link className="block hover:text-white" to="/physiotherapy">Physiotherapy</Link>
            <Link className="block hover:text-white" to="/diagnostics">Diagnostics</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.14em] text-[#dfe85d]">Services</h3>
          <div className="mt-4 space-y-3 text-sm text-white/60">
            {services.map((service) => <Link key={service.title} className="block hover:text-white" to={service.title === 'Advanced Physiotherapy' ? '/physiotherapy' : service.title === 'Diagnostic Services' ? '/diagnostics' : '/services'}>{service.title}</Link>)}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[.14em] text-[#dfe85d]">Contact us</h3>
          <div className="mt-4 space-y-3 text-sm text-white/60">
            <p className="flex gap-2"><Icon name="pin" size={17} /> {clinicAddress}</p>
            <p className="flex gap-2"><Icon name="phone" size={17} /> {clinicPhone}</p>
            <p className="flex gap-2"><Icon name="calendar" size={17} /> {clinicEmail}</p>
            <p className="flex gap-2"><Icon name="clock" size={17} /> {clinicHours}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-5 text-center text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        <div className="flex justify-center gap-4 sm:justify-end"><Link className="hover:text-white" to="/privacy-policy">Privacy Policy</Link><Link className="hover:text-white" to="/terms">Terms &amp; Conditions</Link></div>
      </div>
    </footer>
  )
}
