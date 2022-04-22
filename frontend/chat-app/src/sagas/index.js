import { all, call } from '@redux-saga/core/effects';
import { userSaga } from './user';

export default function* rootSaga() {
    yield all([
        call(userSaga)
    ])
}