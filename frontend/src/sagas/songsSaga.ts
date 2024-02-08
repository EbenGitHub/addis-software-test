import { CallEffect, PutEffect, call, put, takeEvery } from 'redux-saga/effects'
import { getSongsSuccess } from '../reducers/songsReducer'
import Api from '../api/api.service';

const api = new Api()

function* workGetSongsFetch(): Generator<CallEffect<Response> | PutEffect<{ payload: object; type: "songs/getSongsSuccess"; }>, void, { json: Function }> {
    const songs = yield call(api.fetchSongs)
    const formatedSongs = yield songs.json()
    yield put(getSongsSuccess(formatedSongs))

}

function* songSaga() {
    yield takeEvery('songs/getSongsFetch', workGetSongsFetch)
}

export default songSaga