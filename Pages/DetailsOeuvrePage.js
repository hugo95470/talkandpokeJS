import React, { useContext } from 'react';
import { Image, StyleSheet, ScrollView, Text, ImageBackground, View, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";

import ReactionsView from '../Components/ReactionsView';
import LiensView from '../Components/LiensView';
import NewsCollectionView from '../Components/NewsCollectionView';
import ImagesCollectionView from '../Components/ImagesCollectionView';
import ContactsCollectionView from '../Components/ContactsCollectionView';
import CommentairesCollectionView from '../Components/CommentairesCollectionView';
import Context from '../navigation/userContext';


const DetailsOeuvrePage = ({ route, navigation }) => {

        const context = useContext(Context)

        const { AfficheId } = route.params;
        const { _Image } = route.params;

        var [affiche, setAffiche] = useState("");

        var [follow, setFollow] = useState("");
        var [image, setImage] = useState("");


        useEffect(() => {
            if(_Image != undefined) {
                setImage(_Image) 
            }
        }, [_Image]);

        //Charger la photo de L'utilisateur
        useEffect(() => {
            fetch(global.apiUrl + 'Affiche/GetInfosAffiche.php?AfficheId=' + AfficheId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => setAffiche(data));

        }, [AfficheId]);

        useEffect(() => {
            fetch(global.apiUrl + 'Affiche/Follow.php?UtilisateurId=' + context.utilisateurId + '&AfficheId=' + AfficheId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => setFollow(data));

        }, [context.utilisateurId, context.utilisateurId]);
    
        //pour aller vers spotify https://open.spotify.com/search/test

        var FollowText = () => {
            if(!follow){
                return(
                    <Text style={styles.follow}>Suivre</Text>
                )
                
            }else{
                return(
                    <Text style={styles.follow}>Suivit</Text>
                )
            }
        };

        function followCommand(){
            setFollow(!follow)
            fetch(global.apiUrl + 'Affiche/SetFollow.php?UtilisateurId=' + context.utilisateurId + '&AfficheId=' + AfficheId + '&TokenUtilisateur=' + context.utilisateurToken)
        }

        return (

            <View>

                <View style={styles.container}>
                    {/* <TopBarre/> */}

                    <ImageBackground source={{uri : image}} style={styles.image}>

                        <ScrollView >

                            <LinearGradient style={{height: Dimensions.get('window').height}} colors={['rgba(200,200,200,0)','rgba(200,200,200,0)','rgba(255,255,255,0.7)']}>

                                <TouchableOpacity style={{backgroundColor: '#fffa', height: 50, width: 50, marginTop: 50, marginLeft: 20, borderRadius: 100}} onPress={() => navigation.pop()}>
                                    <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                                        <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                                    </View>
                                </TouchableOpacity>

                                <View style={{marginTop: 'auto', marginBottom: 30, width: Dimensions.get('window').width}}>
                                    <Text style={{margin: 20, marginBottom: 0, fontSize: 30}}>{affiche.AfficheTitre} - {affiche.AfficheTitreSup}</Text>
                                    
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{margin: 20, width: Dimensions.get('window').width - 150}}>{affiche.Description}</Text>

                                        <View style={{backgroundColor: 'white', height: 50, width: 50, borderRadius: 100, marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
                                            <Image style={{height: 50, width: 50, opacity: 0.5, transform: [{ rotate: '-90deg' }]}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>

                            <View style={{backgroundColor: 'rgba(255,255,255,0.7)'}}>
                                <View style={{backgroundColor: 'rgba(255,255,255,0.99)', margin: 10, borderRadius: 19, paddingVertical: 20}}>
                                    <ReactionsView AfficheId={AfficheId} tokenUtilisateur={context.utilisateurToken} utilisateurId={context.utilisateurId}/>
                                </View>

                                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', margin: 20, marginVertical: 30, paddingBottom: 30, borderRadius: 19}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ContactPage', {_profilId: affiche.CreateurId})}>
                                        <Image style={{height: 80, width: 80, borderRadius: 100, marginLeft: 'auto', marginRight: 'auto', top: -20}} source={{uri: affiche.CreateurImage}}/>
                                        <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>Créé par {affiche.CreateurPseudo}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', flexDirection: 'row', justifyContent: 'space-between', margin: 20, marginVertical: 30, paddingBottom: 10, borderRadius: 19}}>
                                    <View style={{maxWidth: '60%'}}>
                                        <Text style={{margin: 20, fontSize: 23}}>{affiche.AfficheTitreSup}</Text>
                                        
                                        <Text style={{marginLeft: 20, marginBottom: 10, fontSize: 14}}>{affiche.AfficheDescriptionSup}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => navigation.navigate('DetailsOeuvrePage', {AfficheId: affiche.AfficheIdSup, _Image: affiche.ImageSup})}>
                                        <Image style={{height: 170, width: 120, borderRadius: 19, marginTop: 10, right: 10}} source={{uri: affiche.ImageSup}}/>
                                    </TouchableOpacity>
                                </View>

                                <View style={{backgroundColor: 'rgba(255,255,255,1)', borderTopLeftRadius: 30, borderTopRightRadius: 30}}>

                                    <Text style={styles.TitreNoir}>Partager</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                        <ContactsCollectionView Image={affiche.Image} navigation={navigation}/>
                                    </ScrollView>

                                    <NewsCollectionView navigation={navigation} AfficheId={AfficheId}/>

                                    <CommentairesCollectionView navigation={navigation} AfficheId={AfficheId}/>

                                    <ImagesCollectionView AfficheId={AfficheId}/>

                                    <LiensView navigation={navigation} AfficheId={AfficheId}/>

                                    <View style={{height: 300}}/>

                                </View>
                            </View>

                        </ScrollView>
    
                    </ImageBackground>

                </View>
    
            </View>
            
    
        )
    }


const styles = StyleSheet.create({
    container: {
        height: '110%',
        width: '100%',
    },
    image: {
        height: '93%',
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    TitreNoir: {
        margin: 30,
        marginBottom: 10,
        fontSize: 25,
        color: 'black'
    },  
    follow: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 22,
        color: 'white',
    }
  });

  
export default DetailsOeuvrePage