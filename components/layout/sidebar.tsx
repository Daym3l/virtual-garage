'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Car, Fuel, Wrench, Gauge, BarChart2, Map, Settings, LayoutDashboard, LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useAppStore } from '@/store/app-store'
import { signOutUser } from '@/lib/firebase/auth'
import { useVehicles } from '@/hooks/useVehicles'

const navItems = [
  { href: '/',            label: 'Garaje',         icon: LayoutDashboard, requiresVehicle: false },
  { href: '/vehicles',    label: 'Vehículos',       icon: Car,             requiresVehicle: false },
  { href: '/fuel',        label: 'Combustible',     icon: Fuel,            requiresVehicle: true  },
  { href: '/maintenance', label: 'Mantenimientos',  icon: Wrench,          requiresVehicle: true  },
  { href: '/mileage',     label: 'Kilometraje',     icon: Gauge,           requiresVehicle: true  },
  { href: '/statistics',  label: 'Estadísticas',    icon: BarChart2,       requiresVehicle: true  },
  { href: '/routes',      label: 'Rutas',           icon: Map,             requiresVehicle: true  },
  { href: '/settings',    label: 'Ajustes',         icon: Settings,        requiresVehicle: false },
]


export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useAppStore((s) => s.user)
  const { vehicles } = useVehicles()
  const hasVehicles = vehicles.length > 0

  async function handleSignOut() {
    await signOutUser()
    router.push('/login')
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen fixed top-0 left-0 bg-surface-low z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <Car className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-black text-on-surface tracking-tighter text-base leading-tight block">Garaje Virtual</span>
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary">by Daym3l M. C.</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5">
        {navItems
          .filter(({ requiresVehicle }) => !requiresVehicle || hasVehicles)
          .map(({ href, label, icon: Icon }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-white/50 text-primary font-bold'
                    : 'text-on-surface-variant hover:bg-white/30'
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {label}
              </Link>
            )
          })}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <div className="bg-white/40 rounded-xl p-4">
          {user && (
            <div className="flex items-center gap-3 mb-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? 'Usuario'}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                  {user.displayName?.[0] ?? 'U'}
                </div>
              )}
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-on-surface truncate">{user.displayName ?? 'Usuario'}</p>
                <p className="text-[10px] text-on-surface-variant">Gestor de Flota</p>
              </div>
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-error/10 text-error rounded-xl text-xs font-bold hover:bg-error/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </aside>
  )
}
