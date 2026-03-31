'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { mes: 'Ene', consumo: 7.2 },
  { mes: 'Feb', consumo: 8.1 },
  { mes: 'Mar', consumo: 6.8 },
  { mes: 'Abr', consumo: 7.5 },
  { mes: 'May', consumo: 8.4 },
  { mes: 'Jun', consumo: 7.0 },
]

export default function ConsumptionChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="consumoGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0058bd" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#0058bd" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="mes"
          tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 10, fill: '#9ca3af' }}
          axisLine={false}
          tickLine={false}
          domain={[5, 10]}
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
          formatter={(value) => [`${value} L/100km`, 'Consumo']}
          labelStyle={{ color: '#424753', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
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
