'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import { getVehicle } from '@/lib/firestore/vehicles'
import VehicleForm from '../../_components/vehicle-form'
import type { Vehicle } from '@/types'

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getVehicle(id).then(setVehicle).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="h-48 bg-white rounded-lg animate-pulse" />
  if (!vehicle) return <p className="text-caption text-neutral-500">Vehículo no encontrado</p>

  return <VehicleForm vehicle={vehicle} />
}
