import React, { useContext } from 'react';
import { StyleSheet, View, Dimensions, FlatList, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';

import Context from '../navigation/userContext';
import BackArrowView from '../Components/BackArrowView';
import globalStyles from '../Styles/globalStyles';
import { AddUtilisateurAfficheAssociation, getAfficheAssociations, UpdateUtilisateurAfficheAssociation } from '../service/AfficheService';
import AlertText from '../Components/AlertText';
import { AddTuPreferes, GetTuPreferesMessage } from '../service/MessageService';
import { sendPushNotification } from '../service/NotificationService';
import WizardImageView from '../Components/WizardImageView';

export default function TuPreferesPage(props) {

    const context = useContext(Context)

    const { ContactId } = props.route.params;
    const { MessageId } = props.route.params;
    const { NotificationToken } = props.route.params;
    const { ContactPseudo } = props.route.params;
    const { Initialization } = props.route.params;
    
    let [messageId, setMessageId] = useState("");

    let [images, setImages] = useState("");
    let [image1, setImage1] = useState("");
    let [image2, setImage2] = useState("");
    let [texte1, setTexte1] = useState("");
    let [texte2, setTexte2] = useState("");
    let [afficheAssociationId, setAfficheAssociationId] = useState("");
    
    let [afficheId1, setAfficheId1] = useState("");
    let [afficheId2, setAfficheId2] = useState("");

    let [historique, setHistorique] = useState("");

    var flatlistRef = useRef();

    let [index, setIndex] = useState(0);

    useEffect(async () => {
        if(Initialization) {
            await AddTuPreferes(ContactId, context.utilisateurToken)
            .then(async (resp) => {
                setMessageId(resp)
                await getAfficheAssociations(15)
                .then(async (data) => {
                    await sendPushNotification(NotificationToken, 'Acceptez le défi pour mieux connaitre ' + ContactPseudo, 'Vous avez reçu un défi Tu Préfères !');

                    setImage1(data[0].Image1)
                    setImage2(data[0].Image2)
                    setAfficheId1(data[0].AfficheId1)
                    setAfficheId2(data[0].AfficheId2)
                    setTexte1(data[0].AfficheTitre1)
                    setTexte2(data[0].AfficheTitre2)
                    setAfficheAssociationId(data[0].AfficheAssociationId)
                    setImages(data);
                });
            })
        }else {
            await sendPushNotification(NotificationToken, ContactPseudo + ' a accepté votre défi Tu préfères ' + ContactPseudo, 'Venez voir vos résultats pour mieux vous connaitre !');

            await GetTuPreferesMessage(MessageId, context.utilisateurToken)
            .then((data) => {
                setImage1(data[0].Image1)
                setImage2(data[0].Image2)
                setAfficheId1(data[0].AfficheId1)
                setAfficheId2(data[0].AfficheId2)
                setTexte1(data[0].AfficheTitre1)
                setTexte2(data[0].AfficheTitre2)
                setAfficheAssociationId(data[0].AfficheAssociationId)
                setImages(data);
            });
        }
        
    }, []);
    
    async function chooseAffiche(afficheId, image) {
        if(Initialization) {
            await AddUtilisateurAfficheAssociation(context.utilisateurToken, afficheAssociationId, messageId, afficheId==afficheId1?"0":"1")
            .then(() => {
                if(index < images.length - 1) {
                    let tmp = index;
                    tmp = tmp + 1;
                    setImage1(images[tmp].Image1);
                    setImage2(images[tmp].Image2);
                    setAfficheId1(images[tmp].AfficheId1);
                    setAfficheId2(images[tmp].AfficheId2);
                    setTexte1(images[tmp].AfficheTitre1)
                    setTexte2(images[tmp].AfficheTitre2)
                    setAfficheAssociationId(images[tmp].AfficheAssociationId);
                    setIndex(tmp);
                    setHistorique([...historique, ...[image]])
                }else {
                    props.navigation.navigate('TuPreferesHistoriquePage', {MessageId: messageId, ExpediteurId: context.utilisateurId, Finish: true, ContactPseudo: ContactPseudo})
                }
            })
        }else {
            await UpdateUtilisateurAfficheAssociation(context.utilisateurToken, afficheAssociationId, MessageId, afficheId==afficheId1?"0":"1")
            .then(() => {
                if(index < images.length - 1) {
                    let tmp = index;
                    tmp = tmp + 1;
                    setImage1(images[tmp].Image1);
                    setImage2(images[tmp].Image2);
                    setAfficheId1(images[tmp].AfficheId1);
                    setAfficheId2(images[tmp].AfficheId2)
                    setTexte1(images[tmp].AfficheTitre1)
                    setTexte2(images[tmp].AfficheTitre2)
                    setAfficheAssociationId(images[tmp].AfficheAssociationId)
                    setIndex(tmp);
                    setHistorique([...historique, ...[image]])
                }else {
                    props.navigation.navigate('TuPreferesHistoriquePage', {MessageId: MessageId, ExpediteurId: ContactId, Finish: true, ContactPseudo: ContactPseudo})
                }
            })
        }
        
    }

    let Versus= () => {
        return(
          <TouchableOpacity activeOpacity={1} onPress={() => console.log("")} style={{position: 'absolute', elevation: 7, bottom: 0, width: 127.5, borderBottomLeftRadius: 19, borderTopRightRadius: 19, height: 50, backgroundColor: '#FEA52A'}}>
            <Text style={[globalStyles.fontFamily ,{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 21, color: 'white'}]}>Tu préfères</Text>
          </TouchableOpacity >
        )
    }

    var renderItemAssociation = (image) => {
        return (
            <View>
                <Image style={{height: 90, backgroundColor: 'red', width: 65, margin: 3, borderRadius: 5}} source={{uri: image.item}}/>
            </View>
        )
    }

    let images1 = [image1, image1, image1]
    let images2 = [image2]
        
    return (
      <View style={styles.container}>

        <View style={{position: 'absolute'}}>
            <BackArrowView navigation={props.navigation}/>
        </View>
        <View style={[globalStyles.center, {marginTop: 30}]}>
            <AlertText title={"Tu préfères"}/>
        </View>

        
        <View style={{position: 'absolute', backgroundColor: '#eee', top: 380, left: 80}}>
            <WizardImageView images={images1} width={200} height={300}>
                <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={async () => chooseAffiche(afficheId1, image1)}>

                </TouchableOpacity>
            </WizardImageView>
            
            <View intensity={250} style={styles.TitreContainer}>
                <Text style={styles.Titre}>{texte1}</Text>
            </View>
        </View>
        
        <View style={{position: 'absolute', backgroundColor: '#eee', top: 130, right: 40}} >
          <View>
                <WizardImageView chooseAffiche={chooseAffiche} images={images2} width={200} height={300}>
                    <TouchableOpacity style={{width: '100%', height: '100%'}} onPress={async () => chooseAffiche(afficheId2, image2)}>

                    </TouchableOpacity>
                </WizardImageView>

                <View intensity={250} style={styles.TitreContainer}>
                    <Text style={styles.Titre}>{texte2}</Text>
                </View>
          </View>  
          
          <Versus/>    
        </View>
        
        <View style={{position: 'absolute', height: 100, top: '90%'}}>
            <ScrollView horizontal={true} ref={flatlistRef} onContentSizeChange={() =>  flatlistRef.current.scrollToEnd({animated: true})}>
                <FlatList data={historique} renderItem={renderItemAssociation} keyExtractor={item => item} numColumns="100"/>
            </ScrollView>
        </View>

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    TitreContainer: {
        backgroundColor: "#aaac",
        padding: 0,
        paddingHorizontal: 5,
        paddingVertical: 5,
        minWidth: 100,
        marginRight: -9,
        position: 'absolute', 
        right: '4%', 
        bottom: '20%',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        elevation: 3,
    },
    Titre: {
        borderRadius: 19,
        padding: 10,
        width: 'auto',
        fontSize: 17,
        fontFamily: 'sans-serif-light',
    },
})
