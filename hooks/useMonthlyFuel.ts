'use client'

import { useState, useEffect } from 'react'
import { getFuelLogs } from '@/lib/firestore/fuel'

function toDate(value: unknown): Date {
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate()
  }
  return new Date(value as string)
}

interface MonthlyFuelStats {
  litersThisMonth: number        // Total litros cargados este mes
  avgConsumption: number | null  // Promedio L/100km histórico (todos los registros)
}

export function useMonthlyFuel(vehicleId: string | undefined) {
  const [stats, setStats] = useState<MonthlyFuelStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!vehicleId) {
      setStats(null)
      setLoading(false)
      return
    }

    async function calculate() {
      setLoading(true)
      try {
        const logs = await getFuelLogs(vehicleId!)

        if (logs.length === 0) {
          setStats(null)
          return
        }

        // Ordenar por kilometraje ascendente
        const sorted = [...logs].sort((a, b) => (a.mileage ?? 0) - (b.mileage ?? 0))

        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        // Total litros cargados este mes
        const litersThisMonth = sorted
          .filter((log) => toDate(log.date) >= startOfMonth)
          .reduce((sum, log) => sum + (log.liters ?? 0), 0)

        // Consumo histórico: (litros / km_entre_recargas) * 100
        // Necesita al menos 2 registros consecutivos
        const consumptions: number[] = []
        for (let i = 1; i < sorted.length; i++) {
          const kmDriven = sorted[i].mileage - sorted[i - 1].mileage
          if (kmDriven > 0 && sorted[i].liters > 0) {
            consumptions.push((sorted[i].liters / kmDriven) * 100)
          }
        }

        const avgConsumption = consumptions.length > 0
          ? consumptions.reduce((a, b) => a + b, 0) / consumptions.length
          : null

        setStats({ litersThisMonth, avgConsumption })
      } catch (e) {
        console.error('useMonthlyFuel error:', e)
        setStats(null)
      } finally {
        setLoading(false)
      }
    }

    calculate()
  }, [vehicleId])

  return { stats, loading }
}
