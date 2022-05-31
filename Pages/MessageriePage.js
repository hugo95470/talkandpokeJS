import React, { useContext } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';

import TopBarre from '../Components/TopBarre';
import Context from '../navigation/userContext';
import { getUtilisateursContacts } from '../service/MessageService';
import globalStyles from '../Styles/globalStyles';
import { getContacts, updateLastMessageContact } from '../service/OfflineMessageService';


//TODO: REFACTOR


export default function MessageriePage(props) {

        const context = useContext(Context)

        const notificationListener = useRef();

        //contacts
        var [contacts, setcontacts] = useState([]);
        var [notification, setNotification] = useState("");

        useEffect(async () => {
            if(notification != "") {
                updateLastMessageContact(notification.Message, notification.CreatedDate, notification.ExpediteurId);

                setcontacts([{
                    ContactId: notification.ExpediteurId, 
                    Pseudo: notification.Pseudo, 
                    Image: notification.Image, 
                    Message: notification.Message,
                    CreatedDate: notification.CreatedDate
                }
                , ...contacts.filter(c => c.ContactId != notification.ExpediteurId)]);

                setNotification("");
            }
            

        }, [notification]);

        useEffect(async () => {
            await loadContacts();
            
            notificationListener.current = Notifications.addNotificationReceivedListener(async notification => {
                let _notif = JSON.parse(notification.request.trigger.remoteMessage.data.body);
          
                setNotification(_notif);
              });
          
              return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
              };
        }, []);

        async function loadContacts(){
            await getContacts(9)
            .then(async (data) => {
                if(JSON.stringify(context.notif) != "[]") {
                    if(data.filter(c => context.notif.includes(c.ContactId)) == []) {
                        data = await getUtilisateursContacts(context.UtilisateurId);
                    }
                }
                setcontacts(data);
            });        
        }

        var Notif = ({ etat, expediteurId }) => {

            if(context.notif != null && context.notif != undefined){
                if(context.notif.filter(n => n == expediteurId).length > 0) {
                    return(
                        <View style={{height: 10, width: 10, backgroundColor: 'red', borderRadius: 100, position: 'absolute', left: 10, top: 10}}>
        
                        </View>
                    );
                }
                else {
                    return(
                        <View></View>
                    );
                }
            }else{
                return(
                    <View></View>
                );
            }
            
        }
            
        var ItemAffiche = ({ _expediteurId, image, pseudo, date, message, expediteurId, etat }) => {

            var _date = new Date()
            if(date != undefined)
                _date = new Date(date.substring(0, 10) + 'T' + date.substring(11) + 'Z') 

            var _dateString = ''
            var today = new Date()

            var toi = '';

            if(expediteurId == context.utilisateurId){
                toi = 'vous : '
            }

            if(today.getDate() == _date.getDate()){
                _dateString = _date.getUTCHours() + 'h' + _date.getUTCMinutes()
            }else{
                _dateString = _date.getUTCFullYear() + "/" + _date.getUTCMonth() + "/" + _date.getUTCDate() + " " + _date.getUTCHours() + "h" + _date.getUTCMinutes()
            }

            return(
                <TouchableOpacity onPress={() => props.navigation.navigate('MessagePage', {_expediteurId: _expediteurId})}>
                    <View style={[{marginVertical: 10}]}>
                        <Image style={[{height: 55, width: 55, marginLeft: 10, marginTop: 10, marginRight: 30, borderRadius: 100}]} source={{uri: image}}/>

                        <Text style={styles.Titre}>{pseudo}</Text>
                        <Text style={styles.Message}>{toi}{message?message.includes('#@#')?"a partagé une affiche avec vous":(message.includes("#!#")?"Tu préfères ?":message):""}</Text>
                        <Text style={{position: 'absolute',right: 10,top: 30, marginLeft: 'auto', marginTop: -20, marginRight: 10, fontSize: 10}}>{_dateString}</Text>
                        <Notif etat={etat} expediteurId={_expediteurId}/>
                    </View>

                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => (
            <ItemAffiche _expediteurId={item.ContactId} image={item.Image} pseudo={item.Pseudo} message={item.Message} date={item.CreatedDate} expediteurId={item.ExpediteurId} etat={item.Etat} />
        );
        
        const onRefresh = React.useCallback(async () => {
            setRefreshing(true);

            setcontacts("");

            await loadContacts()
            .then(() => setRefreshing(false));
        }, []);

        const [refreshing, setRefreshing] = React.useState(false);    

        return (
            <View>
                <TopBarre title={"Contacts"} navigation={props.navigation}/>

                <View style={styles.container}>
                        
                    <View style={{height: '78%'}}>

                        <FlatList refreshControl={<RefreshControl colors={["#FEA52A", "#FEA52A"]} refreshing={refreshing} onRefresh={onRefresh} />}
                         style={{height: '88%', marginTop: 30}} data={contacts} renderItem={renderItemAffiche} keyExtractor={item => item.UtilisateurId} numColumns="1"/>

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
        position: 'absolute',
        top: 5,
        left: 85,
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light',
    },
    Message: {
        position: 'absolute',
        top: 35,
        left: 85,
        fontSize: 15,
        fontFamily: 'sans-serif-light',
        maxWidth: 250,
    },
  })