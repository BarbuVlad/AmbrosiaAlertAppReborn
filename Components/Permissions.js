import React from 'react'
import {PermissionsAndroid} from 'react-native';

export default {

    async permRequest(){
        let answer
        try{
              await PermissionsAndroid.requestMultiple(
                [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE])
                .then(res =>{

                    let locationPerm = res['android.permission.ACCESS_FINE_LOCATION']
                    let phoneStatePerm = res['android.permission.READ_PHONE_STATE']

                    answer = {location:locationPerm,phoneState:phoneStatePerm}
                })

        }catch (err){
            console.log("Permissions Error:",err)
        }

 return answer

    },

}
