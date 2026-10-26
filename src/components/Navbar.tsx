import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../imports/logo.jpeg'
import { Icon, navItems } from '../data/site.tsx'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24)
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const closeOnDesktopResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktopResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktopResize)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`header-shell z-40 ${isHome ? 'absolute inset-x-0 top-[34px] border-b border-white/20 bg-transparent text-white' : 'sticky top-0 border-b border-[#e8ebe5] bg-white/90'} ${isScrolled || !isHome ? 'scrolled' : ''}`}>
      <div className="mx-auto flex h-[78px] max-w-[1180px] items-center justify-between px-5">
        <NavLink to="/" aria-label="Health Box home" className="flex min-w-0 shrink-0 items-center transition-transform duration-300 hover:scale-[1.01]" onClick={closeMenu}>
          <img src={logo} alt="Health Box logo" className="h-12 w-auto max-w-[220px] object-contain sm:h-14 sm:max-w-[250px]" />
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <NavLink
              key={label}
              to={href}
              end={href === '/'}
              className={({ isActive }) => `nav-link text-[13px] font-semibold ${isActive ? 'is-active text-[#8ca312]' : isHome && !isScrolled ? 'text-white/90' : 'text-[#48554e]'}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/contact#appointment"
            className={`cta-primary inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] ${isHome && !isScrolled ? 'bg-[#d9f2e2] text-[#14382e]' : 'bg-[#15231d] text-white'}`}
          >
            Book Appointment
          </NavLink>
        </div>

        <button
          type="button"
          className={`menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${isHome && !isScrolled ? 'border-white/40 bg-white/10 text-white' : 'border-[#dfe7dc] bg-white text-[#1b2b26]'} ${isOpen ? 'is-open' : ''}`}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-panel"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <Icon name={isOpen ? 'close' : 'menu'} size={18} />
        </button>
      </div>

      <div id="mobile-navigation-panel" aria-hidden={!isOpen} inert={!isOpen} className={`mobile-nav border-t border-[#e8ebe5] bg-white lg:hidden ${isOpen ? 'is-open' : ''}`}>
        <nav className="mx-auto flex max-w-[1180px] flex-col px-5 py-4" aria-label="Mobile navigation">
          <NavLink to="/" aria-label="Health Box home" onClick={closeMenu} className="mb-3 border-b border-[#edf1ec] pb-4">
            <img src={logo} alt="Health Box logo" className="h-11 w-auto max-w-[190px] object-contain" />
          </NavLink>
          {navItems.map(([label, href]) => (
            <NavLink
              key={label}
              to={href}
              end={href === '/'}
              onClick={closeMenu}
              className={({ isActive }) => `rounded-xl px-3 py-3 text-sm font-semibold ${isActive ? 'bg-[#edf3d0] text-[#60710c]' : 'text-[#374942]'}`}
            >
              {label}
            </NavLink>
          ))}
          <NavLink to="/contact#appointment" onClick={closeMenu} className="mt-3 inline-flex items-center justify-center rounded-full bg-[#15231d] px-4 py-3 text-sm font-bold text-white">
            Book Appointment
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
