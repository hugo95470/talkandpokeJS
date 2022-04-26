import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useEffect, useState } from 'react';
import { recupMessage, recupMessageOeuvre } from '../service/MessageService';

import Context from '../navigation/userContext';


export default function MessageUtilisateurView(props) {

    const context = useContext(Context)

    useEffect(async () => {
        setMoiInfo(await getUtilisateurInformations(context.utilisateurToken));

        const interval = setInterval(async () => {
            if(!isOeuvre){
                await recupMessage(props.expediteurId, 20, context.utilisateurToken, props.date)
                await readMessage(context.utilisateurToken, _expediteurId)
            }else{
                recupMessageOeuvre(props.oeuvreId, props.date)
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <View></View>
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
})