
import React, { useContext } from 'react';
import { Text, View, Image, StyleSheet, Dimensions } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

export default function View4(props) {   

    let Versus= () => {
      return(
        <View style={{position: 'absolute', elevation: 7, bottom: 0, width: 127.5, borderBottomLeftRadius: 19, borderTopRightRadius: 19, height: 50, backgroundColor: '#FEA52A'}}>
          <Text style={[globalStyles.fontFamily ,{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 21, color: 'white'}]}>Tu préfères</Text>
        </View >
      )
    }

    return(
        <View style={styles.center}>
          <View style={styles.container}>
            <View style={{height: 200}}>
              <Text style={[styles.center, {fontSize: 30}]}>Compare !</Text>
            </View>

            <View style={[{position: 'absolute', backgroundColor: '#eee', top: 400, left: 60}]}>
              <Image style={[styles.affiche]} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/Lion.png'}}/>
            </View>
            
            <View style={[styles.affiche, {position: 'absolute', backgroundColor: '#eee', top: 150, left: 133}]} >
              <Image style={{backgroundColor: '#eee', height: '100%', width: '100%', borderRadius: 19}} source={{uri: 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/Tigres.png'}}/>
            
              <Versus/>
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
  affiche: {
    backgroundColor: '#eee',
    borderRadius: 19,
    height: 300,
    width: 200,
    position: 'absolute'
  },
});