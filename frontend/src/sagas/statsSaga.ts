import { CallEffect, PutEffect, call, put, takeEvery } from 'redux-saga/effects'
import { getStatsSuccess } from '../reducers/statsReducer'
import Api from '../api/api.service';

const api = new Api()

function* workGetStatsFetch(): Generator<CallEffect<Response> | PutEffect<{ payload: object; type: "stats/getStatsSuccess"; }>, void, { json: Function }> {
    const stats = yield call(api.fetchStats)
    const formatedStats = yield stats.json()
    yield put(getStatsSuccess(formatedStats))
}

function* statsSaga() {
    yield takeEvery('stats/getStatsFetch', workGetStatsFetch)
}

export default statsSaga