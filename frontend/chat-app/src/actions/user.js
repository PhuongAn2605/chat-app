import * as userTypes from "../constants/user";

export const fetchRegisterStart = ( username, email, password ) => ({
    type: userTypes.REGISTER_START,
    payload: {
        username,
        email,
        password
    }
});

export const fetchRegisterSuccess = (data) => ({
    type: userTypes.REGISTER_SUCCESS,
    payload: {
        data: data
    }
});

export const fetchRegisterFailed = (error) => ({
    type: userTypes.REGISTER_FAILED,
    payload: {
        error
    }
});

export const fetchLoginStart = ( username, password ) => ({
    type: userTypes.LOGIN_START,
    payload: {
        username,
        password
    }
});

export const fetchLoginSuccess = (data) => ({
    type: userTypes.LOGIN_SUCCESS,
    payload: {
        data: data
    }
});

export const fetchLoginFailed = (error) => ({
    type: userTypes.LOGIN_FAILED,
    payload: {
        error
    }
});

export const fetchAllUsersStart = ( username, email, password ) => ({
    type: userTypes.FETCH_ALL_USERS_START,
    payload: {
        username,
        email,
        password
    }
});

export const fetchAllUsersSuccess = (data) => ({
    type: userTypes.FETCH_ALL_USERS_SUCCESS,
    payload: {
        data: data
    }
});

export const fetchAllUsersFailed = (error) => ({
    type: userTypes.FETCH_ALL_USERS_FAILED,
    payload: {
        error
    }
});