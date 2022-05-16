
import React, { useContext } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';

const afficheWidth = Dimensions.get('window').width/3;
const afficheHeigth = Dimensions.get('window').height/3.8;
const space = 5;
const middleScale = 1.2;

export default function View1(props) {   

    return(
        <View style={styles.center}>
          <View style={styles.container}>
            <View style={styles.afficheContainer}>
                <Image style={[styles.affiche, styles.affiche1]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/ImageJpeg/Chien.jpeg'}}/>

                <Image style={[styles.affiche, styles.affiche2]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/ImageJpeg/Peche.jpeg'}}/>

                <Image style={[styles.affiche, styles.affiche3]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/ImageJpeg/Eau.jpeg'}}/>

                <Image style={[styles.affiche, styles.affiche4]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/ImageJpeg/Printemps.jpeg'}}/>

                <Image style={[styles.affiche, styles.affiche5]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/ImageJpeg/Lion 2.jpeg'}}/>
                <View style={[styles.affiche, styles.affiche5Right]}/>

                <Image style={[styles.affiche, styles.affiche6]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/ImageJpeg/Perroquet.jpeg'}}/>
                <View style={[styles.affiche, styles.affiche6Right]}/>
                
            </View>

            <Text style={[styles.center, {fontSize: 23, marginBottom: 0, fontWeight: '600'}]}>Talk&Poke</Text>
            <Text style={[styles.center, {marginTop: 10, paddingHorizontal: 30}]}>Bienvenue sur Talk&Poke ! Partagez avec des personnes qui vous ressemble</Text>
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
  afficheContainer: {
    width: Dimensions.get('window').width,
    height: afficheHeigth + space + afficheHeigth*2/3,
  },
  affiche: {
    backgroundColor: '#eee',
    borderRadius: 19,
    height: afficheHeigth,
    width: afficheWidth,
    position: 'absolute'
  },
  affiche1: {
    top: -afficheHeigth/3,
    left: -afficheWidth/5
  },
  affiche2: {
    top: afficheHeigth*2/3 + space,
    left: -afficheWidth/5
  },
  affiche3: {
    bottom: afficheHeigth * middleScale + space,
    left: afficheWidth*4/5 + space,
    width: Dimensions.get('window').width - (afficheWidth*8/5) - 2*space,
    height: afficheHeigth * 1.2
  },
  affiche4: {
    bottom: 0,
    left: afficheWidth*4/5 + space,
    width: Dimensions.get('window').width - (afficheWidth*8/5) - 2*space,
    height: afficheHeigth * middleScale
  },
  affiche5: {
    top: -afficheHeigth/3,
    right: -afficheWidth/5
  },
  affiche5Right: {
    top: -afficheHeigth/3,
    right: -afficheWidth/5,
    width: 26,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: '#FEA52A'
  },
  affiche6: {
    top: afficheHeigth*2/3 + space,
    right: -afficheWidth/5
  },
  affiche6Right: {
    top: afficheHeigth*2/3 + space,
    right: -afficheWidth/5,
    width: 26,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: '#FEA52A'
  }
});