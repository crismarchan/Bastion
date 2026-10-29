export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

export function getImageUrl(imageUrl) {
  if (!imageUrl) return null
  if (imageUrl.startsWith('/')) return `${API_BASE_URL}${imageUrl}`
  return imageUrl
}
