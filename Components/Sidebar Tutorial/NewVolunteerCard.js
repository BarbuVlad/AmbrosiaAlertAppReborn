import { Text, View, ScrollView, ImageBackground } from "react-native";
import React from 'react'
import externalStyles from "../../Styles/Tutorial.styles";

function NewVolunteerCard(){

  const backgroundImage = require("../../img/tutorialBackground.png")

  return (
    <ImageBackground source={backgroundImage} style={externalStyles.backgroundImage}>
    <ScrollView >

      <View style={{flex: 1}}>

          <View style={externalStyles.welcomeTextContainer}>
            <Text style={externalStyles.welcomeText}>
              Welcome, Recruit!
            </Text>
          </View>

          <View style={externalStyles.tutorialTextContainer}>
            <Text style={externalStyles.tutorialText}>
              If your rank says "new volunteer" it means you
              just joined our battle against ambrosia. Engage by signaling ambrosia
              when you see it or giving a like/dislike to red markers if ambrosia is there.
              If you prove yourself trusty, there's lots of new features that you will
              enjoy as soon as you're promoted to "volunteer".


            </Text>

          </View>

      </View>

    </ScrollView>
</ImageBackground>

  )

}

export default NewVolunteerCard
