'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Camera, X } from 'lucide-react'
import { useVehicles } from '@/hooks/useVehicles'
import { compressImage } from '@/lib/utils/image'
import type { Vehicle } from '@/types'

const schema = z.object({
  brand: z.string().min(1, 'La marca es obligatoria'),
  model: z.string().min(1, 'El modelo es obligatorio'),
  year: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
  plate: z.string().min(1, 'La matrícula es obligatoria'),
  initialMileage: z.coerce.number().min(0, 'El kilometraje inicial no puede ser negativo'),
  currentMileage: z.coerce.number().min(0),
})

type FormValues = z.infer<typeof schema>

export default function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  const router = useRouter()
  const { create, update } = useVehicles()
  const fileRef = useRef<HTMLInputElement>(null)
  const [image, setImage] = useState<string | null>(vehicle?.imageBase64 ?? null)
  const [saving, setSaving] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)

  const isEditing = !!vehicle

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: vehicle
      ? {
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          plate: vehicle.plate,
          initialMileage: vehicle.initialMileage,
          currentMileage: vehicle.currentMileage,
        }
      : { year: new Date().getFullYear(), initialMileage: 0, currentMileage: 0 },
  })

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageError(null)
    try {
      const base64 = await compressImage(file)
      setImage(base64)
    } catch {
      setImageError('No se pudo procesar la imagen')
    }
  }

  async function onSubmit(values: FormValues) {
    setSaving(true)
    try {
      const data = {
        ...values,
        imageBase64: image,
        lastMaintenanceDate: vehicle?.lastMaintenanceDate ?? null,
        lastMaintenanceMileage: vehicle?.lastMaintenanceMileage ?? null,
      }
      if (isEditing) {
        await update(vehicle.id, data)
        router.push(`/vehicles/${vehicle.id}`)
      } else {
        const id = await create(data)
        router.push(`/vehicles/${id}`)
      }
    } catch {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Encabezado */}
      <div className="flex items-center gap-(--space-3) mb-(--space-5)">
        <button
          onClick={() => router.back()}
          className="p-(--space-2) rounded-lg hover:bg-neutral-100 transition-colors text-neutral-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-heading font-bold leading-heading text-foreground">
            {isEditing ? 'Editar vehículo' : 'Nuevo vehículo'}
          </h1>
          <p className="text-caption text-neutral-500">
            {isEditing ? 'Actualiza los datos del vehículo' : 'Completa los datos para añadir tu vehículo'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-(--space-4)">

        {/* Foto */}
        <div className="bg-white rounded-lg p-(--space-4) border border-neutral-100">
          <label className="text-caption font-semibold text-neutral-700 block mb-(--space-3)">
            Foto del vehículo
          </label>
          <div
            onClick={() => fileRef.current?.click()}
            className="relative h-44 rounded-lg border-2 border-dashed border-neutral-300 flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors overflow-hidden"
          >
            {image ? (
              <>
                <img src={image} alt="Vista previa" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setImage(null) }}
                  className="absolute top-(--space-2) right-(--space-2) w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-(--space-2) text-neutral-400">
                <Camera className="w-8 h-8" />
                <span className="text-caption">Toca para añadir foto</span>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          {imageError && <p className="text-caption text-error mt-(--space-1)">{imageError}</p>}
        </div>

        {/* Datos básicos */}
        <div className="bg-white rounded-lg p-(--space-4) border border-neutral-100 space-y-(--space-3)">
          <p className="text-caption font-semibold text-neutral-700">Datos del vehículo</p>

          <div className="grid grid-cols-2 gap-(--space-3)">
            <Field label="Marca" error={errors.brand?.message}>
              <input {...register('brand')} placeholder="Toyota" className={inputClass} />
            </Field>
            <Field label="Modelo" error={errors.model?.message}>
              <input {...register('model')} placeholder="Corolla" className={inputClass} />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-(--space-3)">
            <Field label="Año" error={errors.year?.message}>
              <input {...register('year')} type="number" placeholder="2020" className={inputClass} />
            </Field>
            <Field label="Matrícula" error={errors.plate?.message}>
              <input {...register('plate')} placeholder="1234 ABC" className={inputClass} />
            </Field>
          </div>
        </div>

        {/* Kilometraje */}
        <div className="bg-white rounded-lg p-(--space-4) border border-neutral-100 space-y-(--space-3)">
          <p className="text-caption font-semibold text-neutral-700">Kilometraje</p>

          <div className="grid grid-cols-2 gap-(--space-3)">
            <Field label="Km inicial" error={errors.initialMileage?.message}>
              <input {...register('initialMileage')} type="number" placeholder="0" className={inputClass} />
            </Field>
            <Field label="Km actual" error={errors.currentMileage?.message}>
              <input {...register('currentMileage')} type="number" placeholder="0" className={inputClass} />
            </Field>
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={saving}
          className="w-full py-(--space-3) rounded-lg bg-primary text-white text-caption font-semibold hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Añadir vehículo'}
        </button>
      </form>
    </div>
  )
}

const inputClass =
  'w-full px-(--space-3) py-(--space-2) rounded-lg border border-neutral-300 text-caption text-foreground bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-neutral-400'

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-caption font-semibold text-neutral-600 mb-(--space-1)">
        {label}
      </label>
      {children}
      {error && <p className="text-caption text-error mt-(--space-1)">{error}</p>}
    </div>
  )
}
