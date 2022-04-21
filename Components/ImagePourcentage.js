import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';

import images from '../Components/ImageTag'

export default function ImagePourcentage(props) {
  let diametre = props.taille;

  const styles = StyleSheet.create({
    circularBackground: {
      backgroundColor: '#FEA52A',
      height: diametre, 
      width: diametre,
      borderRadius: 1000,
    },
    circularRight: {
      backgroundColor: '#FDCD52',
      height: diametre, 
      width: diametre/2,
      borderBottomRightRadius: 1000,
      borderTopRightRadius: 1000,
      marginLeft: 'auto',
    },
    categorie: {
      height: 80,
      width: 80,
      borderRadius: 1000,
      position: 'absolute',
  },
    image: {
      position: 'absolute',
      height: '90%', 
      width: '90%', 
      borderRadius: 1000, 
      margin: '5%',
    },
    circularRightCompleted: {
      backgroundColor: '#FEA52A',
      height: diametre, 
      width: diametre/2,
      borderBottomRightRadius: 1000,
      borderTopRightRadius: 1000,
      marginLeft: 'auto',
    },
    circularLeft: {
      position: 'absolute',
      backgroundColor: '#FDCD52',
      height: diametre, 
      width: diametre/2,
      borderBottomLeftRadius: 1000,
      borderTopLeftRadius: 1000,
      marginRight: 'auto',
    },
  });

  let finalValue = 360 * props.pourcentage / 100;
  let [pourcentage, setPourcentage] = useState(0);

  useEffect(async () => {

    async function addPourcentage() {
      setPourcentage(pourcentage++)
      if(pourcentage <= finalValue) {
        setTimeout(async () => await addPourcentage(), 0.1);
      }
    }

    if(finalValue != undefined) {
      await addPourcentage()
    }
    
  }, [])


  let Left = () => {
          if(pourcentage <= 180){
              return(
                  <View style={styles.circularLeft}>
                  </View>
              )
              
          }else{
              return(
                <View style={{width: diametre, position: 'absolute'}}>
                  <View style={styles.circularRightCompleted}>
                  </View>
                </View>
                  
              )
          }
      };

    let Info = () => {
        if(props.showPourcentage){
            return(
              <View>
                <Text style={{marginLeft: 'auto', fontSize: diametre/6, textAlign: 'center', marginRight: 'auto'}}>{props.pourcentage} %</Text>
                <Text style={{marginLeft: 'auto', fontSize: diametre/6, textAlign: 'center', marginRight: 'auto'}}>{props.name}</Text>
              </View>
            )
            
        }else{
            return(
              <Text style={{marginLeft: 'auto', fontSize: diametre/6, textAlign: 'center', marginRight: 'auto', marginTop: 10}}>{props.name}</Text>               
            )
        }
    };

    var ImageTag = ({image}) => {
      if(image.includes('http')) {
          return (
              <ImageBackground isBackground imageStyle={{ borderRadius: 100, backgroundColor: '#aaa', width: diametre-10, height: diametre-10, margin: 5}} source={{uri: image}} resizeMode="cover" style={styles.categorie}>
              </ImageBackground>
          );
      }else{
          return (
              <ImageBackground isBackground imageStyle={{ borderRadius: 100, backgroundColor: '#aaa', width: diametre-10, height: diametre-10, margin: 5}} source={images[image]} resizeMode="cover" style={styles.categorie}>
              </ImageBackground>
          );
      }
    }

  return (
    <View>
      <View style={styles.circularBackground}>
        

        <View style={{transform: [{ rotate: pourcentage + 'deg'}]}}>
          <View style={styles.circularRight}>
          </View>

          <View style={{position: 'absolute', backgroundColor: '#FEA52A', width: 5, height: 5, borderRadius: 100, left: '47%'}}>
          </View>
        </View>

        <Left/>

        <ImageTag image={props.image?props.image:""}/>

        <Info/>
      </View>
      
    </View>
      
  );

  
}
