import { all, call, fork } from 'redux-saga/effects';
import { watchUserFetch } from './user';

export default function* rootSaga() {
    yield fork(watchUserFetch)
}