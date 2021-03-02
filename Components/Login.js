import React,{useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from "../Styles/Form.styles"
import axios from 'axios';
import localStorage from './LocalStorage'


let newVolunteerURL = "http://92.87.91.16/backend_code/api/new_volunteer/login.php"
let volunteerURL = "http://92.87.91.16/backend_code/api/volunteer/login.php"


function Login({navigation})
{
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0)


    let login = (url)=>{

        axios.post(url, {
            email: email,
            password: password
        })
            .then( async res => {

                console.log(res.data)

                await localStorage.storeObjectData(
                    "loginData", //key
                    {email:email,password:password} // data
                 )

                console.log("STORAGE: ", await localStorage.getObjectData("loginData"))
                navigation.navigate("Maps")
                //
                // Alert.alert(
                //     "Login Successful",
                //     "Welcome back!",
                //     [
                //         { text: "OK" }
                //     ],
                //     { cancelable: false }
                // );

            })
            .catch(err=> {
                console.log(err.response.data.message)
                if( url === newVolunteerURL && err.response.data.message === "no such volunteer found")
                {
                    console.log("Switched to FULL Volunteer")
                    login(volunteerURL)
                }
                if(url === volunteerURL && err.response.data.message === "no such volunteer found")
                {
                    Alert.alert(
                        "Error",
                        "Incorrect email or password",
                        [
                            { text: "OK" }
                        ],
                        { cancelable: false }
                    );
                }
            })
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

                        return login(newVolunteerURL)

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
