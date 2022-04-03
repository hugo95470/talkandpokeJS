import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useEffect, useState, useRef } from 'react';

import Context from '../navigation/userContext';


function MessagePage(props) {

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

        var [isOeuvre, setIsOeuvre] = useState(_isOeuvre);

        //Affiches
        var [messages, setMessages] = useState("");
        var d = new Date();
        var [date, setDate] = useState(d.getFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getDate() + ' ' + ((d.getUTCHours() + 2)%24) + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds());
        var [utilisateur, setUtilisateur] = useState("");
        var [oeuvre, setOeuvre] = useState("");
        var [message, setMessage] = useState("");
        var [imageToSend, setImageToSend] = useState(_image?'#!#'+_image+'#!#':"");

        var [moiInfo, setMoiInfo] = useState("");

        let mountedmoi = true;
        useEffect(() => {
            if(mountedmoi){
                fetch(global.apiUrl + 'Utilisateur/GetUtilisateur.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
                .then((response) => response.json())
                .then((data) => setMoiInfo(data));
            }
            return () => mountedmoi = false;
        }, [context.utilisateurId, context.utilisateurToken])

        let mountedMessage = true;
        useEffect(() => {

            function recupMessage() {
                var uri = global.apiUrl + 'Message/GetMessagesDiscussion.php?DestinataireId=' + _expediteurId + '&ExpediteurId=' + context.utilisateurId +'&Nombre=20&DateEnvoi=' + date + '&TokenUtilisateur=' + context.utilisateurToken
                fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    if(data != ""){
                        setDate(data[Object.keys(data).length -1].CreatedDate)
                        let newstate = [...messages, ...data]
        
                        setMessages(newstate);
                    }
                })
                if(mountedMessage)
                    setTimeout(recupMessage, 3000);
            }

            function recupMessageOeuvre() {
                var uri = global.apiUrl + 'Message/GetMessagesAffiche.php?AfficheId=' + _oeuvreId + '&Date=' + date + '&Limite=20'
                fetch(uri)
                .then((response) => response.json())
                .then((data) => {
                    if(data != ""){
                        setDate(data[Object.keys(data).length -1].CreatedDate)
                        let newstate = [...messages, ...data]
        
                        setMessages(newstate);
                    }
                })
                if(mountedMessage)
                    setTimeout(recupMessageOeuvre, 5000);
            }

            if(context.utilisateurId != "" && context.utilisateurToken != "" && !isOeuvre){
                recupMessage()
            }else if (context.utilisateurId != "" && context.utilisateurToken != "" && isOeuvre){
                recupMessageOeuvre()
            }
    
          return () => mountedMessage = false;
        }, [])

        useEffect(() => {
            fetch(global.apiUrl + 'Message/ReadMessage.php?UtilisateurId=' + context.utilisateurId + '&ContactId=' + _expediteurId + '&TokenUtilisateur=' + context.utilisateurToken)
        }, [context.utilisateurId, context.utilisateurToken])

        function sendMessage(_message, _isOeuvre) {
            if(_message != ""){
                if(_isOeuvre){
                    fetch(global.apiUrl + 'Message/SendMessageAffiche.php?ExpediteurId=' + context.utilisateurId + '&OeuvreId=' + _oeuvreId + '&Message=' + encodeURIComponent(_message + imageToSend) + '&TokenUtilisateur=' + context.utilisateurToken)
                }else{
                    fetch(global.apiUrl + 'Message/SendMessage.php?ExpediteurId=' + context.utilisateurId + '&DestinataireId=' + _expediteurId + '&Message=' +  encodeURIComponent(_message + imageToSend) + '&TokenUtilisateur=' + context.utilisateurToken)

                    if(utilisateur.Token != ""){
                        sendPushNotification(utilisateur.Token, _message)
                    }
                }
                if(messages == ""){
                    let mess = [{"Message" : message,"CreatedDate" : date,"ExpediteurId" : context.utilisateurId}]
                    setDate(mess[Object.keys(mess).length -1].CreatedDate)
                    let newstate = [...messages, ...mess]
    
                    setMessages(newstate);
                }
                setImageToSend("");
                setMessage("");
            }        
        }

        var flatlistRef = useRef();
                    
        var Message = ({_message}) => {
            if(JSON.stringify(_message).includes("#!#")){
                let messageSplitted = _message.split('#!#');

                return (
                    <View style={{maxWidth: '80%'}}>
                        <Text>{messageSplitted[0]}</Text>
                        <Image style={{height: 200, width: 150, margin: 10, marginBottom: 0, marginLeft: 'auto', marginRight: 'auto', borderRadius: 12}} source={{uri: messageSplitted[1]}}/>
                    </View>
                );
            }else{
                return (
                    <Text style={styles.Titre}>{_message}</Text>
                )
            }
        }

        var ItemAffiche = ({ message, CreatedDate, photo, expediteurId }) => {

            if(expediteurId == context.utilisateurId){
                return(
                    <View style={styles.shadowRight}>
                        <Message _message={message}/>
                    </View>
                );
            }else{
                if(isOeuvre){
                    return(
                        <View style={{marginTop: 15, marginLeft: 10}}>
                            <View style={styles.shadowLeft}>
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
                        <View style={styles.shadowLeft}>
                            <Message _message={message}/>
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
                    <View style={{elevation: 3, backgroundColor: '#eee', borderBottomRightRadius: 19, borderBottomLeftRadius: 19}}>
                        

                        <TouchableOpacity onPress={() => props.navigation.pop()}>
                            <Image style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 50, height: 70, width: 70, borderRadius: 100}} source={{uri: image}}/>
                        </TouchableOpacity>

                        <Text style={{marginLeft: 'auto', marginBottom: 10, marginRight: 'auto', fontSize: 20, fontFamily: 'sans-serif-light',}}>{pseudo}, {pourcentage}%</Text>

                        <TouchableOpacity style={{position: 'absolute', backgroundColor: '#fffa', height: 50, width: 50, marginTop: 50, marginLeft: 20, borderRadius: 100}} onPress={() => props.navigation.pop()}>
                            <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                                <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
        

        var renderItemAffiche = ({ item }) => (
            <ItemAffiche style={styles.containerAffiches} photo={item.Image} message={item.Message} CreatedDate={item.CreatedDate} expediteurId={item.ExpediteurId}/>
        );

        let mounted = true;
        useEffect(() => {

            if(mounted){
                if(isOeuvre){
                    fetch(global.apiUrl + 'Message/GetMessagesAffiche.php?AfficheId=' + _oeuvreId + '&Limite=20' + '&TokenUtilisateur=' + context.utilisateurToken)
                    .then((response) => response.json())
                    .then((data) => {
                        if(data != ""){
                            setMessages(data)
                            setDate(data[Object.keys(data).length -1].CreatedDate)
                        }
                    });
    
                    fetch(global.apiUrl + 'Affiche/GetInfosAffiche.php?AfficheId=' + _oeuvreId + '&TokenUtilisateur=' + context.utilisateurToken)
                    .then((response) => response.json())
                    .then((data) => {
                        setOeuvre(data)
                    });
    
                }else{
                    fetch(global.apiUrl + 'Message/GetMessagesDiscussion.php?DestinataireId=' + _expediteurId + '&ExpediteurId=' + context.utilisateurId +'&Nombre=20&CreatedDate=2021-07-31 22:12:20' + '&TokenUtilisateur=' + context.utilisateurToken)
                    .then((response) => response.json())
                    .then((data) => {
                        if(data != ""){
                            setMessages(data)
                            setDate(data[Object.keys(data).length -1].CreatedDate)
                        }
                    });     
                    
                    fetch(global.apiUrl + 'Utilisateur/GetAffinite.php?UtilisateurId=' + context.utilisateurId +'&ContactId=' + _expediteurId + '&TokenUtilisateur=' + context.utilisateurToken)
                    .then((response) => response.json())
                    .then((data) => {
                        setUtilisateur(data)
                    });    
                }
            }
            
            return () => mounted = false;
            
        }, [context.utilisateurId, _expediteurId, isOeuvre, context.utilisateurToken]);

        async function sendPushNotification(_expoPushToken, _message) {
            const message = {
              to: _expoPushToken,
              sound: 'default',
              title: 'message de ' + moiInfo.Pseudo,
              body: _message,
              data: { someData: 'goes here' },
            };

            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });
        }

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

        return (

            <View>

                <View style={styles.container}>

                    <_header oeuvreImage={oeuvre.Image} oeuvreTitre={oeuvre.AfficheTitre} image={utilisateur.Image} pseudo={utilisateur.Pseudo} pourcentage={utilisateur.Pourcentage}/>

                    

                    <ScrollView ref={flatlistRef} onContentSizeChange={() =>  flatlistRef.current.scrollToEnd({animated: true})} style={{maxHeight: '100%', width: '100%'}}>
                        <View style={{marginBottom: 50}}>
                            <FlatList style={{paddingTop: 10}} data={messages} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="1"/>
                        </View>

                    </ScrollView>

                    

                    {/* barre de messages */}
                    <View style={{width: '100%', bottom: 5, position: 'absolute', left:0}}>

                        <View style={{flexDirection: 'row', zIndex: 100, justifyContent: 'flex-end', width: '100%', paddingLeft: 15, backgroundColor: 'white', borderRadius: 100, elevation: 5, padding: 0, paddingRight: 30}}>
                        
                            <ImageToSend/>
                            
                            <View style={{width: '90%', flexDirection: 'row'}}>
                                <TextInput  onChangeText={setMessage} value={message} style={{width: '70%'}}/>
                            </View>

                            <TouchableOpacity style={{ padding: 15, paddingRight: 0}} onPress={() => sendMessage(message, isOeuvre)}>
                                <Image style={{height: 20, width: 20, marginTop: 'auto', marginBottom: 'auto'}} source={{uri: 'https://image.flaticon.com/icons/png/512/561/561104.png'}}/>
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
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        color: 'white',
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
    affiche: {
        height: 70,
        width: 300,
        justifyContent: 'flex-end',
    },
    shadowLeft: {
        marginHorizontal: 10,
        borderRadius: 19,
        marginBottom: 10,
        marginRight: 'auto',
        padding: 10,
        backgroundColor : '#fff',
        shadowColor: 'black',
        shadowOffset: {
        width: 5,
        height: 5,
      },
      zIndex: 0,
      flexDirection: 'row',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 15, 
    },

    shadowRight: {
        marginHorizontal: 10,
        borderRadius: 19,
        marginBottom: 10,
        marginLeft: 'auto',
        backgroundColor : '#fff',
        padding: 10,
        shadowColor: 'black',
        shadowOffset: {
        width: 5,
        height: 5,
        
      },
      flexDirection: 'row',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 15, 
    },
    containerAffiches: {
        height: '100%',
    },
  
  })

  export default MessagePage;

