import React, {Fragment, useState} from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View, Linking } from "react-native";
import styles from '../Styles/Form.styles';
import axios from 'axios';
import BouncyCheckbox from "react-native-bouncy-checkbox";




function Register({navigation})
{

    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [address,setAddress] = useState("")
    const [password,setPassword] = useState("")
    const [passwordCheck,setPasswordCheck] = useState("")
    const [gdprCheckBox, setGdprCheckbox] = useState(false)

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

            },
            {
                headers: { 'Authorization': authHeader }
            }
            )
                .then(res=> {

                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setPhoneNumber("")
                    setAddress("")
                    setPassword("")
                    setPasswordCheck("")

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
      <ScrollView contentContainerStyle={{flex:1}}>
        <View style = {styles.container}>


            <Text style={styles.logoText}>Become a Volunteer</Text>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="First Name"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setFirstName(text)}
                    value={firstName}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Last Name"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setLastName(text)}
                    value={lastName}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Phone Number"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setPhoneNumber(text)}
                    value={phoneNumber}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Address"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setAddress(text)}
                    value={address}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Password"
                    placeholderTextColor="#BEBEBE"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Repeat Password"
                    placeholderTextColor="#BEBEBE"
                    secureTextEntry={true}
                    onChangeText={text => setPasswordCheck(text)}
                    value={passwordCheck}
                />
            </View>

             <View style={{flexDirection: 'row', marginTop: 10}}>
                <BouncyCheckbox
                size={25}
                fillColor="#06beb6"
                unfillColor="#FFFFFF"
                iconStyle={{ borderColor: "#48b1bf" }}
                textStyle={{ fontFamily: "JosefinSans-Regular" }}
                onPress={(isChecked) => {setGdprCheckbox(isChecked)}}
                />

                <Fragment>
                     <Text>
                        I accept the {""}
                    </Text>
                     <Text 
                        style={{color:'blue'}}
                        onPress={() => Linking.openURL('https://gdpr.eu/data-processing-agreement/')}>
                            Terms and Conditions
                    </Text> 
                    </Fragment>

            </View>
            
            <TouchableOpacity
                style={[styles.loginButton,{marginBottom:25}]}
                onPress={()=> gdprCheckBox && createNewVolunteer()} >
                <Text style={{color:'white',fontSize: 22}}>REGISTER</Text>
            </TouchableOpacity>
            

        </View>
        </ScrollView>
    )
}



export default Register
