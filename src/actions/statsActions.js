import { FETCH_STATS, CREATE_STAT, FETCH_PLAYER_STATS } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const fetchStats = () => dispatch => {
    axios.get('http://127.0.0.1:8000/stats/')
        .then(stats => dispatch({
            type: FETCH_STATS,
            payload: stats.data
    }));
}

export const createStat = (newStat) => dispatch => {
    axios.post('http://127.0.0.1:8000/stats/',{
            placement: newStat.placement,
            player_id: newStat.player_id,
            game_id: newStat.game_id
        })
        .then(stat => dispatch({
            type: CREATE_STAT,
            payload: stat.data
    }));
}

export const fetchPlayerStats = (player) => dispatch => {
    axios.get('http://127.0.0.1:8000/stats/?player_id=' + player.id)
        .then(playerStats => dispatch({
            type: FETCH_PLAYER_STATS,
            payload: playerStats.data
    }));
}