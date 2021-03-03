import React,{useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from "../Styles/Form.styles"
import localStorage from './LocalStorage'
import {useDispatch} from 'react-redux';
import {setUserType} from  "../Redux/Actions/UserTypeAction"
import UserType from './UserType';


function Login({navigation})
{
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0)


    let dispatch = useDispatch()


    let login = async()=>{

        await localStorage.storeObjectData(
                        "loginData", //key
                        {email:email,password:password} // data
                     )
            .then(
                UserType.checkUserType()
                    .then(res=>{

                            dispatch(setUserType(res)) //set on redux type of volunteer
                        navigation.navigate("Maps")
                    })
            )
    }



        return(
            <View style = {styles.container}>

                <Text style={styles.logoText}>Welcome back</Text>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#BEBEBE"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={()=> {

                        return login()

                    }}>
                    <Text style={{color:'white',fontSize: 22}}>LOGIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                  onPress={()=>{
                      navigation.navigate("Register")
                  }}
                >
                    <Text style={{color:'white',fontSize: 22}}>SIGN UP</Text>
                </TouchableOpacity>

            </View>)




}




export default Login
