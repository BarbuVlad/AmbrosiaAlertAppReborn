import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AmbrosiaLogo from '../img/AmbLogoWithNokia.png'

function SplashScreen(){
console.log("SplashScreen called")

        return (

            <View style={styles.container}>
                <Image
                    style={{ width: 253, height:493, marginTop:130}}
                    source={AmbrosiaLogo}
                />
            </View>

        )

    }

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor: '#27B8BB',
    },
})
