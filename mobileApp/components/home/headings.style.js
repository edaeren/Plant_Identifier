import { StyleSheet } from "react-native";
import { COLORS ,SIZES} from "../../constants";

const styles=StyleSheet.create({
    container:{
        marginTop:SIZES.small,
        marginBottom:-SIZES.xSmall,
        marginHorizontal:12
    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    headerTitle:{
        fontFamily:"semibold",
        fontSize:SIZES.xLarge-2,
        color:COLORS.green3
    }
})
export default styles;