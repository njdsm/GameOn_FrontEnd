import { FETCH_COMMENTS, NEW_COMMENT } from '../actions/types';

const initialState = {
    items: []
}

//...state is the current state with the spread operator
//action.payload is referring to the data being passed from the action to the reducer
export default function(state = initialState, action){
    switch(action.type){ 
        case FETCH_COMMENTS:
            return {
                ...state, //previous state
                items: action.payload //array of comment objects being pulled from the API
            };
        case NEW_COMMENT:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        default: 
            return state;
    }
}
