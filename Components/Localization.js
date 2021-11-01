import Geolocation from "react-native-geolocation-service";
import Permissions from './Permissions';

export default {

   async getCurrentPos(setShowSplash){

        let response = await Permissions.permRequest()

      if(response.location === 'granted')
      {

        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            initialRegion={
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01

                        }
            setShowSplash(false)

          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );


      }
   }
}
