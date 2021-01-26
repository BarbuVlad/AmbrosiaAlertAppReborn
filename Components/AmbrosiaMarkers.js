import {Marker} from "react-native-maps"
import axios from "axios"
import React from "react"
import {Alert} from 'react-native'


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

let placeMarkerLogic =(region,typeOfUser)=>
{

    let url
    if(typeOfUser === "normalUser") url = "http://92.87.91.16/backend_code/api/blue_marker/create.php";
    else if(typeOfUser === "newVolunteer") url = "http://92.87.91.16/backend_code/api/yellow_marker/create.php"
    else if(typeOfUser === "volunteer") url = "http://92.87.91.16/backend_code/api/red_marker/create.php"

    axios.post(url,
        {
            "latitude":region.latitude,
            "longitude": region.longitude,
            "uid_user": "4"
        })
        .then(res=> {
            console.log(res.data)
            markerPlacedAnswerAlert("Ambrosia was successfully reported at your location")
        })
        .catch(err=> {
            console.log(err.message)
            markerPlacedAnswerAlert("Error")
        })
}

export default {

    placeMarkerOnLocation(region,typeOfUser){
        Alert.alert(
            "Signal Ambrosia",
            "Do you want to signal the presence of ambrosia at your location?",
            [
                {
                    text: "No",
                    style: "cancel"
                },

                { text: "Yes", onPress: async() => await placeMarkerLogic(region, typeOfUser) }
            ],
            { cancelable: false }
        );

    },


  getMarkers(url,setMarkersState) {
        let markersData = []
        let markerID = 0
        axios.get(url)
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
           setMarkersState(markersData)
   },


  showMarkers(markersArr)
  {
     return markersArr.map(marker => (
          <Marker
              key={marker.ID}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}

          />

      ))
  }

}


