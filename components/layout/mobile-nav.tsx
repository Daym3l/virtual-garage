'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, Fuel, Wrench, LayoutDashboard, Settings } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const mobileNavItems = [
  { href: '/', label: 'Inicio', icon: LayoutDashboard },
  { href: '/vehicles', label: 'Vehículos', icon: Car },
  { href: '/fuel', label: 'Combustible', icon: Fuel },
  { href: '/maintenance', label: 'Mantenim.', icon: Wrench },
  { href: '/settings', label: 'Ajustes', icon: Settings },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {mobileNavItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1 rounded-[8px] transition-colors min-w-0',
                isActive ? 'text-[var(--primary)]' : 'text-gray-500'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-[10px] font-medium truncate">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
