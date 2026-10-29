import { useState } from 'react'
import { getImageUrl } from '../api/config.js'

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function ProductCard({ product }) {
  const [failedImageUrl, setFailedImageUrl] = useState(null)
  const showPlaceholder = !product.image_url || failedImageUrl === product.image_url
  const imageUrl = getImageUrl(product.image_url)

  return (
    <article className="overflow-hidden rounded-xl border border-mist bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/5] bg-mist">
        {showPlaceholder ? (
          <div aria-label={`Imagen no disponible para ${product.name}`} className="flex h-full items-center justify-center font-display text-6xl text-navy/60">
            {product.name?.trim().charAt(0).toUpperCase() || '?'}
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setFailedImageUrl(product.image_url)}
          />
        )}
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-brass-dark">{product.brand_name}</p>
        <h2 className="font-display text-lg font-semibold">{product.name}</h2>
        <p className="line-clamp-2 text-sm text-ink-muted">{product.description || 'Sin descripción disponible.'}</p>
        <p className="font-semibold">{currencyFormatter.format(Number(product.price))}</p>
      </div>
    </article>
  )
}

export default ProductCard
