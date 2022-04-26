import { combineReducers } from 'redux';
import messageReducer from './message';
import userReducer from './user';

const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer
});


export default rootReducer;