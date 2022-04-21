import React, { useContext } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, FlatList, Text, ImageBackground} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';
import { getUtilisateursContacts } from '../service/MessageService';
import globalStyles from '../Styles/globalStyles';

export default function ContactsCollectionView(props) {

        const context = useContext(Context)

        var [contacts, setContacts] = useState("");

        useEffect(async () => {
            setContacts(await getUtilisateursContacts(context.utilisateurToken));
        }, []);

                
        var ItemNews = ({ image, contactId }) => {

            return(
                <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('MessagePage', {_expediteurId: contactId, _image: props.Image, _message: 'regardes ca !'})}>
                    <View style={[globalStyles.shadows, {borderRadius: 100, margin: 10, marginBottom: 25, height: 70, width: 70, backgroundColor : '#fff'}]}>
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
})