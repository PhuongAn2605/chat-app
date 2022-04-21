import { combineReducer } from 'redux';
import userReducer from './user';

const rootReducer = combineReducer({
    user: userReducer
});


export default rootReducer;