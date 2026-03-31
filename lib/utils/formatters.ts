import type { Timestamp } from 'firebase/firestore'

export function formatMileage(km: number): string {
  return `${km.toLocaleString('es-ES')} km`
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
}

export function formatDate(date: Timestamp | Date): string {
  const d = date instanceof Date ? date : date.toDate()
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatLiters(liters: number): string {
  return `${liters.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`
}

export function formatConsumption(lPer100km: number): string {
  return `${lPer100km.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} L/100km`
}
