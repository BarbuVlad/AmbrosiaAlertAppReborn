import NotificationsSettings from './NotificationsSettings'
import PushNotification from "react-native-push-notification";

let notifiedMarkersList = []

function Notifications(region, redMarkers) {

    //console.log("Notified marker list is:  ", notifiedMarkersList)

    PushNotification.createChannel(
        {
            channelId: "2", // (required)
            channelName: "Alert", // (required)

        },
        (created) => { }// (optional) callback returns whether the channel was created, false means it already existed.
    );


    if (region.latitude !== 'null') { // throw notification on real location

        redMarkers.forEach(marker => {//for each marker currently on the map

            let markerLat = marker.coordinate.latitude
            let markerLong = marker.coordinate.longitude

            //don't throw notification again for the same markers
            let exit = false;
            //check if marker can be re-notified

            notifiedMarkersList.forEach(notifMarker => {

                let notifMarkerLat = notifMarker.coordinate.latitude
                let notifMarkerLong = notifMarker.coordinate.longitude

                if (notifMarkerLat === markerLat && notifMarkerLong === markerLong) {
                    exit = true;
                    //consider to re-notify maraker
                    const dist = NotificationsSettings.distance(
                        parseFloat(region.latitude), parseFloat(region.longitude), markerLat, markerLong
                    );//compute distance
                    if (dist > 500) {
                        notifiedMarkersList = notifiedMarkersList.filter(marker =>
                            //delete id from notified
                            marker !== (marker.coordinate.latitude && marker.coordinate.longitude));

                    }

                }
            })
            if (exit) { return; }//foreach returns a function for every marker =>return; NOT continue

            const dist = NotificationsSettings.distance(
                parseFloat(region.latitude), parseFloat(region.longitude), marker.coordinate.latitude, marker.coordinate.longitude
            );//compute distance
            if (dist < 200) {//the value can be set by the user in settings, making 200 an atribute of type reference...

                //Throw notification -> close to ambrosia

                if ((notifiedMarkersList.includes(markerLong) &&
                    notifiedMarkersList.includes(markerLat)) === false) {//make it notified -> don't just add it again

                    notifiedMarkersList.push(marker)
                }
                // console.log("dist: "+dist);
                NotificationsSettings
                    .configure()
                    .localNotification({ message: 'Ambrosia in' + ':' + dist + 'm', color: "red", vibrate: true, vibration: 300, channelId: "2" });
            }
        });

    }//if

}

export default Notifications


