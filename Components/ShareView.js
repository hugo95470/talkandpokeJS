import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, Text} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";

import Context from '../navigation/userContext';
import { getNombreReaction } from '../service/ReactionService';
import { updateFriend } from '../service/UtilisateurService';
import globalStyles from '../Styles/globalStyles';

export default function ShareView(props) {

    const context = useContext(Context)

    var [friend, setFriend] = useState(false);

    var [nombreCoeur, setNombreCoeur] = useState(0);
    var [nombreLike, setNombreLike] = useState(0);
    var [nombreDislike, setNombreDislike] = useState(0);

    useEffect(async () => {
        await getNombreReaction(props.profilId, context.utilisateurToken)
        .then((data) => {
            setNombreLike(data[0]['Nombre'])
            setNombreDislike(data[1]['Nombre'])
            setNombreCoeur(data[2]['Nombre'])
        });

        await getContactFriend(context.utilisateurToken, context.utilisateurId, props.profilId)
        .then((data) => data.FriendId == props.profilId ? setFriend(true):setFriend(false));


    }, []);

    function beFriend(){
        updateFriend(context.utilisateurToken, props.profilId)
        setFriend(!friend)
    }

    
    var Ami = () => {
        if(!friend){
            return(
                <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white'}}>Follow</Text>
            )
            
        }else{
            return(
                <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white'}}>Unfollow</Text>
            )
        }
    };

    if(props.profilId != context.utilisateurId){
        return(
            <View>
                <View style={[globalStyles.center, {display: props.photo.Description==""?"none":"flex", backgroundColor: '#fff', elevation: 1, borderRadius: 100}]}>
                    <Text style={{marginBottom: 10, marginTop: 10, borderRadius: 19, paddingHorizontal: 20}}>{props.photo?props.photo.Description:""}</Text>
                </View>
                
                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly'}}>
                    <View>
                        <Image style={{marginLeft: 'auto', marginRight: 'auto', height: 30, width: 30}} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontWeight: '700', fontFamily: 'sans-serif-light'}}>{nombreDislike}</Text>
                    </View>
                    <View>
                        <Image style={{marginLeft: 'auto', marginRight: 'auto', height: 30, width: 30}} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontWeight: '700', fontFamily: 'sans-serif-light'}}>{nombreCoeur}</Text>
                    </View>
                    <View>
                        <Image style={{marginLeft: 'auto', marginRight: 'auto', height: 30, width: 30}} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontWeight: '700', fontFamily: 'sans-serif-light'}}>{nombreLike}</Text>
                    </View>
                </View>
                
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
                        <TouchableOpacity style={{backgroundColor: 'rgb(254, 165, 42)', borderRadius: 6, minWidth: 110, paddingHorizontal: 30, paddingVertical: 10}} onPress={() => props.navigation.navigate('FollowersPage', {utilisateurId: props.profilId})}>
                            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white'}}>Abonnés</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{backgroundColor: 'white', borderWidth: 3, borderColor: 'rgb(254, 165, 42)', borderRadius: 6, minWidth: 110, paddingHorizontal: 30, paddingVertical: 10}} onPress={() => props.navigation.navigate('FrFollowingPageiendPage', {utilisateurId: props.profilId})}>
                            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'rgb(254, 165, 42)'}}>Abonnement</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('MessagePage', {_isOeuvre: false, _expediteurId: props.profilId})}>
                            <LinearGradient colors={['rgb(254, 165, 42)', 'rgbrgb(254, 165, 42)']}start={{x: 0, y: 1}} end={{x: 1, y: -1}} style={{height: 60, width: 60, borderRadius: 100, alignSelf: 'flex-end'}}>
                                <Image style={{height: 40, width: 40, top: 10, left: 10}} source={{uri: 'https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-388b76121ea0e4223a20cfea7b202e09.png'}}/>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity style={{paddingHorizontal: 20, maxHeight: 50, marginTop: 5, minWidth: 120, borderRadius: 8, backgroundColor: !friend?'rgb(254, 165, 42)':"#DDD"}} onPress={() => beFriend()}>
                            <Ami/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
        
    }else{
        return(
            
            <View style={{top: -40}}>
                <View style={[globalStyles.center, {display: props.photo.Description==""?"none":"flex", backgroundColor: '#fff', elevation: 1, borderRadius: 100}]}>
                    <Text style={{marginBottom: 10, marginTop: 10, borderRadius: 19, paddingHorizontal: 20}}>{props.photo?props.photo.Description:""}</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-evenly'}}>
                    <View>
                        <Image style={{marginLeft: 'auto', marginRight: 'auto', height: 30, width: 30}} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontWeight: '700', fontFamily: 'sans-serif-light'}}>{nombreDislike}</Text>
                    </View>
                    <View>
                        <Image style={{marginLeft: 'auto', marginRight: 'auto', height: 30, width: 30}} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontWeight: '700', fontFamily: 'sans-serif-light'}}>{nombreCoeur}</Text>
                    </View>
                    <View>
                        <Image style={{marginLeft: 'auto', marginRight: 'auto', height: 30, width: 30}} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontWeight: '700', fontFamily: 'sans-serif-light'}}>{nombreLike}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10}}>
                    
                    <TouchableOpacity style={{backgroundColor: 'rgb(254, 165, 42)', borderRadius: 6, minWidth: 110, paddingHorizontal: 30, paddingVertical: 10}} onPress={() => props.navigation.navigate('FollowersPage', {utilisateurId: props.profilId})}>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white'}}>Abonnés</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{backgroundColor: 'white', borderWidth: 3, borderColor: 'rgb(254, 165, 42)', borderRadius: 6, minWidth: 110, paddingHorizontal: 30, paddingVertical: 10}} onPress={() => props.navigation.navigate('FollowingPage', {utilisateurId: props.profilId})}>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'rgb(254, 165, 42)'}}>Abonnement</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}