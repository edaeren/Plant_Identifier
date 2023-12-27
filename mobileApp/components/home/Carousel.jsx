import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';

const Carousel = () => {
    const slides =[
        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Cactuses.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/9/9e/Lil_ciliatum_01Infl_Tuerkei_Kümbet_85.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Narzisse.jpg",
    ]
  return (
    <View style={styles.carouselContainer}>
      <SliderBox images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{borderRadius: 20, width:"92%",marginTop:0}}
        autoplay
        circleLoop
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
    carouselContainer:{
        flex:1,
        alignItems:"center"
    }
})