import {setUserType} from '../Actions/UserTypeAction';
import UserType from '../../Components/UserType';

export let setUserTypeThunk =()=>{
    return async (dispatch)=>{
       await UserType.checkUserType()
            .then(res=>{
                console.log("INSIDE THUNK RES: ",res)
                dispatch(setUserType(res))
            })
    }
}
