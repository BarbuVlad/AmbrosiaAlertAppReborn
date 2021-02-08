import {Alert, View} from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements'
import styles from "../Styles/MapsButtons.styles"


export default {


    addMarkerButton(onButtonPress){
        return(
            <View style={styles.addMarkerBtn}>

                <Icon
                    reverse
                    raised
                    reverseColor={"white"}
                    name='map-marker-alt'
                    type='font-awesome-5'
                    color='#48b1bf'
                    size = {27}
                    onPress={onButtonPress}
                />
            </View>
                )
    },

   showMyLocationButton(onButtonPress){
        console.log("FROM BUTTON: ",onButtonPress)
        return(
            <View style={styles.locationBtn}>
                <Icon
                    reverse
                    raised
                    reverseColor={"white"}
                    name='street-view'
                    type='font-awesome-5'
                    color='#48b1bf'
                    size = {27}
                    onPress={ onButtonPress}
                />
            </View>
            )

    }

}


