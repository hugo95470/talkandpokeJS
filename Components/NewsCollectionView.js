import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';
import { getAffichesLiens } from '../service/AfficheService';

function NewsCollectionView(props) {

   
        //Affiches
        var [affiche, setAffiche] = useState("");


        useEffect(async () => {
            setAffiche(await getAffichesLiens(props.AfficheId, "true"));
        }, []);

                
        var ItemNews = ({AfficheId, title, description, image, date }) => {

            return(
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: AfficheId, _Image: image})}>
                    <View style={styles.shadow}>
                        <View style={{flexDirection: 'row'}}>
                            <ImageBackground imageStyle={{ borderRadius: 15}} source={{uri: image}} resizeMode="cover" style={styles.affiche}/>

                            <View style={{flexDirection: 'column', marginLeft: 20, marginTop: 10}}>
                                <Text style={{fontSize: 17}}>{title}</Text>
                                <Text style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 270, maxHeight: 50}}>{description}</Text>
                            </View>
                        </View>

                        <Text style={{position: 'absolute', bottom: 10, right: 10, fontSize: 10}}>{date}</Text>
                        
                    </View>
                </TouchableOpacity>
            );
        }

        var renderItemNews = ({ item }) => (
            <ItemNews AfficheId={item.AfficheId} title={item.AfficheTitre} description={item.Description} image={item.Image} date={item.Date}/>
        );

        return (
            <View>
                <Text style={styles.TitreNoir}>News</Text>

                <FlatList ListHeaderComponent={props.header} data={affiche} renderItem={renderItemNews} keyExtractor={item => item.Identifier} numColumns="1" onEndReachedThreshold={0.3}/>
            </View>
            
        )
}

const styles = StyleSheet.create({
    affiche: {
        height: 80,
        width: 60,
        top: 10,
        left: 10,
        justifyContent: 'flex-end',
    },
    shadow: {
        borderRadius: 19,
        margin: 20,
        marginTop: 5,
        height: 100,
        width: '90%',
        backgroundColor : '#fff',
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 15, 
    },
    TitreNoir: {
        margin: 30,
        fontSize: 25,
        color: 'black'
    },
})


export default NewsCollectionView