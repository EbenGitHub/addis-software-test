import Navigation from './components/Navigation'
import MusicDisplay from './components/MusicDisplay'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSongsFetch } from './reducers/songsReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongsFetch())
  }, [dispatch])

  return (
    <main>
      <Navigation />
      <MusicDisplay />
    </main>
  )
}

export default App
