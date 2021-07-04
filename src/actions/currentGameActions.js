import { START_GAME } from './types';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const startGame = (user, game) => dispatch => {
    if (user.host){
        dispatch({
            type: START_GAME,
            payload: game,
        })
    }
}

export const joinGame = (user, game) => dispatch => {
    console.log("join");
}
