'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthChanged } from '@/lib/firebase/auth'
import { useAppStore } from '@/store/app-store'
import type { AuthUser } from '@/types'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAppStore((s) => s.setUser)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthChanged((firebaseUser) => {
      if (firebaseUser) {
        const user: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }
        setUser(user)
      } else {
        // Sesión expirada o cerrada — limpiar estado y redirigir
        setUser(null)
        document.cookie = 'auth-session=; path=/; max-age=0'
        router.replace('/login')
      }
    })
    return unsubscribe
  }, [setUser, router])

  return <>{children}</>
}
