import { START_GAME, END_GAME, JOIN_GAME, SEND_QUESTION } from '../actions/types';

const initialState = {
    items: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){ 
        case START_GAME:
            return {
                ...state, //previous state
                items: action.payload //array of comment objects being pulled from the API
            };
        case END_GAME:
            return {
                ...state,
                items: action.payload
            }
        case JOIN_GAME:
            console.log(action.payload)
            return {
                ...state,
                items: action.payload
            }
        case SEND_QUESTION:
            return {
                ...state,
                items: action.payload
            }
        default: 
            return state;
    }
}
