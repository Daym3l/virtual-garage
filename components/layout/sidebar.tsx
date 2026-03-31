'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Car, Fuel, Wrench, Gauge, BarChart2, Map, Settings, LayoutDashboard,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { href: '/', label: 'Inicio', icon: LayoutDashboard },
  { href: '/vehicles', label: 'Vehículos', icon: Car },
  { href: '/fuel', label: 'Combustible', icon: Fuel },
  { href: '/maintenance', label: 'Mantenimiento', icon: Wrench },
  { href: '/mileage', label: 'Kilometraje', icon: Gauge },
  { href: '/statistics', label: 'Estadísticas', icon: BarChart2 },
  { href: '/routes', label: 'Rutas', icon: Map },
  { href: '/settings', label: 'Ajustes', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-neutral-100 fixed top-0 left-0">
      {/* Logo */}
      <div className="flex items-center gap-(--space-3) px-(--space-5) py-(--space-4) border-b border-neutral-100">
        <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center shrink-0">
          <Car className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-foreground text-body tracking-tight">Garaje Virtual</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-(--space-2) py-(--space-3) space-y-(--space-1)">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-(--space-3) px-(--space-3) py-(--space-2) rounded-md text-caption font-semibold transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
