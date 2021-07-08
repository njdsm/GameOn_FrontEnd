import { GET_HOST, UPDATE_HOST } from '../actions/types';

const initialState = {
    items: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){ 
        case GET_HOST:
            return {
                ...state, //previous state
                items: action.payload //array of comment objects being pulled from the API
            };
        case UPDATE_HOST:
            return {
                ...state,
                items: action.payload
            }
        default: 
            return state;
    }
}
