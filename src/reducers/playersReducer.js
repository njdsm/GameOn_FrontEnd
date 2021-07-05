import { GET_PLAYERS, ADD_PLAYER } from '../actions/types';

const initialState = {
    items: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
// eslint-disable-next-line
export default function(state = initialState, action){
    switch(action.type){ 
        case GET_PLAYERS:
            return {
                ...state,
                items: action.payload
            };
        case ADD_PLAYER:
            return {
                ...state,
                items: action.payload
            }
        default: 
            return state;
    }
}
