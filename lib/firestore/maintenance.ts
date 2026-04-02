import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Maintenance } from '@/types'

export async function getActiveMaintenances(vehicleId: string): Promise<Maintenance[]> {
  const q = query(
    collection(db, 'maintenances'),
    where('vehicleId', '==', vehicleId),
    where('isCompleted', '==', false),
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Maintenance))
}
