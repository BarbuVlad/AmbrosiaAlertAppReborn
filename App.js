import React, {useEffect} from 'react';
import { View,StatusBar} from 'react-native';
import Router from './Components/Router';
import axios from 'axios';

let App = () => {

    useEffect(()=>{
        console.log("CALLING FROM APP COMPONENT")

        },[])





  return(

      <View style={{ height: '100%'}}>
        <StatusBar hidden={true}/>
        <Router/>

      </View>
  );
}

export default App;

