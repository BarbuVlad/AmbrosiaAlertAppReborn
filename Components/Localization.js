import Geolocation from "react-native-geolocation-service";
import Permissions from './Permissions';

export default {

   async getCurrentPos(setRegion){

        let response = await Permissions.permRequest()
       console.log("FROM LOCALIZATION:",response)

      if(response.location === 'granted')
      {
          this.watchID = Geolocation.watchPosition(position => {
                  console.log("Location has been updated")
                  setRegion({
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01

                  })

              },(error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
              },
              {enableHighAccuracy: true, timeout: 1500, maximumAge: 1000}
          );

      }
   }
}
