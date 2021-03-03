import React, {useEffect} from 'react';
import { View,StatusBar} from 'react-native';
import Router from './Components/Router';
import {useDispatch,useSelector} from 'react-redux';
import {setUserTypeThunk} from "./Redux/ThunkActions/UserTypeAction"


let App = () => {

    let selector = useSelector(state =>state.uT.userType)
    let dispatch = useDispatch()

    useEffect(()=>{
        console.log("CALLING FROM APP COMPONENT")

        console.log("REDUX IN THE HOUSE: ", selector)

        dispatch(setUserTypeThunk()).then(
            console.log("DISPATCH ENDED")
        )




        },[])


  return(

      <View style={{ height: '100%'}}>
        <StatusBar hidden={true}/>
        <Router/>

      </View>
  );
}

export default App;

