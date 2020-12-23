import React from 'react';
import {View,StyleSheet, Image,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import hamburgerMenuIcon from '../img/hamburgerMenuIcon.png';

const Header = ({navigation}) => {
    return(
        <View style = {styles.generalContainer}>

            <TouchableOpacity
                style = {styles.drawerButton}
                onPress={() => navigation.openDrawer()}
                activeOpacity={1}
            >
                <Image
                    source={hamburgerMenuIcon}
                    style = {styles.hmbMenu}
                />
            </TouchableOpacity>

            <LinearGradient
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={['#06beb6','#48b1bf']}
                style = {styles.gradient}>


                <Image
                    source={require('../img/logo2.png')}
                    style={styles.img}

                >
                </Image>

            </LinearGradient>

        </View>




    );
};

const styles= StyleSheet.create(
    {
        gradient:{
            height:60,
            alignSelf: 'stretch',
            padding:10,
            justifyContent: 'center',
            alignItems:'center',
            flex:1


        },
        img:{
            position:'relative',
            width: 160,
            height: 54,
            marginRight: 35,

        },
        drawerButton:{

            width: 55,
            backgroundColor: '#06beb6',
            elevation: 0,
            marginRight:0,
            alignItems: 'center',
            alignContent:'center',
            justifyContent: 'center',


        },
        hmbMenu:{
            width: 30,
            height:20,

        },
        generalContainer:{
            flexDirection: 'row',



        }
    });


export default Header;
