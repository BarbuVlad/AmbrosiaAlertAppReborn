import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk';
import {userTypeReducer} from "./Reducers/UserTypeReducer"


const rootReducer = combineReducers({
     uT: userTypeReducer

})

const configureStore =()=> createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default configureStore
