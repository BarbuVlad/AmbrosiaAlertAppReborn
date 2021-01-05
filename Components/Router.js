import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Maps from "./Maps"
import Header from './Header';
import Login from './Login';
import Register from "./Register"
import SplashScreen from './SplashScreen';

const Drawer = createDrawerNavigator()

let MapsRoute = ({navigation}) =>{
     return(

        <View>
            <Header navigation={navigation}/>
            <Maps/>
        </View>

     )
}


let Router= ()=> {

    const[isMounted,setIsMounted] = useState(false)

    useEffect(()=>{
       //this is for SplashScreen; Choose here how much time you want to last after component mounted
       setTimeout(()=> setIsMounted(true), 1000)
       console.log(isMounted)


    },[])

    if(isMounted === false)
    {
       return <SplashScreen/>

    }
    else{
        return (
            <NavigationContainer>

                <Drawer.Navigator initialRouteName="Splash">
                    <Drawer.Screen name="Maps" component={MapsRoute} />
                    <Drawer.Screen name="Register" component={Register} />
                    <Drawer.Screen name="Login" component={Login} />
                </Drawer.Navigator>

            </NavigationContainer>
        );
    }


}
export default Router




