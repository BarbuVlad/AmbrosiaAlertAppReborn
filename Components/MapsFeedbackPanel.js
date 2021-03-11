import React, { useRef,} from "react";
import { View, Text,} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import "./globals"



let mapsFeedbackPanel =()=>{

   global.refRBSheet = useRef();
  return (
    <View
      style={{

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
      }}
    >


      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        openDuration={250}

        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#06beb2"
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
              onPress={() => {refRBSheet.current.close()}}
              buttonStyle={{
                paddingHorizontal:30,
                paddingVertical: 20,
                backgroundColor:'#06beb6',
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
              onPress={() => {refRBSheet.current.close()}}
              buttonStyle={{
                paddingHorizontal:30,
                paddingVertical: 20,
                backgroundColor:'#48b1bf',
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
