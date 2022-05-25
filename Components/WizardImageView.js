import React, { useContext, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Animated
} from "react-native";
import globalStyles from "../Styles/globalStyles";

import Context from '../navigation/userContext';



const WizardImageView = (props) => {

  const images = props.images;

  const width = props.width;
  const height =  props.height;

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
    },
    card: {
      borderRadius: 5,
      width: '100%',
      height: '100%'
    },
    normalDot: {
      borderWidth: 2,
      borderColor: 'white',
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: "transparent",
      marginHorizontal: 4,
      elevation: 3
    },
    indicatorContainer: {
      bottom: 5,
      width: '100%',
      position: 'absolute',
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }
  });

  const context = useContext(Context)

  const scrollX = useRef(new Animated.Value(0)).current;

  const windowWidth = width;
  //const { width: windowWidth } = useWindowDimensions();

  var Indicator = () => {
    if(images.length > 1) {
      return (
        <View style={[styles.indicatorContainer]}>
        {images.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1)
            ],
            outputRange: [8, 16, 8],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[styles.normalDot, { width }]}
            />
          );
        })}
      </View>
      )
    }else {
      return(<View></View>)
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ],
          {useNativeDriver: false})}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={[{ width: windowWidth, height: height}, globalStyles.center]}
                key={imageIndex}
              >
                <View style={{alignItems: "center", flex: 1, overflow: 'hidden', justifyContent: "center"}}>
                  <ImageBackground imageStyle={{ borderRadius: 19}} source={{ uri: image }} style={[styles.card]}>
                    {props.children}
                  </ImageBackground>
                </View>
                
              </View>
            );
          })}
        </ScrollView>
        <Indicator/>
    </SafeAreaView>
  );

  

}

export default WizardImageView;