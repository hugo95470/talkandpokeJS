
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { getAfficheUtilisateurMe, getAfficheUtilisateurPoke, getAfficheUtilisateurReactions } from '../service/ReactionService';
import globalStyles from '../Styles/globalStyles';

//TODO: TO REFACTOR

export default function ReactionsView(props) {

    var [ coeurIsPress, setCoeurIsPress ] = useState(false);
    var [ likeIsPress, setLikeIsPress ] = useState(false);
    var [ dislikeIsPress, setDislikeIsPress ] = useState(false);
    var [ pokeIsPress, setPokeIsPress ] = useState(false);
    var [ describMeIsPress, setDescribMeIsPress ] = useState(false);

    useEffect(() => {
        //SET REACTIONS
        getAfficheUtilisateurReactions(props.AfficheId, props.tokenUtilisateur)
        .then((data => {
            data.forEach(element => {
                switch(element.Emotion) {
                    case 'like':
                        setLikeIsPress(true);
                        break;
                    
                    case 'dislike':
                        setDislikeIsPress(true);
                        break;

                    case 'coeur':
                        setCoeurIsPress(true);
                        break;
                }
            });
                            
        }))

        //SET POKE
        getAfficheUtilisateurPoke(props.AfficheId, props.tokenUtilisateur)
        .then(data => data != false ? setPokeIsPress(true) : setPokeIsPress(false))

        //SET ME
        getAfficheUtilisateurMe(props.AfficheId, props.tokenUtilisateur)
        .then(data => data != false ? setDescribMeIsPress(true) : setsetDescribMeIsPressPokeIsPress(false))

    }, []);

    var PouceDown = () => {
        if(dislikeIsPress){
            return(
            <View style={styles.containerReaction}>
                <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=dislike&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setDislikeIsPress(!dislikeIsPress))}>
                    <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=dislike&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setDislikeIsPress(!dislikeIsPress))} style={globalStyles.opacityWeak} >
                        <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                    </TouchableOpacity>
                </View>
            ) 
        }
    }

    var Coeur = () => {
        if(coeurIsPress){
            return(
            <View style={styles.containerReaction}>
                <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=coeur&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setCoeurIsPress(!coeurIsPress))}>
                    <Image style={styles.emoji} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=coeur&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setCoeurIsPress(!coeurIsPress))} style={globalStyles.opacityWeak} >
                        <Image style={styles.emoji} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    var PouceUp = () => {
        if(likeIsPress){
            return(
            <View style={styles.containerReaction}>
                <TouchableOpacity onPress={() =>  fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=like&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setLikeIsPress(!likeIsPress))}>
                    <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=like&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setLikeIsPress(!likeIsPress))} style={globalStyles.opacityWeak} >
                        <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    var Poke = () => {
        if(pokeIsPress){
            return(
            <View style={styles.containerReaction}>
                <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddPoke.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Poke a déjà été atteint'):0).then(() => setPokeIsPress(!pokeIsPress))}>
                    <Image style={styles.emoji} source={require('../Images/Poke.png')}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddPoke.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Poke a déjà été atteint'):0).then(() => setPokeIsPress(!pokeIsPress))} style={globalStyles.opacityWeak} >
                        <Image style={styles.emoji} source={require('../Images/Poke.png')}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    var DescribeMe = () => {
        if(describMeIsPress){
            return(
            <View style={styles.containerReaction}>
                <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddDescribMe.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Describ me a déjà été atteint'):0).then(() => setDescribMeIsPress(!describMeIsPress))}>
                    <Image style={styles.emoji} source={require('../Images/DescribMe.png')}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddDescribMe.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Describ me a déjà été atteint'):0).then(() => setDescribMeIsPress(!describMeIsPress))} style={globalStyles.opacityWeak} >
                        <Image style={styles.emoji} source={require('../Images/DescribMe.png')}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    return (
        <View>
            <View style={styles.containerReactions}>

                <PouceDown/>

                <Coeur/>

                <PouceUp/>

            </View>

            <View style={styles.container2Reactions}>

                <DescribeMe/>

                <Poke/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerReactions: {
        justifyContent: 'space-around',
        padding: 8,
        flexDirection:'row',
        alignItems:'center'        
    },
    container2Reactions: {
        justifyContent: 'space-evenly',
        padding: 8,
        flexDirection:'row',
        alignItems:'center'        
    },
    emoji: {
        height: 40,
        width: 40, 
        margin: 15,
    },
    containerReaction: {
        backgroundColor: '#eee',
        borderRadius: 100,
        elevation: 5,
        margin: 10,
    },
})