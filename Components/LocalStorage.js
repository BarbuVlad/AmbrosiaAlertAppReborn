import AsyncStorage from '@react-native-async-storage/async-storage'

export default{

    async storeStringData(key,value){
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log("ERROR when trying to store data as STRING")
        }
    },

    async getStringData(key){
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if(value !== null) {
                return value
            }
        } catch(e) {
            console.log("ERROR reading STRING value")
        }
    },

    async storeObjectData(key,value){
        try {
            const jsonValue = JSON.stringify(value)
            console.log("CHEIE",key," OBIECT:",value , " STRINGIFY",jsonValue)
            await AsyncStorage.setItem(key, jsonValue)

        } catch (e) {
            console.log("ERROR when trying to store data as OBJECT")
        }
    },

    async getObjectData(key){
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            console.log("ERROR reading OBJECT value")
        }
    }

}
