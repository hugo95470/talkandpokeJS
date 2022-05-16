import React from 'react';
import { StyleSheet, View, Dimensions, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';

import { getAffichePhoto } from '../service/OfflineAfficheService';
import afficheImage from '../Mapper/AfficheImageMapper';

export default function ImagesCollectionView(props) {
        
        //Affiches
        var [news, setNews] = useState("");

        useEffect(async () => {
            setNews(getAffichePhoto(props.AfficheId));
        }, []);
                
        var ItemNews = ({ imageCode }) => {

            return(
                <ImageBackground imageStyle={{ borderRadius: 15}} source={afficheImage[imageCode]} resizeMode="cover" style={styles.affiche}>
                </ImageBackground>
            );
        }



        var renderItemNews = ({ item }) => (
            <ItemNews imageCode={item}/>
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
        height: 170,
        width: Dimensions.get('window').width/3 - 6,
        margin: 3,
        justifyContent: 'flex-end',
    },
    TitreNoir: {
        margin: 30,
        fontSize: 25,
        color: 'black'
    },
})