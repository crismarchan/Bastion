import { useState } from 'react'

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
})

function ProductCard({ product }) {
  const [failedImageUrl, setFailedImageUrl] = useState(null)
  const showPlaceholder = !product.image_url || failedImageUrl === product.image_url
  const stock = Number(product.stock)
  const stockLabel = stock === 0 ? 'Agotado' : stock <= 5 ? 'Últimas piezas' : 'Disponible'
  const stockColor = stock === 0 ? 'text-danger' : stock <= 5 ? 'text-brass-dark' : 'text-success'

  return (
    <article className="overflow-hidden rounded-xl border border-mist bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/5] bg-mist">
        {showPlaceholder ? (
          <div aria-label={`Imagen no disponible para ${product.name}`} className="flex h-full items-center justify-center font-display text-6xl text-navy/60">
            {product.name?.trim().charAt(0).toUpperCase() || '?'}
          </div>
        ) : (
          <img
            src={product.image_url}
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
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-mist/50 px-2 py-1 text-xs text-navy">{product.category_name}</span>
          <span className={`text-xs font-semibold ${stockColor}`}>{stockLabel}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
