import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
    createDrawerNavigator, createSwitchNavigator,
    DrawerContentScrollView, DrawerItem,
    DrawerItemList, useIsDrawerOpen,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Maps from './Maps';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import SplashScreen from './SplashScreen';
import localStorage from './LocalStorage';
import {Avatar} from 'react-native-elements';


import {useSelector, useDispatch} from 'react-redux';
import {setUserType} from  "../Redux/Actions/UserTypeAction"


const Drawer = createDrawerNavigator()


let MapsRoute = ({navigation}) =>{
     return(

        <View>
            <Header navigation={navigation}/>
            <Maps/>
        </View >

     )
}



let Router= ()=> {

    const[isMounted,setIsMounted] = useState(false)
    const[userTypeCheck,setUserTypeCheck] = useState("")
    const[email,setEmail] = useState("")

  //  const isOpen: boolean = useIsDrawerOpen()

    let selector = useSelector(state =>state.uT.userType)
    let dispatch = useDispatch()

    useEffect(()=>{
       //this is for SplashScreen; Choose here how much time you want to last after component mounted

        console.log("REDUX DSFSDFDGSDGDG%REGRG with THUNK: ", selector)


        setUserTypeCheck(selector)
        periodicEmailCheck()




       setTimeout(()=> setIsMounted(true), 1000)



     //  console.log(isMounted)


    },[selector])

    let periodicEmailCheck=async()=>{

        let ld = await localStorage.getObjectData("loginData")
        let em = await ld.email
      //  console.log("HERE: ", x,"   ",em)
        if(selector !== 'normalUser') {setEmail(em)}
        else { setEmail("")}

    }

    let userHelloAndLogout=(props)=>{

        return(
            <DrawerContentScrollView {...props}>
                <SafeAreaView  forceInset={{ top: 'always', horizontal: 'never' }}>


                        <View style={{ justifyContent: 'center', alignItems: 'center',backgroundColor: '#06beb6',marginTop: -4 }}>
                            <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                            <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`HELLO, ${email}`}</Text>
                            <Text style={{ color: '#f9f9f9', marginTop: '1%', fontFamily: 'sans-serif-condensed' }}>{`RANK: ${userTypeCheck.toUpperCase()}`}</Text>

                        </View>


                <DrawerItemList {...props} styles={{}}/>

                { userTypeCheck !== "normalUser" &&
                <DrawerItem label={"Logout"} onPress={()=>{
                    setEmail("")

                    //setUserTypeCheck("normalUser")
                    dispatch(setUserType("normalUser"))
                    localStorage.storeObjectData(
                        "loginData", //key
                        {email:"",password:""} // data
                    )
                }}/>
                }


                </SafeAreaView>

            </DrawerContentScrollView>
        )
    }


    if(isMounted === false)
    {

       return <SplashScreen/>

    }
    else{

        return (

                <NavigationContainer>


                    <Drawer.Navigator initialRouteName="Splash"
                            drawerContent={ userHelloAndLogout}>
                        {userTypeCheck === "normalUser" ?
                            (
                                <>
                                    <Drawer.Screen name="Maps" component={MapsRoute}/>
                                    <Drawer.Screen name="Login" component={Login} />
                                    <Drawer.Screen name="Register" component={Register}/>

                                </>

                            ):(
                                <>
                                    <Drawer.Screen styles ={{}} name="Maps" component={MapsRoute}/>

                                </>



                            )

                        }


                    </Drawer.Navigator>

                </NavigationContainer>


        );
    }


}

export default Router




