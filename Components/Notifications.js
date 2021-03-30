import React from 'react'
import NotificationsSettings from './NotificationsSettings'
import PushNotification from "react-native-push-notification";

let notifiedMarkersList = []

 function Notifications(region,redMarkers) {

   //console.log("Notified marker list is:  ", notifiedMarkersList)

    PushNotification.createChannel(
        {
            channelId: "2", // (required)
            channelName: "Alert", // (required)

        },
        (created) => {}// (optional) callback returns whether the channel was created, false means it already existed.
    );


        if(region.latitude !== 'null'){ // throw notification on real location

            redMarkers.forEach(marker => {//for each marker currently on the map

                //console.log("---", marker.ID, "---");

                //don't throw notification again for the same markers
                let exit = false;
                //check if marker can be re-notified
                //console.log("\n _______________:", this.notifiedMarkersList, "_______________");
                //console.log("ID:___",marker.ID, "___; global id:", this.markerID);

                notifiedMarkersList.forEach(id => {if(marker.ID === id){
                    exit=true;
                    //consider to re-notify maraker
                    const dist = NotificationsSettings.distance(
                        parseFloat(region.latitude), parseFloat(region.longitude), marker.coordinate.latitude, marker.coordinate.longitude
                    );//compute distance
                    if(dist>500){notifiedMarkersList = notifiedMarkersList.filter(id => id !== marker.ID); }//delete id from notified
                }})
                if(exit){return;}//foreach returns a function for every marker =>return; NOT continue

                const dist = NotificationsSettings.distance(
                    parseFloat(region.latitude), parseFloat(region.longitude), marker.coordinate.latitude, marker.coordinate.longitude
                );//compute distance
                if(dist<200){//the value can be set by the user in settings, making 200 an atribute of type reference...

                    //Throw notification -> close to ambrosia
                    if (notifiedMarkersList.includes(marker.ID) === false){//make it notified -> don't just add it again
                        notifiedMarkersList=[...notifiedMarkersList, marker.ID];  }
                    // console.log("dist: "+dist);
                    NotificationsSettings
                        .configure()
                        .localNotification({message:'Ambrosia in'+':'+dist+'m', color: "red", vibrate: true, vibration: 300,channelId: "2"  });
                }
            });

        }//if

}

export default Notifications


