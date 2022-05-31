import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';

import Context from '../navigation/userContext';
import { getUtilisateurInformations } from '../service/UtilisateurService';
import { getAfficheMessageByDate, getMessageAfficheAssociation, getUtilisateurMessages, readMessage } from '../service/MessageService';
import globalStyles from '../Styles/globalStyles';
import { sendPushNotification } from '../service/NotificationService';
import { addMessage, getMessagesContact, updateMessagesContact } from '../service/OfflineMessageService';
//TODO: REFACTOR


export default function MessagePage(props) {

        const context = useContext(Context)

        var { _expediteurId } = props.route.params;
        var { _isOeuvre } = props.route.params;
        var { _oeuvreId } = props.route.params;
        var { _message } = props.route.params;
        var { _image } = props.route.params;

        useEffect(() => {
            if(_message != undefined) {
                setMessage(_message)
            }
        }, [_message])

        let isOeuvre = _isOeuvre;

        //Affiches
        var [messages, setMessages] = useState([]);
        var [notification, setNotification] = useState("");
        var [date, setDate] = useState("");
        var [utilisateur, setUtilisateur] = useState("");
        var [oeuvre, setOeuvre] = useState("");
        var [message, setMessage] = useState("");
        var [imageToSend, setImageToSend] = useState(_image?'#!#'+_image+'#!#':"");

        var [moiInfo, setMoiInfo] = useState("");

        async function recupMessage() {
            await getUtilisateurMessages(_expediteurId, 40, context.utilisateurToken, date)
            .then((data) => {
                if(data != "" && data != messages){
                    setDate(JSON.stringify(data[Object.keys(data).length -1].CreatedDate))
                    let newstate = [...messages, ...data]
                    setMessages(newstate);
                }
            })
        }

        async function recupMessageOeuvre() {
            await getAfficheMessageByDate(_oeuvreId, 40, date)
            .then((data) => {
                if(data != ""){
                    setDate(JSON.stringify(data[Object.keys(data).length -1].CreatedDate))
                    let newstate = [...messages, ...data]
    
                    setMessages(newstate);
                }
            })
        }

        const notificationListener = useRef();

        useEffect(() => {
            if(notification != "") {
                setMessages([...messages, ...notification])
                setNotification("")
            }
        }, [notification]);

        useEffect(async () => {
            if(context.notif != null && context.notif != undefined) {
                if(JSON.stringify(context.notif.filter(n => n == _expediteurId)) != "[]") {
                    //Get Messages from api
                    let _message = await getUtilisateurMessages(_expediteurId, '20', context.utilisateurToken, "");

                    let _messageContact = {
                        Pseudo: _expediteurId,
                        Image: utilisateur.Image,
                        Messages: _message
                    }
                    updateMessagesContact(_messageContact, _expediteurId)
                    setMessages(_message);

                } else {
                    let _message = await getMessagesContact(_expediteurId);
                    //Get Messages from local
                    if(_message != undefined)
                        setMessages(_message);
                }

                let _notif = context.notif.filter(n => n != _expediteurId)
                context.setNotif(_notif);

                await readMessage(context.utilisateurToken, _expediteurId)
            }

            //Add notification trigger
            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                if(JSON.parse(notification.request.trigger.remoteMessage.data.body).ExpediteurId == _expediteurId) {
                    let _notif = JSON.parse(notification.request.trigger.remoteMessage.data.body);

                    let _message = {Message: _notif.Message,
                                    ExpediteurId: _notif.ExpediteurId,
                                    CreatedDate: _notif.CreatedDate};

                    addMessage(_message,
                                {
                                    ContactId: _expediteurId,
                                    Pseudo: utilisateur.Pseudo,
                                    Image: utilisateur.Image,
                                })

                    setNotification([_message]);
                }
            });

            //Get Contact informations
            fetch(global.apiUrl + 'Utilisateur/GetAffinite.php?UtilisateurId=' + context.utilisateurId +'&ContactId=' + _expediteurId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then(async (data) => {
                setUtilisateur(data)

                setMoiInfo(getUtilisateurInformations(context.utilisateurToken));
            });

            //Remove Notification trigger
            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
            };
        }, []);

        function sendMessage(_message, _isOeuvre) {
            let bodyMessage = {
                ExpediteurId: _expediteurId, 
                Pseudo: utilisateur.Pseudo, 
                Image: utilisateur.Image,
                Message: _message, 
                CreatedDate: new Date()
            }

            if(_message != ""){
                if(_isOeuvre){
                    fetch(global.apiUrl + 'Message/SendMessageAffiche.php?ExpediteurId=' + context.utilisateurId + '&OeuvreId=' + _oeuvreId + '&Message=' + encodeURIComponent(_message + imageToSend) + '&TokenUtilisateur=' + context.utilisateurToken)
                }else{
                    fetch(global.apiUrl + 'Message/SendMessage.php?ExpediteurId=' + context.utilisateurId + '&DestinataireId=' + _expediteurId + '&Message=' +  encodeURIComponent(_message + imageToSend) + '&TokenUtilisateur=' + context.utilisateurToken)

                    if(utilisateur.Token != ""){
                        sendPushNotification(utilisateur.Token, _message, 'message de ' + moiInfo.Pseudo, {utilisateurId: context.utilisateurId})
                    }
                }

                addMessage({
                                ExpediteurId: context.utilisateurId,
                                Message: _message,
                                CreatedDate: new Date().toString()
                            },
                            {
                                ContactId: _expediteurId,
                                Pseudo: context.Pseudo,
                                Image: utilisateur.Image,
                            })
                
                let mess = [{
                    Message: message, 
                    CreatedDate: date, 
                    ExpediteurId: context.utilisateurId
                }]

                setDate(JSON.stringify(date))
                let newstate = [...messages, ...mess]

                setMessages(newstate);

                setImageToSend("");
                setMessage("");
            }        
        }

        var flatlistRef = useRef();
                    
        var Message = ({_message, messageId, expediteurId}) => {
            if(JSON.stringify(_message).includes("#!#")){
                let messageSplitted = _message.split('#!#');

                return (
                    <View style={{maxWidth: '80%'}}>
                        <Text>{messageSplitted[0]}</Text>
                        <Image style={{height: 300, width: 200, margin: 10, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto', borderRadius: 12}} source={{uri: messageSplitted[1]}}/>
                    </View>
                );
            }else if (JSON.stringify(_message).includes("#@#")) {
                if(JSON.stringify(_message)[JSON.stringify(_message).length-2] == "1" || context.utilisateurId == expediteurId) {
                    return (
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate('TuPreferesHistoriquePage', {MessageId: messageId, ExpediteurId: expediteurId, Finish: false, ContactPseudo: utilisateur.Pseudo})}>
                            <Text style={[globalStyles.center, {fontSize: 18, marginLeft: 10}]}>Tu preferes </Text>
                            <Image style={{height: 50, width: 50, opacity: 0.5, transform: [{ rotate: '180deg' }]}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </TouchableOpacity>
                    )
                }else {
                    return(
                        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => props.navigation.navigate('TuPreferesPage', {MessageId: messageId, ContactId: _expediteurId, NotificationToken: utilisateur.Token, ContactPseudo: utilisateur.Pseudo, Initialization: false})}>
                            <Text style={[globalStyles.center, {fontSize: 18, marginLeft: 10}]}>Tu preferes </Text>
                            <Image style={{height: 50, width: 50, opacity: 0.5, transform: [{ rotate: '180deg' }]}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </TouchableOpacity>
                    )
                }
                
                
            }else{
                return (
                    <Text style={styles.Titre}>{_message}</Text>
                )
            }
        }

        var ItemAffiche = ({message, CreatedDate, photo, expediteurId, messageId}) => {

            if(expediteurId == context.utilisateurId){
                return(
                    <View style={[styles.messageRight, globalStyles.shadows]}>
                        <Message _message={message} messageId={messageId} expediteurId={expediteurId}/>
                    </View>
                );
            }else{
                if(isOeuvre){
                    return(
                        <View style={{marginTop: 15, marginLeft: 10}}>
                            <View style={[globalStyles.shadows, styles.messageLeft]}>
                                <TouchableOpacity style={{position: 'absolute', top: -15, left: -15}} onPress={() => {props.navigation.navigate('ProfilPage', {_profilId: expediteurId})}}>
                                    <Image style={{height: 40, width: 40, borderRadius: 100, marginRight: 10}} source={{uri: photo}}/>
                                </TouchableOpacity>
                                <Text style={styles.TitreOeuvre} blurRadius={1}>{message}</Text>
                                <Text style={{position: 'absolute', bottom: 5, right: 10, fontSize: 10}}>{CreatedDate}</Text>
                            </View>
                            
                        </View>
                    );
                }else{
                    return(
                        <View style={[globalStyles.shadows, styles.messageLeft]}>
                            <Message _message={message} messageId={messageId}/>
                        </View>
                    );
                }

            }
        }


        var _header = ({pourcentage, pseudo, image, oeuvreTitre, oeuvreImage}) => {
            if(isOeuvre){
                return(
                    <View style={{elevation: 3, backgroundColor: '#eee', borderBottomRightRadius: 19, borderBottomLeftRadius: 19}}>
                        
                        <View style={{flexDirection: 'row', margin: 40, marginLeft: 'auto', marginBottom: 20}}>
                            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 50, fontSize: 20, fontFamily: 'sans-serif-light',}}>{oeuvreTitre}</Text>
                            <Image style={{height: 70, width: 70, borderRadius: 100}} source={{uri: oeuvreImage}}/>
                        </View>
                        
                        <TouchableOpacity style={{position: 'absolute', backgroundColor: '#fffa', height: 50, width: 50, marginTop: 50, marginLeft: 20, borderRadius: 100}} onPress={() => props.navigation.pop()}>
                            <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                                <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }else{
                return(
                    <View style={{flexDirection: 'row', elevation: 5, justifyContent: 'space-around', marginTop: 20, padding: 10}}>
                        <TouchableOpacity style={{backgroundColor: '#FEA52A', height: 50, width: 50, borderRadius: 100}} onPress={() => props.navigation.pop()}>
                            <Image style={[globalStyles.center, {height: 40, width: 40, opacity: 0.5}]} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </TouchableOpacity>

                        <Text style={[globalStyles.center, {marginBottom: 10, marginRight: 0, fontSize: 20, fontFamily: 'sans-serif-light'}]}>{pseudo}, {pourcentage}%</Text>

                        <TouchableOpacity style={{marginRight: 'auto'}}>
                            <Image style={[globalStyles.center, {height: 40, width: 40, right: -30, borderRadius: 100}]} source={{uri: image}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.logo, {backgroundColor: '#FEA52A', borderRadius: 5, padding: 3}]} onPress={() => props.navigation.navigate('TuPreferesPage', {MessageId: "", ContactId: _expediteurId, NotificationToken: utilisateur.Token,  ContactPseudo: utilisateur.Pseudo, Initialization: true})}>
                            <Image style={{height: 40, width: 40, opacity: 1, marginBottom: 'auto'}} source={require('../Images/SquareMenu.png')}/>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        

        var renderItemAffiche = ({ item }) => (
            <ItemAffiche style={styles.containerAffiches} messageId={item.MessageId} photo={item.Image} message={item.Message} CreatedDate={item.CreatedDate} expediteurId={item.ExpediteurId}/>
        );

        // let mounted = true;
        // useEffect(() => {
        //     if(mounted){
        //         if(isOeuvre){
        //             fetch(global.apiUrl + 'Message/GetMessagesAffiche.php?AfficheId=' + _oeuvreId + '&Limite=20' + '&TokenUtilisateur=' + context.utilisateurToken)
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 if(data != ""){
        //                     setMessages(data)
        //                     setDate(JSON.stringify(data[Object.keys(data).length -1].CreatedDate))
        //                 }
        //             });
    
        //             fetch(global.apiUrl + 'Affiche/GetInfosAffiche.php?AfficheId=' + _oeuvreId + '&TokenUtilisateur=' + context.utilisateurToken)
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 setOeuvre(data)
        //             });
    
        //         }else{
        //             fetch(global.apiUrl + 'Message/GetMessagesDiscussion.php?DestinataireId=' + _expediteurId + '&ExpediteurId=' + context.utilisateurId +'&Nombre=20&CreatedDate=2021-07-31 22:12:20' + '&TokenUtilisateur=' + context.utilisateurToken)
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 if(data != ""){
        //                     setMessages(data)
        //                     setDate(JSON.stringify(data[Object.keys(data).length -1].CreatedDate))
        //                 }
        //             });     
                    
        //             fetch(global.apiUrl + 'Utilisateur/GetAffinite.php?UtilisateurId=' + context.utilisateurId +'&ContactId=' + _expediteurId + '&TokenUtilisateur=' + context.utilisateurToken)
        //             .then((response) => response.json())
        //             .then((data) => {
        //                 setUtilisateur(data)
        //             });    
        //         }
        //     }
            
        //     return () => mounted = false;
            
        // }, [_expediteurId, isOeuvre]);

        var ImageToSend = () => {
            if(imageToSend.includes('http')) {
                return(
                    <View style={{backgroundColor: '#fff', elevation: 3, margin: 10, position: 'absolute', right: 50, bottom: 0, borderRadius: 5}}>
                        <Image style={{height: 100, width: 65, margin: 3, borderRadius: 5}} source={{uri: _image}}/>
                    </View>
                )
            }else{
                return(
                    <View></View>
                )
            }
        }

        var headerFlatList = () => {
            if(messages.length >= 13) {
                return (
                    <TouchableOpacity><Text style={[globalStyles.center, {backgroundColor: 'orange', paddingHorizontal: 20, paddingVertical: 10, marginBottom: 20, borderRadius: 100}]}>Voir Plus +</Text></TouchableOpacity>
                )
            } else {
                return (
                    <View></View>
                )
            }
            
        }

        return (

            <View>

                <View style={styles.container}>

                    <_header oeuvreImage={oeuvre.Image} oeuvreTitre={oeuvre.AfficheTitre} image={utilisateur.Image} pseudo={utilisateur.Pseudo} pourcentage={utilisateur.Pourcentage}/>

                    

                    <ScrollView ref={flatlistRef} onContentSizeChange={() =>  flatlistRef.current.scrollToEnd({animated: true})} style={{maxHeight: '100%', width: '100%'}}>
                        <View style={{marginBottom: 50}}>
                            <FlatList ListHeaderComponent={headerFlatList} style={{paddingTop: 10}} data={messages} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="1"/>
                        </View>
                    </ScrollView>

                    

                    {/* barre de messages */}
                    <View style={{width: '100%', bottom: 5, position: 'absolute', left:0}}>

                        <View style={{flexDirection: 'row', zIndex: 100, justifyContent: 'flex-end', width: '100%', paddingLeft: 15, backgroundColor: 'white', borderRadius: 100, elevation: 5, padding: 0, paddingRight: 15}}>
                        
                            <ImageToSend/>
                            
                            <View style={{width: '90%', flexDirection: 'row'}}>
                                <TextInput  onChangeText={setMessage} value={message} style={{width: '70%'}}/>
                            </View>

                            <TouchableOpacity style={{ padding: 15, paddingRight: 0}} onPress={() => sendMessage(message, isOeuvre)}>
                                <Image style={{height: 20, width: 20, marginTop: 'auto', marginBottom: 'auto'}} source={require('../Images/sendMessageIcone.png')}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                        
                    

                </View>
                
            </View>
            
    
        )
    }


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    Titre: {
        maxWidth: '80%',
        fontSize: 14,
        fontFamily: 'sans-serif-light',
        marginHorizontal: 5,
    },
    TitreOeuvre: {
        maxWidth: '80%',
        fontSize: 14,
        fontFamily: 'sans-serif-light',
        margin: 10,
    },
    messageLeft: {
        marginHorizontal: 10,
        borderRadius: 19,
        marginBottom: 10,
        marginRight: 'auto',
        padding: 10,
        backgroundColor : '#fff',
        zIndex: 0,
        flexDirection: 'row',
    },
    messageRight: {
        marginHorizontal: 10,
        borderRadius: 19,
        marginBottom: 10,
        marginLeft: 'auto',
        backgroundColor : '#fff',
        padding: 10,
        flexDirection: 'row',
    },
    containerAffiches: {
        height: '100%',
    },
  
  })
