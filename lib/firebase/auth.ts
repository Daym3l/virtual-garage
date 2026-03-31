'use client'

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import { auth } from './config'

const googleProvider = new GoogleAuthProvider()
const SESSION_COOKIE = 'auth-session'

function setSessionCookie(value: string) {
  document.cookie = `${SESSION_COOKIE}=${value}; path=/; max-age=86400; SameSite=Lax`
}

function clearSessionCookie() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`
}

export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider)
  const token = await result.user.getIdToken()
  setSessionCookie(token)
  return result.user
}

export async function signOutUser(): Promise<void> {
  clearSessionCookie()
  await signOut(auth)
}

export function onAuthChanged(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Renueva el token en la cookie cuando Firebase lo refresca
      const token = await user.getIdToken()
      setSessionCookie(token)
    }
    callback(user)
  })
}
