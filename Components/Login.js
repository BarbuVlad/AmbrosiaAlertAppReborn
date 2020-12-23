import React,{useState} from 'react';
import {Text, View,TextInput ,TouchableOpacity} from 'react-native';
import styles from "../Styles/Form.styles"

function Login()
{
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0);

    return(
     <View style = {styles.container}>

        <Text style={styles.logoText}>Member Login</Text>

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

         <TouchableOpacity style={styles.loginButton}>
             <Text style={{color:'white',fontSize: 22}}>LOGIN</Text>
         </TouchableOpacity>

         <TouchableOpacity style={styles.registerButton}>
             <Text style={{color:'white',fontSize: 22}}>SIGN UP</Text>
         </TouchableOpacity>

     </View>
        )
}



export default Login
