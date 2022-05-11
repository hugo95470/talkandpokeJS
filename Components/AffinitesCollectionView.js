import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Text, Image, View} from 'react-native';
import { useEffect, useState  } from 'react';

import Context from '../navigation/userContext';
import { getUtilisateurAffinites } from '../service/UtilisateurService';
import globalStyles from '../Styles/globalStyles';
import AlertText from './AlertText';

export default function AffinitesCollectionView(props) {
    
    const context = useContext(Context)

    //AFFICHAGE DES AFFINITES
    var [affinites, setAffinites] = useState("");
    
    useEffect(async () => {
        if(context.utilisateurToken != "") {
            let data = await getUtilisateurAffinites(context.utilisateurToken)
            setAffinites(data);
        }
        
    }, [context.utilisateurToken]);
            
    var ItemAffinite = ({ pseudo, image, pourcentage, contactId }) => (
        
        <TouchableOpacity style={[{marginLeft: 10, marginRight: 10, marginBottom: 0, marginTop: 10}]} onPress={() => props.navigation.navigate('ContactPage', {_profilId: contactId, _image: image})}>
            <View>
                <View style={[globalStyles.shadows, globalStyles.cercle]}>
                    <Image source={{uri: image}} resizeMode="cover" style={styles.affiniteImage}/>
                </View>
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
            <SafeAreaView>
                <AlertText title={"Compatibilités"}/>

                <FlatList data={affinites} renderItem={renderItemAffinite} keyExtractor={item => item.UtilisateurId} numColumns="10"/>
            </SafeAreaView>
        )
    }else{
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('SwipePage')}>
                <Text style={{margin: 20}}>Aucune affinité pour l'instant ? a͟l͟l͟e͟z͟ v͟o͟u͟s͟ e͟n͟ f͟a͟i͟r͟e͟ ! 😁👍</Text>
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
    }
})

