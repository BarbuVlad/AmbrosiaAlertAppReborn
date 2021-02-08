import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },
    logoText:{
        textAlign: 'center',
        fontWeight:"bold",
        fontSize:50,
        color:"#06beb6",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"white",
        borderBottomWidth:1.5,
        borderColor:'black',
        height:50,
        marginBottom:20,
        justifyContent:"center",
        alignItems: 'center',
        padding:20
    },
    inputText:{

        height:50,
        fontSize: 20,
        color:'black',
        textAlign: 'center'
    },
    loginButton:{
        width:"80%",
        backgroundColor:"#06beb6",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    registerButton:{
        width:"80%",
        backgroundColor:"#06beb6",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:1,
        marginBottom:10
    }

})
