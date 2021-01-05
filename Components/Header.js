import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../Styles/Header.styles'
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
}


export default Header
