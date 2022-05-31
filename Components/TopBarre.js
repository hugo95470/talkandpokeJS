import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';
import globalStyles from '../Styles/globalStyles';

export default function TopBarre(props) {

    const context = useContext(Context)

    var Notif = () => {
        if(context.notif && context.notif != ""){
            return(
                <View style={{height: 10, width: 10, borderRadius: 100, backgroundColor: 'red', position: 'absolute', top: 0, left: 0}}></View>
            );
        }else{
            return(
                <View></View>
            )
        }

        
    }

    return (
        <View style={styles.containerNavBarre}>

            <Image style={{height: 30, width: 30, borderRadius: 100, marginLeft: 30, marginTop: 0, backgroundColor: 'rgba(255, 255, 255, 0)',}} source={require('../assets/GrandLogoTP.png')}/>

            <Text style={[globalStyles.center, globalStyles.fontFamily, {fontSize: 20, color: "#888"}]}>{props.title}</Text>

            <TouchableOpacity onPress={() => props.navigation.navigate('MessageriePage')}>
                <View style={[globalStyles.shadows, globalStyles.cercle, styles.logo]}>
                    <Image style={{height: 30, width: 30, borderRadius: 100, backgroundColor: 'rgba(255, 255, 255, 0)', marginTop: 'auto', marginBottom: 'auto'}} source={{uri : "https://media.istockphoto.com/vectors/send-message-mail-icon-button-sign-paper-plane-navigation-logo-symbol-vector-id1227514358?k=6&m=1227514358&s=170667a&w=0&h=zK01wrL-BiUQIQv3JAEoUG2AdnDHE0JmWODhU6T2yNE="}}/>
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
        height: 30, 
        width: 30, 
        margin: 8, 
        marginRight: 20,
        alignItems: 'center'
    }
})