import React, { useContext, useRef } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Dimensions,
} from "react-native";

import globalStyles from "../Styles/globalStyles";
import Context from '../navigation/userContext';
import View1 from '../Components/StartComponents/View1';
import View2 from '../Components/StartComponents/View2';
import View3 from '../Components/StartComponents/View3';
import View4 from '../Components/StartComponents/View4';
import View5 from '../Components/StartComponents/View5';

const images = ['', '', '', '', ''];

const WizardView = () => {

  const context = useContext(Context)

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  async function begin() {
    await context.setIntro(0);
    await SecureStore.setItemAsync('intro', '0')
  }

  let Views = ({index}) => {

    switch(index){
      case 0:
        return (
          <View1/>
        )
      
      case 1:
        return (
          <View2/>
        )

      case 2:
        return (
          <View3/>
        )

      case 3:
        return (
          <View4/>
        )

      case 4:
        return (
          <View5/>
        )
  
      default:
        return(
          <View></View>
        )
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
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
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View style={[{ width: windowWidth, height: '100%' }, globalStyles.center]}
                key={imageIndex}>
                <Views index={imageIndex}/>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WizardView;