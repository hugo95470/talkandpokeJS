import * as SecureStore from 'expo-secure-store';
import React, { useContext } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import bcrypt from 'react-native-bcrypt';

import Context from '../navigation/userContext';

export default function ConnexionPage(props) {

    const context = useContext(Context)

    var [mail, setMail] = useState("");
    var [motDePasse, setMotDePasse] = useState("");
    var [erreur, setErreur] = useState("");

    async function save(key, value){
        await SecureStore.setItemAsync(key, value)
    }

    function connect(){
        fetch(global.apiUrl + 'Utilisateur/GetIdentifiants.php?Mail=' + mail)
        .then((response) => response.json())
        .then((data) => {
            if(data == false){
                setErreur("Il doit y avoir une erreur dans vos identifiants")
            }else{
                //alert(data.MotDePasse)
                //alert(bcrypt.hashSync(motDePasse))
                if(bcrypt.compareSync(motDePasse, data.MotDePasse)){
                    fetch(global.apiUrl + 'Utilisateur/SetTokenUtilisateur.php?UtilisateurId=' + data.UtilisateurId + '&Password=' + motDePasse)
                    .then((response) => response.json())
                    .then((dataToken) => {
                        save('utilisateurToken', dataToken)
                        context.setUtilisateurToken(dataToken)
                    })
                    save('utilisateurId', data.UtilisateurId)
                    context.setUtilisateurId(data.UtilisateurId)

                    fetch(global.apiUrl + 'Utilisateur/Connect.php?UtilisateurId=' + data.UtilisateurId + '&Success=1')
                    
                    save('utilisateurMail', mail)
                    save('utilisateurPassword', motDePasse)
                    save('utilisateurPhoto', data.Image)
                    context.setUtilisateurPhoto(data.Image)
                    context.setUtilisateurPassword(motDePasse)
                }
                else{
                    setErreur("Il doit y avoir une erreur dans vos identifiants")
                    fetch(global.apiUrl + 'Utilisateur/Connect.php?UtilisateurId=' + data.UtilisateurId + '&Success=0')
                }
            }
        })
    }

    return(
        <View style={styles.container}>

            <ImageBackground imageStyle={{borderRadius: 100}} style={{marginBottom: 50, borderRadius: 100, marginLeft: 'auto', marginRight: 'auto', height: 100, width: 100}} source={require("../assets/icon.png")}/>

            <Text style={styles.title}>Connexion</Text>

            <Text>{erreur}</Text>

            <View style={styles.input}>
                <TextInput keyboardType="email-address" value={mail} onChangeText={setMail} placeholder={"Adresse mail"}/>
            </View>
            <View style={styles.input}>
                <TextInput secureTextEntry={true} value={motDePasse} onChangeText={setMotDePasse} placeholder={"Mot de passe"}/>
            </View>

            <View style={styles.demiInput}>
                <TouchableOpacity onPress={() => connect() }>
                    <Text style={{margin: 5, marginRight: 20, height: 50, textAlign: 'center'}}>Connexion</Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('CreationComptePage')}>
                    <Text style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 10, textDecorationLine: 'underline'}}>Je n'ai pas encore de compte</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 100}}></View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 40,
    },
    input: {
        elevation: 5,
        height: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 8,

        backgroundColor: 'white',
        paddingLeft: 20,
        minWidth: 250,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
    },
    demiInput: {
        elevation: 5,
        height: 50,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 8,

        backgroundColor: 'white',
        paddingLeft: 20,
        minWidth: 10,
        width: 150,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    inputDate: {
        flexDirection: "row",
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 8,

        backgroundColor: 'white',
        paddingLeft: 20,
        minWidth: 250,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
        justifyContent: 'space-around',
        paddingRight: 20,
    },
    inputImage: {
        height: 100,
        width: 100,
        elevation: 5,
        shadowColor: '#aaa',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 1,

        backgroundColor: 'white',
        borderRadius: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 30,
    },
    inputCheckBox: {
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
    },
})