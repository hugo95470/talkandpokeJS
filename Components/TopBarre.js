import React, { useContext } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';

function TopBarre(props) {

    const context = useContext(Context)

    var [notif, setNotif] = useState(false);

    useEffect(() => {
        if(context.utilisateurId != "" && context.utilisateurToken != "")
            recupNotif()
    }, [context.utilisateurId, context.tokenUtilisateur]);

    function recupNotif() {
        var uri = global.apiUrl + 'Message/GetNotification.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken
        fetch(uri)
        .then((data) => setNotif(data))
        
        setTimeout(recupNotif, 10000);
    }

        var Notif = () => {
            if(notif){
                return(
                    <View style={{height: 10, width: 10, borderRadius: 100, backgroundColor: 'red', position: 'absolute', top: 3, left: 3}}></View>
                );
            }else{
                return(
                    <View></View>
                )
            }

            
        }

        return (
            <View style={styles.containerNavBarre}>

                <Image style={{height: 50, width: 50, borderRadius: 100, marginLeft: 30, marginTop: 0, backgroundColor: 'rgba(255, 255, 255, 0)',}} source={require('../assets/GrandLogoTP.png')}/>

                <TouchableOpacity onPress={() => props.navigation.navigate('MessageriePage')}>
                    <View style={styles.logo}>
                        <Image style={{height: 45, width: 45, borderRadius: 100, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={{uri : "https://media.istockphoto.com/vectors/send-message-mail-icon-button-sign-paper-plane-navigation-logo-symbol-vector-id1227514358?k=6&m=1227514358&s=170667a&w=0&h=zK01wrL-BiUQIQv3JAEoUG2AdnDHE0JmWODhU6T2yNE="}}/>
                        <Notif/>
                    </View>
                </TouchableOpacity>

            </View>
        )    
}

const styles = StyleSheet.create({
    containerNavBarre: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 19, 
        borderBottomRightRadius: 19, 
        paddingTop: 33,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5,
    },
    logo: {
        backgroundColor: 'white',
        height: 45, 
        width: 45, 
        borderRadius: 100, 
        margin: 8, 
        marginRight: 20, 
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        alignItems: 'center'
    }
})


export default TopBarre