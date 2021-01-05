import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AmbrosiaLogo from '../img/AmbLogo.png'

function SplashScreen(){
console.log("I've been called")

        return (

            <View style={styles.container}>
                <Image
                    style={{ width: 260, height:220}}
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
