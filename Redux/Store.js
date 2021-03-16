import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk';
import {userTypeReducer} from "./Reducers/UserTypeReducer"
import {markersShouldUpdateReducer} from "./Reducers/MarkersShouldUpdateReducer"


const rootReducer = combineReducers({
     uT: userTypeReducer,
     updateMarkers: markersShouldUpdateReducer


})

const configureStore =()=> createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default configureStore
