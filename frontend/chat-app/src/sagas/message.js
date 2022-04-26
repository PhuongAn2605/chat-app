import { all, put, takeLatest, call } from "@redux-saga/core/effects";
import { fetchAllMessagesFailed, fetchAllMessagesSuccess, fetchSendMessageFailed, fetchSendMessageSuccess } from "../actions/message";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import axios from "axios";
import { SEND_MESSAGE_START, FETCH_ALL_MESSAGES_START } from "../constants/message";

function* actionFetchSendMessage(action) {
    try {
        const { from, to, message } = action.payload;
        const { data } = yield axios.post(sendMessageRoute, {
            from,
            to,
            message
        });
        if(data.status === true) {
            yield put(fetchSendMessageSuccess(data));
        }
    }catch(e) {
        yield put(fetchSendMessageFailed(e))
    }
}

function* actionFetchAllMessages(action) {
    try {
        const { from, to } = action.payload;
        const { data } = yield axios.post(getAllMessagesRoute, {
            from,
            to
        });
        if(data.status === true) {
            yield put(fetchAllMessagesSuccess(data));
        } else if(data.status === false) {
            yield put(fetchAllMessagesFailed(data));
        }
    }catch(e) {
        yield put(fetchAllMessagesFailed(e));
    }
}

export function* fetchSendMessagesWatcher() {
    yield takeLatest(SEND_MESSAGE_START, actionFetchSendMessage);
}

export function* fetchAllMessageWatcher() {
    yield takeLatest(FETCH_ALL_MESSAGES_START, actionFetchAllMessages);
}

export function* messageSaga() {
    yield all([
        call(fetchSendMessagesWatcher),
        call(fetchAllMessageWatcher)
    ])
}