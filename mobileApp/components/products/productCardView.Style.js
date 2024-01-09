import { StyleSheet } from "react-native";
import {COLORS, SIZES} from "../../constants";



const styles = StyleSheet.create({
    container:{
        width:182,
        height:220,
        marginEnd:22,
        borderRadius:SIZES.medium,
        backgroundColor:COLORS.lightWhite,
    },
    imageContainer:{
        flex:1,
        width:170,
        marginLeft:SIZES.small/2,
        marginTop:SIZES.xSmall/10,
        borderRadius:SIZES.small,
        overflow:"hidden", 
    },
    image:{
        aspectRatio:1,
        resizeMode:'cover'
    },
    details:{
        padding:SIZES.small,
    },
    title:{
        fontFamily:"bold",
        fontSize:SIZES.medium,
        marginBottom:2
    },
    information:{
        fontFamily:"regular",
        fontSize:SIZES.small,
        marginBottom:2,
        color:COLORS.gray
    },
    addBtn:{
        position:"absolute",
        bottom:SIZES.xSmall,
        right:SIZES.xSmall

    }
})

export default styles;