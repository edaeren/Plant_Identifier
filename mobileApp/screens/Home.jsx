import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './home.style';
import {Ionicons,Fontisto} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Welcome } from '../components';
import Carousel from '../components/home/Carousel';
import Headings from '../components/home/Headings';
import ProductRow from '../components/products/ProductRow';


const Home =()=>{
    //anasayfadaki konum bilgisi ve shopping chart
    return(
       <SafeAreaView>
            <View style={styles.appBarWrapper}>
                <View style={styles.appBar}>
                    <Ionicons name='locate-outline' size={24}/>
                    <Text style={styles.location}>Istanbul</Text>

                    <View style={{alignItems: "flex-end"}}>
                        <View style={styles.cartCount}> 
                            <Text style={styles.cartNumber}>8</Text>
                        </View>               
                        <TouchableOpacity>
                            <Fontisto name='shopping-bag' size={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
//const styles=StyleSheet.create({})
