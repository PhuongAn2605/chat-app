import { all, call } from '@redux-saga/core/effects';
import { messageSaga } from './message';
import { userSaga } from './user';

export default function* rootSaga() {
    yield all([
        call(userSaga),
        call(messageSaga)
    ])
}