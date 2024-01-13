import { View ,Text,TouchableOpacity,Button, Alert,Image} from "react-native";
import React, { useEffect, useState ,useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cameraPage.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS, SIZES } from "../constants";
import axios from "axios";

import { Camera, CameraType } from 'expo-camera';
import { replace } from "formik";

export default function CameraPage({navigation}){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera,setShowCamera]=useState(false);
    const [image,setImage]=useState(null);

    const[imageName,setImageName]=useState("");

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
    const cameraApi2 = ()=>{ 
        console.log("burdayım2");
       //const foto2=foto.replace(foto,"'"+foto+"'")
        //console.log(foto2);
        
        const axios = require("axios");
            const fs = require("react-native-fs");

            const image = fs.readFileSync("{foto2}", {
                encoding: "base64"
            });

            axios({
                method: "POST",
                url: "https://detect.roboflow.com/plant-wtcrc/3",
                params: {
                    api_key: "pmoESnYL9PvaNON2BScS"
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response) {
                console.log(response.data);
                setImageName(response.data);
            })
            .catch(function(error) {
                console.log(error.message);
            });
    }

    //called to take the photo
    const cameraApi3 =(fotouri)=>{
        console.log("burdayım3");
        const foto2=fotouri.replace(fotouri,"'"+fotouri+"'")
        console.log(foto2);

        const axios = require("axios");
            const fs = require("react-native-fs");

            const image = fs.readFileSync(foto2, {
                encoding: "base64"
            });

            axios({
                method: "POST",
                url: "https://detect.roboflow.com/plant-wtcrc/3",
                params: {
                    api_key: "pmoESnYL9PvaNON2BScS"
                },
                data: image,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response) {
                console.log(response.data);
                setImageName(response.data);
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
                    <TouchableOpacity onPress={()=>(cameraApi2())}>
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
                               // const r= await takePhoto();
                                const r=await takePhoto();
                                if(!r.cancelled){
                                    setImage(r.uri);
                                    
                                }
                                //const foto=JSON.stringify(r).split("");
                               // Alert.alert(foto);
                         
                                cameraApi3(r.uri);
                                //Alert.alert("DEBUG",JSON.stringify(r));
                                setShowCamera(false);
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
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    {/* When the camera isn't showing */}
                   
                  
                     <View style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center',  
                        backgroundColor:COLORS.lightWhite, 
                        margin:100,
                        
                        
                        
                    }}>

                            <View>
                             <Text>deneme{imageName}</Text>
                            </View>
                         <View style={{width:'100%', alignItems:'center'}}>
                        {
                            image&&(
                                <Image
                                source={{uri: image}}
                                style={{width:300,height:300,backgroundColor:'blue',borderRadius:13}}
                                />
                            )
                        }
                        </View>
                        <TouchableOpacity
                        style={styles.button2}
                        onPress={()=>setShowCamera(true)}>
                        <Text style={styles.button}>Take Picture</Text>
                        </TouchableOpacity>
                           
                    </View>
                    
                </View>
               
                )}
            </View>
  
            
       </SafeAreaView>
    );
}

