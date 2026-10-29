import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'

function App() {
  useEffect(() => {
    fetch('http://localhost:3000/api/products/paginated?limit=6&offset=0')
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('Error:', err))
  }, [])

  return (
    <>
      <Navbar />
      <main>
      
      </main>
    </>
  )
}

export default App