import axios from "axios";
import { toast } from "react-toastify";
import { allUsersRoute, loginRoute, registerRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/toast";
import { all, put, takeLatest, call } from '@redux-saga/core/effects';
import { REGISTER_START, LOGIN_START, FETCH_ALL_USERS_START } from "../constants/user";
import { fetchRegisterFailed, fetchRegisterSuccess, fetchLoginSuccess, fetchLoginFailed } from "../actions/user";

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

function* actionFetchLogin(action) {
    try {
        const { username, password } = action.payload;
        const { data } = yield axios.post(loginRoute, {
            username,
            password
        });

        if(data.status === true) {
            yield put(fetchLoginSuccess(data.data));
            toast.success('Login successfully!', toastOptions);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        }
        else if(data.status === false) {
            yield put(fetchLoginFailed(data));
            toast.error(data.msg, toastOptions);
        }
    } catch(e) {
        yield put(fetchLoginFailed(e));
    }
}

function* actionFetchAllUsers() {
    try {
        const { data } = yield axios.post(allUsersRoute);

        if(data.status === true) {
            yield put(fetchLoginSuccess(data.data));
            toast.success('Get all users successfully!', toastOptions);
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        }
        else if(data.status === false) {
            yield put(fetchLoginFailed(data));
            toast.error(data.msg, toastOptions);
        }
    } catch(e) {
        yield put(fetchLoginFailed(e));
    }
}

export function* fetchRegisterWatcher() {
    yield takeLatest(REGISTER_START, actionFetchRegister);
}

export function* fetchLoginWatcher() {
    yield takeLatest(LOGIN_START, actionFetchLogin);
}

export function* fetchAllUsersWatcher() {
    yield takeLatest(FETCH_ALL_USERS_START, actionFetchAllUsers);
}

export function* userSaga() {
    yield all([
        call(fetchRegisterWatcher),
        call(fetchLoginWatcher),
    ])
}