function Pagination({ currentPage, totalPages, loading, onPageChange }) {
  const buttonClass =
    'min-h-11 rounded-md border border-navy px-4 text-navy disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass'

  return (
    <nav aria-label="Paginación del catálogo" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={loading || currentPage === 1}
        className={buttonClass}
      >
        Anterior
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          disabled={loading}
          aria-current={currentPage === page ? 'page' : undefined}
          className={`min-h-11 min-w-11 rounded-md border border-navy px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass ${
            currentPage === page ? 'bg-navy text-cream' : 'bg-white text-navy'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={loading || currentPage === totalPages}
        className={buttonClass}
      >
        Siguiente
      </button>
    </nav>
  )
}

export default Pagination
