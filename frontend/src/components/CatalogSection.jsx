import Pagination from './Pagination.jsx'
import ProductGrid from './ProductGrid.jsx'

function CatalogSection({
  products,
  currentPage,
  totalPages,
  totalProducts,
  loading,
  error,
  onPageChange,
  onRetry,
}) {
  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-bold">Nuestro catálogo</h2>
      <p className="mt-2 text-ink-muted">
        Encuentra prendas, accesorios y fragancias para tu estilo.
        {!loading && !error && ` ${totalProducts} productos disponibles.`}
      </p>

      {loading && <p role="status" className="py-12 text-center">Cargando productos...</p>}

      {error && (
        <div role="alert" className="my-8 rounded-md border border-danger p-4 text-danger">
          <p>No se pudo cargar el catálogo: {error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 min-h-11 rounded-md border border-navy px-4 text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="py-12 text-center">Aún no hay productos disponibles.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <ProductGrid products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            loading={loading}
            onPageChange={onPageChange}
          />
        </>
      )}
    </section>
  )
}

export default CatalogSection
