import { Image, Text, View ,TouchableOpacity} from 'react-native';
import React, {useEffect, useState,usee} from 'react';
import { useRoute } from '@react-navigation/native';
import {Ionicons,SimpleLineIcons,MaterialCommunityIcons,Fontisto} from '@expo/vector-icons';
import styles from './productDetails.style'
import { COLORS, SIZES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


const ProductDetails = ({navigation}) => {
  const route= useRoute();
  const {item} =route.params;
  
  const [count,setCount]= useState(1);
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [favorites,setFavorites] = useState(false);

  const increment = () => {
      setCount(count+1)
  };

  const decrement = () => {
    if(count>1){
      setCount(count-1)
    }
  };

  useEffect(()=> {
    checkUser();
    checkFavorites();
  },[])

  const checkUser = async () => {
    try {
      const id = AsyncStorage.getItem('id');
      if (id !== null) {
        setLoggedIn(true)
        console.log("user girdi mi :"+isLoggedIn)
      }else{
        console.log('user not logged in')
      }
    } catch (error) {
      
    }
  };

  const addToFavorites = async ()=> {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites ${JSON.parse(id)}`

    //console.log(favoriteId); şu anda null değer döndürüyor
    let productId = item._id;
    let productObj = {
      title : item.title,
      id : item._id,
      imageUrl: item.imageUrl,
    }
    try {
      const existingItem = await AsyncStorage.getItem(favoritesId);
      let favoritesObj = existingItem ? JSON.parse(existingItem): {};

      if(favoritesObj[productId]){
        delete favoritesObj[productId];
        console.log("deleted");
        setFavorites(false);
      }else{
        favoritesObj[productId] = productObj;
        console.log("added to fav")
        setFavorites(true);
      }

      await AsyncStorage.setItem(favoritesId,JSON.stringify(favoritesObj))
    } catch (error) {
      console.log(error)
    }
    console.log(productObj);
  };

  const checkFavorites = async () => {
    const id = await AsyncStorage.getItem('id');
    const favoritesId = `favorites ${JSON.parse(id)}`

    console.log(favoritesId);

    try {
      const favoritesObj = await AsyncStorage.getItem(favoritesId);
      if(favoritesObj !== null){
        const favorites = JSON.parse(favoritesObj);

        if(favorites[item._id]){
          console.log(item._id)
          setFavorites(true)
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = async () => {
    if(isLoggedIn === false){
      navigation.navigate('Login')
    }else{
      addToFavorites();
    }
  };
  

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={()=>(navigation.goBack())}>
          <Ionicons name='chevron-back-circle' size={30}/>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri:item.imageUrl,
        }}
       style={styles.image}
       />
       <View style={styles.details}>
          <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={()=>handlePress()}>
                <Ionicons name={favorites ? 'heart':'heart-outline'} size={30} color={COLORS.primary}/>
              </TouchableOpacity>
              </View>
          </View>
        
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Care Information</Text>
            <Text style={styles.descText}>
              {item.description}
            </Text>
          </View>
            
        

       </View>
    </ScrollView>
  )
}

export default ProductDetails