import { FETCH_COMMENTS, NEW_COMMENT } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const fetchStats = () => dispatch => {
    // axios.get('http://127.0.0.1:8000/stats/')
    //     .then(stats => dispatch({
    //         type: FETCH_STATS,
    //         payload: stats.data
    // }));
}

export const createStat = (newStat) => dispatch => {
    // axios.post('http://127.0.0.1:8000/stats/',{
    //         author: newStat.author,
    //         body: newStat.body
    //     })
    //     .then(stat => dispatch({
    //         type: NEW_STAT,
    //         payload: stat.data
    // }));
}
