import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import statsReducer from './statsReducer';
import usersReducer from './usersReducer';
import currentGameReducer from './currentGameReducer';

export default combineReducers({
    stats: statsReducer,
    games: gameReducer,
    user: authReducer,
    users: usersReducer,
    currentGame: currentGameReducer,
});