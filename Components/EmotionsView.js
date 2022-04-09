import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, ImageBackground, View, Image} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';


// TO REMOVE


function EmotionsView(props) {

        const context = useContext(Context)

        //AFFICHAGE DES AFFINITES
        var [coeurs, setCoeurs] = useState("");
        var [likes, setLikes] = useState("");
        var [dislikes, setDislikes] = useState("");

        var ItemAffiche = ({ image, AfficheId, maColor }) => {
            return(
                <TouchableOpacity  activeOpacity={1} style={{marginRight: 'auto', marginLeft: 'auto', backgroundColor: maColor, padding: 4, marginTop: 5, borderRadius: 19}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: AfficheId, _Image: image})}>
                    <ImageBackground imageStyle={{ borderRadius: 15, height: 150, width: 100}} source={{uri: image}} resizeMode="cover" style={styles.Affiche}>
                        {/* <DeleteButton AfficheId={AfficheId}/> */}
                    </ImageBackground>
                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => {
            return(
                <ItemAffiche style={styles.containerAffiches} image={item.Image} AfficheId={item.AfficheId} maColor={item.color}/>
                )
        };

        let mounted = true;

        useEffect(() => {
            if(mounted){
                 getReactions();
            }

            return () => mounted = false;
        }, [props.utilisateurId, context.utilisateurId, context.utilisateurToken]);

        async function getReactions() {
            await fetch(global.apiUrl + 'Reaction/GetReactions.php?UtilisateurId=' + props.utilisateurId + '&ContactId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => {
                const _liens = Object.entries(data).map(obj => {
                    var rObj = {};
                    var Macolor = 'transparent'

                    if(obj[1].MaReaction == 'orange')
                        Macolor='#FEA52A'

                    rObj['title'] = obj[1].Emotion;
                    rObj['data'] = [{Identifier: obj[1].Identifier, Image: obj[1].Image, AfficheId: obj[1].AfficheId, color: Macolor}];
                    return rObj;
                  })
                  .reduce((item, { title, data }) => {
                    if (!item[title]) item[title] = [];
                    item[title].push(data[0]);
                    return item;
                  }, {});
                try {
                    setDislikes(_liens.dislike)
                }catch(e){

                }
                try {
                    setCoeurs(_liens.coeur)
                }catch(e){

                }
                try {
                    setLikes(_liens.like)
                }catch(e){

                }
            });  
        }

        var CoeursReactions = ({ items }) => {
            return(
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={() => alert('Lorsqu\'une affiche est surligné de orange, cela signifie que cette personne a eu la même réaction que vous !')}>
                        <View style={styles.containerReaction}>
                            <Image style={styles.emoji} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                            <Text style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 10, fontSize: 20, width: 100}}>Coeurs</Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList data={items} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="3"/>                
                </View>
                )
        };
        var LikesReactions = ({ items }) => {
            return(
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={() => alert('Lorsqu\'une affiche est surligné de orange, cela signifie que cette personne a eu la même réaction que vous !')}>
                        <View style={styles.containerReaction}>
                            <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                            <Text style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 10, fontSize: 20, width: 100}}>Likes</Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList data={items} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="3"/>                
                </View>
                )
        };
        var DislikesReactions = ({ items }) => {
            return(
                <View>
                    <TouchableOpacity activeOpacity={1} onPress={() => alert('Lorsqu\'une affiche est surligné de orange, cela signifie que cette personne a eu la même réaction que vous !')}>
                        <View style={styles.containerReaction}>
                            <Image style={styles.emoji} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                            <Text style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 10, fontSize: 20, width: 100}}>Dislikes</Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList data={items} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="3"/>                
                </View>
                )
        };

        return (
            <View>
                <LikesReactions items={likes}/>
                <CoeursReactions items={coeurs}/>
                <DislikesReactions items={dislikes}/>
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


export default EmotionsView