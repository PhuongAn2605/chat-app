import * as messageConstants from '../constants/message';

const initialState = {
    currentChat: null,
    error: null,
    messages: null
}

const messageReducer = (state=initialState, action) => {
    switch(action.type) {
        case messageConstants.SEND_MESSAGE_START:
            return {
                ...state,
                currentChat: null
            }
        case messageConstants.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                currentChat: action.payload,
                error: null
            }
        case messageConstants.SEND_MESSAGE_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case messageConstants.FETCH_ALL_MESSAGES_START:
            return {
                ...state,
                messages: null
            }
        case messageConstants.FETCH_ALL_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload,
                error: null
            }
        case messageConstants.FETCH_ALL_MESSAGES_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
    
}

export default messageReducer;