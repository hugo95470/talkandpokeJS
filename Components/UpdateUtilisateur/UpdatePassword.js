import React, { useContext } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

import Context from '../../navigation/userContext';
import { getUtilisateurPassword, updateUtilisateurPassword } from '../../service/UtilisateurService.js';

export default function UpdatePassword() {

    const context = useContext(Context)

    let [ancienMotDePasse, setAncienMotDePasse] = useState("");
    let [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
    let [verifMotDePasse, setVerifMotDePasse] = useState("");

    async function changeMotDePasse(){
        if(nouveauMotDePasse == verifMotDePasse){

            await getUtilisateurPassword(context.utilisateurToken)
            .then((response) => response.json())
            .then(async (data) => {
                if(bcrypt.compareSync(ancienMotDePasse, data.MotDePasse)){
                    let hashMotDePasse = bcrypt.hashSync(nouveauMotDePasse)
    
                    await updateUtilisateurPassword(context.utilisateurToken, hashMotDePasse)
                    .then(alert('Votre mot de passe a été changé ! 😀'))
                }else{
                    alert('Ancien mot de passe incorrecte')
                }
            })
        }
    }

    return (
        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>Mot de passe</Text>

                <View style={{height: 270, width: 320, backgroundColor: 'white', borderRadius: 19}}>
                    <View style={{height: 50, width: 290, margin: 10, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#eee', borderRadius: 100}}>
                        <TextInput secureTextEntry={true} style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 30}} value={ancienMotDePasse} onChangeText={setAncienMotDePasse} placeholder={"Ancien mot de passe"}/>
                    </View>

                    <View style={{height: 50, width: 290, margin: 10, marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#eee', borderRadius: 100}}>
                        <TextInput secureTextEntry={true} style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 30}} value={nouveauMotDePasse} onChangeText={setNouveauMotDePasse} placeholder={"Nouveau mot de passe"}/>
                    </View>

                    <View style={{height: 50, width: 290, margin: 5, backgroundColor: '#eee', marginLeft: 'auto', marginRight: 'auto', borderRadius: 100}}>
                        <TextInput secureTextEntry={true} style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 30}} value={verifMotDePasse} onChangeText={setVerifMotDePasse} placeholder={"Verification mot de passe"}/>
                    </View>

                    <TouchableOpacity onPress={async () => changeMotDePasse()} style={{backgroundColor: 'rgb(254, 165, 42)', width: 120, height: 50, position: 'absolute', right: 10, bottom: 10, borderRadius: 100, margin: 5}}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Sauvegarder</Text>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 10,
        color: 'black',
        marginBottom: 5
    },
})