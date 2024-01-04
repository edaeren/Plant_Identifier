import { StyleSheet } from "react-native";
import {COLORS, SIZES} from '../constants/index';

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.lightWhite,
    },
    upperRow:{
        marginHorizontal:20,
        flexDirection:"row",
        justifyContent:"space-between",
        position:"absolute",
        top: SIZES.xLarge,
        width:SIZES.width-44,
        zIndex:999,
    },
    image:{
        aspectRatio:1,
        resizeMode:"cover"
    },
    details:{
        marginTop: -SIZES.large,
        backgroundColor:COLORS.lightWhite,
        width:SIZES.width,
        borderTopLeftRadius:SIZES.medium,
        borderTopRightRadius:SIZES.medium,

    },
    cartRow:{
       paddingBottom:SIZES.small,
       flexDirection:"row",
       justifyContent:"space-between",
       alignContent:"center",
       width:SIZES.width-44,
       height:50,
       paddingTop:5,
       width:SIZES.width
    },
    cartBtn:{
        width:SIZES.width*0.7,
        backgroundColor:COLORS.black,
        padding:SIZES.xSmall/2,
        borderRadius:SIZES.large,
        marginLeft:12,
       
    },

    titleRow:{
       marginHorizontal:20,
       paddingBottom:SIZES.small,
       flexDirection:"row",
       justifyContent:"space-between",
       alignContent:"center",
       width:SIZES.width-44,
       top:20
    },
    ratingRow:{
       paddingBottom:SIZES.small,
       flexDirection:"row",
       justifyContent:"space-between",
       alignContent:"center",
       width:SIZES.width-10,
       top:5

    },
    rating:{
        top:SIZES.large,
        //row inside a row
        flexDirection:'row',
        justifyContent:"flex-start",
        alignItems:"center",
        marginHorizontal: SIZES.large,
    },
    ratingText:{
        color:COLORS.gray,
        fontFamily:"medium",
        paddingHorizontal:SIZES.xSmall
    },

    descriptionWrapper:{
        marginTop:SIZES.large*2,
        marginHorizontal:SIZES.large,
    },
    description:{
        fontFamily:"medium",
        fontSize:SIZES.large-2
    },
    descText:{
        fontFamily:"regular",
        fontSize:SIZES.small,
        textAlign:"justify",
        marginBottom:SIZES.small
    },
    location:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:COLORS.secondary,
        padding:5,
        borderRadius:SIZES.large
    },
    cartTitle:{
        marginLeft:SIZES.small,
        fontFamily:"bold",
        fontSize:SIZES.medium,
        color:COLORS.lightWhite,

    },
    title:{
        fontFamily:"bold",
        fontSize:SIZES.large,

    },
    price:{
        paddingHorizontal:6,
        fontFamily:"semibold",
        fontSize:SIZES.large,
    },
    priceWrapper:{
        backgroundColor:COLORS.secondary,
        borderRadius:SIZES.large,

    },
    addCart:{
        width:37,
        height:37,
        borderRadius:50,
        marginRight:SIZES.small,
        backgroundColor:COLORS.black,
        alignItems:"center",
        justifyContent:"center"

    },
    

})

export default styles;