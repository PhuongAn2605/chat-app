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
            const { error } = action.payload;
            return {
                ...state,
                error
            }
        case userConstants.LOGIN_SUCCESS:
            const { userLogin } = action.payload;
            return {
                ...state,
                user: userLogin
            }
        case userConstants.LOGIN_FAILED:
            const { e } = action.payload;
            return {
                ...state,
                error: e
            }
            case userConstants.FETCH_ALL_USERS_SUCCESS:
            const { users } = action.payload;
            return {
                ...state,
                user: users
            }
        case userConstants.FETCH_ALL_USERS_FAILED:
            const { err } = action.payload;
            return {
                ...state,
                error: err
            }
        default:
            return state;
    }

}

export default userReducer;