import React, { useContext } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';

export default function ContactsCollectionView(props) {

        const context = useContext(Context)

        //Affiches
        var [contacts, setContacts] = useState("");

        useEffect(() => {
        
            fetch(global.apiUrl + 'Message/GetContacts.php?Nombre=10&UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => setContacts(data));
            
    
        }, [context.utilisateurId]);

                
        var ItemNews = ({ image, contactId }) => {

            return(
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MessagePage', {_expediteurId: contactId, _image: props.Image, _message: 'regardes ca !'})}>
                    <View style={styles.shadow}>
                        <View style={{flexDirection: 'column'}}>
                            <ImageBackground imageStyle={{ borderRadius: 100}} source={{uri: image}} resizeMode="cover" style={styles.affiche}/>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }



        var renderItemNews = ({ item }) => (
            <ItemNews image={item.Image} contactId={item.UtilisateurId}/>
        );

        return (
            <View>
                <FlatList style={{marginLeft: 10}} data={contacts} renderItem={renderItemNews} numColumns="10" keyExtractor={item => item.UtilisateurId} onEndReachedThreshold={0.3}/>
            </View>
            
        )
}

const styles = StyleSheet.create({

    affiche: {
        height: 65,
        width: 65,
        top: 3,
        left: 3,
        justifyContent: 'flex-end',
    },
    shadow: {
        borderRadius: 100,
        margin: 10,
        marginBottom: 25,
        height: 70,
        width: 70,
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
})