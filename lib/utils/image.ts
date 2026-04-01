/**
 * Asegura que un string base64 tenga el prefijo data URL necesario para <img src>.
 * La app Flutter puede guardar solo el base64 sin prefijo.
 */
export function toImageSrc(base64: string): string {
  if (base64.startsWith('data:')) return base64
  return `data:image/jpeg;base64,${base64}`
}

export async function compressImage(file: File, maxSize = 800, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const canvas = document.createElement('canvas')
      let { width, height } = img
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = Math.round((height * maxSize) / width)
          width = maxSize
        } else {
          width = Math.round((width * maxSize) / height)
          height = maxSize
        }
      }
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas no disponible'))
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = reject
    img.src = url
  })
}
