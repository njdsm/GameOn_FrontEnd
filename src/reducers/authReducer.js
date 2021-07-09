import { LOGIN, LOGIN_HOST, REGISTER_USER, LOGOUT, REDEEM, CREATE_HOST } from '../actions/types';

const initialState = {
    items: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){ 
        case LOGIN:
            action.payload.host = false
            return {
                ...state, //previous state
                items: action.payload //array of comment objects being pulled from the API
            };
        case LOGIN_HOST:
            return {
                ...state,
                items: action.payload
            }
        case REGISTER_USER:
            return {
                ...state,
                items: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                items: action.payload
            }
        case REDEEM:
            return {
                ...state,
                items: action.payload
            }
        case CREATE_HOST:
            return {
                ...state,
                items: action.payload
            }
        default: 
            return state;
    }
}
