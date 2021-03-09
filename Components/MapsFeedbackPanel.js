import React, { useRef } from "react";
import { View, Text, Pressable } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

//refRBSheet.current.open() deschidere panou

let mapsFeedbackPanel =()=>{
  let x =1
  const refRBSheet = useRef();
  return (
    <View
      style={{

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >
      {x===1 && refRBSheet.current.open()}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container:{
            borderTopLeftRadius:30,
            borderTopRightRadius:30
          }
        }}
      >
        <Text style={{alignSelf:'center',fontSize:20,paddingBottom:60}}>
          Have You Seen Ambrosia Here?</Text>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',}}>

            <Button
              buttonStyle={{
                paddingHorizontal:30,
                paddingVertical: 20,
                backgroundColor:'green',
                // marginRight:20,
                borderRadius:30,

              }}
              icon={
                <Icon
                  name="thumbs-up"
                  size={55}
                  color="white"
                />
              }
            />


            <Button
              buttonStyle={{
                paddingHorizontal:30,
                paddingVertical: 20,
                backgroundColor:'red',
                //  marginRight:20,
                borderRadius:30,



              }}
              icon={
                <Icon
                  name="thumbs-down"
                  size={55}
                  color="white"
                />
              }
            />


        </View>

      </RBSheet>
    </View>
  );
}

export default mapsFeedbackPanel
