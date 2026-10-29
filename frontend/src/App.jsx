import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/products/paginated?limit=6&offset=0')
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('Error:', err))
  }, [])

  return (
    <main className="min-h-screen bg-cream p-6">
      <section className="mx-auto max-w-6xl rounded-xl bg-navy p-8 text-cream">
        <h1 className="font-display text-4xl font-bold">BASTION</h1>
        <p className="mt-2 text-mist">Prueba visual de la paleta y tipografía.</p>
      </section>
    </main>
  )
}

export default App