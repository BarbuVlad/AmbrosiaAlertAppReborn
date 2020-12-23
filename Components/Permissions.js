import React from 'react'
import {PermissionsAndroid}from 'react-native';
export default {
    async requestLocationPermission() {
        console.log("In permision --->")
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
            }
            else {
                console.log("location permission denied");
                alert("Location permission denied");
            }
            return granted
        } catch (err) {
            console.warn("Error: " + err);
        }

    },

}
