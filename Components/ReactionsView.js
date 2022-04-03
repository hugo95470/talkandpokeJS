
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

function ReactionsView(props) {

        var [ coeurIsPress, setCoeurIsPress ] = useState(false);
        var [ likeIsPress, setLikeIsPress ] = useState(false);
        var [ dislikeIsPress, setDislikeIsPress ] = useState(false);
        var [ pokeIsPress, setPokeIsPress ] = useState(false);
        var [ describMeIsPress, setDescribMeIsPress ] = useState(false);

        useEffect(() => {
            if(props.AfficheId != "" && props.utilisateurId != "" && props.tokenUtilisateur != ""){

                fetch(global.apiUrl + 'Reaction/GetReactions.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur)
                .then((response) => response.json())
                .then((data => {
                    data.forEach(element => {
                        if(element.Emotion == 'like'){
                            setLikeIsPress(true)
                        }
                            
                        if(element.Emotion == 'dislike'){
                            setDislikeIsPress(true)
                        }
                            
                        if(element.Emotion == 'coeur'){
                            setCoeurIsPress(true)
                        }
                    });
                                  
                }))

                fetch(global.apiUrl + 'Reaction/GetPokes.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur)
                .then((response) => response.json())
                .then((data => {
                    if(data != false){
                        setPokeIsPress(true)
                    }
                                  
                }))


                fetch(global.apiUrl + 'Reaction/GetDescribMe.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur)
                .then((response) => response.json())
                .then((data => {
                    if(data != false){
                        setDescribMeIsPress(true)
                    }
                                  
                }))
                
            }
        }, [props.newsId, props.utilisateurId, props.tokenUtilisateur]);

        var PouceDown = () => {
            if(dislikeIsPress){
                return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=dislike&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setDislikeIsPress(!dislikeIsPress))} style={styles.opacityStrong} >
                        <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                    </TouchableOpacity>
                </View>
                );
            }else{
                return(
                    <View style={styles.containerReaction}>
                        <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=dislike&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setDislikeIsPress(!dislikeIsPress))} style={styles.opacityWeak} >
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
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=coeur&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setCoeurIsPress(!coeurIsPress))} style={styles.opacityStrong} >
                        <Image style={styles.emoji} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                    </TouchableOpacity>
                </View>
                );
            }else{
                return(
                    <View style={styles.containerReaction}>
                        <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=coeur&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setCoeurIsPress(!coeurIsPress))} style={styles.opacityWeak} >
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
                    <TouchableOpacity onPress={() =>  fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=like&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setLikeIsPress(!likeIsPress))} style={styles.opacityStrong} >
                        <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                    </TouchableOpacity>
                </View>
                );
            }else{
                return(
                    <View style={styles.containerReaction}>
                        <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddReaction.php?UtilisateurId=' + props.utilisateurId + '&Emotion=like&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then(() => setLikeIsPress(!likeIsPress))} style={styles.opacityWeak} >
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
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddPoke.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Poke a déjà été atteint'):0).then(() => setPokeIsPress(!pokeIsPress))} style={styles.opacityStrong} >
                        <Image style={styles.emoji} source={require('../Images/Poke.png')}/>
                    </TouchableOpacity>
                </View>
                );
            }else{
                return(
                    <View style={styles.containerReaction}>
                        <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddPoke.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Poke a déjà été atteint'):0).then(() => setPokeIsPress(!pokeIsPress))} style={styles.opacityWeak} >
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
                    <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddDescribMe.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Describ me a déjà été atteint'):0).then(() => setDescribMeIsPress(!describMeIsPress))} style={styles.opacityStrong} >
                        <Image style={styles.emoji} source={require('../Images/DescribMe.png')}/>
                    </TouchableOpacity>
                </View>
                );
            }else{
                return(
                    <View style={styles.containerReaction}>
                        <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/AddDescribMe.php?UtilisateurId=' + props.utilisateurId + '&AfficheId=' + props.AfficheId + '&TokenUtilisateur=' + props.tokenUtilisateur).then((response) => response.json()).then(data => data == 0?alert('Votre nombre maximal de Describ me a déjà été atteint'):0).then(() => setDescribMeIsPress(!describMeIsPress))} style={styles.opacityWeak} >
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
    opacityWeak: {
        opacity: 0.3,
    },
    opacityStrong: {
        opacity: 1,
    },
    containerReaction: {
        backgroundColor: '#eee',
        borderRadius: 100,
        elevation: 5,
        margin: 10,
    },
})


export default ReactionsView