import { GET_HOST, UPDATE_HOST } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data

export const getHost = (key) => dispatch => {
    axios.get('http://127.0.0.1:8000/owners/' + key + '/',{
            key: key,
        })
        .then(host => dispatch({
            type: GET_HOST,
            payload: host.data
    }));
}

export const updateHost = (host, key) => dispatch => {
    axios.put('http://127.0.0.1:8000/owners/' + host.key + '/', key).then(
        host => dispatch({
            type: UPDATE_HOST,
            payload: host.data
        })
    )
}