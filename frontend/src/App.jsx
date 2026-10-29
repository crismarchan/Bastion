import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/products/paginated?limit=6&offset=0')
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('Error:', err))
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <p>hola</p>
      </main>
      <Footer />
    </div>
  )
}

export default App