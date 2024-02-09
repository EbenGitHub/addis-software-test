import { CallEffect, PutEffect, call, put, takeEvery } from 'redux-saga/effects'
import { getSongsSuccess } from '../reducers/songsReducer'
import Api from '../api/api.service';
import { AxiosResponse } from 'axios';
import { Song } from '../types/song.type';

const api = new Api()

function* workGetSongsFetch(): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "songs/getSongsSuccess"; }>, void, AxiosResponse> {
    const songs = yield call(api.fetchSongs)
    const formatedSongs = yield songs.data
    yield put(getSongsSuccess(formatedSongs))
}

function* songSaga() {
    yield takeEvery('songs/getSongsFetch', workGetSongsFetch)
}

export default songSaga