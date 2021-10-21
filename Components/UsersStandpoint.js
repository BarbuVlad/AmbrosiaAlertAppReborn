import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Alert,ScrollView, Dimensions } from "react-native";
import externalStyles from "../Styles/Form.styles"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import axios from "axios";


let standpointUrl= "http://92.87.91.16/backend_code/api/user_review/send_review.php"

function usersStandpoint({navigation}){

  const [bugTitle,setBugTitle] = useState("")
  const [name,setName] = useState("")
  const [bugDescription, setBugDescription] = useState("")
  const [stepsToReproduce,setStepsToReproduce] = useState("")
  const [actualResult, setActualResult] = useState("")
  const [expectedResult, setExpectedResult] = useState("")





let sendStandpointToServer=()=>{

    axios.post(standpointUrl,{
      "name": name,
      "title": title,
      "body": standpoint
    },
      {
        headers: { 'Authorization': authHeader }
      }
    )
      .then(()=>{
        Alert.alert("Thank you for feedback")
        setTitle("")
        setName("")
        setStandpoint("")
        navigation.navigate("Maps")
        }).
      catch(()=>{
        Alert.alert("Failed to send")

    })



}

  return(
     <ScrollView>
    <View style={externalStyles.container}>
     
        

        <Text style={externalStyles.logoText}>Bug Report</Text>

      <View style={externalStyles.inputView}>
        <TextInput
          style={externalStyles.inputText}
          placeholder="Bug Title"
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setBugTitle(text)}
          value = {bugTitle}
        />
      </View>

      <View style={externalStyles.inputView}>
        <TextInput
          style={externalStyles.inputText}
          placeholder="Bug Description"
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setBugDescription(text)}
          value = {bugDescription}
        />
      </View>

      <View style = {styles.feedbackContainer}>
        <TextInput
          multiline={true}
          style={styles.feedbackTextField}
          placeholder={"Steps to reproduce the bug"}
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setStepsToReproduce(text)}
          value={stepsToReproduce}
        />
      </View>

       <View style = {styles.feedbackContainer}>
        <TextInput
          multiline={true}
          style={styles.feedbackTextField}
          placeholder={"Actual result"}
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setActualResult(text)}
          value={actualResult}
        />
      </View>

       <View style = {styles.feedbackContainer}>
        <TextInput
          multiline={true}
          style={styles.feedbackTextField}
          placeholder={"Expected result"}
          placeholderTextColor="#BEBEBE"
          onChangeText={text => setExpectedResult(text)}
          value={expectedResult}
        />
      </View>

   <View style = {styles.reportBugButtonContainer}>
      <TouchableOpacity
      style={styles.reportBugButton}
      onPress={()=> {

      return sendStandpointToServer()

    }}>
      <Text style={{color:'white',fontSize: 22}}>SEND FEEDBACK</Text>
    </TouchableOpacity>
   </View>


   

    </View>
     </ScrollView>
  )

}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    marginTop:30,


  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  feedbackTextField:{
    height: hp('15%'), // 70% of height device screen
    width: wp('82%') ,  // 80% of width device screen
      margin: 12,
      borderWidth: 1,
    borderRadius:30,
    textAlignVertical: 'top',
    fontSize: 20

  },
  feedbackContainer:{


  },

  reportBugButtonContainer:{
   
    
    width: Dimensions.get('window').width/1.2,
    justifyContent: 'center',
    marginBottom: 55,
    marginTop:40,
    
   
  },
  reportBugButton:{
        
        backgroundColor:"#06beb6",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        
       
  }
})

export default usersStandpoint
