'use client'

import Link from 'next/link'
import { Plus, Car, Gauge, Calendar, Trash2, Pencil } from 'lucide-react'
import { useState } from 'react'
import { useVehicles } from '@/hooks/useVehicles'
import { formatMileage, formatDate } from '@/lib/utils/formatters'
import { toImageSrc } from '@/lib/utils/image'
import type { Vehicle } from '@/types'

export default function VehiclesPage() {
  const { vehicles, loading, remove } = useVehicles()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await remove(id)
    } finally {
      setDeletingId(null)
      setConfirmId(null)
    }
  }

  return (
    <div>
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-(--space-5)">
        <div>
          <h1 className="text-heading font-bold leading-heading text-foreground">Vehículos</h1>
          <p className="text-caption text-neutral-500 mt-(--space-1)">
            {vehicles.length} {vehicles.length === 1 ? 'vehículo registrado' : 'vehículos registrados'}
          </p>
        </div>
        <Link
          href="/vehicles/new"
          className="flex items-center gap-(--space-2) px-(--space-4) py-(--space-2) rounded-lg bg-primary text-white text-caption font-semibold hover:bg-primary-dark transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Añadir
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-(--space-4)">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg h-48 animate-pulse" />
          ))}
        </div>
      )}

      {/* Sin vehículos */}
      {!loading && vehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-(--space-8) text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-(--space-4)">
            <Car className="w-8 h-8 text-neutral-300" />
          </div>
          <p className="text-body font-semibold text-foreground mb-(--space-2)">Sin vehículos</p>
          <p className="text-caption text-neutral-500 mb-(--space-4)">
            Añade tu primer vehículo para empezar
          </p>
          <Link
            href="/vehicles/new"
            className="flex items-center gap-(--space-2) px-(--space-4) py-(--space-2) rounded-lg bg-primary text-white text-caption font-semibold hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            Añadir vehículo
          </Link>
        </div>
      )}

      {/* Lista */}
      {!loading && vehicles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-(--space-4)">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              confirming={confirmId === vehicle.id}
              deleting={deletingId === vehicle.id}
              onConfirmDelete={() => setConfirmId(vehicle.id)}
              onCancelDelete={() => setConfirmId(null)}
              onDelete={() => handleDelete(vehicle.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function VehicleCard({
  vehicle,
  confirming,
  deleting,
  onConfirmDelete,
  onCancelDelete,
  onDelete,
}: {
  vehicle: Vehicle
  confirming: boolean
  deleting: boolean
  onConfirmDelete: () => void
  onCancelDelete: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Foto o placeholder */}
      <div className="relative h-40 bg-neutral-100 flex items-center justify-center">
        {vehicle.imageBase64 ? (
          <img
            src={toImageSrc(vehicle.imageBase64)}
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <Car className="w-12 h-12 text-neutral-300" />
        )}
        {/* Año badge */}
        <span className="absolute top-(--space-2) left-(--space-2) bg-black/50 text-white text-caption px-(--space-2) py-(--space-1) rounded-md font-semibold">
          {vehicle.year}
        </span>
      </div>

      {/* Info */}
      <div className="p-(--space-4)">
        <div className="flex items-start justify-between gap-(--space-2) mb-(--space-3)">
          <div className="min-w-0">
            <h2 className="text-body font-bold text-foreground truncate">
              {vehicle.brand} {vehicle.model}
            </h2>
            <span className="text-caption text-neutral-500 font-semibold tracking-wide">
              {vehicle.plate}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-(--space-4) text-caption text-neutral-500 mb-(--space-4)">
          <div className="flex items-center gap-(--space-1)">
            <Gauge className="w-4 h-4 shrink-0" />
            <span>{formatMileage(vehicle.currentMileage)}</span>
          </div>
          {vehicle.lastMaintenanceDate && (
            <div className="flex items-center gap-(--space-1)">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{formatDate(vehicle.lastMaintenanceDate)}</span>
            </div>
          )}
        </div>

        {/* Acciones */}
        {confirming ? (
          <div className="flex items-center gap-(--space-2)">
            <span className="text-caption text-neutral-500 flex-1">¿Eliminar vehículo?</span>
            <button
              onClick={onCancelDelete}
              className="px-(--space-3) py-(--space-1) rounded-md border border-neutral-300 text-caption text-neutral-600 hover:bg-neutral-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onDelete}
              disabled={deleting}
              className="px-(--space-3) py-(--space-1) rounded-md bg-error text-white text-caption font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {deleting ? 'Eliminando...' : 'Eliminar'}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-(--space-2)">
            <Link
              href={`/vehicles/${vehicle.id}`}
              className="flex-1 text-center py-(--space-2) rounded-lg bg-neutral-100 text-caption font-semibold text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              Ver detalle
            </Link>
            <Link
              href={`/vehicles/${vehicle.id}/edit`}
              className="p-(--space-2) rounded-lg bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors"
              aria-label="Editar"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <button
              onClick={onConfirmDelete}
              className="p-(--space-2) rounded-lg bg-neutral-100 text-neutral-600 hover:bg-error/10 hover:text-error transition-colors"
              aria-label="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
