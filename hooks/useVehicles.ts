'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/app-store'
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '@/lib/firestore/vehicles'
import type { Vehicle, VehicleFormData } from '@/types'

export function useVehicles() {
  const user = useAppStore((s) => s.user)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getVehicles(user.uid)
      .then(setVehicles)
      .catch(() => setError('Error al cargar los vehículos'))
      .finally(() => setLoading(false))
  }, [user])

  async function create(data: VehicleFormData): Promise<string> {
    if (!user) throw new Error('No autenticado')
    const id = await createVehicle(user.uid, data)
    await refresh()
    return id
  }

  async function update(id: string, data: Partial<VehicleFormData>): Promise<void> {
    await updateVehicle(id, data)
    await refresh()
  }

  async function remove(id: string): Promise<void> {
    await deleteVehicle(id)
    setVehicles((prev) => prev.filter((v) => v.id !== id))
  }

  async function refresh(): Promise<void> {
    if (!user) return
    const data = await getVehicles(user.uid)
    setVehicles(data)
  }

  return { vehicles, loading, error, create, update, remove }
}
