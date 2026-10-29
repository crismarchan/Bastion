import { useState } from 'react'
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
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Bastion</h1>
    </div>
  )
}

export default App