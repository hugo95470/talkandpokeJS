import React, { useContext } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import TopBarre from '../Components/TopBarre';
import Context from '../navigation/userContext';
import AlertText from '../Components/AlertText'

export default function ProfilPage(props) {   

    const context = useContext(Context)

    let { emotion } = props.route.params;

    //AFFICHAGE DES AFFINITES
    let [reactions, setReactions] = useState("");
    let [titre, setTitre] = useState("");
    let [message, setMessage] = useState("");
    

    let DeleteButton = ({ afficheId }) => {
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

    let ItemAffiche = ({ image, afficheId }) => {
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
        if(emotion != undefined) {
            let url = '';

            switch(emotion) {
                case 'like':
                    url = 'Reaction/GetLikes.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken;
                    setTitre('Likes');
                    setMessage('Toues vos Like');
                    break;

                case 'dislike':
                    url = 'Reaction/GetDislikes.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken;
                    setTitre('Likes');
                    setMessage('Tous vos Dislikes');
                    break;

                case 'coeur':
                    url = 'Reaction/GetCoeurs.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken;
                    setTitre('Coeurs');
                    setMessage('Tous vos Coeurs');
                    break;

                case 'me':
                    url = 'Reaction/GetDescribMe.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken;
                    setTitre('Me');
                    setMessage('Tous vos Me');
                    break;

                case 'poke':
                    url = 'Reaction/GetPokes.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken;
                    setTitre('Pokes');
                    setMessage('Tous vos Poke');
                    break;
                
                default:
                    alert('wtf did you do ??');
                    break;

            }

            getReactions(url)
        }
    }, [props.utilisateurId, emotion, context.utilisateurToken]);

    function getReactions(url){
        if(props.emotion != undefined) {}

        fetch(global.apiUrl + url)
        .then((response) => response.json())
        .then((data) => setReactions(data)); 
    }

    return (

        <View>
            <TopBarre/>

            <View style={{flexDirection: 'row'}}>
                <View style={styles.containerReaction}>
                    <Image style={{height: 60, width: 60, margin: 4}} source={require('../Images/Poke.png')}/>
                </View>
                <View style={{paddingTop: 15}}>
                    <AlertText title={titre} description={message}/>
                </View>

            </View>
            <FlatList data={reactions} renderItem={renderItemAffiche} keyExtractor={item => item.OeuvreId} numColumns="3"/>
        </View>   

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
