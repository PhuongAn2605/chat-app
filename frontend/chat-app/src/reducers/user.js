import * as userConstants from '../constants/user';

const initialState = {
    user: {},
    error: null
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
        default:
            return state;
    }

}

export default userReducer;