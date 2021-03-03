import React from 'react'
import DeviceInfo from './DeviceInfo'
import axios from 'axios'
import localStorage from './LocalStorage';


let newVolunteerURL = "http://92.87.91.16/backend_code/api/new_volunteer/login.php"
let volunteerURL = "http://92.87.91.16/backend_code/api/volunteer/login.php"

export default{

    async checkUserType(){
       let  dInfo = await DeviceInfo.getDeviceUniqueId()
        let volStat =  await checkIfValidVolunteer()
        if( dInfo!== "undefined" &&  (volStat === null || volStat === undefined)) return "normalUser"
        else return volStat

            },
}

let checkIfValidVolunteer = async (url = newVolunteerURL)=>{

    let loginDataFromStorage = await localStorage.getObjectData("loginData")
    let email = ""
    let password = ""
    if(loginDataFromStorage !== null){
         email =  loginDataFromStorage.email
         password = loginDataFromStorage.password
    }


  let y = await axios.post(url  , {
        email: email,
        password: password
    })
        .then(res => {
          console.log("MESAJ: ", res.data.message)
           // console.log("LOGIN SUCCESSFUL from LOCAL STORAGE")
         //   console.log("ANSWER FROM CHECK VOL:    ", res.data.message)

            if( url === newVolunteerURL && res.data.message === "new_volunteer_login_successfull" )
            {
            //    console.log("IF new vol")

                return "newVolunteer"

            }
            if(url === volunteerURL && res.data.message === "volunteer_login_successfull")
            {
              //  console.log("IF old vol")

                return "volunteer"
            }

        })
        .catch(err=> {
          //  console.log(err.response.data.message)
            if( url === newVolunteerURL && err.response.data.message === "no such volunteer found")
            {

              //  console.log("Switched to FULL Volunteer request")
                return checkIfValidVolunteer(volunteerURL)
            }
            if(url === volunteerURL && err.response.data.message === "no such volunteer found")
            {
               // console.log("THERE IS NO VOLUNTEER WITH THIS DATA,Data")

                return null
            }
        })
    console.log("AXIOS RESPONSE IS: ",y)
    return y

}
