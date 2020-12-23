import {Marker} from "react-native-maps"
import axios from "axios"
import React from "react"


export default {

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


