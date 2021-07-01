import { FETCH_GAMES, CREATE_GAME } from '../actions/types';

const initialState = {
    items: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){ 
        case FETCH_GAMES:
            return {
                ...state, //previous state
                items: action.payload //array of comment objects being pulled from the API
            };
        case CREATE_GAME:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        default: 
            return state;
    }
}
