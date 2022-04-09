import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, ImageBackground, View} from 'react-native';
import { useEffect, useState } from 'react';

import { getAffichesLiens } from '../service/AfficheService';

export default function LiensView(props) {

        //AFFICHAGE DES AFFINITES
        var [liens, setLiens] = useState("");
                
        var ItemAffiche = ({ image, afficheId }) => {
            return(
                <TouchableOpacity style={{marginRight: 'auto', marginLeft: 'auto'}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: afficheId})}>
                    <ImageBackground imageStyle={{ borderRadius: 15, height: 150, width: 100}} source={{uri: image}} resizeMode="cover" style={styles.affiche}>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => {
            return(
                <ItemAffiche style={styles.containerAffiches} image={item.Image} afficheId={item.AfficheId} />

            )
        }

        useEffect(async () => {
            await getAffichesLiens(props.AfficheId)
            .then((data) => {
                
                const _liens = Object.entries(data).map(obj => {
                    var rObj = {};
                    rObj['title'] = obj[1].Lien;
                    rObj['data'] = [{AfficheId: obj[1].AfficheId, Image: obj[1].Image}];
                    return rObj;
                  })
                  .reduce((item, { title, data }) => {
                    if (!item[title]) item[title] = [];
                    item[title].push(data[0]);
                    return item;
                  }, {});

                setLiens(_liens)
            });      
        }, []);

        return (

            Object.entries(liens).map(data => {
                return(
                    <View>
                        <Text style={styles.title}>{data[0]}</Text>
                        <FlatList data={data[1]} renderItem={renderItemAffiche} keyExtractor={item => item.AfficheId} numColumns="3"/>                
                    </View>
                );
                
            })        
            

        )
}

const styles = StyleSheet.create({
    title: {
    fontSize: 25,
    marginLeft: 30,
    color: 'black',
    },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    affiche: {
        height: 100,
        width: 100,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
})