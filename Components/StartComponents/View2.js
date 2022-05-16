
import React from 'react';
import { Animated, Text, View, Image, StyleSheet, Dimensions, Easing } from 'react-native';
import { useRef, useEffect  } from 'react';
import globalStyles from '../../Styles/globalStyles';

export default function View2(props) {   
  
  const animX = new Animated.Value(70);
  const animY = new Animated.Value(250);
  const animRotate = new Animated.Value(0.5);
  const animCoeur = new Animated.Value(250);

  const spin = animRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['5deg', '-5deg']
  })

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        Animated.parallel([
          // increase size
          Animated.timing(animX, {
            toValue: 30, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animRotate, {
            // and twirl
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
          })
        ]),
        Animated.parallel([
          // decrease size
          Animated.timing(animX, {
            toValue: 70, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animY, {
            toValue: 150, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animCoeur, {
            toValue: 350, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animRotate, {
            // and twirl
            toValue: 0.5,
            duration: 3000,
            useNativeDriver: false,
          })
        ]),
        Animated.parallel([
          // decrease size
          Animated.timing(animX, {
            toValue: 100, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animY, {
            toValue: 250, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animCoeur, {
            toValue: 250, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animRotate, {
            // and twirl
            toValue: 0,
            duration: 3000,
            useNativeDriver: false,
          })
        ]),
        Animated.parallel([
          // decrease size
          Animated.timing(animX, {
            toValue:50, 
            duration: 3000,
            useNativeDriver: false,
          }),
          Animated.timing(animRotate, {
            // and twirl
            toValue: 0.5,
            duration: 3000,
            useNativeDriver: false,
          })
        ]),
        
      ])
    ).start();
  }, []);

  return(
      <View style={styles.center}>
        <View style={styles.container}>
          
          <View style={{height: 200}}>
            <Text style={[styles.center, {fontSize: 30}]}>Swipe !</Text>
          </View>
          
          <Animated.Image style={[ styles.dislike, {right: animX}]} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}>
          </Animated.Image>

          <View style={{left: -180}}>
            <Animated.Image style={[styles.like, {right: animX}]} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}>
            </Animated.Image>
          </View>

          <View style={{left: -180}}>
            <Animated.Image style={[styles.coeur, {top: animCoeur, left: 350}]} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}>
            </Animated.Image>
          </View>
          

          <Animated.Image style={[styles.affiche, {left: animX, top: animY, transform: [{rotate: spin}] }]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/Figue.png'}}/>

          <View style={[{position: 'absolute', bottom: 50, width: '100%'}]}>
            <Text style={globalStyles.center}>Réagis aux affiches pour forger ton profil : )</Text>
          </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  center: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  affiche: {
    backgroundColor: '#eee',
    borderRadius: 19,
    height: 400,
    width: 250,
    position: 'absolute',
    transform: [{ rotate: '-13deg' }]
  },
  coeur: {
    height: 80,
    width: 80,    position: 'absolute',
    transform: [{ rotate: '25deg' }]
  },
  dislike: {
    top: 350,
    height: 80,
    width: 80,
    position: 'absolute',
    transform: [{ rotate: '-25deg' }]
  },
  like: {
    top: 150,
    height: 80,
    width: 80,
    position: 'absolute',
    transform: [{ rotate: '25deg' }]
  }
});