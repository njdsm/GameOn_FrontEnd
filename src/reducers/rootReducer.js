import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import statsReducer from './statsReducer';
import usersReducer from './usersReducer';
import currentGameReducer from './currentGameReducer';
import playersReducer from './playersReducer';
import hostReducer from './hostReducer';

export default combineReducers({
    stats: statsReducer,
    games: gameReducer,
    user: authReducer,
    users: usersReducer,
    currentGame: currentGameReducer,
    players: playersReducer,
    host: hostReducer,
});