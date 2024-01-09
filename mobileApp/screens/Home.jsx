import {View, Text, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import {Ionicons,Fontisto} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';


const Home =()=>{

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
            }
            
        } catch (error) {
            console.log("Error retrieving the data:", error)
        }
    };



    //anasayfadaki konum bilgisi ve shopping chart
    return(
       <SafeAreaView style={styles.background}>
        
            <ScrollView>
                <Welcome/>
                <Carousel/>
                <Headings/>
                <ProductRow/>
            </ScrollView>

       </SafeAreaView>

    )
}
export default Home