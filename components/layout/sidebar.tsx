'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Car,
  Fuel,
  Wrench,
  Gauge,
  BarChart2,
  Map,
  Settings,
  LayoutDashboard,
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
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-200 fixed top-0 left-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-[10px] bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
          <Car className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-[var(--foreground)] text-lg tracking-tight">
          Garaje Virtual
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors',
                isActive
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
