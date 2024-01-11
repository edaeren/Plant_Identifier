import { View ,Text,TouchableOpacity,Button, Alert} from "react-native";
import React, { useEffect, useState ,useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cameraPage.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from "../constants";
import axios from "axios";

import { Camera, CameraType } from 'expo-camera';

export default function CameraPage({navigation}){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera,setShowCamera]=useState(false);

    //camera ref to access to camera
    const cameraRef=useRef(null);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
      }
    
      if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
          <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
          </View>
        );
      }

      //called to take the photo
      const takePhoto =async()=>{
        if(cameraRef){
            console.log("in take picture");
            try{
                let photo=await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4,3],
                    quality:1,
                });
                return photo;
            }catch(e){
                console.log(e);
            }
        }
      }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    


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




            <View style={styles.container2}>

               {showCamera ? (
                <Camera style={styles.camera} type={type} ref={cameraRef}>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={async ()=>{
                                const r= await takePhoto();
                                Alert.alert("DEBUG",JSON.stringify(r));
                            }}
                        >
                            <Text style={styles.text}>
                                Photo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>setShowCamera(false)}>
                                <Text style={styles.text}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                </Camera>):(
                        <View style={{
                            flex:1,
                            justifyContent:"center",
                            alignItems:"center",   
                        }}>
                            <TouchableOpacity
                            style={styles.button2}
                            onPress={()=>setShowCamera(true)}>
                                <Text style={styles.button}>Take Picture</Text>
                            </TouchableOpacity>
                           
                        </View>
                    )}
            </View>
  
       </SafeAreaView>
    );
}

