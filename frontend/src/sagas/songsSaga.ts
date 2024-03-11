import { CallEffect, PutEffect, call, put, takeEvery } from 'redux-saga/effects'
import { addSongSuccess, filterSongsSuccess, getSongsSuccess, removeSongSuccess, updateSongSuccess } from '../reducers/songsReducer'
import Api from '../api/api.service';
import { AxiosResponse } from 'axios';
import { Song } from '../types/song.type';
import { Action, FilterAction } from '../types/action.type';

const api = new Api()

function* workGetSongsFetch(): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "songs/getSongsSuccess"; }>, void, AxiosResponse> {
    const songs = yield call(api.fetchSongs)
    const formatedSongs = yield songs.data
    yield put(getSongsSuccess(formatedSongs))
}

function* workUpdateSongsFetch(action: Action): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "songs/updateSongSuccess"; }>, void, AxiosResponse> {
    const song = yield call(api.updateSongs, action.payload)
    const formatedSongs = yield song.data
    yield put(updateSongSuccess(formatedSongs))
}

function* workAddSongsFetch(action: Action): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "songs/addSongSuccess"; }>, void, AxiosResponse> {
    const song = yield call(api.createSongs, action.payload)
    const formatedSongs = yield song.data
    yield put(addSongSuccess(formatedSongs))
}

function* workRemoveSongsFetch(action: Action): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "songs/removeSongSuccess"; }>, void, AxiosResponse> {
    yield call(api.deleteSongs, action.payload.id)
    yield put(removeSongSuccess(action.payload.id))
}

function* workFilterSongsFetch(action: FilterAction): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "songs/filterSongsSuccess"; }>, void, AxiosResponse> {
    const song = yield call(api.filterSongs, action.payload.filter, action.payload.filterBy)
    const formatedSongs = yield song.data
    yield put(filterSongsSuccess(formatedSongs))
}

function* songSaga() {
    yield takeEvery('songs/getSongsFetch', workGetSongsFetch)
    yield takeEvery('songs/updateSongFetch', workUpdateSongsFetch)
    yield takeEvery('songs/addSongFetch', workAddSongsFetch)
    yield takeEvery('songs/removeSongFetch', workRemoveSongsFetch)
    yield takeEvery('songs/filterSongsFetch', workFilterSongsFetch)
}

export default songSaga