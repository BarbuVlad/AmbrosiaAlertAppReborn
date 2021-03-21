import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Localization from './Localization';
import AmbrosiaMarkers from './AmbrosiaMarkers';
import MapsButtons from './MapsButtons';
import Notifications from './Notifications';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MapsFeedBackPanel from "./MapsFeedbackPanel"


const getRedMarkersUrl = "http://92.87.91.16/backend_code/api/red_marker/read.php"
const getYellowMarkersUrl = "http://92.87.91.16/backend_code/api/yellow_marker/read.php"


let shouldFollowUser = true;


function Maps()
{


    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });

    const [redMarkersState,setRedMarkersState] = useState([])
    const [yellowMarkersState,setYellowMarkersState] = useState([])


    let selector = useSelector(state =>state.uT.userType)
    let updateMarkersSelector =useSelector (state=>state.updateMarkers.incrementToUpdateMarkers)






    global.mapRef = useRef()

    const mounted = useRef()
     useEffect(()  => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            console.log("Component did mount in Maps")
          console.log("NEW CREATED SELECTOR:   ", updateMarkersSelector)

         //   Localization.getCurrentPos((r) => setRegion(r))
            setInterval(()=>updateMarkers(),2000)



            console.log("SELECTOR IN MAPS IS:   ", selector)

        }
        else {
            console.log("COMPONENT DID UPDATE IN MAPS")

            updateMarkers()
             }



    },[updateMarkersSelector]);

    useFocusEffect(
        //useFocusEffect has 2 mods:
        // focused and unfocused meaning that: focus is when the tab is used. Unfocused when it's not used
        React.useCallback( () => {
            //  setUpdateComponent(updateComponent +1)
            let x = async()=>{

                //focused
               await updateMarkers()


            }
            x()

            return () => {
            //unfocused
            };
        }, [selector])
    );


  //Notifications(region,redMarkersState)


    let updateMarkers =() => {

        if (selector === "volunteer") {
            AmbrosiaMarkers.getMarkers(
              getYellowMarkersUrl,
              (sms) => setYellowMarkersState(sms))
        } else {
            setYellowMarkersState([])
        }
        AmbrosiaMarkers.getMarkers(
          getRedMarkersUrl,
          (sms) => setRedMarkersState(sms))

    }





  let onAddMarkerButtonPressed = async()=>{
   await AmbrosiaMarkers.placeMarkerOnLocation(
      region,
      selector, //user type
     updateMarkers
    )
 console.log("REGION:   ",region)




  }


   let onShowMyLocationButtonPressed=async()=>{
     shouldFollowUser = true
     await mapRef.current.animateToRegion(region)
   }


let followUserLocation=({nativeEvent})=>{
    console.log("COORDINATE: ", nativeEvent.coordinate)
    let reg = nativeEvent.coordinate
    reg.latitudeDelta =  0.01
    reg.longitudeDelta = 0.01
    setRegion(reg)
    mapRef.current.animateToRegion(region)
}

    return (
    <View style = {{height: '100%'}}>

      <MapView
        ref={mapRef}
        style={{...StyleSheet.absoluteFillObject}}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
        userLocationUpdateInterval={2000}
        onUserLocationChange={(event)=>shouldFollowUser && followUserLocation(event)}
        onPanDrag={()=>shouldFollowUser = false}>
        {AmbrosiaMarkers.showMarkers(redMarkersState, 'red')}
        {AmbrosiaMarkers.showMarkers(yellowMarkersState, 'yellow')}
      </MapView>



        {MapsButtons.addMarkerButton(async ()=> onAddMarkerButtonPressed()) }

        {mapRef.current &&  MapsButtons.showMyLocationButton(async()=>
          onShowMyLocationButtonPressed())}


      {MapsFeedBackPanel()}



    </View>

    )

}

export default Maps

