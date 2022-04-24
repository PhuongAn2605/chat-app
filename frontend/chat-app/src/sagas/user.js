import axios from "axios";
import { toast } from "react-toastify";
import { allUsersRoute, loginRoute, logoutRoute, registerRoute, setAvatarRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/toast";
import { all, put, takeLatest, call } from '@redux-saga/core/effects';
import { REGISTER_START, LOGIN_START, FETCH_ALL_USERS_START, FETCH_SET_AVATAR_START, NAVIGATE_CHAT, LOGOUT_START } from "../constants/user";
import { fetchRegisterFailed, fetchRegisterSuccess, fetchLoginSuccess, fetchLoginFailed, fetchAllUsersSuccess, fetchAllUsersFailed, fetchSetAvatarSuccess, fetchSetAvatarFailed, fetchSetAvatarStart, fetchLogoutSuccess, fetchLogoutFailed } from "../actions/user";

function* actionFetchRegister(action) {
    try {
        const { email, username, password } = action.payload;
        const { data } = yield axios.post(registerRoute, {
            username,
            email,
            password
        });

        if(data.status === true) {
            yield put(fetchRegisterSuccess(data.user));
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
            yield put(fetchLoginSuccess(data.user));
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

function* actionFetchLogout(action) {
  try {
      const data = yield axios.post(logoutRoute, {
          userId: action.payload
      });

      if(data.status === 200) {
          yield put(fetchLogoutSuccess());
          toast.success('Logout successfully!', toastOptions);
          localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
      }
      else {
          yield put(fetchLogoutFailed(data));
          toast.error(data.msg, toastOptions);
      }
  } catch(e) {
      yield put(fetchLogoutFailed(e));
  }
}

function* actionFetchAllUsers(action) {
    try {
        const  { data } = yield axios.post(allUsersRoute, {
          userId: action.payload
        });
        if(data.status === true) {
            yield put(fetchAllUsersSuccess({
              currentUser: data.user,
              users: data.users
            }));
          
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
  try {
      const  { data } = yield axios.post(`${setAvatarRoute}`, {
        userId: action.payload.userId,
        image: action.payload.image
      });
      if(data.status === true) {
          yield put(fetchSetAvatarSuccess(data.user));
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

// function* actionNavigateChat(action) {
//   console.log('action: ', action)
//   action.navigate('/');
// }

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

export function* fetchLogoutWatcher() {
  yield takeLatest(LOGOUT_START, actionFetchLogout);
}

export function* userSaga() {
    yield all([
        call(fetchRegisterWatcher),
        call(fetchLoginWatcher),
        call(fetchAllUsersWatcher),
        call(fetchSetAvatarWatcher),
        call(fetchLogoutWatcher)
    ])
}