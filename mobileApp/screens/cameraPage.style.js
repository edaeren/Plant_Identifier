import { StyleSheet } from "react-native";
import {COLORS, SIZES} from '../constants/index';
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightWhite,
        justifyContent: 'center',
        
    },
    container2:{
        flex:13,
        //backgroundColor:COLORS.lightWhite,
        //justifyContent: 'center',
       // marginBottom:SIZES.xxLarge*4,
       // width:300,
        //marginLeft:SIZES.xxLarge
        marginBottom:50,
        

    },
    container3:{
        //flex:1,
        backgroundColor:COLORS.gray,
        justifyContent: "center",
        alignItems:'center',
        width:150,
        height:50,
        marginLeft:140,
        
    },
    camera: {
        flex: 1,
        
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
        marginBottom:40,
        
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
       fontWeight:'bold',
       
    },
    button2: {
        flex: 1,
        //alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent:"center",
        
    },

    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    wrapper:{
        flex:1,
        backgroundColor:COLORS.lightWhite,

    },
    upperRow:{
        width:SIZES.width-50,
        marginHorizontal:SIZES.large,
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        position:"absolute",
        backgroundColor:COLORS.primary,
        borderRadius:SIZES.large,
        top:SIZES.large,
        top:SIZES.large,
        zIndex:999
    },
    heading:{
        fontFamily:"semibold",
        fontSize:SIZES.medium,
        color:COLORS.lightWhite,
        marginLeft:5,
    },
})

export default styles;