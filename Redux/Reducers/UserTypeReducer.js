import {SET_USER_TYPE} from '../Actions/Types';

let initialState = {userType: 'normalUser'}

export let userTypeReducer = (state = initialState, action) =>{
    switch (action.type){
        case SET_USER_TYPE:
            return {...state, userType: action.payload}
        default:
            return state
    }
}


