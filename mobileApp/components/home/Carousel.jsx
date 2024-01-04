import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { COLORS } from '../../constants';

const Carousel = () => {
    const slides =[
      "https://img.freepik.com/free-photo/modern-apartment-with-comfortable-sofa-decor-generated-by-ai_188544-38495.jpg?w=2000&t=st=1703659085~exp=1703659685~hmac=1a152b6b61d9a4e5a807fd0fb5219f8f6569fd94474d048085f3cc62d387b0d4",
        "https://img.freepik.com/free-photo/gray-sofa-brown-living-room-with-copy-space_43614-954.jpg?w=2000&t=st=1703659131~exp=1703659731~hmac=5cde8b899abd53d42744d8ec821589d91e7559818a31d0032f4e87f94b807455",
        "https://img.freepik.com/free-photo/chic-modern-luxury-aesthetics-style-living-room-blue-tone_53876-125839.jpg?w=2000&t=st=1703659169~exp=1703659769~hmac=b156e2c9372b34666fd768c6ea700a8ee9d6bbceb14e4aa3115dd0099258954b",
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