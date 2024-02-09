import Navigation from './components/Navigation'
import MusicDisplay from './components/MusicDisplay'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterSongs, getSongsFetch } from './reducers/songsReducer'
import { getStatsFetch } from './reducers/statsReducer'
import ChartGraphDisplay from './components/ChartGraphDisplay'
import Modal from './components/Modal'
import { Song } from './types/song.type'
import Api from './api/api.service'

function App() {
  const dispatch = useDispatch()

  const [page, setPage] = useState<'graph' | 'music'>('graph')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalMode, setModalMode] = useState<'edit' | 'create'>('create')
  const [filter, setFilter] = useState<string>('')

  const api = new Api()

  const newSongTemplate = {
    album: '',
    artist: '',
    genre: '',
    id: '',
    title: ''
  }
  const [modalContent, setModalContent] = useState<Song>(structuredClone(newSongTemplate))

  useEffect(() => {
    dispatch(getSongsFetch())
    dispatch(getStatsFetch())
  }, [dispatch])

  useEffect(() => {
    api.filterSongs(filter)
      .then(res => {
        dispatch(filterSongs(res.data))
      })
  })

  function clearModalContent() {
    setModalContent(structuredClone(newSongTemplate))
  }

  return (
    <main style={{ overflow: 'hidden', height: '100vh' }}>
      {openModal && <Modal modalMode={modalMode} setOpenModal={setOpenModal} content={modalContent} changeContent={setModalContent} clear={clearModalContent} />}
      <Navigation changePage={setPage} currentPage={page} setFilter={setFilter} />
      {page === 'music' ? <MusicDisplay openModal={setOpenModal} changeMode={setModalMode} changeModalContent={setModalContent} clear={clearModalContent} /> :
        <ChartGraphDisplay />}
    </main>
  )
}

export default App
