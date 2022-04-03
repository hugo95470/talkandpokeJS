import React, { useContext } from 'react';
import { StyleSheet, Text, View, RefreshControl, FlatList, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';

import TopBarre from '../Components/TopBarre';
import Context from '../navigation/userContext';

function MessageriePage(props) {

        const context = useContext(Context)

        useEffect(() => {
            if(context.utilisateurId != null && context.utilisateurToken != null){
                loadContacts()    
            }
        }, [context.utilisateurId, context. utilisateurToken]);

        function loadContacts(){

            fetch(global.apiUrl + 'Message/GetContacts.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => {
                setcontacts(data)
            }); 
        }

        //Affiches
        var [contacts, setcontacts] = useState("");

        var Notif = ({ etat, expediteurId }) => {

            if(etat == 'Envoyé' && expediteurId != context.utilisateurId){
                return(
                    <View style={{height: 10, width: 10, backgroundColor: 'red', borderRadius: 100, position: 'absolute', left: 0, top: 0}}>
    
                    </View>
                );
            }else{
                return(
                    <View>
    
                    </View>
                );
            }
            
        }
            
        var ItemAffiche = ({ _expediteurId, image, pseudo, date, message, expediteurId, etat }) => {

            var _date = new Date(date.substring(0, 10) + 'T' + date.substring(11) + 'Z') 

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
                    <View style={styles.shadow}>
                        <Image style={{height: 65, width: 65, marginBottom: 'auto', marginTop: 'auto', marginLeft: 10, marginRight: 20, borderRadius: 100}} source={{uri: image}}/>

                        <Text style={styles.Titre}>{pseudo}</Text>
                        <Text style={styles.Message}>{toi}{message}</Text>
                        <Text style={{position: 'absolute', right: 15, bottom: 5, fontSize: 10}}>{_dateString}</Text>
                        <Notif etat={etat} expediteurId={expediteurId}/>

                    </View>

                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => (
            <ItemAffiche style={styles.containerAffiches} _expediteurId={item.UtilisateurId} image={item.Image} pseudo={item.Pseudo} message={item.Message} date={item.CreatedDate} expediteurId={item.ExpediteurId} etat={item.Etat} />
        );

        //Refresh
        const wait = (timeout) => {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }
        
        const onRefresh = React.useCallback(() => {
            setRefreshing(true);

            setcontacts("");
            loadContacts();

            wait(2000).then(() => setRefreshing(false));
        }, []);

        const [refreshing, setRefreshing] = React.useState(false);    

        return (
            <View>
                <TopBarre navigation={props.navigation}/>

                <View style={styles.container}>

                        
                    <Text style={styles.title}>Discussions</Text>

                        
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
    title: {
        fontSize: 25,
        marginLeft: 20,
        fontFamily: 'sans-serif-light',
        fontWeight: "600",
    },
    Titre: {
        position: 'absolute',
        top: 10,
        left: 85,
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light',
    },
    Message: {
        position: 'absolute',
        top: 30,
        left: 85,
        fontSize: 15,
        fontFamily: 'sans-serif-light',
        maxWidth: 250,
    },
    shadow: {
        borderRadius: 19,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: 80,
        width: '90%',
        backgroundColor : '#fff',
        shadowColor: 'black',
        shadowOffset: {
        width: 10,
        height: 10,
        
      },
      flexDirection: 'row',
      shadowOpacity: 1,
      shadowRadius: 9.51,
      elevation: 15, 
    },
    containerAffiches: {
        height: '100%',
    },  
  })

  export default MessageriePage;

