import type { ReactNode } from 'react'

export type IconName =
  | 'heart'
  | 'stethoscope'
  | 'flask'
  | 'bone'
  | 'child'
  | 'scan'
  | 'phone'
  | 'clock'
  | 'pin'
  | 'arrow'
  | 'menu'
  | 'close'
  | 'check'
  | 'calendar'

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /><path d="M7 12h3l1-3 2 6 1-3h3" /></>,
    stethoscope: <><path d="M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 15a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="11" r="2" /></>,
    flask: <><path d="M9 3h6M10 3v6l-5.2 8.5A2.3 2.3 0 0 0 6.8 21h10.4a2.3 2.3 0 0 0 2-3.5L14 9V3" /><path d="M7.5 15h9" /></>,
    bone: <><path d="M7.5 7.5 16.5 16.5M5.2 9.2a3 3 0 1 1-2.4-5.4 3 3 0 0 1 5.4 2.4L18 16a3 3 0 1 1-.2 3.8L8 10a3 3 0 0 1-2.8-.8Z" /></>,
    child: <><circle cx="12" cy="7" r="4" /><path d="M5 21a7 7 0 0 1 14 0M9 15l3 3 3-3" /></>,
    scan: <><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" /><circle cx="12" cy="12" r="3" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

export const brandName = 'Health Box Polyclinic & Advance Physiotherapy Center'
export const clinicAddress = 'Health Box Polyclinic & Advance Physiotherapy Center, Kohinoor Majestic, 1st Floor, Near Thermax Chowk, Chinchwad, Pune – 411019, Maharashtra, India'
export const clinicPhone = '+91 00000 00000'
export const clinicEmail = 'hello@healthboxclinic.in'
export const clinicHours = 'Mon–Sat: 8:00 AM–8:00 PM | Sunday: 8:00 AM–2:00 PM'

export const services: { icon: IconName; title: string; text: string }[] = [
  { icon: 'stethoscope', title: 'General Medicine', text: 'Preventive consultations and day-to-day healthcare support for adults and families.' },
  { icon: 'heart', title: 'Cardiology', text: 'Heart-health evaluations, follow-up care and specialist consultations.' },
  { icon: 'flask', title: 'Diabetology', text: 'Personalized diabetic care plans, monitoring and lifestyle guidance.' },
  { icon: 'bone', title: 'Rheumatology', text: 'Targeted support for joint, bone and inflammatory conditions.' },
  { icon: 'scan', title: 'Advanced Physiotherapy', text: 'Recovery-focused therapies for pain reduction, mobility and strength.' },
  { icon: 'calendar', title: 'Diagnostic Services', text: 'Accurate investigations and trusted lab support for clearer treatment decisions.' },
]

export const navItems = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Physiotherapy', '/physiotherapy'],
  ['Diagnostics', '/diagnostics'],
  ['Contact', '/contact'],
]

export const heroImage =
  'https://images.unsplash.com/photo-1538108149393-fbbd81895977?auto=format&fit=crop&w=1200&q=80'

export const clinicImage =
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'

export const physiotherapyImage =
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'

export const aboutHighlights = [
  ['Patient-first care', 'Thoughtful guidance and respectful support for every visit.'],
  ['Coordinated treatment', 'Integrated care that brings specialists together around your health.'],
  ['Trusted diagnostics', 'Clear evaluations and timely testing for confident decisions.'],
  ['Recovery-focused', 'Plans designed to restore movement, function and comfort.'],
]

export const contactDetails = {
  clinic: clinicAddress,
  phone: clinicPhone,
  email: clinicEmail,
  hours: clinicHours,
}
