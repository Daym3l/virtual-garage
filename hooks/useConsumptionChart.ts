'use client'

import { useState, useEffect } from 'react'
import { getFuelLogs } from '@/lib/firestore/fuel'

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

function toDate(value: unknown): Date {
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate()
  }
  return new Date(value as string)
}

export interface ChartPoint {
  label: string
  consumo: number | null
}

export function useConsumptionChart(vehicleId: string | undefined) {
  const [monthly, setMonthly] = useState<ChartPoint[]>([])
  const [annual, setAnnual]   = useState<ChartPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!vehicleId) { setLoading(false); return }

    async function load() {
      setLoading(true)
      try {
        const logs = await getFuelLogs(vehicleId!)
        if (logs.length < 2) { setLoading(false); return }

        // Ordenar por kilometraje ascendente
        const sorted = [...logs].sort((a, b) => (a.mileage ?? 0) - (b.mileage ?? 0))

        // Calcular consumo por par consecutivo
        interface Entry { date: Date; consumo: number }
        const entries: Entry[] = []
        for (let i = 1; i < sorted.length; i++) {
          const kmDriven = sorted[i].mileage - sorted[i - 1].mileage
          if (kmDriven > 0 && sorted[i].liters > 0) {
            entries.push({
              date: toDate(sorted[i].date),
              consumo: (sorted[i].liters / kmDriven) * 100,
            })
          }
        }

        // ── MENSUAL: últimos 6 meses ──────────────────────────────────────────
        const now = new Date()
        const monthlyPoints: ChartPoint[] = []
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const yr = d.getFullYear()
          const mo = d.getMonth()
          const inMonth = entries.filter(
            (e) => e.date.getFullYear() === yr && e.date.getMonth() === mo
          )
          const avg = inMonth.length > 0
            ? inMonth.reduce((s, e) => s + e.consumo, 0) / inMonth.length
            : null
          monthlyPoints.push({ label: `${MESES[mo]} ${yr !== now.getFullYear() ? yr : ''}`.trim(), consumo: avg })
        }
        setMonthly(monthlyPoints)

        // ── ANUAL: últimos años con datos ─────────────────────────────────────
        const yearMap = new Map<number, number[]>()
        for (const e of entries) {
          const yr = e.date.getFullYear()
          if (!yearMap.has(yr)) yearMap.set(yr, [])
          yearMap.get(yr)!.push(e.consumo)
        }
        const annualPoints: ChartPoint[] = Array.from(yearMap.entries())
          .sort(([a], [b]) => a - b)
          .map(([yr, vals]) => ({
            label: String(yr),
            consumo: vals.reduce((s, v) => s + v, 0) / vals.length,
          }))
        setAnnual(annualPoints)
      } catch (e) {
        console.error('useConsumptionChart error:', e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [vehicleId])

  return { monthly, annual, loading }
}
