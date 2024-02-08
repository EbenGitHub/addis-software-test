import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './reducers/songsReducer';
import songSaga from './sagas/songsSaga';
import statsReducer from './reducers/statsReducer';
import statsSaga from './sagas/statsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        songs: songsReducer,
        stats: statsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(songSaga)
sagaMiddleware.run(statsSaga)

export default store;
