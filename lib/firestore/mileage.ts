import { collection, query, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { MileageLog } from '@/types'

/**
 * mileage_logs es una subcolección de vehicles:
 * /vehicles/{vehicleId}/mileage_logs/{logId}
 */
export async function getMileageLogs(vehicleId: string): Promise<MileageLog[]> {
  const q = query(collection(db, 'vehicles', vehicleId, 'mileage_logs'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as MileageLog))
}
