import {View,Text,Image,StyleSheet, Alert,TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';
import styles from './profile.style';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from "../constants";
import {AntDesign, MaterialCommunityIcons,SimpleLineIcons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import getIp from '../hook/getIp';
import axios from 'axios';

const Profile =({navigation})=>{
    
    
    const[userData,setUserData]=useState(null)

    //burayi true yaparsak kullanici adi ve maili gozukecek
    const[userLogin,setUserLogin]=useState(false) 

    useEffect(()=>{
        checkExistingUser();
    },[]);

    const checkExistingUser= async()=>{
        const id = await AsyncStorage.getItem('id')
        const useId = `user${JSON.parse(id)}`;

        try {
            const currentUser=await AsyncStorage.getItem(useId);

            if(currentUser!==null){
                const parsedData=JSON.parse(currentUser)
                setUserData(parsedData)
                setUserLogin(true)
            }else{
                navigation.navigate('Login')
            }
            
        } catch (error) {
            console.log("Error retrieving the data:", error)
        }
    };
   
    const userLogout=async()=>{
        const id = await AsyncStorage.getItem('id')
        const useId = `user${JSON.parse(id)}`;
        try {
            await AsyncStorage.multiRemove([useId,'id']);
            navigation.replace('Bottom Navigation')
        } catch (error) {
            console.log("Error loggin out the user:", error)
        }

    };

    const logout=()=>{
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text:"Cancel", onPress:()=>console.log("cancel pressed")
                },
                {
                    text:"Continue", onPress:()=>userLogout()
                },
                {defaultIndex: 1}

            ]
        )
    }

    const deleteUser= async()=>{
        try {
            const endpoint= getIp().ip;
            const id = await AsyncStorage.getItem('id')
            const useId = `users/${JSON.parse(id)}`;
            const gonder = endpoint + useId
            const response =await axios.delete(gonder);
            if(response.status === 200){
                navigation.navigate('Home')
            }
        } catch (error) {
            console.log(error)
        }
    };

    const deleteAccount=()=>{
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account?",
            [
            
                {
                    text:"Cancel", onPress:()=>console.log("cancel pressed")
                },
                {
                    text:"Continue", onPress:()=>deleteUser()
                },
                {defaultIndex: 1}

            ]
        )
    }
 
    return(
        <View style={styles.container}>
            <View style={styles.container}>
                <StatusBar backgroundColor={COLORS.gray}/>
                <View style={{width:'100%'}}>
                    <Image 
                        source={require('../assets/images/back_2.jpg')}
                        style={styles.cover}
                    />
                </View>
                <View style={styles.profileContainer}>
                     <Image 
                        source={require('../assets/images/userPic.jpg')}
                        style={styles.profile}
                    />
                     <Text style={styles.name}> 
                    
                      {userLogin === true ? userData.username : "Please login into your account"} 
                    </Text>  

                    {userLogin === false ? (  
                            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                                <View style={styles.loginBtn}>
                                <Text style={styles.menuText}>L O G I N    </Text>
                                </View>
                            </TouchableOpacity>
                        ):(      
                        <View style={styles.loginBtn}>
                            <Text style={styles.menuText}> {userData ? userData.email:''}   </Text>
                        </View>
                        )  

                    }   


                    {userLogin=== false ? ( 
                      <View></View>
                    ):(      

                            <View style={styles.menuWrapper}>
                                    <TouchableOpacity onPress={()=>navigation.navigate('Favorites')}>
                                        <View style={styles.menuItem(0.2)}>
                                            <MaterialCommunityIcons
                                                name="heart-outline"
                                                color={COLORS.primary}
                                                size={24}   
                                            
                                            />
                                            <Text style={styles.menuText}>Favorites</Text>
                                        
                                        </View>
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={()=>deleteAccount()}>
                                        <View style={styles.menuItem(0.2)}>
                                            <AntDesign
                                                name="deleteuser"
                                                color={COLORS.primary}
                                                size={24}   
                                            
                                            />
                                            <Text style={styles.menuText}>Delete Account</Text>
                                        
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={()=>logout()}>
                                        <View style={styles.menuItem(0.2)}>
                                            <AntDesign
                                                name="logout"
                                                color={COLORS.primary}
                                                size={24}   
                                            
                                            />
                                            <Text style={styles.menuText}>Logout</Text>
                                        
                                        </View>
                                    </TouchableOpacity>
                            </View>
                        
                        )     

                    }  
                </View>
            </View>
        </View>
    )
}
export default Profile
