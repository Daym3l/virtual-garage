'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Cloud, Smartphone } from 'lucide-react'
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
    <main className="min-h-screen flex bg-background">

      {/* ── Panel izquierdo — solo desktop ── */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary p-(--space-7) relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full bg-white/10" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/5" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-(--space-2)">
          <div className="w-10 h-10 rounded-(--radius-md) bg-white/20 flex items-center justify-center">
            <CarIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-body">Garaje Virtual</span>
        </div>

        {/* Texto central */}
        <div className="relative z-10">
          <h2 className="text-white text-heading font-bold leading-heading mb-(--space-4)">
            Tu garaje,<br />siempre contigo
          </h2>
          <p className="text-white/80 text-body leading-body max-w-sm">
            Gestiona tus vehículos, registra mantenimientos y lleva el control de combustible desde cualquier lugar.
          </p>

          {/* Features */}
          <div className="mt-(--space-5) space-y-(--space-3)">
            {[
              'Historial completo de mantenimiento',
              'Control de consumo de combustible',
              'Alertas de servicio inteligentes',
              'Rutas y kilometraje en tiempo real',
            ].map((item) => (
              <div key={item} className="flex items-center gap-(--space-3)">
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-white/90 text-caption">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer panel */}
        <p className="relative z-10 text-white/50 text-caption">
          Los mismos datos de tu app móvil, en web.
        </p>
      </div>

      {/* ── Panel derecho — formulario ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-(--space-4) py-(--space-7)">
        <div className="w-full max-w-sm">

          {/* Logo mobile */}
          <div className="lg:hidden flex items-center justify-center gap-(--space-3) mb-(--space-6)">
            <div className="w-11 h-11 rounded-(--radius-lg) bg-primary flex items-center justify-center shadow-lg">
              <CarIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-foreground font-bold text-heading">Garaje Virtual</span>
          </div>

          {/* Encabezado */}
          <div className="mb-(--space-5)">
            <h1 className="text-display font-bold leading-display text-foreground text-3xl">
              Bienvenido de nuevo
            </h1>
            <p className="text-neutral-500 mt-(--space-2) text-body leading-body text-sm">
              Inicia sesión para acceder a tu garaje
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-(--space-4) flex items-center gap-(--space-2) p-(--space-3) rounded-md bg-error/10 border border-error/20 text-error text-caption">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          {/* Botón Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-(--space-3) px-(--space-4) py-(--space-3) rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-md transition-all duration-200 font-semibold text-neutral-700 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-neutral-300 border-t-primary rounded-full animate-spin" />
            ) : (
              <GoogleIcon className="w-5 h-5" />
            )}
            <span className="text-caption">
              {loading ? 'Conectando...' : 'Continuar con Google'}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-(--space-3) my-(--space-4)">
            <div className="flex-1 h-px bg-neutral-300" />
            <span className="text-caption text-neutral-500 font-semibold tracking-wide">ACCESO SEGURO</span>
            <div className="flex-1 h-px bg-neutral-300" />
          </div>

          {/* Info badges */}
          <div className="grid grid-cols-3 gap-(--space-3)">
            {[
              { icon: <Shield className="w-5 h-5 text-neutral-500" />, label: 'Seguro' },
              { icon: <Cloud className="w-5 h-5 text-neutral-500" />, label: 'En la nube' },
              { icon: <Smartphone className="w-5 h-5 text-neutral-500" />, label: 'Sincronizado' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-(--space-2) p-(--space-3) rounded-md bg-white border border-neutral-100 text-center"
              >
                {icon}
                <span className=" text-neutral-500 font-semibold text-sm">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-caption text-neutral-500 mt-(--space-5)">
            Al iniciar sesión aceptas los términos de uso.
            <br />Usas la misma cuenta de tu app móvil.
          </p>
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
