import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navigation from './components/Navigation'
import MusicDisplay from './components/MusicDisplay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <Navigation />
      <MusicDisplay />
    </main>
  )
}

export default App
