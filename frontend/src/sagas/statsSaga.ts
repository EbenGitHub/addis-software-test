import { CallEffect, PutEffect, call, put, takeEvery } from 'redux-saga/effects'
import { getStatsSuccess } from '../reducers/statsReducer'
import Api from '../api/api.service';
import { AxiosResponse } from 'axios';
import { Song } from '../types/song.type';

const api = new Api()

function* workGetStatsFetch(): Generator<CallEffect<AxiosResponse<Song, Song>> | PutEffect<{ payload: object; type: "stats/getStatsSuccess"; }>, void, AxiosResponse> {
    const stats = yield call(api.fetchStats)
    const formatedStats = yield stats.data
    yield put(getStatsSuccess(formatedStats))
}

function* statsSaga() {
    yield takeEvery('stats/getStatsFetch', workGetStatsFetch)
}

export default statsSaga