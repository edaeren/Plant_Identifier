import { StyleSheet, View ,Text,TouchableOpacity} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./camera.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from "../constants";
import cameraApi from "../hook/cameraApi";
import axios from "axios";
const Camera=({navigation})=>{

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.upperRow}>
                    <TouchableOpacity onPress={()=>(navigation.goBack())}>
                        <Ionicons name='chevron-back-circle' 
                        size={30}
                        color={COLORS.lightWhite}/>
                    </TouchableOpacity>
                    <Text style={styles.heading}>Camera</Text>
                </View>
            </View>
       </SafeAreaView>
    )
}
export default Camera
