'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Lightbulb } from 'lucide-react'
import { signInWithGoogle } from '@/lib/firebase/auth'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGoogleSignIn() {
    setLoading(true)
    setError(null)
    try {
      await signInWithGoogle()
      router.push('/')
    } catch (err) {
      setError('No se pudo iniciar sesión. Inténtalo de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center p-(--space-3) md:p-(--space-5) bg-surface text-foreground"
      style={{
        backgroundImage: 'radial-gradient(hsl(220,10%,75%) 0.5px, transparent 0.5px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="w-full max-w-6xl">

        {/* ── Grid principal ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-(--space-4)">

          {/* ── Sección editorial izquierda (solo desktop) ── */}
          <div className="hidden lg:flex lg:col-span-7 flex-col gap-(--space-4)">

            {/* Hero bento */}
            <div className="bg-surface-low rounded-lg p-(--space-6) flex flex-col justify-between h-[360px] relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-primary font-bold tracking-widest text-[11px] uppercase mb-(--space-3) block">
                  El Garaje Digital
                </span>
                <h1 className="text-[2.75rem] font-extrabold tracking-tight text-foreground leading-[1.1] mb-(--space-3)">
                  Gestiona tu flota con<br />precisión editorial.
                </h1>
                <p className="text-on-surface-muted max-w-sm text-body leading-body">
                  Organiza, registra y optimiza tu colección de vehículos en un único dashboard.
                </p>
              </div>
              {/* Car SVG decorativo */}
              <div className="absolute -right-6 -bottom-8 w-80 h-80 opacity-[0.07] group-hover:scale-105 transition-transform duration-1000 select-none pointer-events-none">
                <CarOutlineSvg />
              </div>
            </div>

            {/* Fila inferior de bentos */}
            <div className="grid grid-cols-5 gap-(--space-4) h-[220px]">

              {/* Insight bento */}
              <div className="col-span-3 bg-surface-high rounded-lg p-(--space-5) flex flex-col justify-between relative overflow-hidden">
                <div>
                  <div className="flex items-center gap-(--space-2) mb-(--space-3)">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <span className="font-bold text-[11px] uppercase tracking-widest text-on-surface-muted">
                      Dato de flota
                    </span>
                  </div>
                  <h3 className="text-heading font-bold text-foreground leading-heading mb-(--space-2)">
                    ¿Sabías que?
                  </h3>
                  <p className="text-on-surface-muted text-caption">
                    Una gestión eficiente puede reducir los costes de mantenimiento hasta un{' '}
                    <span className="text-primary font-bold">25%</span> al año.
                  </p>
                </div>
                <div className="flex gap-(--space-2)">
                  <div className="h-1.5 w-12 bg-primary rounded-full" />
                  <div className="h-1.5 w-4 bg-outline-subtle rounded-full" />
                  <div className="h-1.5 w-4 bg-outline-subtle rounded-full" />
                </div>
              </div>

              {/* Seguridad bento */}
              <div className="col-span-2 bg-primary rounded-lg p-(--space-5) flex flex-col justify-between text-white">
                <Shield className="w-8 h-8 text-white/90" strokeWidth={1.5} />
                <div>
                  <h3 className="text-body font-bold leading-tight mb-(--space-1)">
                    Seguridad empresarial.
                  </h3>
                  <p className="text-white/70 text-caption">
                    Cifrado AES-256 protegiendo cada dato.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card de login ── */}
          <div className="lg:col-span-5 w-full">
            <div
              className="bg-surface-card rounded-lg p-(--space-4) md:p-(--space-6) flex flex-col h-full"
              style={{ boxShadow: '0 24px 48px -12px rgba(18,28,42,0.10)' }}
            >
              {/* Logo + título */}
              <div className="mb-(--space-4) md:mb-(--space-6)">
                <div className="flex items-center gap-(--space-3) mb-(--space-4) md:mb-(--space-6)">
                  <div
                    className="w-10 h-10 bg-primary rounded-md flex items-center justify-center"
                    style={{ boxShadow: '0 4px 12px -2px hsl(220,70%,50%,0.35)' }}
                  >
                    <CarIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-body font-extrabold tracking-tight text-foreground">
                    Garaje Virtual
                  </span>
                </div>
                <h2 className="text-[2rem] font-extrabold text-foreground tracking-tight leading-[1.2] mb-(--space-2)">
                  Bienvenido de nuevo
                </h2>
                <p className="text-on-surface-muted text-body">
                  Accede a tu panel de control de vehículos.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-(--space-4) flex items-center gap-(--space-2) p-(--space-3) rounded-md bg-error/10 text-error text-caption">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {error}
                </div>
              )}

              {/* Botón Google — sólido en primary */}
              <div className="space-y-(--space-3)">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-(--space-3) py-(--space-3) rounded-md bg-primary text-white font-bold text-caption hover:bg-primary-dark transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 8px 20px -6px hsl(220,70%,50%,0.45)' }}
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span className="bg-white p-1 rounded-md">
                      <GoogleIcon className="w-4 h-4" />
                    </span>
                  )}
                  <span>{loading ? 'Conectando...' : 'Iniciar sesión con Google'}</span>
                </button>

                <p className="text-caption text-center text-on-surface-muted leading-relaxed">
                  Tu acceso está registrado y monitoreado.<br />
                  Usa la misma cuenta de tu app móvil.
                </p>
              </div>

              {/* Footer card */}
              <div className="mt-auto pt-(--space-4) md:pt-(--space-6) text-center">
                <p className="text-caption text-on-surface-muted">
                  ¿Primera vez?{' '}
                  <span className="text-primary font-bold">
                    Descarga la app móvil para registrarte.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer status bar ── */}
        <div className="mt-(--space-4) hidden sm:flex flex-wrap gap-(--space-4) items-center justify-between text-[10px] font-extrabold text-on-surface-muted tracking-[0.15em] uppercase">
          <div className="flex gap-(--space-5) items-center bg-surface-low/60 px-(--space-4) py-(--space-2) rounded-full">
            <span className="flex items-center gap-(--space-2)">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Sistema: Operativo
            </span>
            <span className="hidden sm:inline">v1.0.0</span>
            <span className="hidden md:inline">Firebase: Conectado</span>
          </div>
          <div className="flex gap-(--space-5) px-(--space-4)">
            <span className="cursor-default hover:text-primary transition-colors">Privacidad</span>
            <span className="cursor-default hover:text-primary transition-colors">Soporte</span>
          </div>
        </div>

      </div>
    </main>
  )
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  )
}

function CarOutlineSvg() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M20 80 L35 45 Q40 35 55 35 L145 35 Q160 35 165 45 L180 80 L185 80 Q190 80 190 85 L190 95 Q190 100 185 100 L175 100 Q170 100 170 95 L170 90 L30 90 L30 95 Q30 100 25 100 L15 100 Q10 100 10 95 L10 85 Q10 80 15 80 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="45" cy="92" r="12" stroke="currentColor" strokeWidth="3" />
      <circle cx="155" cy="92" r="12" stroke="currentColor" strokeWidth="3" />
      <path d="M60 55 L75 40 L125 40 L140 55 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M35 70 L165 70" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}
