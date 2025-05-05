import { View ,Text,TouchableOpacity,Button,Image} from "react-native";
import React, {useState ,useRef} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./cameraPage.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS} from "../constants";
import axios from "axios";
import { Camera, CameraType } from 'expo-camera';
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto'
import { FlatList } from "react-native-gesture-handler";
import SearchTile from "../components/products/SearchTile";
import getIp from "../hook/getIp";

export default function CameraPage({navigation}){
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera,setShowCamera]=useState(false);
    const [image,setImage]=useState(null);
    const [imageName,setImageName]=useState("");
    const [msg, setMsg] = useState('');
    const [searchResults, setSearchResults]= useState([]);

    const handleSearch= async(searchKey)=>{
        try {
            const response= await axios.get(getIp().ip +`products/search/${searchKey}`)
            setSearchResults(response.data)
        } catch (error) {
            console.log("Failed to get the products",error);
        }
    };


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
            try{
                let photo=await cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4,3],
                    quality:1,
                });

                if(!photo.cancelled){
                    const supabase_url = ''
                    const supabase_key = ''
                    const supabase = createClient(supabase_url,supabase_key,{
                        localStorage : AsyncStorage
                    });
                    const ext = photo.uri.substring(photo.uri.lastIndexOf(".") + 1);

                    const fileName = photo.uri.replace(/^.*[\\\/]/,"");
                    var formData = new FormData();
                    formData.append("files",{
                        uri:photo.uri,
                        name:fileName,
                        type :photo.type ? `video/${ext}` : `image/${ext}`,
                    })
                    console.log("Resim çekildi database'e yükleniyor...")
                    const {data,error} = await supabase.storage.from("plants").upload(fileName,formData)
                    console.log("Database'e yüklendi")
                    cameraApi(fileName,supabase)
                    if(error)console.log(error);
                    return {...photo,ImageData:data};
                }else{
                    return photo
                }
                
            }catch(e){
                console.log(e);
            }
        }
      }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    
    const cameraApi = (filename,supabase)=>{ 
        console.log("Roboflow'a geldi")
        const {data} = supabase.storage.from("plants").getPublicUrl(filename);
        console.log(data.publicUrl)
        axios({
            method: "POST",
            url: "https://detect.roboflow.com/plant-wtcrc/3",
            params: {
                api_key: "pmoESnYL9PvaNON2BScS",
                image: data.publicUrl
            }
        })
        .then(function(response) {
            if(response.data.predictions == 0){
                console.log('plant not found')
                setMsg('Plant not found')
                setSearchResults([])
                setImageName('')
            }
            else{
                console.log(response.data)
                if(response.data.predictions[1]){
                    const searchKey =response.data.predictions[0].class +"+"+ response.data.predictions[1].class;
                    const searchKey2 = response.data.predictions[0].class + " " + response.data.predictions[1].class;
                    console.log(searchKey)
                    handleSearch(searchKey)
                    setImageName(searchKey2)
                }else{
                    const searchKey =response.data.predictions[0].class;
                    console.log(searchKey)
                    handleSearch(searchKey)
                    setImageName(searchKey)
                }

               
            }
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
                         
                                //cameraApi3(r.uri);
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
                             <Text>{imageName}</Text>
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
                        
                           
                    </View>
                            <TouchableOpacity
                            style={styles.button2}
                            onPress={()=>setShowCamera(true)}>
                            <Text style={styles.button}>Take Picture <Ionicons name='camera' size={30}color={COLORS.green}/> </Text>
                            
                            </TouchableOpacity>
                </View>
               
                )}
                <View> 
                    
                    {searchResults.length === 0 ? (
                    <View>
                        <Text>{msg}</Text>
                    </View>)
                    :(
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item)=> item._id}
                        renderItem={({item})=>(<SearchTile item= {item}/>)}
                        style={{marginHorizontal:12}}            
                    />
                    )}
                </View>
            </View>
  
            
       </SafeAreaView>
    );
}

