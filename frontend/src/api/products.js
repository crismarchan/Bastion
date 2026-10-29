const PRODUCTS_URL = 'http://localhost:3000/api/products/paginated'

export async function getPaginatedProducts({ limit, offset, signal }) {
  const response = await fetch(
    `${PRODUCTS_URL}?limit=${limit}&offset=${offset}`,
    { signal },
  )
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.error || `Error HTTP ${response.status}`)
  }

  if (
    !Array.isArray(result.data)
    || !Number.isInteger(result.pagination?.total)
    || !Number.isInteger(result.pagination?.totalPages)
  ) {
    throw new Error('La respuesta de productos no tiene el formato esperado.')
  }

  return result
}
