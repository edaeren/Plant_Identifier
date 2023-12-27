import {View,Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './welcome.style';
import { COLORS, SIZES } from '../../constants';
import {Feather, Ionicons} from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const Welcome=()=>{
    const navigation=useNavigation();
    return(
        
       <View>
             <View tyle={styles.container}>
                <Text style={styles.WelcomeTxt(COLORS.black, SIZES.xSmall)}>Find The Plant</Text>
                <Text style={styles.WelcomeTxt(COLORS.primary,0)}>That You Are Looking For</Text>
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} style={styles.seacrhIcon} />
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput 
                    style={styles.searchInput}
                    value=""
                    onPressIn={()=>navigation.navigate("Search")}
                    placeholder="What are you looking for"
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="camera-outline" size={SIZES.xLarge} color={COLORS.offwhite}/>
                    </TouchableOpacity>
                </View>
            </View>
       </View>
    )
}

export default Welcome