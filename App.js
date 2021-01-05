import React from 'react';
import { View,StatusBar} from 'react-native';
import Router from './Components/Router';

let App = () => {

  return(

      <View style={{ height: '100%'}}>
        <StatusBar hidden={true}/>
        <Router/>

      </View>
  );
}

export default App;

