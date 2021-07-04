import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import statsReducer from './statsReducer';

export default combineReducers({
    stats: statsReducer,
    games: gameReducer,
    user: authReducer,
    users: authReducer,
});