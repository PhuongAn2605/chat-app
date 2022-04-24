import * as userConstants from '../constants/user';
import { setLocalDataUser } from '../utils/storage';

const initialState = {
    user: {},
    error: null,
    userList: null,
    loggedOut: false
}

const userReducer = (state = initialState, action ) => {
    switch(action.type) {
      case userConstants.REGISTER_START:
            return {
                ...state,
                error: null,
                loggedOut: false
            }
        case userConstants.REGISTER_SUCCESS:
            const { user } = action.payload;
            return {
                ...state,
                user,
                loggedOut: false
            }
        case userConstants.REGISTER_FAILED:
            return {
                ...state,
                error: action.payload,
            }
        case userConstants.LOGIN_START:
          return {
              ...state,
              error: null,
          }
        case userConstants.LOGIN_SUCCESS:
            const userLogin = action.payload.data;
            return {
                ...state,
                user: userLogin,
                loggedOut: false
            }
        case userConstants.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case userConstants.LOGOUT_SUCCESS:
        case userConstants.LOGOUT_START:
          return {
              ...state,
              user: null,
              userList: null,
              loggedOut: true,
          }
        case userConstants.LOGOUT_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case userConstants.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                userList: action.payload.users,
                user: action.payload.currentUser
            }
        case userConstants.FETCH_ALL_USERS_FAILED:
            return {
                ...state,
                error: action.payload
            }

        case userConstants.FETCH_SET_AVATAR_SUCCESS:
            setLocalDataUser(action.payload.data);
            return {
                ...state,
                user: action.payload.data
            }
        case userConstants.FETCH_SET_AVATAR_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;