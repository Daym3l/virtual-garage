'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import type { ChartPoint } from '@/hooks/useConsumptionChart'

interface Props {
  data: ChartPoint[]
  loading: boolean
}

export default function ConsumptionChart({ data, loading }: Props) {
  if (loading) {
    return <div className="h-44 flex items-center justify-center text-[10px] text-on-surface-muted font-bold uppercase tracking-widest">Cargando...</div>
  }

  const hasData = data.some((d) => d.consumo !== null)
  if (!hasData) {
    return <div className="h-44 flex items-center justify-center text-[10px] text-on-surface-muted font-bold uppercase tracking-widest">Sin registros suficientes</div>
  }

  // Rellenar nulls con 0 para el gráfico
  const chartData = data.map((d) => ({ ...d, consumo: d.consumo ?? 0 }))

  const values = chartData.map((d) => d.consumo).filter((v) => v > 0)
  const minVal = Math.max(0, Math.min(...values) - 1)
  const maxVal = Math.max(...values) + 1

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="consumoGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0058bd" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#0058bd" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          domain={[minVal, maxVal]}
          tickFormatter={(v) => `${v.toFixed(1)}`}
        />
        <Tooltip
          contentStyle={{
            background: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 20px 40px -12px rgba(18,28,42,0.12)',
            fontSize: '12px',
            fontWeight: 700,
          }}
          formatter={(value) => [`${Number(value).toFixed(2)} L/100km`, 'Consumo']}
          labelStyle={{ color: '#424753', fontSize: '10px' }}
          cursor={{ stroke: '#0058bd', strokeWidth: 1, strokeDasharray: '4 4' }}
        />
        <Area
          type="monotone"
          dataKey="consumo"
          stroke="#0058bd"
          strokeWidth={3}
          fill="url(#consumoGradient)"
          dot={{ fill: '#0058bd', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, fill: '#0058bd', strokeWidth: 2, stroke: '#ffffff' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
