import React,{useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from "../Styles/Form.styles"


function Register()
{
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0);
    const [passwordCheck,setPasswordCheck] = useState(0)

    return(
        <View style = {styles.container}>


            <Text style={styles.logoText}>Become a Member</Text>

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

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Repeat Password"
                    placeholderTextColor="#BEBEBE"
                    secureTextEntry={true}
                    onChangeText={text => setPasswordCheck(text)}
                />
            </View>


            <TouchableOpacity style={styles.loginButton}>
                <Text style={{color:'white',fontSize: 22}}>REGISTER</Text>
            </TouchableOpacity>

        </View>
    )
}



export default Register
