import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, ImageBackground, Image, View} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';
import AlertText from './AlertText'

function PokesView(props) {

        const context = useContext(Context);

        //AFFICHAGE DES AFFINITES
        var [pokes, setPokes] = useState("");
        
        var DeleteButton = ({ afficheId }) => {
            if(props.utilisateurId == context.utilisateurId){
                return(
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/DeletePoke.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + afficheId + '&TokenUtilisateur=' + context.utilisateurToken).then(getPokes())} style={{position: 'absolute', right: 0, height: 25, width: 25, borderRadius: 100, backgroundColor: 'orange'}}>
                        <Text style={{position: 'absolute', color: '#fff', left: 9, bottom: 5}}>x</Text>
                    </TouchableOpacity>
                );
            }else{
                return(<View></View>)
            }
            
        }

        var ItemAffiche = ({ image, afficheId }) => {
            return(

                
                <TouchableOpacity  activeOpacity={1} style={{marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'transparent', padding: 4, borderRadius: 19}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: afficheId, _Image: image})}>
                
                    <ImageBackground imageStyle={{ borderRadius: 15, height: 150, width: 100}} source={{uri: image}} resizeMode="cover" style={styles.Affiche}>
                    </ImageBackground>

                    {/* <DeleteButton afficheId={afficheId}/> */}
                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => {
            return(
                <ItemAffiche style={styles.containerAffiches} image={item.Image} afficheId={item.AfficheId} />
                )
        };


        useEffect(() => {
            getPokes()
        }, [props.utilisateurId, context.utilisateurToken]);

        function getPokes(){
            fetch(global.apiUrl + 'Reaction/GetPokes.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => setPokes(data)); 
        }

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
    emoji: {
        height: 40,
        width: 40, 
        margin: 15,
    },
    item: {
        backgroundColor: 'transparent',
        padding: 10,
        maxWidth: 150,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      header: {
        fontSize: 32,
        backgroundColor: "#fff"
      },
      title: {
        fontSize: 25,
        marginLeft: 30,
        color: 'black',
      },
      affiniteImage: {
          height: 80,
          width: 80,
          marginTop: 20,
          marginBottom: 5,
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'flex-end',
      },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      TitreContainer: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
    },
    Titre: {
        fontSize: 10,
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
    Affiche: {
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
})


export default PokesView