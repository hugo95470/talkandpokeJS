import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, Image, View} from 'react-native';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import Context from '../navigation/userContext';
import { loadUtilisateurAffinites } from '../service/UtilisateurService';

function AffinitesCollectionView(props) {
    
    const context = useContext(Context)

    //AFFICHAGE DES AFFINITES
    var [affinites, setAffinites] = useState("");
    
    useEffect(async () => {
        await loadAffinites()
    }, []);

    useEffect(async () => {
        if(props.reload == true){
            await loadAffinites()
        }
    }, [props.reload])

    async function loadAffinites() {
        setAffinites(await loadUtilisateurAffinites(context.utilisateurToken));
    }
            
    var ItemAffinite = ({ pseudo, image, pourcentage, contactId }) => (
        
        <TouchableOpacity style={{marginLeft: 10, marginRight: 10, marginBottom: 40, marginTop: 10}} onPress={() => props.navigation.navigate('ContactPage', {_profilId: contactId, _image: image})}>
            <View style={styles.shadow}>
                <Image source={{uri: image}} resizeMode="cover" style={styles.affiniteImage}/>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'black', textAlign: 'center', fontSize: 14, fontFamily: 'sans-serif-light',}}>{pourcentage} %</Text>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'black', textAlign: 'center', fontSize: 14, fontFamily: 'sans-serif-light',}}>{pseudo}</Text>
            </View>
        </TouchableOpacity>
    );

    var renderItemAffinite = ({ item }) => (
        <ItemAffinite style={styles.containerAffiches} pseudo={item.Pseudo} image={item.Image} pourcentage={item.Pourcentage} contactId={item.UtilisateurId} />
    );

    if(affinites != false){
        return (
            <FlatList style={{height: '140%'}} data={affinites} renderItem={renderItemAffinite} keyExtractor={item => item.OeuvreId} numColumns="10"/>
        )
    }else{
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('SwipePage')}>
                <Text style={{margin: 20}}>Aucune affinit?? pour l'instant ? a??l??l??e??z?? v??o??u??s?? e??n?? f??a??i??r??e?? ! ????????</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    affiniteImage: {
        height: 80,
        width: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'flex-end',
        borderRadius: 100,          
    },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        height: 84,
        width: 84,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 100, 
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,  
    },
})

export default AffinitesCollectionView