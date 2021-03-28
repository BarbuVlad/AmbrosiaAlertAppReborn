import { Text, View, ScrollView,ImageBackground } from "react-native";
import React from 'react'
import externalStyles from "../../Styles/Tutorial.styles"

function UserCard(){

  const backgroundImage = require("../../img/tutorialBackground.png")

  return (
    <ImageBackground source={backgroundImage} style={externalStyles.backgroundImage}>
      <ScrollView>

        <View style={{flex: 1}}>

          <View style={externalStyles.welcomeTextContainer}>
            <Text style={externalStyles.welcomeText}>
              Welcome to Ambrosia Alert!
            </Text>
          </View>

          <View style={externalStyles.tutorialTextContainer}>
            <Text style={externalStyles.tutorialText}>
              In this app, as someone with rank
              "normal user" you will be able to see places with ambrosia(the red markers)
              and be notified whenever you get close to those places.
              You can also help the community by signaling the presence of ambrosia when you see it (button
              with marker icon on it)
              or by giving a like/dislike to already exising ones by tapping on them(so we can know if that's
              still a place with ambrosia).


            </Text>

          </View>

        </View>

      </ScrollView>
    </ImageBackground>

    )

}

export default UserCard

