import type { ReactNode } from 'react'

export function PageTransition({ children, keyName }: { children: ReactNode; keyName: string }) {
  return (
    <div key={keyName} className="route-transition">
      {children}
    </div>
  )
}
