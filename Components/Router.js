import * as React from 'react';
import {View} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Maps from "./Maps"
import Header from './Header';
import Login from './Login';
import Register from "./Register"


const Drawer = createDrawerNavigator()

let MapsRoute = ({navigation}) =>{
     return(

        <View>
            <Header navigation={navigation}/>
            <Maps/>
        </View>

     )
}

let Router=()=> {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Maps" component={MapsRoute} />
                <Drawer.Screen name="Register" component={Register} />
                <Drawer.Screen name="Login" component={Login} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default Router




