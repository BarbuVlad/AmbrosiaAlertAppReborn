import {StyleSheet} from 'react-native';


export default StyleSheet.create({
  welcomeText:{
    alignSelf:'center',
    fontSize:40,
    textAlign:'center',
    color:'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 0.1,
    fontWeight: "bold"
  },
  welcomeTextContainer:{
    justifyContent:'center',
    alignItems:'center',

    marginBottom:70,
    marginTop:70
  },
  tutorialText:{
    color:'white',
    fontSize: 22,
    textAlign:'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 0.1
  },
  tutorialTextContainer:{
    marginLeft:20,
    marginRight:20,
    marginBottom:100,


  },
  backgroundImage:{
    width:"100%",
    height:"100%",
  },

})
