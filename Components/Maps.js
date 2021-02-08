import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import Localization from './Localization';
import AmbrosiaMarkers from './AmbrosiaMarkers';
import MapsButtons from './MapsButtons';
import DeviceInfo from './DeviceInfo';
import Notifications from './Notifications';
import userType from './UserType'
import {useFocusEffect} from '@react-navigation/native';


const getRedMarkersUrl = "http://92.87.91.16/backend_code/api/red_marker/read.php"
const getYellowMarkersUrl = "http://92.87.91.16/backend_code/api/yellow_marker/read.php"



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

    let mapRef = useRef()

    const mounted = useRef()
     useEffect(()  => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            console.log("Component did mount in Maps")

            Localization.getCurrentPos((r)=> setRegion(r))

            updateMarkers()

        }
        else {
            console.log("COMPONENT DID UPDATE IN MAPS")

            updateMarkers( )
             }



    },[]);

    useFocusEffect(
        //useFocusEffect has 2 mods:
        // focused and unfocused meaning that: focus is when the tab is used. Unfocused when it's not used
        React.useCallback( () => {
            //  setUpdateComponent(updateComponent +1)
            let x = async()=>{
                //focused
                alert("User type:" + await userType.checkUserType())
                updateMarkers()
            }
            x()

            return () => {
            //unfocused
            };
        }, [])
    );


    let updateMarkers = async () => {

        let checkUser = await userType.checkUserType()
        if (checkUser === "volunteer") {
            AmbrosiaMarkers.getMarkers(getYellowMarkersUrl, (sms) => setYellowMarkersState(sms))
        } else {
            setYellowMarkersState([])
        }
        AmbrosiaMarkers.getMarkers(getRedMarkersUrl, (sms) => setRedMarkersState(sms))

    }

    Notifications(region,redMarkersState)

    return (
    <View style = {{height: '100%'}}>
        <MapView
            ref={mapRef}
            style={{...StyleSheet.absoluteFillObject}}
            region={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={false}
            userLocationUpdateInterval={2000}>
            {AmbrosiaMarkers.showMarkers(redMarkersState, 'red')}
            {AmbrosiaMarkers.showMarkers(yellowMarkersState, 'yellow')}
        </MapView>

        {MapsButtons.addMarkerButton(()=>
            AmbrosiaMarkers.placeMarkerOnLocation(region,"volunteer"))}

        {mapRef.current &&  MapsButtons.showMyLocationButton(async()=>
            await mapRef.current.animateToRegion(region))}


    </View>

    )

}

export default Maps

