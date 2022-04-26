import * as messageTypes from "../constants/message";

export const fetchSendMessageStart = ( from, to, message ) => ({
    type: messageTypes.SEND_MESSAGE_START,
    payload: {
        from,
        to,
        message
    }
});

export const fetchSendMessageSuccess = (data) => ({
    type: messageTypes.SEND_MESSAGE_SUCCESS,
    payload: {
        data
    }
});

export const fetchSendMessageFailed = (error) => ({
    type: messageTypes.SEND_MESSAGE_FAILED,
    payload: {
        error
    }
});

export const fetchAllMessagesStart = ( from, to, message ) => ({
    type: messageTypes.FETCH_ALL_MESSAGES_START,
    payload: {
        from,
        to,
        message
    }
});

export const fetchAllMessagesSuccess = (data) => ({
    type: messageTypes.FETCH_ALL_MESSAGES_SUCCESS,
    payload: {
        data
    }
});

export const fetchAllMessagesFailed = (error) => ({
    type: messageTypes.FETCH_ALL_MESSAGES_FAILED,
    payload: {
        error
    }
});