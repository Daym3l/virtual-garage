import { Timestamp } from 'firebase/firestore'

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

// ─── Vehicles ────────────────────────────────────────────────────────────────

export interface Vehicle {
  id: string
  userId: string
  brand: string
  model: string
  year: number
  plate: string
  initialMileage: number
  currentMileage: number
  imageBase64: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
  lastMaintenanceDate: Timestamp | null
  lastMaintenanceMileage: number | null
}

export type VehicleFormData = Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>

// ─── Fuel Logs ───────────────────────────────────────────────────────────────

export interface FuelLog {
  id: string
  vehicleId: string
  date: Timestamp
  liters: number
  cost: number
  mileage: number
  station: string
  isTankFull: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
  // Calculados
  costPerLiter?: number
  consumption?: number // L/100km
}

export type FuelLogFormData = Omit<FuelLog, 'id' | 'createdAt' | 'updatedAt' | 'costPerLiter' | 'consumption'>

// ─── Maintenance ─────────────────────────────────────────────────────────────

export enum MaintenanceType {
  oilChange = 'oilChange',
  transmission = 'transmission',
  suspension = 'suspension',
  brakes = 'brakes',
  tires = 'tires',
  alignment = 'alignment',
  filters = 'filters',
  battery = 'battery',
  cooling = 'cooling',
  electrical = 'electrical',
  engine = 'engine',
  exhaust = 'exhaust',
  steering = 'steering',
  belts = 'belts',
  diagnostics = 'diagnostics',
  other = 'other',
}

export const maintenanceTypeLabels: Record<MaintenanceType, string> = {
  [MaintenanceType.oilChange]: 'Cambio de aceite',
  [MaintenanceType.transmission]: 'Transmisión',
  [MaintenanceType.suspension]: 'Suspensión',
  [MaintenanceType.brakes]: 'Frenos',
  [MaintenanceType.tires]: 'Neumáticos',
  [MaintenanceType.alignment]: 'Alineación',
  [MaintenanceType.filters]: 'Filtros',
  [MaintenanceType.battery]: 'Batería',
  [MaintenanceType.cooling]: 'Refrigeración',
  [MaintenanceType.electrical]: 'Eléctrico',
  [MaintenanceType.engine]: 'Motor',
  [MaintenanceType.exhaust]: 'Escape',
  [MaintenanceType.steering]: 'Dirección',
  [MaintenanceType.belts]: 'Correas',
  [MaintenanceType.diagnostics]: 'Diagnóstico',
  [MaintenanceType.other]: 'Otro',
}

export interface Maintenance {
  id: string
  vehicleId: string
  date: Timestamp
  type: MaintenanceType
  description: string
  mileage: number
  cost: number
  isCompleted: boolean
  isUrgent: boolean
  nextMileage: number | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type MaintenanceFormData = Omit<Maintenance, 'id' | 'createdAt' | 'updatedAt'>

// ─── Mileage Logs ────────────────────────────────────────────────────────────

export interface MileageLog {
  id: string
  vehicleId: string
  mileage: number
  notes: string
  date: Timestamp
}

export type MileageLogFormData = Omit<MileageLog, 'id'>

// ─── Route Tracks ────────────────────────────────────────────────────────────

export interface RoutePoint {
  latitude: number
  longitude: number
  timestamp: Timestamp
  speed: number
  altitude: number
}

export interface RouteTrack {
  id: string
  vehicleId: string
  startTime: Timestamp
  endTime: Timestamp
  points: RoutePoint[]
  totalDistance: number
  averageSpeed: number
  notes: string
}

// ─── Maintenance Alert Configs ───────────────────────────────────────────────

export interface MaintenanceAlertConfig {
  id: string
  name: string
  description: string
  kmInterval: number
  isActive: boolean
  isPredefined: boolean
  lastMaintenanceKm: number
  lastMaintenanceDate: Timestamp | null
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ─── Store ───────────────────────────────────────────────────────────────────

export interface AppState {
  user: AuthUser | null
  selectedVehicleId: string | null
  setUser: (user: AuthUser | null) => void
  setSelectedVehicleId: (id: string | null) => void
}
