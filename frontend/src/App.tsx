import Navigation from './components/Navigation'
import MusicDisplay from './components/MusicDisplay'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getSongsFetch } from './reducers/songsReducer'
import { getStatsFetch } from './reducers/statsReducer'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongsFetch())
    dispatch(getStatsFetch())
  }, [dispatch])

  return (
    <main>
      <Navigation />
      <MusicDisplay />
    </main>
  )
}

export default App
