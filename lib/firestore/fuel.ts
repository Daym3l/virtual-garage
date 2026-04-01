import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { FuelLog } from '@/types'

/**
 * fuel_logs es una colección top-level relacionada por vehicleId.
 */
export async function getFuelLogs(vehicleId: string): Promise<FuelLog[]> {
  const q = query(
    collection(db, 'fuel_logs'),
    where('vehicleId', '==', vehicleId),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FuelLog))
}
