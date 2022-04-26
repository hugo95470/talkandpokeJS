import React from 'react';
import { StyleSheet, Text, ImageBackground, FlatList, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from 'react';

import images from '../Components/ImageTag';
import AlertText from '../Components/AlertText';
import AfficheMedium from '../Components/AfficheMedium';
import { getAffichesByTag } from '../service/AfficheService';

export default function OeuvresPage({ route, navigation }) {
    
    const { TagId } = route.params;
    const { OeuvreTypeLibelle } = route.params;    
    const { image } = route.params;    

    var [affiches, setAffiches] = useState("");

    useEffect(async ()=> {
        setAffiches(await getAffichesByTag(TagId));
    }, [])

    var ImageTag = ({image}) => {
        if(image.includes('http')) {
            return (
                <ImageBackground isBackground imageStyle={{ borderRadius: 19, backgroundColor: '#aaa'}} source={{uri: image}} resizeMode="cover" style={styles.categorie}>
                </ImageBackground>
            );
        }else{
            return (
                <ImageBackground isBackground imageStyle={{ borderRadius: 19, backgroundColor: '#aaa'}} source={images[image]} resizeMode="cover" style={styles.categorie}>
                </ImageBackground>
            );
        }
    }

    var _header = () => {
        return (
            <View style={{marginVertical: 20}}>
                <AlertText title={OeuvreTypeLibelle} description={"Vous pouvez retrouver ici toutes les affiches appartenant à la categorie " + OeuvreTypeLibelle}/>
            </View>
        );
    }

    var renderItemAffiche = ({ item }) => {
        return(
            <AfficheMedium item={item} navigation={navigation}/>
        );
    }
    
    return (
        <View>

            <View style={styles.container}>
                    <ScrollView>
                        <ImageTag image={image}/>


                        <LinearGradient style={{height: 400}} colors={['rgba(0,0,0,0)','#000']}>

                        <TouchableOpacity style={{backgroundColor: 'rgb(254, 165, 42)', height: 50, width: 50, marginTop: 50, marginLeft: 20, borderRadius: 100}} onPress={() => navigation.pop()}>
                            <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </TouchableOpacity>


                        </LinearGradient>

                        <View style={{backgroundColor: 'black'}}>
                            <View style={{backgroundColor: '#ddd', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>                                  


                                <FlatList data={affiches} ListHeaderComponent={_header} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="2"/>

                                <View style={{height: 300}}/>

                            </View>
                        </View>
                        
                    </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    categorie: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        borderRadius: 100,
        position: 'absolute',
        top: -200,
    },
  })
