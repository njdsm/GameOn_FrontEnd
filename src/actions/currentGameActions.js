import axios from 'axios';
import { START_GAME, END_GAME, JOIN_GAME, GET_PLAYERS, ADD_PLAYER } from './types';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const startGame = (user, game) => dispatch => {
    debugger
    axios.put('http://127.0.0.1:8000/games/' + game.id + "/", {"is_active": true}).then(
            game => dispatch({
                type: START_GAME,
                payload: game,
            })
    );
    axios.get('http://127.0.0.1:8000/current_game/').then(
        players => dispatch({
            type: GET_PLAYERS,
            payload: players
        }))
}

export const endGame = (game) => dispatch => {
    axios.put('http://127.0.0.1:8000/games/' + game.id + '/', {"is_active": false});
    axios.delete('http://127.0.0.1:8000/current_game/')
    game = {}
    dispatch({
        type: END_GAME,
        payload: game,
    })
}

export const joinGame = (user, game) => dispatch => {
    axios.post('http://127.0.0.1:8000/current_game/', {"player_id": user.id, "user_name": user.user_name, "phone": user.phone}).then(
        player => dispatch({
            type: ADD_PLAYER,
            payload: player.data
    })
    ).then(
        dispatch({
            type: JOIN_GAME,
            payload: game
        })
    )
}


