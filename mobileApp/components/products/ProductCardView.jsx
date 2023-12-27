import { TouchableOpacity, Text, View,Image } from 'react-native';
import React from 'react';
import styles from './productCardView.Style';
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const ProductCardView = () => {
    const navigation=useNavigation();
  return (
   <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails")}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{uri:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Cactuses.jpg"}}
                    style={styles.image}
                />
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>Plant name</Text>
                <Text style={styles.information} numberOfLines={1}>Plant information</Text>
                {/*<Text style={styles.price}>$Plant</Text>*/}
            </View>
            <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="heart-circle" size={35} color={COLORS.primary}/>
            </TouchableOpacity>

        </View>
   </TouchableOpacity>
  )
}

export default ProductCardView

