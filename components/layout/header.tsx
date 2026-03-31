'use client'

import { useAppStore } from '@/store/app-store'

export default function Header() {
  const user = useAppStore((s) => s.user)

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-[8px] bg-[var(--primary)] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
        </div>
        <span className="font-bold text-[var(--foreground)] text-base">Garaje Virtual</span>
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
  )
}
