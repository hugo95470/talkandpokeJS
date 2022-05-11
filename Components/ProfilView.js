import React, { useContext } from 'react';
import { StyleSheet,FlatList, Text, View, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";

import BackArrowView from '../Components/BackArrowView';
import ShareView from '../Components/ShareView';
import Context from '../navigation/userContext';
import ImagePourcentage from './ImagePourcentage';
import {getUtilisateurCoeurs, getUtilisateurLikes, getUtilisateurDislikes,getUtilisateurMes, getUtilisateurPokes} from '../service/ReactionService';
import { getContactAffinites, getContactFriend, getUtilisateurInformations } from '../service/UtilisateurService';
import globalStyles from '../Styles/globalStyles';

export default function (props) {

    const context = useContext(Context)

    var [photo, setPhoto] = useState("");
    var [affinite, setAffinite] = useState(0);
    var [_height, set_Height] = useState(100);

    var [reaction, setReaction] = useState('Coeur');
    var [affiches, setAffiches] = useState('');

    useEffect(async () => {
        if(props.profilId != context.utilisateurId){
            set_Height(0)
        }

        await loadProfil();
    }, []);

    useEffect(async () => {
        
        switch(reaction) {
            case 'Coeur' :
                setAffiches(await getUtilisateurCoeurs(props.profilId, context.utilisateurId));
                break;
            
            case 'Like' :
                setAffiches(await getUtilisateurLikes(props.profilId, context.utilisateurId));
                break;
            
            case 'Dislike' :
                setAffiches(await getUtilisateurDislikes(props.profilId, context.utilisateurId));
                break;

            case 'Me' :
                setAffiches(await getUtilisateurMes(props.profilId));
                break;

            case 'Poke' :
                setAffiches(await getUtilisateurPokes(props.profilId));
                break;

            case 'Mine' :
                setAffiches("")
                break;

            default:
                break;
        }

    }, [reaction]);    

    async function loadProfil() {
        try {
            setPhoto(await getUtilisateurInformations(props.profilId));

            setAffinite(await getContactAffinites(context.utilisateurToken, context.utilisateurId, props.profilId));
        }catch(e) {
            console.log(e)
        }
        
    }

    var ImageProfil = () => {
        if(props.profilId != context.utilisateurId){
            return(
                <View style={{width: '98%', marginTop: 10}}>
                    <ImageBackground imageStyle={{ borderRadius: 19}} source={{uri: photo.Baniere}} style={styles.Affiche}>

                        <View style={{marginLeft: 'auto', bottom: -100, marginRight: 'auto'}}>
                            <ImagePourcentage taille={150} image={props.Image} name={affinite?affinite.Pseudo:""} showPourcentage={true} pourcentage={affinite?affinite.Pourcentage:""}/>
                        </View>
                    </ImageBackground>                    
                </View>
            )
            
        }else{
            return(
                <View style={{width: '98%'}}>
                    <ImageBackground imageStyle={{ borderRadius: 19}} source={{uri: photo.Baniere}} style={styles.Affiche}>

                        <View style={{marginLeft: 'auto', bottom: -100, marginRight: 'auto'}}>
                            <ImagePourcentage taille={150} image={context.utilisateurPhoto} name={affinite?affinite.Pseudo:""} showPourcentage={false} pourcentage={100}/>

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

    var renderItemAffiche = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('DetailsOeuvrePage', {AfficheId: item.AfficheId, _Image: item.Image})} style={{height: 180, width: '32%', borderWidth: item.MaReaction=='orange'?2:0, borderColor: 'orange', margin: '0.5%', backgroundColor: '#ddd', borderRadius: 18}}>
                <ImageBackground isBackground style={{width: '100%', height: '100%'}} imageStyle={{ borderRadius: 15}} source={{uri: item.Image}} resizeMode="cover">
                </ImageBackground>
            </TouchableOpacity>
            
        )
    }

    var Mine = () => {
        if(reaction == "Mine") {
            return (
                <View style={[globalStyles.center]}>
                    <Text style={{fontSize: 20, margin: 20, textAlign: 'center'}}>Bientot ici vous pourez publier vos propre affiches !</Text>
                    <Text style={{fontSize: 20, margin: 20, textAlign: 'center'}}>Les gens pourront y réagir et vous pourrez enfin vous faire connaitre : )</Text>
                </View>
            )
        }else {
            return (
                <View></View>
            )
        }
        
    }
     
    return(
        <View style={{position: 'absolute', top: _height, width: '100%'}}>
            <ScrollView style={{height: 900}}>

                <BackArrowView profilId={props.profilId} navigation={props.navigation}/>

                <View style={{height: 350}}>
                    <ImageProfil/>
                </View>

                <ShareView profilId={props.profilId} navigation={props.navigation} photo={photo}/>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10}}>
                    <TouchableOpacity onPress={() => setReaction("Coeur")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Coeur"?2:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={{uri: 'https://i.pinimg.com/originals/17/72/8f/17728faefb1638f17586ea58645b4e7e.png'}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Coeur</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Like")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Like"?2:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={{uri: 'https://emojis.wiki/emoji-pics/apple/thumbs-up-apple.png'}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Like</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Dislike")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Dislike"?2:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={{uri :'https://emojis.wiki/emoji-pics/apple/thumbs-down-apple.png'}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Dislike</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity onPress={() => setReaction("Poke")} style={{flexDirection: 'row', marginRight: 20, marginLeft: 10, borderBottomWidth: reaction=="Poke"?2:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={require('../Images/Poke.png')}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Poke</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Me")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Me"?2:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, marginRight: 3}} source={require('../Images/DescribMe.png')}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Me</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setReaction("Mine")} style={{flexDirection: 'row', marginRight: 20, borderBottomWidth: reaction=="Mine"?2:0, borderBottomColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 20, width: 20, margin: 10, marginHorizontal: 0, borderRadius: 100, marginRight: 3}} source={props.profilId != context.utilisateurId?{uri: props.Image}:{uri: context.utilisateurPhoto}}/>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto'}}>Mine</Text>
                    </TouchableOpacity>

                </View>

                <Text style={globalStyles.title}>{reaction}</Text>

                <FlatList data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.AfficheId} 
                        numColumns="3"></FlatList>

                <Mine/>

                <View style={{height: 300}}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Affiche: {
        height: 150,
        backgroundColor: '#FEA52A',
        borderRadius: 19,
        width: '100%',
        marginLeft: '1%',
        marginBottom: 80,
        justifyContent: 'flex-end',
    },
  })