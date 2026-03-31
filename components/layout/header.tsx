'use client'

import Link from 'next/link'
import { Bell } from 'lucide-react'
import { useAppStore } from '@/store/app-store'

export default function Header() {
  const user = useAppStore((s) => s.user)

  return (
    <>
      {/* Desktop header — glassmorphism */}
      <header className="hidden lg:flex fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-xl items-center justify-between px-8 h-16">
        <span className="text-base font-semibold text-on-surface tracking-tight">
          Inicio | Garaje Virtual
        </span>
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-full text-on-surface-variant hover:bg-surface-high transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-white" />
          </div>

          {/* User avatar */}
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName ?? 'Usuario'}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold cursor-pointer">
              {user?.displayName?.[0] ?? 'U'}
            </div>
          )}
        </div>
      </header>

      {/* Mobile header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-neutral-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
          <span className="font-bold text-on-surface text-base">Garaje Virtual</span>
        </div>
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName ?? 'Usuario'}
            className="w-8 h-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
      </header>
    </>
  )
}
