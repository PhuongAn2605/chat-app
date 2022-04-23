import * as userConstants from '../constants/user';

const initialState = {
    user: {},
    error: null,
    userList: []
}

const userReducer = (state = initialState, action ) => {
    switch(action.type) {
        case userConstants.REGISTER_SUCCESS:
            const { user } = action.payload;
            return {
                ...state,
                user
            }
        case userConstants.REGISTER_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case userConstants.LOGIN_SUCCESS:
            const { userLogin } = action.payload;
            return {
                ...state,
                user: userLogin
            }
        case userConstants.LOGIN_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case userConstants.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                userList: action.payload.users
            }
        case userConstants.FETCH_ALL_USERS_FAILED:
            return {
                ...state,
                error: action.payload
            }

        case userConstants.FETCH_SET_AVATAR_SUCCESS:
          console.log('payload: ', action.payload)
          const { userData } = action.payload;
            localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(userData))
            return {
                ...state,
                user: userData
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