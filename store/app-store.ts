import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState } from '@/types'

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      selectedVehicleId: null,
      setUser: (user) => set({ user }),
      setSelectedVehicleId: (id) => set({ selectedVehicleId: id }),
    }),
    {
      name: 'virtual-garage-store',
      partialize: (state) => ({ selectedVehicleId: state.selectedVehicleId }),
    }
  )
)
