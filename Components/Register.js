import React, {useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../Styles/Form.styles';
import axios from 'axios';


function Register({navigation})
{

    const [firstName,setFirstName] = useState(0)
    const [lastName,setLastName] = useState(0)
    const [email,setEmail] = useState(0)
    const [phoneNumber,setPhoneNumber] = useState(0)
    const [address,setAddress] = useState(0)
    const [password,setPassword] = useState(0)
    const [passwordCheck,setPasswordCheck] = useState(0)

    let createNewVolunteerURL= "http://92.87.91.16/backend_code/api/new_volunteer/create.php"

    let passwordMatch=()=>{
        let passMatch
        passMatch = password === passwordCheck // check is password equal passwordCheck and store in passMatch

        if (passMatch === false){
            Alert.alert(
                "Error",
                "Make sure the password is the same in both password fields",
                [

                    { text: "OK" }
                ],
                { cancelable: false }
            );
        }

        return passMatch
    }

    let createNewVolunteer= ()=>{
        if(passwordMatch())
        {
            axios.post(createNewVolunteerURL, {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phoneNumber,
                address: address,
                password: password

            }

            )
                .then(res=> {
                    console.log(res)
                    navigation.navigate("Maps")
                    Alert.alert(
                        "Account Created",
                        "You are now a volunteer. Welcome to our community!",
                        [

                            { text: "OK" }
                        ],
                        { cancelable: false }
                    );

                })
                .catch(err=> {
                    console.log(err)
                    Alert.alert(
                        "Error",
                        "An error has occurred",
                        [

                            { text: "OK" }
                        ],
                        { cancelable: false }
                    );
                })
        }

    }

    return(
        <View style = {styles.container}>


            <Text style={styles.logoText}>Become a Member</Text>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="First Name"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setFirstName(text)}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Last Name"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setLastName(text)}
                />
            </View>

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
                    placeholder="Phone Number"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setPhoneNumber(text)}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Address"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setAddress(text)}
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


            <TouchableOpacity
                style={styles.loginButton}
                onPress={createNewVolunteer} >
                <Text style={{color:'white',fontSize: 22}}>REGISTER</Text>
            </TouchableOpacity>

        </View>
    )
}



export default Register
