import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, ImageBackground, Image, View} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';
import AlertText from './AlertText'


//TO REMOVE ? 


export default function PokesView(props) {

        const context = useContext(Context);

        useEffect(async () => {
            setPokes(await getUtilisateurPokes(context.utilisateurToken))
            //getPokes()
        }, [props.utilisateurId, context.utilisateurToken]);

        //AFFICHAGE DES AFFINITES
        var [pokes, setPokes] = useState("");

        var ItemAffiche = ({ image, afficheId }) => {
            return(
                <TouchableOpacity  activeOpacity={1} style={{marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'transparent', padding: 4, borderRadius: 19}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: afficheId, _Image: image})}>
                    <ImageBackground imageStyle={{ borderRadius: 15, height: 150, width: 100}} source={{uri: image}} resizeMode="cover" style={styles.Affiche}>
                    </ImageBackground>
                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => {
            return(
                <ItemAffiche style={styles.containerAffiches} image={item.Image} afficheId={item.AfficheId} />
                )
        };

        if(pokes != "")
            return (

                <View>
                    <View style={{flexDirection: 'row'}}>
                        <View style={styles.containerReaction}>
                            <Image style={{height: 60, width: 60, margin: 4}} source={require('../Images/Poke.png')}/>
                        </View>
                        <View style={{paddingTop: 15}}>
                            <AlertText title={"Pokes"} description={"Les pokes sont les trois Affiches que vous preferez parmis toutes celles proposé ! Attention vous ne pouvez en avoir que 3, maitrisez vos émotions !"}/>
                        </View>

                    </View>
                    <FlatList data={pokes} renderItem={renderItemAffiche} keyExtractor={item => item.OeuvreId} numColumns="3"/>
                </View>   

            )
        else
        return(
            <View></View>
        )
}

const styles = StyleSheet.create({
    containerReaction: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 100,
        elevation: 5,
        margin: 10,
        width: 68,
        height: 68,
    },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Affiche: {
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
})