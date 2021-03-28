import { Text, View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import React from 'react'
import externalStyles from "../../Styles/Tutorial.styles";

function VolunteerCard(){

  const backgroundImage = require("../../img/tutorialBackground.png")

  return (
    <ImageBackground source={backgroundImage} style={externalStyles.backgroundImage}>
      <ScrollView>

        <View style={{flex: 1}}>

          <View style={externalStyles.welcomeTextContainer}>
            <Text style={externalStyles.welcomeText}>
              Congratulations!
            </Text>
          </View>

          <View style={externalStyles.tutorialTextContainer}>
            <Text style={externalStyles.tutorialText}>
              If your rank says you're a "volunteer", it means you're very trusty. We value your
              contribution so much that we promoted you to the highest rank. That being said, we added some goodies for you:
              {"\n"}
              1.You probably observed that you now also have yellow markers on your map.
              These yellow markers are ambrosia places reported by people with rank "new volunteer".
              By giving them a like/dislike your opinion matters when we decide if they should
              be trusted volunteers.
              {"\n"}
              2.If you give like/dislike to red markers, your vote is more valuable than those with rank
              "normal user" or even "new volunteer".
              {"\n"}
              3.And the coolest thing: now you're able to signal an ambrosia
              that will show on everybody's map (red marker). But still, keep in mind that if you signal places without seeing
              ambrosia there, you will be soon banned.




            </Text>

          </View>

        </View>

      </ScrollView>
    </ImageBackground>

  )

}

export default VolunteerCard
