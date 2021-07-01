import { LOGIN, REGISTER, LOGOUT, REGISTER_USER } from './types';
import axios from 'axios';

//each action creator is a function
//thunk middleware allows us to call dispatch function directly so we can make asynchronous requests
//dispatch is like resolving a promise; dispatch allows for sending of data
export const login = (user) => dispatch => {
    
    try{
        axios.post('http://127.0.0.1:8000/users/', user).then(user => dispatch({
            type: LOGIN,
            payload: user.data,
        }))
    }
    catch(error){
        alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`)
    }
}


export const registerUser = (userReg) => dispatch => {
    try {
        debugger
        let {data} = axios.post('http://127.0.0.1:8000/users/', userReg).then(
            user => dispatch({
                type: REGISTER_USER,
                payload: user.data
            })
        );
        console.log('registered post', data);
        login({username: userReg.username, password: userReg.password})
        
    }
    catch(error){
        alert(`Whoops! ${error}. Looks like we're having some technical difficulties. Try again later!`)
    }
  
}

export const logout = () => dispatch => {
    localStorage.removeItem("token");
}
