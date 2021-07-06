import { FETCH_GAMES, CREATE_GAME } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const fetchGames = () => dispatch => {
    axios.get('http://127.0.0.1:8000/games/')
        .then(games => dispatch({
            type: FETCH_GAMES,
            payload: games.data
    }));
}

export const createGame = (newGame) => dispatch => {
    axios.post('http://127.0.0.1:8000/games/',{
            name: newGame.name,
            description: newGame.description,
            player_min: newGame.player_min,
            owner: newGame.owner_id,
            is_active: newGame.is_active
        })
        .then(game => dispatch({
            type: CREATE_GAME,
            payload: game.data
    }));
}
//GET CURRENT GAME/ACTIVE GAME
