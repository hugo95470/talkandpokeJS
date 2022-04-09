import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';

import { getAffichesPhoto } from '../service/AfficheService';

export default function ImagesCollectionView(props) {
        
        //Affiches
        var [news, setNews] = useState("");

        useEffect(async () => {
            setNews(await getAffichesPhoto(props.AfficheId));         
        }, []);
                
        var ItemNews = ({ image }) => {

            return(
                <TouchableOpacity style={{marginHorizontal: 20, marginBottom: 30}}>
                    <ImageBackground imageStyle={{ borderRadius: 15, height: 150, width: 100}} source={{uri: image}} resizeMode="cover" style={styles.affiche}>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }



        var renderItemNews = ({ item }) => (
            <ItemNews title={item.Titre} image={item.Image}/>
        );

        return (

            <View>
                  <Text style={styles.TitreNoir}>Photos</Text>
                  <FlatList ListHeaderComponent={props.header} data={news} renderItem={renderItemNews} keyExtractor={item => item.Identifier} numColumns="3"/>
            </View>

        )
}

const styles = StyleSheet.create({
    affiche: {
        height: 140,
        width: 85,
        justifyContent: 'flex-end',
    },
    TitreNoir: {
        margin: 30,
        fontSize: 25,
        color: 'black'
    },
})