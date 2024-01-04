import { StyleSheet } from "react-native";
import { SIZES ,SHADOWS,COLORS} from "../constants";

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        marginHorizontal: 20
    },
    titleRow:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        width: SIZES.width- 50,
        marginBottom: 12
    },
    titleText:{
        fontFamily: "bold",
        fontSize:SIZES.large,
        letterSpacing:2,
        marginLeft:SIZES.small
    },
    favContainer:{
        flex :1,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        marginBottom: SIZES.xSmall,
        padding: SIZES.small,
        borderRadius: SIZES.small,
        backgroundColor:"#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.secondary
    },
    imageContainer:{
        width:70,
        borderRadius: SIZES.medium,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:"100%",
        height: 65,
        borderRadius: SIZES.small,
        resizeMode:"cover"
    },
    textContainer:{
        flex:1,
        marginHorizontal:SIZES.medium
    },
    fav:{
        fontFamily: "bold",
        color: COLORS.primary,
        fontSize: SIZES.medium
    },
})

export default styles;