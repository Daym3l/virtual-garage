'use client'

import { useState, useEffect } from 'react'
import { getActiveMaintenances } from '@/lib/firestore/maintenance'
import { maintenanceTypeLabels } from '@/types'
import type { Maintenance } from '@/types'

export type AlertLevel = 'error' | 'warning' | 'primary'

export interface MaintenanceAlert {
  id: string
  title: string
  subtitle: { prefix: string; km: string; suffix: string }
  level: AlertLevel
}

function getLevel(m: Maintenance, currentMileage: number): AlertLevel {
  const kmLeft = (m.nextMileage ?? 0) - currentMileage
  if (m.isUrgent || kmLeft <= 0) return 'error'
  if (kmLeft <= 500) return 'warning'
  return 'primary'
}

function getSubtitle(m: Maintenance, currentMileage: number): { prefix: string; km: string; suffix: string } {
  if (!m.nextMileage) return { prefix: 'Sin kilometraje definido', km: '', suffix: '' }
  const kmLeft = m.nextMileage - currentMileage
  if (kmLeft <= 0) return { prefix: 'Vencido hace ', km: `${Math.abs(kmLeft).toLocaleString('es-ES')} km`, suffix: '' }
  return { prefix: 'Vence en ', km: `${kmLeft.toLocaleString('es-ES')} km`, suffix: '' }
}

export function useMaintenanceAlerts(vehicleId: string | undefined, currentMileage: number) {
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!vehicleId) { setAlerts([]); setLoading(false); return }

    async function load() {
      setLoading(true)
      try {
        const maintenances = await getActiveMaintenances(vehicleId!)

        // Solo mostrar los que tienen nextMileage y km actual >= nextMileage - 1000 (próximos o vencidos)
        const relevant = maintenances.filter((m) => {
          if (!m.nextMileage) return m.isUrgent
          return m.isUrgent || currentMileage >= m.nextMileage - 1000
        })

        // Ordenar: vencidos primero, luego por km restantes
        relevant.sort((a, b) => {
          const aLeft = (a.nextMileage ?? 0) - currentMileage
          const bLeft = (b.nextMileage ?? 0) - currentMileage
          return aLeft - bLeft
        })

        setAlerts(
          relevant.map((m) => ({
            id: m.id,
            title: maintenanceTypeLabels[m.type] ?? m.description ?? 'Mantenimiento',
            subtitle: getSubtitle(m, currentMileage),
            level: getLevel(m, currentMileage),
          }))
        )
      } catch (e) {
        console.error('useMaintenanceAlerts error:', e)
        setAlerts([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [vehicleId, currentMileage])

  return { alerts, loading }
}
