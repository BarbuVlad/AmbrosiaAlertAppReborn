import {Marker} from "react-native-maps"
import axios from "axios"
import React from "react";
import {Alert} from 'react-native'
import DeviceInfo from "./DeviceInfo";
import localStorage from "./LocalStorage";





let markerPlacedAnswerAlert =(message)=>
{
    Alert.alert(
        "Ambrosia Reported",
        message,
        [
            { text: "OK"}
        ],
        { cancelable: false }
    );
}

let placeMarkerLogic =async(region, typeOfUser, updateMarkers)=>{

    let url
    let requestStructure
    let vendorId = await DeviceInfo.getDeviceUniqueId()
  let loginDataFromStorage = await localStorage.getObjectData("loginData")
  let email = ""



  if(loginDataFromStorage !== null){ email =  loginDataFromStorage.email}

    if(typeOfUser === "normalUser") {
      url = "http://92.87.91.16/backend_code/api/blue_marker/create.php"
      requestStructure ={
        "longitude": region.longitude,
        "latitude":region.latitude,
        "vendor_id": vendorId
      }

    }
    else if(typeOfUser === "newVolunteer") {
      url = "http://92.87.91.16/backend_code/api/yellow_marker/create.php";
      requestStructure = {
        "longitude": region.longitude,
        "latitude":region.latitude,
        "email": email
      }
    }
    else if(typeOfUser === "volunteer") {
      url = "http://92.87.91.16/backend_code/api/red_marker/create.php";
      requestStructure = {
        "longitude": region.longitude,
        "latitude":region.latitude,
        "email_volunteer": email
      }
    }




    axios.post(
      url,
      requestStructure,
      {
        headers: { 'Authorization': authHeader }
      }
    )
        .then(res=> {
            console.log(res.data)

            markerPlacedAnswerAlert("Ambrosia was successfully reported at your location")
          updateMarkers()

        })
        .catch(err=> {
            console.log(err.message)
            markerPlacedAnswerAlert("Error")
        })
}





export default {


    placeMarkerOnLocation(region, typeOfUser,updateMarkers){

        Alert.alert(
            "Signal Ambrosia",
            "Do you want to signal the presence of ambrosia at your location?",
            [
                {
                    text: "No",
                    style: "cancel"
                },

                { text: "Yes", onPress: async() => await placeMarkerLogic(region, typeOfUser, updateMarkers) }
            ],
            { cancelable: false }
        );

    },


  async getMarkers(url, setMarkersState) {
        let markersData = []
        let markerID = 0
        await axios.get(url,  {
          headers: { 'Authorization': authHeader }
        })
            .then(res=>{

                for (let i = 0; i < res.data.data.length; i++) {
                //  console.log("MARKERS RES IS:",res.data.data[i])
                    markerID++;
                    const newMarker = {
                        'ID':markerID,
                        'coordinate':
                            {
                                'latitude':parseFloat(res.data.data[i].latitude)  ,
                                'longitude':parseFloat(res.data.data[i].longitude) ,

                            },
                         'emailVolunteer': res.data.data[i].email_volunteer
                    }

                    markersData.push(newMarker)
                //  console.log(markersData)

                }

            })


    await setMarkersState(markersData)


   },

  setPanelData(op = 0){return op},


 showMarkers(markersArr, color)
  {

     return (

         markersArr.map(marker => (
             <Marker
                 key={marker.ID}
                 coordinate={marker.coordinate}
                 title={marker.title}
                 description={marker.description}
                 emailVolunteer = {marker.emailVolunteer}
                 pinColor={color}
                 onPress={()=>{
                   shouldFollowUser = false
                   global.pressedMarkerData ={
                     coordinate: marker.coordinate,
                     emailVolunteer: marker.emailVolunteer,
                     markerColor: color
                   }
                 console.log("MARKER VOL:", marker.emailVolunteer)
                   console.log("Marker Color:",color)

                  setTimeout(()=>{refRBSheet.current.open()},450)



                 }}  //deschide panoul
             >

             </Marker>

         ))


     )

  }

}


