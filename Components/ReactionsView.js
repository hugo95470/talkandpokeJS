
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { addAfficheMe, addPoke, getAfficheUtilisateurMe, getAfficheUtilisateurPoke, getAfficheUtilisateurReactions } from '../service/ReactionService';
import globalStyles from '../Styles/globalStyles';

//TODO: TO REFACTOR
import Context from '../navigation/userContext';
import { addReaction, removeReaction, getReactionsByAffiche } from '../service/OfflineReactionService';

export default function ReactionsView(props) {

    const context = useContext(Context)

    var [ coeurIsPress, setCoeurIsPress ] = useState(false);
    var [ likeIsPress, setLikeIsPress ] = useState(false);
    var [ dislikeIsPress, setDislikeIsPress ] = useState(false);
    var [ pokeIsPress, setPokeIsPress ] = useState(false);
    var [ describMeIsPress, setDescribMeIsPress ] = useState(false);

    useEffect(async () => {
        //SET REACTIONS
        await getReactionsByAffiche(props.AfficheId)
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

                    case 'me':
                        setDescribMeIsPress(true);
                        break;
                        
                    case 'poke':
                        setPokeIsPress(true);
                        break;
                }
            });
                            
        }))
    }, []);

    var PouceDown = () => {
        if(dislikeIsPress){
            return(
            <View style={styles.containerReaction}>
                <TouchableOpacity onPress={() => removeReaction(props.AfficheId, 'dislikes').then(() => setDislikeIsPress(!dislikeIsPress))}>
                    <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => addReaction(props.AfficheId, 'dislikes').then(() => setDislikeIsPress(!dislikeIsPress))} style={globalStyles.opacityWeak} >
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
                <TouchableOpacity onPress={() => removeReaction(props.AfficheId, 'coeurs').then(() => setCoeurIsPress(!coeurIsPress))}>
                    <Image style={styles.emoji} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => addReaction(props.AfficheId, 'coeurs').then(() => setCoeurIsPress(!coeurIsPress))} style={globalStyles.opacityWeak} >
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
                <TouchableOpacity onPress={() =>  removeReaction(props.AfficheId, 'likes').then(() => setLikeIsPress(!likeIsPress))}>
                    <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => addReaction(props.AfficheId, 'likes').then(() => setLikeIsPress(!likeIsPress))} style={globalStyles.opacityWeak} >
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
                <TouchableOpacity onPress={() => removeReaction(props.AfficheId, 'pokes').then(() => setPokeIsPress(!pokeIsPress))}>
                    <Image style={styles.emoji} source={require('../Images/Poke.png')}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={() => addReaction(props.AfficheId, 'pokes').then(() => setPokeIsPress(!pokeIsPress))} style={globalStyles.opacityWeak} >
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
                <TouchableOpacity onPress={async () => await removeReaction(props.AfficheId, 'mes').then(() => setDescribMeIsPress(!describMeIsPress))}>
                    <Image style={styles.emoji} source={require('../Images/DescribMe.png')}/>
                </TouchableOpacity>
            </View>
            );
        }else{
            return(
                <View style={styles.containerReaction}>
                    <TouchableOpacity onPress={async () => await addReaction(props.AfficheId, 'mes').then(() => setDescribMeIsPress(!describMeIsPress))} style={globalStyles.opacityWeak} >
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