
import React from 'react';
import { Text, View, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

export default function View3(props) {   

    return(
        <View style={styles.center}>
          <View style={styles.container}>
            <View style={{height: 200}}>
              <Text style={[styles.center, {fontSize: 30}]}>Découvre !</Text>
            </View>

            <View style={{position: 'absolute', height: '100%', width: '100%', top: 100}}>
              <ImageBackground style={[globalStyles.center, {height: 500, width: '100%', position: 'absolute'}]} source={require('../../Images/PodiumWithoutBackground.png')}>

                <View style={[globalStyles.shadows, {top: 75, left: 78, height: 155, borderRadius: 100, width: 155, position: 'absolute'}]}>
                  <Image style={[globalStyles.center, {height: 150, borderRadius: 100, width: 150}]} source={require('../../Images/Profil1.webp')}/>
                </View>
                <Image style={[globalStyles.center, {top: 30, elevation: 15, left: 150, height: 100, borderRadius: 100, width: 100, position: 'absolute', transform: [{ rotate: '30deg' }]}]} source={require('../../Images/Crown.png')}/>

                <View style={[globalStyles.shadows, {top: 200, left: 205, height: 135, borderRadius: 100, width: 135, position: 'absolute'}]}>
                  <Image style={[globalStyles.center, {height: 130, borderRadius: 100, width: 130}]} source={require('../../Images/Profil2.webp')}/>
                </View>

                <View style={[globalStyles.shadows, {top: 330, left: 60, height: 105, borderRadius: 100, width: 105, position: 'absolute'}]}>
                  <Image style={[globalStyles.center, {height: 100, borderRadius: 100, width: 100}]} source={require('../../Images/Profil3.webp')}/>
                </View>

              </ImageBackground>
            </View>

            <View style={[{position: 'absolute', bottom: 50, width: '100%'}]}>
              <Text style={globalStyles.center}>Avec une petite description ici : )</Text>
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
});