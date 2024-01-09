import { StyleSheet, View ,Text,TouchableOpacity} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./camera.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from "../constants";
import axios from "axios";
const Camera=({navigation})=>{


    const cameraApi = ()=>{ 
        axios({
            method: "POST",
            url: "https://detect.roboflow.com/plant-wtcrc/3",
            params: {
                api_key: "pmoESnYL9PvaNON2BScS",
                image: "https://img.freepik.com/free-photo/vibrant-yellow-daisy-blossoms-nature-generative-ai_188544-9560.jpg?w=2000&t=st=1704808791~exp=1704809391~hmac=4569fb0e1fc1565a53fd6128193c27a1db566d8081674ec312c35962b4762ae8"
            }
        })
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.log(error.message);
        });
    }

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.upperRow}>
                    <TouchableOpacity onPress={()=>(navigation.goBack())}>
                        <Ionicons name='chevron-back-circle' 
                        size={30}
                        color={COLORS.lightWhite}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>(cameraApi())}>
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
