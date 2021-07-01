import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import statsReducer from './statsReducer';

export default combineReducers({
    stats: statsReducer,
    games: gameReducer,
});