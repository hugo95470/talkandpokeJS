import * as SecureStore from 'expo-secure-store';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import bcrypt from 'react-native-bcrypt';

import Context from '../navigation/userContext';
import { connect, getUtilisateurIdentifiants, getUtilisateurToken } from '../service/UtilisateurService';
import globalStyles from '../Styles/globalStyles';

export default function ConnexionPage(props) {

    const context = useContext(Context)

    var [mail, setMail] = useState("");
    var [motDePasse, setMotDePasse] = useState("");
    var [erreur, setErreur] = useState("");

    async function connectCommand(){
        await getUtilisateurIdentifiants(mail)
        .then(async (data) => {
            if(data == false){
                setErreur("Il doit y avoir une erreur dans vos identifiants")
            }else{
                if(bcrypt.compareSync(motDePasse, data.MotDePasse)){
                
                    await getUtilisateurToken(data.UtilisateurId, motDePasse)
                    .then(async (dataToken) => {
                        await SecureStore.setItemAsync('utilisateurToken', dataToken)
                        await SecureStore.setItemAsync('utilisateurId', data.UtilisateurId)
                        await SecureStore.setItemAsync('utilisateurMail', mail)
                        await SecureStore.setItemAsync('utilisateurPassword', motDePasse)
                        await SecureStore.setItemAsync('utilisateurPhoto', data.Image)
    
                        context.setUtilisateurId(data.UtilisateurId)
                        context.setUtilisateurPhoto(data.Image)
                        context.setUtilisateurPassword(motDePasse)
                        context.setUtilisateurToken(dataToken)
    
                        await connect(data.UtilisateurId , '1');
                    })
                }
                else{
                    setErreur("Il doit y avoir une erreur dans vos identifiants")
                    await connect(data.UtilisateurId , '0');
                }
            }
        })
    }

    return(
        <View style={globalStyles.center}>

            <ImageBackground imageStyle={{borderRadius: 100}} style={[globalStyles.orangeShadows, globalStyles.center, globalStyles.cercle, {marginBottom: 50, height: 100, width: 100}]} source={require("../assets/icon.png")}/>

            <Text style={{fontSize: 40}}>Connexion</Text>

            <Text>{erreur}</Text>

            <View style={[globalStyles.shadows, globalStyles.input]}>
                <TextInput keyboardType="email-address" value={mail} onChangeText={setMail} placeholder={"Adresse mail"}/>
            </View>
            <View style={[globalStyles.shadows, globalStyles.input]}>
                <TextInput secureTextEntry={true} value={motDePasse} onChangeText={setMotDePasse} placeholder={"Mot de passe"}/>
            </View>

            <TouchableOpacity style={[globalStyles.demiInput, globalStyles.orangeShadows]} onPress={async () => connectCommand() }>
                <Text style={[globalStyles.center, globalStyles.white]}>Connexion</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('CreationComptePage')}>
                <Text style={[globalStyles.center, {marginTop: 10, textDecorationLine: 'underline'}]}>Je n'ai pas encore de compte</Text>
            </TouchableOpacity>
        </View>
    )
}