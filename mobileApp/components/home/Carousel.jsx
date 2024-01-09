import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';

const Carousel = () => {
    const slides =[
     "https://img.freepik.com/free-photo/pink-tree_335224-377.jpg?w=2000&t=st=1704794339~exp=1704794939~hmac=74acbcb65786f593fe7f18a6542038d35a057a43b6465900f14ac821538d1241",
      "https://img.freepik.com/free-photo/modern-flowers-concept-with-elegant-style_23-2148006901.jpg?w=2000&t=st=1704794850~exp=1704795450~hmac=36e29ae078c9adbc155f228a5415b4bac1e3205648b5bd07661ae7d6e8d1aaf0",
     "https://img.freepik.com/free-photo/growing-tulips-greenhouse-crafted-manufacture-your-celebration_155003-33498.jpg?w=2000&t=st=1704794682~exp=1704795282~hmac=7c84d391d9aa3257a7bdaa5bd15d7d1abe3cf3514a3f4d346c5292c78b7c6336"
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