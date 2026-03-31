'use client'

import { useEffect } from 'react'
import { onAuthChanged } from '@/lib/firebase/auth'
import { useAppStore } from '@/store/app-store'
import type { AuthUser } from '@/types'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAppStore((s) => s.setUser)

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
        setUser(null)
      }
    })
    return unsubscribe
  }, [setUser])

  return <>{children}</>
}
