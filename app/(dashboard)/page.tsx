'use client'

import Link from 'next/link'
import { Fuel, Wrench, ChevronDown, TrendingUp, AlertTriangle, CheckCircle2, Gauge, PlusCircle, Car } from 'lucide-react'
import { useVehicles } from '@/hooks/useVehicles'
import { useAppStore } from '@/store/app-store'
import ConsumptionChart from './_components/consumption-chart'

// ─── Dummy alert data until alerts module is built ────────────────────────────
const mockAlerts = [
  { id: 1, title: 'Cambio Aceite',       subtitle: 'Vence en 250 km',    level: 'error'    as const },
  { id: 2, title: 'Revisión Neumáticos', subtitle: 'Próximo Martes',     level: 'warning'  as const },
  { id: 3, title: 'Renovación Seguro',   subtitle: 'En 15 días',         level: 'primary'  as const },
]

const alertBorder: Record<string, string> = {
  error:   'border-l-error',
  warning: 'border-l-warning',
  primary: 'border-l-primary',
}

export default function DashboardPage() {
  const { vehicles, loading } = useVehicles()
  const selectedVehicleId = useAppStore((s) => s.selectedVehicleId)
  const setSelectedVehicleId = useAppStore((s) => s.setSelectedVehicleId)

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) ?? vehicles[0]

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (!loading && vehicles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-surface-low rounded-2xl flex items-center justify-center mb-6">
          <Car className="w-10 h-10 text-primary/40" />
        </div>
        <h2 className="text-xl font-black text-on-surface tracking-tight mb-2">
          Tu garaje está vacío
        </h2>
        <p className="text-sm text-on-surface-muted max-w-xs leading-relaxed mb-8">
          Aún no tienes vehículos registrados. Agrega tu primer vehículo para comenzar a gestionar tu flota.
        </p>
        <Link
          href="/vehicles/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
        >
          <PlusCircle className="w-4 h-4" />
          Agregar primer vehículo
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* ── Quick actions ───────────────────────────────────────────────────── */}
      <div className="flex gap-2 mb-4 justify-end">
        {vehicles.length > 0 && (
          <>
            <Link href="/fuel/new"        className="group flex items-center gap-0 hover:gap-2 px-2.5 py-2 hover:px-4 bg-success/10 text-success rounded-xl text-xs font-bold border border-success/20 hover:bg-success/15 transition-all duration-300 overflow-hidden">
              <Fuel className="w-4 h-4 shrink-0" />
              <span className="max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">Añadir Gasolina</span>
            </Link>
            <Link href="/maintenance/new" className="group flex items-center gap-0 hover:gap-2 px-2.5 py-2 hover:px-4 bg-warning/10 text-warning rounded-xl text-xs font-bold border border-warning/20 hover:bg-warning/15 transition-all duration-300 overflow-hidden">
              <Wrench className="w-4 h-4 shrink-0" />
              <span className="max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">Mantenimiento</span>
            </Link>
            <Link href="/mileage/new"     className="group flex items-center gap-0 hover:gap-2 px-2.5 py-2 hover:px-4 bg-accent/10 text-accent rounded-xl text-xs font-bold border border-accent/20 hover:bg-accent/15 transition-all duration-300 overflow-hidden">
              <Gauge className="w-4 h-4 shrink-0" />
              <span className="max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">Registrar Kilometraje</span>
            </Link>
          </>
        )}
        <Link href="/vehicles/new"    className="group flex items-center gap-0 hover:gap-2 px-2.5 py-2 hover:px-4 bg-primary/10 text-primary rounded-xl text-xs font-bold border border-primary/20 hover:bg-primary/15 transition-all duration-300 overflow-hidden">
          <PlusCircle className="w-4 h-4 shrink-0" />
          <span className="max-w-0 group-hover:max-w-xs overflow-hidden whitespace-nowrap transition-all duration-300">Agregar Vehículo</span>
        </Link>
      </div>

      {/* ── Bento grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Card 1 — Vehicle Selector (col-span-2) */}
        <div className="col-span-2 bg-surface-card p-6 rounded-xl shadow-[0_20px_40px_-12px_rgba(18,28,42,0.08)] hover:bg-neutral-50 transition-all group">
          {loading ? (
            <div className="animate-pulse flex items-center gap-6">
              <div className="w-24 h-16 bg-neutral-100 rounded-lg" />
              <div className="space-y-2">
                <div className="h-3 w-24 bg-neutral-100 rounded" />
                <div className="h-6 w-48 bg-neutral-100 rounded" />
                <div className="h-3 w-32 bg-neutral-100 rounded" />
              </div>
            </div>
          ) : selectedVehicle ? (
            <div className="flex items-center gap-6">
              {/* Vehicle thumbnail */}
              <div className="relative shrink-0">
                <div className="w-24 h-16 bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {selectedVehicle.imageBase64 ? (
                    <img
                      src={selectedVehicle.imageBase64}
                      alt={selectedVehicle.nickname}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-neutral-300" fill="currentColor">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-0.5 rounded-full shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-primary fill-primary/20" />
                </div>
              </div>

              {/* Vehicle info */}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-muted mb-1">
                  Vehículo Seleccionado
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl font-black text-on-surface tracking-tight">
                    {selectedVehicle.brand} {selectedVehicle.model}
                  </span>
                  <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-xl border border-primary/20 tracking-wider whitespace-nowrap">
                    EN USO
                  </span>
                  <ChevronDown className="w-5 h-5 text-neutral-300 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-on-surface-muted font-medium mt-0.5">
                  {selectedVehicle.plate} • {selectedVehicle.year}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-24 h-16 bg-neutral-50 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-neutral-300" fill="currentColor">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">Sin vehículos</p>
                <Link href="/vehicles/new" className="text-xs text-primary font-bold hover:underline">
                  Agregar tu primer vehículo →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Card 2 — Odometer */}
        <div className="col-span-1 bg-surface-card p-6 rounded-xl shadow-[0_20px_40px_-12px_rgba(18,28,42,0.08)] hover:bg-neutral-50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-surface-low rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 1 1 0 20A10 10 0 0 1 12 2zm0 0v2m0 16v2M2 12h2m16 0h2" />
                <path d="M12 12l4-4" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-[10px] font-bold text-on-surface-muted uppercase tracking-wider">Odómetro</h3>
          </div>
          <p className="text-4xl font-black tracking-tighter text-on-surface">
            {selectedVehicle ? (
              <>
                {selectedVehicle.currentMileage?.toLocaleString('es-ES') ?? '—'}
                <span className="text-lg font-bold text-neutral-300 ml-1">km</span>
              </>
            ) : (
              <span className="text-neutral-300">—</span>
            )}
          </p>
          <p className="text-[10px] text-primary font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +240 km esta semana
          </p>
        </div>

        {/* Card 3 — Monthly Spend */}
        <div className="col-span-1 bg-surface-card p-6 rounded-xl shadow-[0_20px_40px_-12px_rgba(18,28,42,0.08)] hover:bg-neutral-50 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-surface-low rounded-xl flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-[10px] font-bold text-on-surface-muted uppercase tracking-wider">Gasto Mensual</h3>
          </div>
          <p className="text-4xl font-black tracking-tighter text-on-surface">$2,840</p>
          <p className="text-[10px] text-error font-bold mt-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            12% sobre el presupuesto
          </p>
        </div>

        {/* Card 4 — Alerts (row-span-2) */}
        <div className="col-span-2 lg:col-span-1 lg:row-span-2 bg-surface-card p-6 rounded-xl shadow-[0_20px_40px_-12px_rgba(18,28,42,0.08)]">
          <h3 className="text-[10px] font-bold text-on-surface-muted uppercase tracking-widest mb-6">
            Alertas Próximas
          </h3>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className={`pl-4 border-l-4 ${alertBorder[alert.level]} py-1`}>
                <p className="text-sm font-bold text-on-surface">{alert.title}</p>
                <p className="text-[11px] text-on-surface-muted">{alert.subtitle}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="w-full py-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors border border-primary/20">
              Ver Calendario
            </button>
          </div>
        </div>

        {/* Card 5 — Consumption Chart (col-span-3) */}
        <div className="col-span-2 lg:col-span-3 bg-surface-card p-6 lg:p-8 rounded-xl shadow-[0_20px_40px_-12px_rgba(18,28,42,0.08)]">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-[10px] font-bold text-on-surface-muted uppercase tracking-widest">
                Consumo de Combustible
              </h3>
              <p className="text-sm text-on-surface-muted font-medium mt-1">
                Histórico de los últimos 6 meses (L/100km)
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="px-3 py-1 bg-surface-low text-[10px] font-bold rounded-full text-primary cursor-pointer">
                MENSUAL
              </span>
              <span className="px-3 py-1 bg-transparent text-[10px] font-bold rounded-full text-on-surface-muted cursor-pointer hover:bg-neutral-50">
                ANUAL
              </span>
            </div>
          </div>
          <ConsumptionChart />
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-widest font-medium text-on-surface-muted">
          © 2024 Garaje Virtual. Ingeniería de Precisión.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] uppercase tracking-widest font-medium text-on-surface-muted hover:text-primary transition-colors">Privacidad</a>
          <a href="#" className="text-[10px] uppercase tracking-widest font-medium text-on-surface-muted hover:text-primary transition-colors">Términos</a>
          <a href="#" className="text-[10px] uppercase tracking-widest font-medium text-on-surface-muted hover:text-primary transition-colors">Soporte</a>
        </div>
      </footer>
    </div>
  )
}
