import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import externalStyles from "../Styles/Form.styles"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'






function usersStandpoint({navigation}){

  const [title,setTitle] = useState("")
  const [name,setName] = useState("")
  const [standpoint,setStandpoint] = useState("")





let sendStandpointToServer=()=>{

    setTitle("")
    setName("")
    setStandpoint("")
    navigation.navigate("Maps")

}

  return(
    <View style={externalStyles.container}>

        <Text style={externalStyles.logoText}>Give Us Feedback</Text>

      <View style={externalStyles.inputView}>
        <TextInput
          style={externalStyles.inputText}
          placeholder="Title of your feedback"
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setTitle(text)}
          value = {title}
        />
      </View>
      <View style={externalStyles.inputView}>
        <TextInput
          style={externalStyles.inputText}
          placeholder="Your full name(optional)"
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setName(text)}
          value = {name}
        />
      </View>
      <View style = {styles.feedbackContainer}>
        <TextInput
          multiline={true}
          style={styles.feedbackTextField}
          placeholder="Write here your feedback"
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setStandpoint(text)}
          value={standpoint}
        />
      </View>
      <TouchableOpacity
      style={externalStyles.loginButton}
      onPress={()=> {

      return sendStandpointToServer()

    }}>
      <Text style={{color:'white',fontSize: 22}}>SEND FEEDBACK</Text>
    </TouchableOpacity>

    </View>
  )

}

const styles = StyleSheet.create({
  titleContainer: {

    marginTop:30,


  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  feedbackTextField:{
    height: hp('30%'), // 70% of height device screen
    width: wp('82%') ,  // 80% of width device screen
      margin: 12,
      borderWidth: 1,
    borderRadius:30,
    textAlignVertical: 'top',
    fontSize: 20

  },
  feedbackContainer:{


  }
})

export default usersStandpoint
