import axios from 'axios';
import { START_GAME, END_GAME, JOIN_GAME } from './types';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const startGame = (user, game) => dispatch => {
    debugger
    axios.put('http://127.0.0.1:8000/games/' + game.id + "/", {"is_active": true});
    if (user.host){
        game.players = {}
        dispatch({
            type: START_GAME,
            payload: game,
        })
    }
}

export const endGame = (game) => dispatch => {
    axios.put('http://127.0.0.1:8000/games/' + game.id + '/', {"is_active": false});
    game = {}
    dispatch({
        type: END_GAME,
        payload: game,
    })
}

export const joinGame = (user, game) => dispatch => {
    console.log("join");
}
