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

export const fetchLogoutStart = ( userId ) => ({
  type: userTypes.LOGOUT_START,
  payload: userId
});

export const fetchLogoutSuccess = (data) => ({
  type: userTypes.LOGOUT_SUCCESS,
  payload: {
      data: data
  }
});

export const fetchLogoutFailed = (error) => ({
  type: userTypes.LOGOUT_FAILED,
  payload: {
      error
  }
});

export const fetchAllUsersStart = (userId) => ({
    type: userTypes.FETCH_ALL_USERS_START,
    payload: userId
});

export const fetchAllUsersSuccess = ({ currentUser, users }) => ({
    type: userTypes.FETCH_ALL_USERS_SUCCESS,
    payload: {
        currentUser,
        users
    }
});

export const fetchAllUsersFailed = (error) => ({
    type: userTypes.FETCH_ALL_USERS_FAILED,
    payload: {
        error
    }
});

export const fetchSetAvatarStart = ({userId, image}) => ({
  type: userTypes.FETCH_SET_AVATAR_START,
  payload: {
    userId,
    image
  }
});

export const fetchSetAvatarSuccess = (data) => ({
  type: userTypes.FETCH_SET_AVATAR_SUCCESS,
  payload: {
      data: data
  }
});

export const fetchSetAvatarFailed = (error) => ({
  type: userTypes.FETCH_SET_AVATAR_FAILED,
  payload: {
      error
  }
});

