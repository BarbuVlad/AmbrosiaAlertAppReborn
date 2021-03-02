import Permissions from './Permissions';
import {getUniqueId} from 'react-native-device-info';

export default {

    async getDeviceUniqueId()
    {
        //for device unique id
        let response = await Permissions.permRequest()
        if (response.phoneState === "granted") {
            let uniqueId = await getUniqueId()
            console.log("ID is:", uniqueId)
            return uniqueId
        }

    }

}
