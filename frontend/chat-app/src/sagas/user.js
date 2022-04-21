import axios from "axios";
import { calculateObjectSize } from "bson";
import { toast } from "react-toastify";
import { registerRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/toast";
import { put, takeLatest } from 'redux-saga/effects';
import { REGISTER_START } from "../constants/user";
import { fetchRegisterFailed, fetchRegisterSuccess } from "../actions/user";

function* actionFetchRegister(action) {
    try {
        const { email, username, password } = action.payload;
        const { data } = yield axios.post(registerRoute, {
            username,
            email,
            password
        });

        if(data.status === true) {
            yield put(fetchRegisterSuccess(data.data));
            toast.success('Register successfully!', toastOptions);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        }
        else if(data.status === false) {
            yield put(fetchRegisterFailed(data));
            toast.error(data.msg, toastOptions);
        }
    } catch(e) {
        yield put(fetchRegisterFailed(e));
    }
}

export function* watchUserFetch() {
    yield takeLatest(REGISTER_START, actionFetchRegister);
}