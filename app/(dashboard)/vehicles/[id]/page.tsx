'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Pencil, Car, Gauge, Calendar,
  Wrench, Fuel, Map, Bell, BarChart2, Route,
} from 'lucide-react'
import { toImageSrc } from '@/lib/utils/image'
import { getVehicle } from '@/lib/firestore/vehicles'
import { formatMileage, formatDate } from '@/lib/utils/formatters'
import type { Vehicle } from '@/types'

const quickActions = [
  { href: (id: string) => `/maintenance?vehicleId=${id}`, icon: Wrench, label: 'Mantenimiento', color: 'bg-primary/10 text-primary' },
  { href: (id: string) => `/fuel?vehicleId=${id}`, icon: Fuel, label: 'Combustible', color: 'bg-info/10 text-info' },
  { href: (id: string) => `/routes?vehicleId=${id}`, icon: Map, label: 'Rutas', color: 'bg-accent/10 text-accent' },
  { href: (id: string) => `/maintenance?vehicleId=${id}&tab=alerts`, icon: Bell, label: 'Alertas', color: 'bg-warning/10 text-warning' },
  { href: (id: string) => `/statistics?vehicleId=${id}`, icon: BarChart2, label: 'Estadísticas', color: 'bg-success/10 text-success' },
  { href: (id: string) => `/mileage?vehicleId=${id}`, icon: Route, label: 'Kilometraje', color: 'bg-neutral-100 text-neutral-600' },
]

export default function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVehicle(id).then(setVehicle).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="space-y-(--space-4)">
        <div className="h-12 bg-white rounded-lg animate-pulse" />
        <div className="h-56 bg-white rounded-lg animate-pulse" />
        <div className="h-40 bg-white rounded-lg animate-pulse" />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="text-center py-(--space-8)">
        <p className="text-body text-neutral-500">Vehículo no encontrado</p>
        <button onClick={() => router.push('/vehicles')} className="mt-(--space-4) text-caption text-primary font-semibold">
          Volver a vehículos
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-(--space-4)">

      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-(--space-3)">
          <button
            onClick={() => router.push('/vehicles')}
            className="p-(--space-2) rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-heading font-bold leading-heading text-foreground">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="text-caption text-neutral-500">{vehicle.plate} · {vehicle.year}</p>
          </div>
        </div>
        <Link
          href={`/vehicles/${id}/edit`}
          className="flex items-center gap-(--space-2) px-(--space-3) py-(--space-2) rounded-lg border border-neutral-300 text-caption font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <Pencil className="w-4 h-4" />
          Editar
        </Link>
      </div>

      {/* Foto + stats */}
      <div className="bg-white rounded-lg border border-neutral-100 overflow-hidden">
        <div className="h-52 bg-neutral-100 flex items-center justify-center">
          {vehicle.imageBase64 ? (
            <img
              src={toImageSrc(vehicle.imageBase64)}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <Car className="w-16 h-16 text-neutral-300" />
          )}
        </div>

        <div className="grid grid-cols-2 divide-x divide-neutral-100">
          <Stat icon={<Gauge className="w-4 h-4" />} label="Km actuales" value={formatMileage(vehicle.currentMileage)} />
          <Stat icon={<Gauge className="w-4 h-4" />} label="Km iniciales" value={formatMileage(vehicle.initialMileage)} />
        </div>
        {vehicle.lastMaintenanceDate && (
          <div className="border-t border-neutral-100">
            <Stat
              icon={<Calendar className="w-4 h-4" />}
              label="Último mantenimiento"
              value={formatDate(vehicle.lastMaintenanceDate)}
            />
          </div>
        )}
      </div>

      {/* Accesos rápidos */}
      <div className="bg-white rounded-lg border border-neutral-100 p-(--space-4)">
        <p className="text-caption font-semibold text-neutral-700 mb-(--space-3)">Accesos rápidos</p>
        <div className="grid grid-cols-3 gap-(--space-3)">
          {quickActions.map(({ href, icon: Icon, label, color }) => (
            <Link
              key={label}
              href={href(id)}
              className="flex flex-col items-center gap-(--space-2) p-(--space-3) rounded-lg hover:bg-neutral-50 transition-colors text-center"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-caption text-neutral-600 font-semibold">{label}</span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-(--space-3) p-(--space-4)">
      <div className="text-neutral-400">{icon}</div>
      <div>
        <p className="text-caption text-neutral-500">{label}</p>
        <p className="text-body font-bold text-foreground">{value}</p>
      </div>
    </div>
  )
}
