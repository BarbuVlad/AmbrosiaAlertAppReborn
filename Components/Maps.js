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


const getRedMarkersUrl = "http://92.87.91.16/backend_code/api/red_marker/read.php"

function Maps()
{
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    });



    const [redMarkersState,setRedMarkersState] = useState([])

    let mapRef = useRef()

    const mounted = useRef()
     useEffect(()  => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            console.log("Component did mount in Maps")



            Localization.getCurrentPos((r)=> setRegion(r))
            AmbrosiaMarkers.getMarkers(getRedMarkersUrl, (sms)=>setRedMarkersState(sms))
            console.log("markers ARE:",redMarkersState)

            DeviceInfo.getDeviceUniqueId()

        }
        else {
            //do componentDidUpdate logic
         //   AmbrosiaMarkers.getMarkers(getRedMarkersUrl, (sms)=>setRedMarkersState(sms))
            console.log("Component did update MAPS")

        }
    },[]);

    Notifications(region,redMarkersState)

    return (
    <View style = {{height: '100%'}}>
        <MapView
            ref={mapRef}
            style={{...StyleSheet.absoluteFillObject}}
            region={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={false}>
            {AmbrosiaMarkers.showMarkers(redMarkersState)}

        </MapView>

        {MapsButtons.addMarkerButton(()=>
            AmbrosiaMarkers.placeMarkerOnLocation(region,"volunteer"))}

        {mapRef.current &&  MapsButtons.showMyLocationButton(async()=>
            await mapRef.current.animateToRegion(region))}


    </View>

    )

}
export default Maps

