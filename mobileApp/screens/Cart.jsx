import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons,SimpleLineIcons} from "@expo/vector-icons";
import { COLORS } from "../constants";
import styles from './cart.style';
import fetchCart from '../hook/fetchCart';
import { FlatList } from 'react-native-gesture-handler';
import cartTile from '../components/cart/CartTile';
import { Button } from '../components';

const Cart =({navigation})=>{
    
    const {data,loading,error,refetch} = fetchCart();
    const [selected,setSelected] = useState(null);
    const [select,setSelect] = useState(false);
    console.log(selected)
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
                Cart
            </Text>

        </View>

        {loading ? (<ActivityIndicator/>):(<FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => 
            <cartTile item={item} onPress={()=> {setSelect(!select), setSelected(item)}} select={select} />
            }
        />)}
        
        {select === false ? (<View></View>)
        : (
            <Button title={'Checkout'}
            isValid={select}
            onPress={() => {}}
        />)}
        </SafeAreaView>
    );
};

export default Cart