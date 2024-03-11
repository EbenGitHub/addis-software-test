import Navigation from './components/Navigation'
import MusicDisplay from './components/MusicDisplay'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterSongsFetch, getSongsFetch } from './reducers/songsReducer'
import { getStatsFetch } from './reducers/statsReducer'
import ChartGraphDisplay from './components/ChartGraphDisplay'
import Modal from './components/Modal'
import { Song } from './types/song.type'
import DeleteModal from './components/DeleteModal'
import ErrorMessage from './components/ErrorMessage'

function App() {
  const dispatch = useDispatch()

  const [page, setPage] = useState<'graph' | 'music'>('graph')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')
  const [modalMode, setModalMode] = useState<'edit' | 'create'>('create')
  const [filter, setFilter] = useState<string>('')
  const [filterBy, setFilterBy] = useState<'genre' | 'artist' | 'album' | 'title'>('genre')

  const newSongTemplate = {
    album: '',
    artist: '',
    genre: '',
    id: '',
    title: ''
  }
  const [modalContent, setModalContent] = useState<Song>(structuredClone(newSongTemplate))
  const [errorMessages, setErrorMessages] = useState<string>()

  useEffect(() => {
    dispatch(getSongsFetch())
    dispatch(getStatsFetch())
  }, [dispatch])

  useEffect(() => {
    dispatch(filterSongsFetch({ filter, filterBy }))
  }, [filter, filterBy])

  function clearModalContent() {
    setModalContent(structuredClone(newSongTemplate))
  }

  function clearDeleteModal() {
    setDeleteId('')
  }

  function deleteSong(id: string) {
    setDeleteId(id)
    setOpenDeleteModal(true)
  }

  return (
    <main style={{ overflow: 'hidden', height: '100vh' }}>
      {openModal && <Modal modalMode={modalMode} setOpenModal={setOpenModal} content={modalContent} changeContent={setModalContent} clear={clearModalContent} setErrorMessages={setErrorMessages} />}
      {openDeleteModal && <DeleteModal id={deleteId} clear={clearDeleteModal} setOpenModal={setOpenDeleteModal} />}
      <Navigation changePage={setPage} currentPage={page} setFilter={setFilter} setFilterBy={setFilterBy} />
      <ErrorMessage errorMessages={errorMessages} setErrorMessages={setErrorMessages} />
      {page === 'music' ? <MusicDisplay openModal={setOpenModal} changeMode={setModalMode} changeModalContent={setModalContent} clear={clearModalContent} deleteSong={deleteSong} /> :
        <ChartGraphDisplay />}
    </main>
  )
}

export default App
