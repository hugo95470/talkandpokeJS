import React, { useContext, useRef } from "react";
import * as SecureStore from 'expo-secure-store';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../Styles/globalStyles";

import Context from '../navigation/userContext';


const images = ['https://images.unsplash.com/photo-1556740749-887f6717d7e4',
                'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
                'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
                'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
                'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
                'https://images.unsplash.com/photo-1556740749-887f6717d7e4'];

const WizardView = () => {

  const context = useContext(Context)

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();

  async function begin() {
    await context.setIntro(0);
    await SecureStore.setItemAsync('intro', '0')
  }

  var LastCard = (imageIndex) => {
    if(imageIndex.imageIndex >= 5) {
      return(
        <TouchableOpacity onPress={async () => await begin()} style={{position: 'absolute', right: 20, bottom: -60, height: 50, borderRadius: 100, width: 150, backgroundColor: 'white'}}>
          <Text style={globalStyles.center}>Commencez !</Text>
        </TouchableOpacity>
      )
      
    } else {
      return(
        <View></View>
      )
    }
    
  };

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
              <View
                style={[{ width: windowWidth, height: 250 }, globalStyles.center]}
                key={imageIndex}
              >
                <ImageBackground source={{ uri: image }} style={[styles.card]}>
                  <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {"Image - " + imageIndex}
                    </Text>
                  </View>
                </ImageBackground>
                <LastCard imageIndex={imageIndex}/>
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: Dimensions.get('window').height - 150,
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
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default WizardView;