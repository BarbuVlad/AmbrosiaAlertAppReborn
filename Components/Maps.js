import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import MapView,{PROVIDER_GOOGLE} from "react-native-maps";
import Localization from './Localization';
import AmbrosiaMarkers from './AmbrosiaMarkers';


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


    const mounted = useRef()
     useEffect(()  => {
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
            console.log("Component did mount in Maps")

            Localization.getCurrentPos((r)=> setRegion(r))
            AmbrosiaMarkers.getMarkers(getRedMarkersUrl, (sms)=>setRedMarkersState(sms))

            console.log("markers ARE:",redMarkersState)
        }
        else {
            //do componentDidUpdate logic
            AmbrosiaMarkers.getMarkers(getRedMarkersUrl, (sms)=>setRedMarkersState(sms))
            console.log("Component did update MAPS")

        }
    },[]);


    return (
    <View style = {{height: '100%'}}>
        <MapView
            style={{...StyleSheet.absoluteFillObject}}
            region={region}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
        >
            {AmbrosiaMarkers.showMarkers(redMarkersState)}
        </MapView>
    </View>

    )

}
export default Maps

