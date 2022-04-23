import axios from "axios";
import { toast } from "react-toastify";
import { allUsersRoute, loginRoute, registerRoute, setAvatarRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/toast";
import { all, put, takeLatest, call } from '@redux-saga/core/effects';
import { REGISTER_START, LOGIN_START, FETCH_ALL_USERS_START, FETCH_SET_AVATAR_START } from "../constants/user";
import { fetchRegisterFailed, fetchRegisterSuccess, fetchLoginSuccess, fetchLoginFailed, fetchAllUsersSuccess, fetchAllUsersFailed, fetchSetAvatarSuccess, fetchSetAvatarFailed, fetchSetAvatarStart } from "../actions/user";

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
        const  { data } = yield axios.get(allUsersRoute);
        if(data.status === true) {
            yield put(fetchAllUsersSuccess(data));
            // toast.success('Get all users successfully!', toastOptions);
        }
        else if(data.status === false) {
            yield put(fetchAllUsersFailed(data));
            toast.error(data.msg, toastOptions);
        }
    } catch(e) {
        yield put(fetchAllUsersFailed(e));
    }
}

function* actionFetchSetAvatar(action) {
  console.log('action: ', action)
  try {
      const  { data } = yield axios.post(`${setAvatarRoute}`, {
        userId: action.payload.userId,
        image: action.payload.image
      });
      console.log('data: ', data);
      if(data.status === true) {
          yield put(fetchSetAvatarSuccess(data));
          toast.success('Set avatar successfully!', toastOptions);
      }
      else if(data.status === false) {
          yield put(fetchSetAvatarFailed(data));
          toast.error(data.msg, toastOptions);
      }
  } catch(e) {
      yield put(fetchSetAvatarFailed(e));
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

export function* fetchSetAvatarWatcher() {
  yield takeLatest(FETCH_SET_AVATAR_START, actionFetchSetAvatar);
}

export function* userSaga() {
    yield all([
        call(fetchRegisterWatcher),
        call(fetchLoginWatcher),
        call(fetchAllUsersWatcher),
        call(fetchSetAvatarWatcher)
    ])
}