import React from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';

import { getAfficheMessage } from '../service/MessageService';
import globalStyles from '../Styles/globalStyles';

function CommentairesCollectionView(props) {

   
        //Affiches
        var [news, setNews] = useState("");


        useEffect(async () => {
            setNews(await getAfficheMessage(props.AfficheId, 5));
        }, []);
                
        var ItemNews = ({ title, text, image, date }) => {

            return(
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MessagePage', { _isOeuvre: true,  _oeuvreId: props.oeuvreId})}>
                    <View style={[globalStyles.shadows, {borderRadius: 19, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, marginTop: 5, width: '90%', minHeight: 70, backgroundColor : '#fff', padding: 10}]}>
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <ImageBackground imageStyle={{ borderRadius: 100}} source={{uri: image}} resizeMode="cover" style={styles.affiche}/>

                            <View style={{flexDirection: 'column', maxWidth: '80%', marginLeft: 20, marginTop: 3}}>
                                <Text style={{fontSize: 17}}>{title}</Text>
                                <Text style={{marginBottom: 'auto', marginTop: -15, fontSize: 17}}>{text}</Text>
                            </View>
                        </View>

                        <Text style={{position: 'absolute', bottom: 10, right: 10, fontSize: 8}}>{date}</Text>
                        
                    </View>
                </TouchableOpacity>
            );
        }

        var renderItemNews = ({ item }) => (
            <ItemNews title={item.Pseudo} text={item.Message} image={item.Image} date={item.CreatedDate}/>
        );

        return (
            <View>
                <Text onPress={(() => props.navigation.navigate('MessagePage', { _isOeuvre: true,  _oeuvreId: props.oeuvreId}))} style={styles.TitreNoir}>Commentaires</Text>

                <FlatList ListHeaderComponent={props.header} data={news} renderItem={renderItemNews} keyExtractor={item => item.Identifier} numColumns="1" onEndReachedThreshold={0.3}/>
            </View>
            
        )
}

const styles = StyleSheet.create({
    affiche: {
        height: 40,
        width: 40,
        top: 15,
        left: 10,
        justifyContent: 'flex-end',
    },
    TitreNoir: {
        margin: 30,
        fontSize: 25,
        color: 'black'
    },
})


export default CommentairesCollectionView