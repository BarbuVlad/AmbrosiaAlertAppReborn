import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View, Linking } from "react-native";
import styles from '../Styles/Form.styles';
import axios from 'axios';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import * as Animatable from 'react-native-animatable';




function Register({ navigation }) {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [gdprCheckBox, setGdprCheckbox] = useState(false)
    const [isRegisterBtnPressed, setIsRegisterBtnPressed] = useState(0)
    const [lengthChangeAfterBtnPressed, setLengthChangeAfterBtnPressed] = useState(0)
    const [formValidation, setFormValidation] = useState({
        fnNotNull: false,
        lnNotNull: false,
        emailNotNull: false,
        emailFormat: "regex",
        pnAtLeast8digits: false,
        addressNotNull: false,
        passwordNotNull: false,

    })



    let createNewVolunteerURL = "http://92.87.91.16/backend_code/api/new_volunteer/create.php"



    let passwordMatch = () => {
        let passMatch
        passMatch = password === passwordCheck // check is password equal passwordCheck and store in passMatch

        if (passMatch === false) {
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

    let createNewVolunteer = () => {
        let ok = 0

        for (const property in formValidation) {
            if (formValidation[property] === false) {
                break
            }
            else ok = 1
        }


        if (passwordMatch() && ok === 1) {
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
                .then(res => {

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
                .catch(err => {
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

    return (
        <ScrollView>
            <View style={styles.container}>


                <Text style={styles.logoText}>Become a Volunteer</Text>

                <View style={[styles.inputView, { flex: 1 }]}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="First Name"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={text => setFirstName(text)}
                        value={firstName}
                    />
                </View>
                {formValidation.fnNotNull ? <Animatable.View
                    animation={"bounceIn"}
                    duration={500}
                    style={{ height: 50, marginTop: -30 }}>

                    <Text
                        style={styles.validationErrorTextMessage}>
                        First Name field cannot be empty</Text>

                </Animatable.View> : null}


                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Last Name"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={text => setLastName(text)}
                        value={lastName}
                    />

                </View>
                {formValidation.lnNotNull ?
                    <Animatable.View
                        animation={"bounceIn"}
                        duration={500}
                        style={{ height: 50, marginTop: -30 }}>

                        <Text
                            style={styles.validationErrorTextMessage}>
                            Last Name field cannot be empty</Text>

                    </Animatable.View> : null}


                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={text => setEmail(text)}
                        value={email}
                    />

                </View>

                {formValidation.emailNotNull ? <Animatable.View
                    animation={"bounceIn"}
                    duration={500}
                    style={{ height: 50, marginTop: -30 }}>

                    <Text
                        style={styles.validationErrorTextMessage}>
                        Email field cannot be empty</Text>

                </Animatable.View> : null}

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Phone Number"
                        placeholderTextColor="#BEBEBE"
                        keyboardType={"numeric"}
                        onChangeText={text => setPhoneNumber(text)}
                        value={phoneNumber}
                    />

                </View>
                {formValidation.fnNotNull === true ? null :
                    <Animatable.View
                        animation={"bounceIn"}
                        duration={500}
                        style={{ height: 50, marginTop: -30 }}>

                        <Text
                            style={styles.validationErrorTextMessage}>
                            Phone Number cannot be lower than 8 digits </Text>

                    </Animatable.View>
                }


                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="City"
                        placeholderTextColor="#BEBEBE"
                        onChangeText={text => setAddress(text)}
                        value={address}
                    />

                </View>

                {formValidation.addressNotNull ? <Animatable.View
                    animation={"bounceIn"}
                    duration={500}
                    style={{ height: 50, marginTop: -30 }}>

                    <Text
                        style={styles.validationErrorTextMessage}>
                        City field cannot be empty </Text>

                </Animatable.View> : null}


                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#BEBEBE"
                        secureTextEntry={true}
                        onChangeText={text => setPassword(text)}
                        value={password}
                    />

                </View>
                {formValidation.passwordNotNull ? <Animatable.View
                    animation={"bounceIn"}
                    duration={500}
                    style={{ height: 50, marginTop: -30 }}>

                    <Text
                        style={styles.validationErrorTextMessage}>
                        Password field cannot be empty </Text>

                </Animatable.View> : null}

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Repeat Password"
                        placeholderTextColor="#BEBEBE"
                        secureTextEntry={true}
                        onChangeText={text => setPasswordCheck(text)}
                        value={passwordCheck}
                    />



                </View>

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <BouncyCheckbox
                        size={25}
                        fillColor="#06beb6"
                        unfillColor="#FFFFFF"
                        iconStyle={{ borderColor: "#48b1bf" }}
                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                        onPress={(isChecked) => { setGdprCheckbox(isChecked) }}
                    />

                    <Fragment>
                        <Text>
                            I accept the {""}
                        </Text>
                        <Text
                            style={{ color: 'blue' }}
                            onPress={() => Linking.openURL('https://gdpr.eu/data-processing-agreement/')}>
                            Terms and Conditions
                        </Text>
                    </Fragment>

                </View>

                <TouchableOpacity
                    style={[styles.loginButton, { marginBottom: 25 }]}
                    onPress={() => {
                        gdprCheckBox && createNewVolunteer();
                        setIsRegisterBtnPressed(isRegisterBtnPressed => isRegisterBtnPressed + 1)
                    }} >
                    <Text style={{ color: 'white', fontSize: 22 }}>REGISTER</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    )
}



export default Register
