import React, { useRef,} from "react";
import { View, Text,} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import "./globals"
import axios from 'axios';
import { useSelector } from "react-redux";
import DeviceInfo from "./DeviceInfo";
import localStorage from "./LocalStorage";



let checkIfUserExist = async()=>{
  let rtnValue = 0
  let vendorId = await DeviceInfo.getDeviceUniqueId()
  let checkUserUrl =
    "http://92.87.91.16/backend_code/api/user/read_single.php?vendor_id="+
    vendorId

  await axios.get(checkUserUrl)
    .then(
      res=>{
        rtnValue = res.data.message
      })
    .catch(err=>{
      console.log("ERROR ", err)
    })
  return rtnValue
}


let sendFeedbackToServer = async(feedbackUrl, requestStructure)=>{
  await axios.post(feedbackUrl, requestStructure)
    .then(res=>{
      console.log("REZULTAT TRIMIS PE SERVER ",res.data.message)
    })
    .catch(err=>{
      console.log("Error is: ", err)
      console.log("requst structure ", requestStructure)
      console.log("requst URL: ",feedbackUrl)
    });
}

let mapsFeedbackPanel =()=>{

   global.refRBSheet = useRef();

   let selector = useSelector(state => state.uT.userType)


   let feedbackRequest = async(pressedMarkerData, feedbackType)=>{
     let feedBackUrl
     let requestStructure
     let email
     let loginDataFromStorage = await localStorage.getObjectData("loginData")
     if(loginDataFromStorage !== null){ email =  loginDataFromStorage.email}
     let vID = await DeviceInfo.getDeviceUniqueId()


     if(selector === "normalUser"){
        feedBackUrl = "http://92.87.91.16/backend_code/api/feedback/user.php"
        requestStructure={

          "vendor_id": vID,
          "longitude": pressedMarkerData.coordinate.longitude,
          "latitude": pressedMarkerData.coordinate.latitude,
          "type": feedbackType

        }

        let checkIfExist =  await checkIfUserExist()

        if(checkIfExist === "User dose NOT exist")
        {
          let url = "http://92.87.91.16/backend_code/api/user/create.php"
          await axios.post(url, { "vendor_id" : vID })
            .then(res=>{
              console.log("WAS USER CREATED?  ",res.data.message)
              if(res.data.message === "User created"){
                return sendFeedbackToServer(feedBackUrl,requestStructure)
              }
            })
            .catch(err=>{
              console.log(err)

            });

        }
        else {
          return sendFeedbackToServer(feedBackUrl,requestStructure)

        }

      } else if(selector === "newVolunteer"){
         feedBackUrl = "http://92.87.91.16/backend_code/api/feedback/new_volunteer.php"

        requestStructure={

          "email": email,
          "longitude": pressedMarkerData.coordinate.longitude,
          "latitude": pressedMarkerData.coordinate.latitude,
          "type": feedbackType

        }
     return  sendFeedbackToServer(feedBackUrl,requestStructure)

      }

      else if(selector === "volunteer"){

        if(pressedMarkerData.markerColor === "yellow" && feedbackType === "like"){

          feedBackUrl = "http://92.87.91.16/backend_code/api/yellow_marker/confirm.php"

          requestStructure={
            "longitude": pressedMarkerData.coordinate.longitude,
            "latitude": pressedMarkerData.coordinate.latitude,
            "email_volunteer": pressedMarkerData.emailVolunteer,
            "email_volunteer_confirm": email
          }

        }
        else if(pressedMarkerData.markerColor !== "yellow"){
          feedBackUrl = "http://92.87.91.16/backend_code/api/feedback/volunteer.php"

          requestStructure = {

            "email": email,
            "longitude": pressedMarkerData.coordinate.longitude,
            "latitude": pressedMarkerData.coordinate.latitude,
            "type": feedbackType

          }
        }



      return sendFeedbackToServer(feedBackUrl,requestStructure)


     }



    }

  return (
    <View
      style={{

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={250}

        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#06beb2"
          },
          container:{
            borderTopLeftRadius:30,
            borderTopRightRadius:30
          }
        }}
      >
        <Text style={{alignSelf:'center',fontSize:20,paddingBottom:60}}>
          Have You Seen Ambrosia Here?</Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',}}>

            <Button
              onPress={() => {
                feedbackRequest(pressedMarkerData, "like")
                refRBSheet.current.close()


              }}
              buttonStyle={{
                paddingHorizontal:30,
                paddingVertical: 20,
                backgroundColor:'#06beb6',
                borderRadius:30,

              }}
              icon={
                <Icon
                  name="thumbs-up"
                  size={55}
                  color="white"
                />
              }
            />


            <Button
              onPress={() => {
                feedbackRequest(pressedMarkerData, "dislike")
                refRBSheet.current.close()}
              }
              buttonStyle={{
                paddingHorizontal:30,
                paddingVertical: 20,
                backgroundColor:'#48b1bf',
                borderRadius:30,

              }}
              icon={
                <Icon
                  name="thumbs-down"
                  size={55}
                  color="white"
                />
              }
            />


        </View>

      </RBSheet>
    </View>
  );
}

export default mapsFeedbackPanel
