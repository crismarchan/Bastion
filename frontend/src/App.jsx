import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import CatalogSection from './components/CatalogSection.jsx'
import { getPaginatedProducts } from './api/products.js'

const PAGE_SIZE = 9

function App() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const offset = (currentPage - 1) * PAGE_SIZE

    async function loadProducts() {
      try {
        const result = await getPaginatedProducts({
          limit: PAGE_SIZE,
          offset,
          signal: controller.signal,
        })

        setProducts(result.data)
        setTotalPages(result.pagination.totalPages)
        setTotalProducts(result.pagination.total)
        setError('')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Ocurrió un error inesperado.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [currentPage, retryCount])

  function changePage(page) {
    if (loading || page === currentPage) return
    setLoading(true)
    setError('')
    setCurrentPage(page)
  }

  function retryLoadingProducts() {
    setLoading(true)
    setError('')
    setRetryCount(count => count + 1)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CatalogSection
          products={products}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          loading={loading}
          error={error}
          onPageChange={changePage}
          onRetry={retryLoadingProducts}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App