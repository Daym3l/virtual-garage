import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { Vehicle, VehicleFormData } from '@/types'

const COL = 'vehicles'

export async function getVehicles(userId: string): Promise<Vehicle[]> {
  const q = query(
    collection(db, COL),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Vehicle))
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const snap = await getDoc(doc(db, COL, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as Vehicle
}

export async function createVehicle(
  userId: string,
  data: VehicleFormData
): Promise<string> {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateVehicle(
  id: string,
  data: Partial<VehicleFormData>
): Promise<void> {
  await updateDoc(doc(db, COL, id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteVehicle(id: string): Promise<void> {
  await deleteDoc(doc(db, COL, id))
}
