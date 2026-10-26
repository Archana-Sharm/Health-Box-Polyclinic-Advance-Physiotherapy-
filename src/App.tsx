import { Route, Routes, useLocation } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { PageTransition } from './components/PageTransition'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { SpecialitiesPage } from './pages/SpecialitiesPage'
import { PhysiotherapyPage } from './pages/PhysiotherapyPage'
import { DiagnosticsPage } from './pages/DiagnosticsPage'
import { ContactPage } from './pages/ContactPage'
import { LegalPage } from './pages/LegalPage'
import { clinicHours, clinicPhone } from './data/site.tsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="page-shell min-h-screen bg-[#f5f6f2] text-[#15201b]">
      <div className="bg-[#13231d] px-5 py-2.5 text-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-center gap-x-7 gap-y-1 text-[11px] font-medium sm:justify-between">
          <p className="flex items-center gap-2 text-white/70">
            <span className="inline-flex items-center gap-2"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#dfe85d]" /> {clinicHours}</span>
          </p>
          <a href={`tel:${clinicPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-[#dfe85d] transition hover:text-[#eef6a0]">Call for assistance: {clinicPhone}</a>
        </div>
      </div>

      <Navbar />

      <main>
        <PageTransition keyName={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<SpecialitiesPage />} />
            <Route path="/specialities" element={<SpecialitiesPage />} />
            <Route path="/physiotherapy" element={<PhysiotherapyPage />} />
            <Route path="/diagnostics" element={<DiagnosticsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<LegalPage />} />
            <Route path="/terms" element={<LegalPage />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
    </div>
  )
}
