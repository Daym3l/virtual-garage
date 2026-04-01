'use client'

import { useState, useEffect } from 'react'
import { getMileageLogs } from '@/lib/firestore/mileage'

function toDate(value: unknown): Date {
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate()
  }
  return new Date(value as string)
}

export function useMonthlyMileage(vehicleId: string | undefined) {
  const [kmThisMonth, setKmThisMonth] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!vehicleId) {
      setKmThisMonth(null)
      setLoading(false)
      return
    }

    async function calculate() {
      setLoading(true)
      try {
        const logs = await getMileageLogs(vehicleId!)

        if (logs.length === 0) {
          setKmThisMonth(null)
          return
        }

        const sorted = [...logs].sort(
          (a, b) => toDate(a.date).getTime() - toDate(b.date).getTime()
        )

        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const thisMonthLogs = sorted.filter((log) => toDate(log.date) >= startOfMonth)
        const prevLogs      = sorted.filter((log) => toDate(log.date) <  startOfMonth)

        if (thisMonthLogs.length === 0) {
          setKmThisMonth(null)
          return
        }

        const latestKm = thisMonthLogs[thisMonthLogs.length - 1].mileage
        const baseKm   = prevLogs.length > 0
          ? prevLogs[prevLogs.length - 1].mileage
          : thisMonthLogs[0].mileage

        setKmThisMonth(latestKm - baseKm)
      } catch (e) {
        console.error('useMonthlyMileage error:', e)
        setKmThisMonth(null)
      } finally {
        setLoading(false)
      }
    }

    calculate()
  }, [vehicleId])

  return { kmThisMonth, loading }
}
