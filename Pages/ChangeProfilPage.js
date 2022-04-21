import React, { useContext } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from "expo-linear-gradient";

import Context from '../navigation/userContext';
import CGU from '../CGU.js';
import { getUtilisateurInformations } from '../service/AfficheService';
import UpdatePassword from '../Components/UpdateUtilisateur/UpdatePassword';
import UpdateSexe from '../Components/UpdateUtilisateur/UpdateSexe';


//TO REFACTOR


export default function ChangeProfilPage(props) {

    const context = useContext(Context)

    let { profilId } = ""
    try {
        profilId = props.route.params._profilId;
    } catch (error) {
        profilId = props.profilId;
    }

    let [utilisateur, setUtilisateur] = useState("");

    let [pseudo, setPseudo] = useState("");
    let [createdDate, setCreatedDate] = useState("");
    let [partage, setPartage] = useState("");
    let [description, setDescription] = useState("");
    let [jourNaissance, setJourNaissance] = useState("");
    let [moisNaissance, setMoisNaissance] = useState("");
    let [anneeNaissance, setAnneeNaissance] = useState("");
    let [commentaire, setCommentaire] = useState("");

    var [verifPseudo, setVerifPseudo] = useState(false);

    const cgu = CGU;

    //Loading Utilisateur Informations
    useEffect(async () => {
        setUtilisateur(await getUtilisateurInformations(context.utilisateurId));
    }, []);

    useEffect(() => {
        let mounted = true;

        if(mounted){
            let DateNaissance = new Date(String(utilisateur.DateNaissance).substring(0,10));

            setPseudo(utilisateur.Pseudo);
            setCreatedDate(String(new Date(String(utilisateur.CreateDate).substring(0,10)).toLocaleDateString()));
            setPartage(utilisateur.Partage);
            setDescription(utilisateur.Description);
            if(String(DateNaissance.getDate()) != "NaN")
                setJourNaissance(String(DateNaissance.getDate()));
            if(String(DateNaissance.getMonth()) != "NaN")
                setMoisNaissance(String(DateNaissance.getMonth() + 1));
            if(String(DateNaissance.getFullYear()) != "NaN")
            setAnneeNaissance(String(DateNaissance.getFullYear()));

        }
       
        return () => mounted = false;
    }, [utilisateur])

    function changePseudo(){
        if(!verifPseudo){
            fetch(global.apiUrl + 'Utilisateur/UpdatePseudo.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken + '&Pseudo=' + encodeURIComponent(pseudo))
            .then(alert('Pseudo changé !'))
        }
    }

    function verifPseudoCommand(){
        fetch(global.apiUrl + 'Utilisateur/VerifPseudo.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken + '&Pseudo=' + encodeURIComponent(pseudo))
        .then((data) => data.json())
        .then(data => {
            if(JSON.stringify(data) == "false"){
                setVerifPseudo(false)
            }else{
                setVerifPseudo(true)
            }
        })
    }

    function changeDescription(){
        fetch(global.apiUrl + 'Utilisateur/UpdateDescription.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken + '&Description=' + encodeURIComponent(description))
        .then(alert('Description changé !'))
    }

    function changeDateNaissance(){
        let url = global.apiUrl + 'Utilisateur/UpdateDateNaissance.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken + '&DateNaissance=' + anneeNaissance + "-" + moisNaissance + "-" + jourNaissance
        console.log(url)
        fetch(url)
        .then(alert('Date de naissance changé !'))
    }

    async function sendCommentaire(){
        let url = global.apiUrl + 'Utilisateur/AddCommentaire.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken + '&Commentaire=' + encodeURIComponent(commentaire)
        await fetch(url)
        .then(setCommentaire(''))
        .then(alert('Merci pour votre commentaire ! Cela nous aide beaucoup dans l\'avancement de notre application : )'))
    }

    function deconnexion(){
        try {
            SecureStore.deleteItemAsync('utilisateurToken');
            SecureStore.deleteItemAsync('utilisateurMail');
            SecureStore.deleteItemAsync('utilisateurPassword');
            SecureStore.deleteItemAsync('utilisateurId');
            SecureStore.deleteItemAsync('utilisateurPhoto');
            SecureStore.deleteItemAsync('Affiches');
            SecureStore.deleteItemAsync('Affinites');
        }catch(error) {
            alert("can't remove ID" + error)
        }
        

        context.setUtilisateurId(null);
        context.setUtilisateurToken(null);
        context.setUtilisateurPassword(null);
    }
    function DeleteCompte(){
        //alert(context.utilisateurId)
        fetch(global.apiUrl + 'Utilisateur/DeleteUtilisateur.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
        .then(alert('votre compte a bien été supprimé'))
        deconnexion()
    }

    async function selectImage(){
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            base64: true,
          })
        

        setState({
            imageSource: _image.uri,
            data: _image.data
        });
        
        setPhoto({Image : _image.uri});

        let data = new FormData();
            data.append('pseudo', utilisateur.Pseudo);
            
            data.append('photo', {
                uri: _image.uri,
                type: 'image/png',
                name: 'image'
            });

        fetch(global.apiUrl + 'AddImage.php', {
                method: 'POST',
                body: data,
                type: 'image/jpeg',
                header: {
                    'content-type': 'multipart/form-data',
                },
        }).then(() => alert('il faut parfois attendre quelques minutes avant que l\'image soit uploadée aux serveur, merci d\'être patien : )'))

        fetch(global.apiUrl + 'Utilisateur/UpdateImage.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken + '&Image=https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/' + photo.Pseudo + '.png')
    }

    var ImageProfil = () => {
        return(
            <TouchableOpacity onPress={() => selectImage()}>
                <View style={{marginTop: 0}}>
                    
                    <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 50}}>
                        <Image style={{height: 100, width: 100, borderRadius: 100}} source={{uri: utilisateur.Image}}/>
                        <TouchableOpacity style={{position: 'absolute', top: -10, right: -10}} onPress={() => selectImage()}>
                                <LinearGradient colors={['rgb(254, 165, 42)', 'rgbrgb(254, 165, 42)']}start={{x: 0, y: 1}} end={{x: 1, y: -1}} style={{height: 40, width: 40, borderRadius: 100, alignSelf: 'flex-end'}}>
                                    <Image style={{height: 20, width: 20, top: 10, left: 10, backgroundColor: 'transparent'}} source={require('../Images/ChangeImage.png')}/>
                                </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    var Deconnexion = () => {
        return(
            <View style={{marginTop: 50, marginBottom: 80}}>
                <TouchableOpacity style={{marginTop: 20, backgroundColor: 'white', elevation: 5, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => context.setIntro(null)}>
                    <Text>Revoir l'introduction !</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => alert(cgu)}>
                    <Text style={{textDecorationLine: 'underline'}}>Conditions générales d'utilisation</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, backgroundColor: 'white', elevation: 5, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => DeleteCompte()}>
                    <Text>Supprimer mon compte</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20, backgroundColor: 'white', elevation: 5, borderRadius: 100,paddingHorizontal: 20, paddingVertical: 10, marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto',}} onPress={() => deconnexion()}>
                    <Text>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        )
    };

    var BackArrow = () => {
        if(profilId != context.utilisateurId){
            return(
                <View style={{flexDirection: 'row', height: 100}}>
                    <TouchableOpacity style={{position: 'absolute', left: 20, bottom: 0}} onPress={() => props.navigation.pop()}>
                        <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                            <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            
        }else{
            return(
                <View>
                </View>
            )
        }
    };

    var Partage = () => {
        if(partage == 0){
            return(
                <View style={{height: 60, marginTop: 20, width: 180, backgroundColor: 'white', borderRadius: 100}}>
                    <Text onPress={() => changePartage(0)} style={{marginLeft: 20, marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Public</Text>

                    <TouchableOpacity onPress={() => changePartage(1, 'public')} style={{backgroundColor: 'rgb(254, 165, 42)', width: 90, height: 50, position: 'absolute', right: 0, borderRadius: 100, margin: 5}}>
                        <View style={{flexDirection: 'row', height: 50}}>
                            <Text style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto'}}>Privée</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
            
        }else{
            return(
                <View style={{height: 60, marginTop: 20, width: 180, backgroundColor: 'white', borderRadius: 100}}>
                    <Text onPress={() => changePartage(1)} style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 'auto', marginRight: 20}}>Privée</Text>

                    <TouchableOpacity onPress={() => changePartage(0, 'privée')} style={{backgroundColor: 'rgb(254, 165, 42)', width: 90, height: 50, position: 'absolute', left: 0, borderRadius: 100, margin: 5}}>
                        <View style={{flexDirection: 'row', height: 50}}>

                            <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Public</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            )
        }
    };

    function changePartage(valeur, libelle){
        setPartage(valeur)
        alert('Votre compte est passé en mode ' + libelle)
        let url = global.apiUrl + 'Utilisateur/UpdatePartage.php?UtilisateurId=' + context.utilisateurId + '&Partage=' + valeur
        fetch(url)
    }

    var VerifPseudo = () => {
        if(verifPseudo){
            return(
                <View style={{marginLeft: 20, marginBottom: 5}}>
                    <Text>Ce pseudo est déjà utilisé</Text>
                </View>
            );
        }else{
            return(
                <View></View>
            )
        }
        
    }

    return(
        <ScrollView>
            <BackArrow/>
            <ImageProfil/>


            {/* PUBLIC/PRIVEE */}
            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Partage/>
            </View>

            {/* DATE INSCRIPTION */}
            <View style={{marginLeft: 50, marginTop: 30, marginRight: 'auto'}}>
                <Text>Date d'inscription : {createdDate}</Text>
            </View>


            {/* PSEUDO */}
            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>Pseudo</Text>
                <VerifPseudo/>

                <View style={{height: 60, width: 320, backgroundColor: 'white', borderRadius: 100}}>
                    <TextInput onKeyPress={verifPseudoCommand()} style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 30}} value={pseudo} onChangeText={setPseudo} placeholder={"Pseudo"}/>
                
                    <TouchableOpacity onPress={() => changePseudo()} style={{backgroundColor: 'rgb(254, 165, 42)', width: 120, height: 50, position: 'absolute', right: 0, borderRadius: 100, margin: 5}}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Sauvegarder</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* DESCRIPTION */}
            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>Description</Text>
                <View style={{height: 150, width: 320, backgroundColor: 'white', borderRadius: 19}}>
                    <TextInput style={{marginBottom: 'auto', marginTop: 10, maxWidth: 250, paddingBottom: 115, marginLeft: 30}} value={description} onChangeText={setDescription} placeholder={"Change ma description"}/>
                
                    <TouchableOpacity onPress={() => changeDescription()} style={{backgroundColor: 'rgb(254, 165, 42)', width: 120, height: 50, position: 'absolute', right: 10, bottom: 10, borderRadius: 100, margin: 5}}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Sauvegarder</Text>
                    </TouchableOpacity>

                </View>
            </View>
            
            {/* DATE DE NAISSANCE */}
            {/* <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>Date de naissance</Text>
                <View style={{height: 170, width: 320, backgroundColor: 'white', borderRadius: 19}}>
                    <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
                        <View style={{height: 50, width: 80, margin: 5, backgroundColor: '#eee', borderRadius: 10}}>
                            <TextInput keyboardType="numeric" style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 20}} value={jourNaissance} onChangeText={setJourNaissance} placeholder={"Jour"}/>
                        </View>

                        <View style={{height: 50, width: 80, margin: 5, backgroundColor: '#eee', borderRadius: 10}}>
                            <TextInput keyboardType="numeric" style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 20}} value={moisNaissance} onChangeText={setMoisNaissance} placeholder={"Mois"}/>
                        </View>

                        <View style={{height: 50, width: 80, margin: 5, backgroundColor: '#eee', borderRadius: 10}}>
                            <TextInput keyboardType="numeric" style={{marginBottom: 'auto', marginTop: 'auto', maxWidth: 170, marginLeft: 20}} value={anneeNaissance} onChangeText={setAnneeNaissance} placeholder={"Année"}/>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => changeDateNaissance()} style={{backgroundColor: 'rgb(254, 165, 42)', width: 120, height: 50, position: 'absolute', right: 10, bottom: 10, borderRadius: 100, margin: 5}}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Sauvegarder</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            {/* SEXE */}
            {/* <UpdateSexe sexe={utilisateur.Sexe}/> */}

            {/* MOT DE PASSE */}
            <UpdatePassword/>


            {/* LAISSEZ NOUS UN COMMENTAIRE */}
            <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={styles.title}>Commentaire</Text>
                <View style={{height: 150, width: 320, backgroundColor: 'white', borderRadius: 19}}>
                    <TextInput style={{marginBottom: 'auto', marginTop: 10, maxWidth: 250, paddingBottom: 115, marginLeft: 30}} value={commentaire} onChangeText={setCommentaire} placeholder={"Laissez nous un commentaire !   : )"}/>
                
                    <TouchableOpacity onPress={async () => sendCommentaire()} style={{backgroundColor: 'rgb(254, 165, 42)', width: 120, height: 50, position: 'absolute', right: 10, bottom: 10, borderRadius: 100, margin: 5}}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Envoyer</Text>
                    </TouchableOpacity>

                </View>
            </View>


            <Deconnexion/>
        </ScrollView>
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