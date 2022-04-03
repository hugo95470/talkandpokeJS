import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';

function ImagesCollectionView(props) {

        //AFFICHAGE DES NEWS
        
        //Affiches
        var [news, setNews] = useState("");

        useEffect(() => {
        
            fetch(global.apiUrl + 'Affiche/GetPhotoAffiche.php?AfficheId=' + props.AfficheId)
            .then((response) => response.json())
            .then((data) => setNews(data));
            
    
        }, [props.oeuvreId]);
                
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
    
    TitreContainer: {
        padding: 0,
        paddingHorizontal: 5,
        paddingVertical: 5,
        minWidth: 100,
        marginRight: -9,
        position: 'absolute', right: '5%', bottom: '10%',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        elevation: 3,
    },
    Titre: {
        borderRadius: 19,
        padding: 10,
        width: 'auto',
    },
    affiche: {
        height: 140,
        width: 85,
        justifyContent: 'flex-end',
    },

      shadow: {
          borderRadius: 19,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 280,
        width: 170,
        backgroundColor : '#0000',
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


export default ImagesCollectionView