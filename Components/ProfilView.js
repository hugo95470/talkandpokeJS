import React, { useContext } from 'react';
import { StyleSheet,FlatList, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";

import Context from '../navigation/userContext';
import ImagePourcentage from './ImagePourcentage';
import {loadUtilisateurCoeurs, loadUtilisateurLikes, loadUtilisateurDislikes,loadUtilisateurMes, loadUtilisateurPokes} from '../service/ReactionService';

export default function ProfilPage(props) {

    const context = useContext(Context)

    var [photo, setPhoto] = useState("");
    var [affinite, setAffinite] = useState(0);
    var [_height, set_Height] = useState(100);
    var [friend, setFriend] = useState(false);

    var [nombreCoeur, setNombreCoeur] = useState(0);
    var [nombreLike, setNombreLike] = useState(0);
    var [nombreDislike, setNombreDislike] = useState(0);

    var [reaction, setReaction] = useState('Poke');
    var [affiches, setAffiches] = useState('');

    useEffect(async () => {
        
        switch(reaction) {
            case 'Coeur' :
                setAffiches(await loadUtilisateurCoeurs(context.utilisateurToken))
                break;
            
            case 'Like' :
                setAffiches(await loadUtilisateurLikes(context.utilisateurToken))
                break;
            
            case 'Dislike' :
                setAffiches(await loadUtilisateurDislikes(context.utilisateurToken))
                break;

            case 'Me' :
                setAffiches(await loadUtilisateurMes(context.utilisateurToken))
                break;

            case 'Poke' :
                setAffiches(await loadUtilisateurPokes(context.utilisateurToken))
                break;

            default:
                break;
        }

    }, [reaction]);

    let mounted = true;
    useEffect(() => {
        
        if(mounted){
            if(context.utilisateurId != ''){
                if(props.profilId != context.utilisateurId){
                    set_Height(0)
                }
            }

            loadProfil();
        }
        return () => mounted = false;

    }, [props.profilId, context.utilisateurId, context.utilisateurToken]);

    function loadProfil() {        
        fetch(global.apiUrl + 'Utilisateur/GetUtilisateur.php?UtilisateurId=' + props.profilId)
        .then((response) => response.json())
        .then((data) => setPhoto(data));

        fetch(global.apiUrl + 'Utilisateur/GetAffinite.php?UtilisateurId=' + context.utilisateurId + '&ContactId=' + props.profilId + '&TokenUtilisateur=' + context.utilisateurToken)
        .then((response) => response.json())
        .then((data) => setAffinite(data));

        fetch(global.apiUrl + 'Utilisateur/GetFriends.php?UtilisateurId=' + context.utilisateurId + '&FriendId=' + props.profilId + '&TokenUtilisateur=' + context.utilisateurToken)
        .then((response) => response.json())
        .then((data) => data.FriendId == props.profilId ? setFriend(true):setFriend(false));

        fetch(global.apiUrl + 'Reaction/GetNombreReactions.php?UtilisateurId=' + props.profilId + '&TokenUtilisateur=' + context.utilisateurToken)
        .then((response) => response.json())
        .then((data) => {
            setNombreLike(data[0]['Nombre'])
            setNombreDislike(data[1]['Nombre'])
            setNombreCoeur(data[2]['Nombre'])
        });
    }

    var ImageProfil = () => {
        if(props.profilId != context.utilisateurId){
            return(
                <View style={{width: '98%', marginTop: 20}}>
                    <ImageBackground imageStyle={{ borderRadius: 19}} source={{uri: photo.Baniere}} style={styles.Affiche}>

                        <View style={{marginLeft: 'auto', bottom: -100, marginRight: 'auto'}}>
                            <ImagePourcentage taille={150} image={props.Image} name={affinite.Pseudo} showPourcentage={true} pourcentage={affinite.Pourcentage}/>
                        </View>
                    </ImageBackground>                    
                </View>
            )
            
        }else{
            return(
                <View style={{width: '98%'}}>
                    <ImageBackground imageStyle={{ borderRadius: 19}} source={{uri: photo.Baniere}} style={styles.Affiche}>

                        <View style={{marginLeft: 'auto', bottom: -100, marginRight: 'auto'}}>
                            <ImagePourcentage taille={150} image={context.utilisateurPhoto} name={affinite.Pseudo} showPourcentage={false} pourcentage={100}/>

                            <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => props.navigation.navigate("ChangeProfilPage")}>
                                    <LinearGradient colors={['rgb(254, 165, 42)', 'rgbrgb(254, 165, 42)']}start={{x: 0, y: 1}} end={{x: 1, y: -1}} style={{height: 40, width: 40, borderRadius: 100, alignSelf: 'flex-end'}}>
                                        <Image style={{height: 20, width: 20, top: 10, left: 10, backgroundColor: 'transparent'}} source={{uri: 'https://www.shareicon.net/data/256x256/2017/02/09/878618_edit_512x512.png'}}/>
                                    </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    
                </View>
            )
            
        }
    };

    var BackArrow = () => {
        if(props.profilId != context.utilisateurId){
            return(
                <View style={{flexDirection: 'row', height: 100}}>
                    <TouchableOpacity style={{position: 'absolute', left: 20, bottom: 0}} onPress={() => props.navigation.pop()}>
                        <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                            <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            
        }else{
            return(
                <View>
                </View>
            )
        }
    };

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

    function beFriend(){
        fetch(global.apiUrl + 'Utilisateur/SetFriends.php?UtilisateurId=' + context.utilisateurId + '&FriendId=' + props.profilId + '&TokenUtilisateur=' + context.utilisateurToken)
        setFriend(!friend)
    }

    var renderItemAffiche = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('DetailsOeuvrePage', {AfficheId: item.AfficheId, _Image: item.Image})} style={{height: 180, width: '32%', margin: '0.5%', backgroundColor: '#ddd', borderRadius: 15}}>
                <ImageBackground isBackground style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 15}} source={{uri: item.Image}} resizeMode="cover">
                </ImageBackground>
            </TouchableOpacity>
            
        )
    }
    
    var Share = () => {
        if(props.profilId != context.utilisateurId){
            return(
                <View>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, paddingLeft: 15, backgroundColor: '#fff', elevation: 1, borderRadius: 19, padding: 10}}>{photo.Description}</Text>
                    
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
                                <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white'}}>Followers</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor: 'white', borderWidth: 3, borderColor: 'rgb(254, 165, 42)', borderRadius: 6, minWidth: 110, paddingHorizontal: 30, paddingVertical: 10}} onPress={() => props.navigation.navigate('FrFollowingPageiendPage', {utilisateurId: props.profilId})}>
                                <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'rgb(254, 165, 42)'}}>Following</Text>
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
                
                <View>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, marginTop: 10, paddingLeft: 15, backgroundColor: '#fff', elevation: 1, borderRadius: 19, padding: 10}}>{photo.Description}</Text>
                    
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
                            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'white'}}>Followers</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{backgroundColor: 'white', borderWidth: 3, borderColor: 'rgb(254, 165, 42)', borderRadius: 6, minWidth: 110, paddingHorizontal: 30, paddingVertical: 10}} onPress={() => props.navigation.navigate('FollowingPage', {utilisateurId: props.profilId})}>
                            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', fontSize: 18, color: 'rgb(254, 165, 42)'}}>Following</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        }
    };
     
    return(
        <View style={{position: 'absolute', top: _height, width: '100%'}}>
            <ScrollView style={{height: 900}}>

                <BackArrow/>

                <View style={{marginBottom: 100}}>
                    <ImageProfil/>
                </View>

                <Share/>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => setReaction("Poke")} style={{flexDirection: 'row', marginRight: 20, marginLeft: 10, borderBottomWidth: reaction=="Poke"?3:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={require('../Images/Poke.png')}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Poke</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Me")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Me"?3:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={require('../Images/DescribMe.png')}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Coeur")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Coeur"?3:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Coeur</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Like")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Like"?3:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Like</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Dislike")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Dislike"?3:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={{uri :'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Dislike</Text>
                    </TouchableOpacity>
                </View>
                
                <FlatList data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.TagId} 
                        numColumns="3"></FlatList>

                <View style={{height: 300}}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        bottom: -40,
        borderWidth: 5,
        borderColor: '#ddd'
    },
    Affiche: {
        height: 150,
        backgroundColor: '#FEA52A',
        borderRadius: 19,
        width: '100%',
        marginLeft: '1%',
        marginBottom: 80,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    },
  })