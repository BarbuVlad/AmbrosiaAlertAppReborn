import {Marker} from "react-native-maps"
import axios from "axios"
import React from "react"
import {Alert,View,Text,Button} from 'react-native'
import MarkerPanelStyle from "../Styles/MarkerPanel.styles"




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

let placeMarkerLogic =(region, typeOfUser, userUniqueID)=>{

    let url
    if(typeOfUser === "normalUser") url = "http://92.87.91.16/backend_code/api/blue_marker/create.php";
    else if(typeOfUser === "newVolunteer") url = "http://92.87.91.16/backend_code/api/yellow_marker/create.php"
    else if(typeOfUser === "volunteer") url = "http://92.87.91.16/backend_code/api/red_marker/create.php"

    //add userUniqueID to database if it doesn't exist
    let addUIDtoDB = () =>{

    }

    axios.post(url,
        {
            "latitude":region.latitude,
            "longitude": region.longitude,
            "uid_user": "140" //userUniqueID
        })
        .then(res=> {
           // console.log(res.data)
            markerPlacedAnswerAlert("Ambrosia was successfully reported at your location")
        })
        .catch(err=> {
         //   console.log(err.message)
            markerPlacedAnswerAlert("Error")
        })
}

let    onMarkerPressPanel=()=>{
    console.log("MARKER PRESSED")
    return (
        <View style={MarkerPanelStyle.container}>
            <Button title='Show panel' onPress={() => this._panel.show()} />
            <SlidingUpPanel ref={c => this._panel = c}>
                <View style={MarkerPanelStyle.container}>
                    <Text>Here is the content inside panel</Text>
                    <Button title='Hide' onPress={() => this._panel.hide()} />
                </View>
            </SlidingUpPanel>
        </View>
    )
}



export default {


    placeMarkerOnLocation(region, typeOfUser, userUniqueID ){
        console.log("USER UNIQUE ID BUTTON:    ", userUniqueID)
        Alert.alert(
            "Signal Ambrosia",
            "Do you want to signal the presence of ambrosia at your location?",
            [
                {
                    text: "No",
                    style: "cancel"
                },

                { text: "Yes", onPress: async() => await placeMarkerLogic(region, typeOfUser, userUniqueID) }
            ],
            { cancelable: false }
        );

    },


  async getMarkers(url,setMarkersState) {
        let markersData = []
        let markerID = 0
        await axios.get(url)
            .then(res=>{
                for (let i = 0; i < res.data.data.length; i++) {
                    markerID++;
                    const newMarker = {
                        'ID':markerID,
                        'coordinate':
                            {
                                'latitude':parseFloat(res.data.data[i].latitude)  ,
                                'longitude':parseFloat(res.data.data[i].longitude) ,

                            }
                    }

                    markersData.push(newMarker)

                }

            })
        await   setMarkersState(markersData)
   },


 showMarkers(markersArr, color)
  {

     return (

         markersArr.map(marker => (
             <Marker
                 key={marker.ID}
                 coordinate={marker.coordinate}
                 title={marker.title}
                 description={marker.description}
                 pinColor={color}
                 onPress={()=>{}}
             >

             </Marker>

         ))

     )

  }

}


