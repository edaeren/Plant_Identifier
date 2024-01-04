import { StyleSheet,View,Text,Image,FlatList,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./favorites.style";
import {Ionicons,SimpleLineIcons} from "@expo/vector-icons";
import { COLORS } from "../constants";

const Favorites=({navigation})=>{

    const [favData,setFavData] = useState([]);

    useEffect(() => {
        checkFavorites();
    }, [])

    const checkFavorites = async () => {
        const id = await AsyncStorage.getItem('id');
        const favoritesId = `favorites ${JSON.parse(id)}`
    
        console.log(favoritesId);
    
        try {
          const favoritesObj = await AsyncStorage.getItem(favoritesId);
          if(favoritesObj !== null){
            const favorites = JSON.parse(favoritesObj);
            const favList= Object.values(favorites);
            setFavData(favList);
            console.log(favList.length);
          }
    
        } catch (error) {
          console.log(error);
        }
    };

    const deleteFavorites = async (product)=> {
        const id = await AsyncStorage.getItem('id');
        const favoritesId = `favorites ${JSON.parse(id)}`
    
        //console.log(favoritesId); şu anda null değer döndürüyor
        let productId = product;
       
        try {
          const existingItem = await AsyncStorage.getItem(favoritesId);
          let favoritesObj = existingItem ? JSON.parse(existingItem): {};
    
          if(favoritesObj[productId]){
            delete favoritesObj[productId];
            checkFavorites();
          }
    
          await AsyncStorage.setItem(favoritesId,JSON.stringify(favoritesObj))
        } catch (error) {
          console.log(error)
        }
        console.log(productObj);
    };

    return(
       <SafeAreaView style={styles.container}>
            <View style={styles.titleRow}>

                <Ionicons
                    onPress={()=> navigation.goBack()}
                    name='chevron-back-circle'
                    size ={30}
                    color ={COLORS.primary}
                />
              
                <Text style={styles.titleText}>
                    Favorites
                </Text>

            </View>

            <View style={styles.container}>
                
                <FlatList
                    data={favData}
                    renderItem={({item}) => (
                        <View style={styles.favContainer}>

                            <View style={styles.imageContainer}>
                                <Image
                                    source={{uri:item.imageUrl}}
                                    style={styles.image}
                                />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style ={styles.fav}>{item.title}</Text>
                            </View>

                            
                            <SimpleLineIcons
                                onPress={()=> deleteFavorites(item.id)}
                                name='trash'
                                size={24}
                                color={COLORS.red}
                            />
                            
                        </View>)}
                    keyExtractor={(item, index)=> index.toString()}
                />
            </View>
       </SafeAreaView>
    )
}

export default Favorites;