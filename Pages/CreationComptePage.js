import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import bcrypt from 'react-native-bcrypt';
import CheckBox from 'expo-checkbox'; 

import CGU from '../CGU.js';


//TODO: TO REFACTOR


export default function CreationCompte({ navigation}) {

    const cgu = CGU;

    var [imageUri, setImageUri] = useState("");
    var [image, setImage] = useState("");
    var [mail, setMail] = useState("");
    var [verifMail, setVerifMail] = useState(false);
    var [verifPseudo, setVerifPseudo] = useState(false);
    var [pseudo, setPseudo] = useState("");
    var [password, setPassword] = useState("");
    var [verifPassword, setVerifPassword] = useState("");
    var [sexe, setSexe] = useState(false);
    var [checkBox, setCheckBox] = useState(true);
    var [verifPhoto, setVerifPhoto] = useState(false);

    var [index, setIndex] = useState(1);

    var [erreur, setErreur] = useState("");


    function selectAleaImage(){
        let number = Math.floor(Math.random() * 10)

        image = [   "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil1.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil2.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil3.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil4.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil5.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil6.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil7.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil8.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil9.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil10.png",
                    "https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil10.png",
                ]
        return image[number]

    }

    function CreateProfil(){
        const date = Date.now();
        if(verifPassword == password){

            let imageProfil = 'https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/Utilisateurs/' + pseudo + date + '.png'
            if(imageUri == ""){
                imageProfil = selectAleaImage()

            }else{
                let data = new FormData();
                data.append('pseudo', pseudo + date);
                
                data.append('photo', {
                    uri: imageUri,
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
                })
            }

            var _sexe = 0
            if(sexe){
                _sexe = 1
            }else{
                _sexe = 0
            }

            var _password = bcrypt.hashSync(password)
            
            var uri = global.apiUrl + 'Utilisateur/CreateUtilisateur.php?Mail=' + mail + '&Pseudo=' + pseudo + '&MotDePasse=' + _password + '&Image=' + imageProfil

            fetch(uri);
            alert('Votre compte a bien été créé')

            navigation.navigate("ConnexionPage")
        }else{
            setErreur("Les mots de passe indiqué sont différents")
        }
    }

    var Image = () => {
        return(
            <View>
                <View style={styles.input}>
                    <TextInput value={image} onChangeText={setImage} placeholder={"Lien vers l'image"}/>
                </View>

                <View style={styles.inputImage}>
                    <TouchableOpacity style={{flex: 1}} >
                            {/* onPress={() => selectImage()}*/}
                        <Image style={{flex: 1, borderRadius: 100, margin: 10}} source={{uri: image}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function verifMailCommand(){
        fetch(global.apiUrl + 'Utilisateur/VerifMail.php?Mail=' + mail.toLowerCase())
        .then((data) => data.json())
        .then(data => {
            if(JSON.stringify(data) == "false"){
                setVerifMail(false)
            }else{
                setVerifMail(true)
            }
        })
    }

    function verifPseudoCommand(){
        fetch(global.apiUrl + 'Utilisateur/VerifPseudo.php?Pseudo=' + pseudo.toLowerCase())
        .then((data) => data.json())
        .then(data => {
            if(JSON.stringify(data) == "false"){
                setVerifPseudo(false)
            }else{
                setVerifPseudo(true)
            }
        })
    }

    var VerifMail = () => {
        if(verifMail){
            return(
                <View>
                    <Text>Ce mail est déjà utilisé</Text>
                </View>
            );
        }
        if((!/[@]/.test(mail) || !/[.]/.test(mail)) && mail != ""){
            return(
                <View>
                    <Text>Ceci n'est pas une adresse mail</Text>
                </View>
            )   
        }else{
            return(
                <View></View>
            )
        }
        
    }

    var VerifPseudo = () => {
        if(verifPseudo){
            return(
                <View>
                    <Text>Ce pseudo est déjà utilisé</Text>
                </View>
            );
        }else{
            return(
                <View></View>
            )
        }
        
    }

    function verifPhotoCommand() {
        if(imageUri == "")
            alert('Noubliez pas de choisir votre image de profil ! Sinon nous en choisirons une pour vous 😈 ')
        setVerifPhoto(true)
    }

    async function selectImage(){
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            base64: true,
          })
        
        setImage(_image);
        setImageUri(_image.uri);
    }

    var Connect = () => {
        return(
            <View style={{position: 'absolute', bottom: 30, left: '13%'}}>
                <TouchableOpacity onPress={() => navigation.navigate('ConnexionPage')}>
                    <Text style={{ marginTop: 10, textDecorationLine: 'underline'}}>Oups! je me suis trompé j'ai déjà un compte !</Text>
                </TouchableOpacity>
            </View>
        )
        
    }

    switch (index) {
        case 1:
            return(
                <View style={styles.container}>

                    <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Text>{erreur}</Text>
                    </View>
                    
                    <View style={{marginRight: 50, marginLeft: 50}}>
                    <View>
                        <Text style={{fontSize: 25}}>Mail</Text>
                        <VerifMail/>
                        <View key='keyMail' style={styles.input}>
                            <TextInput value={mail} onKeyPress={verifMailCommand()} onChangeText={setMail} keyboardType="email-address" placeholder={"Adresse mail"}/>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 45, marginTop: 20}}>
                            <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> setIndex(index+1)}>
                                <Text>Suivant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>

                    <Connect/>

                </View>
                
            )
        
        case 2:
            return(
                <View style={styles.container}>

                    <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Text>{erreur}</Text>
                    </View>

                    <Text style={{fontSize: 20, marginLeft: 50, marginBottom: 20}}>Choisir une image de profil</Text>

                    <View style={styles.inputImage}>
                        <TouchableOpacity onPress={() => selectImage()} style={{flex: 1}} >
                            <ImageBackground imageStyle={{borderRadius: 100}} style={{flex: 1, borderRadius: 100, margin: 10}} source={{uri: imageUri}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginRight: 50, marginLeft: 50, marginBottom: 50}}>
                        <View>
                            <Text style={{fontSize: 25}}>Pseudo</Text>
                            <VerifPseudo/>
                            <View style={styles.input}>
                                <TextInput value={pseudo}  onKeyPress={verifPseudoCommand()} onChangeText={setPseudo} placeholder={"Pseudo"}/>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                                <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> setIndex(index-1)}>
                                    <Text>Précédent</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> {verifPhoto?setIndex(index+1):verifPhotoCommand()}}>
                                    <Text>Suivant</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Connect/>

                </View>
            )

        case 3:
            return(
                <View style={styles.container}>

                    <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        <Text>{erreur}</Text>
                    </View>
                    
                    <View style={{marginRight: 50, marginLeft: 50}}>
                    <View>
                        <Text style={{fontSize: 25}}>Mot de passe</Text>

                        <Text>(Le mot de passe doit contenir plus de 8 caractères)</Text>


                        <View style={styles.input}>
                            <TextInput value={password} onChangeText={setPassword} secureTextEntry={true} placeholder={"Mot de passe"}/>
                        </View>
                        <View style={styles.input}>
                            <TextInput value={verifPassword} onChangeText={setVerifPassword} secureTextEntry={true} placeholder={"Confirmation mot de passe"}/>
                        </View>

                        <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                            <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> setIndex(index - 1)}>
                                <Text>Précédent</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> setIndex(index+1)}>
                                <Text>Suivant</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </View>

                    <Connect/>

                </View>
            )

            // && /\d/.test(password) && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password)
        case 4:
            if((password == verifPassword) && !verifMail && !verifPseudo && pseudo != "" && checkBox && /[@]/.test(mail) && /[.]/.test(mail) && password.length > 7){
                return (
                    <View style={styles.container}>

                        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                            <Text>{erreur}</Text>
                        </View>
                        
                        <View style={{marginRight: 50, marginLeft: 50}}>
                            <View>
                                <Text style={{fontSize: 25}}>Récapitulatif</Text>
            
                                <Text style={{marginLeft: 10, fontSize: 18, marginTop: 30}}>Mail</Text>
                                <Text style={{marginLeft: 20}}>{mail}</Text>

                                <Text style={{marginLeft: 10, fontSize: 18, marginTop: 30}}>Pseudo</Text>
                                <Text style={{marginLeft: 20, marginBottom: 30}}>{pseudo}</Text>
            
                                <View style={styles.inputCheckBox}>
                                    <CheckBox
                                    onPress={alert(cgu)}
                                    color={'#FEA52A'}
                                    value={checkBox}
                                    onValueChange={setCheckBox}
                                    />
                                    <Text style={{marginBottom: 'auto', marginTop: 'auto'}}>conditions générales d'utilisation</Text>
                                </View>

                                <View style={styles.input}>
                                    <TouchableOpacity onPress={() => CreateProfil()}>
                                        <Text style={{margin: 10, marginRight: 20, textAlign: 'center'}}>Créer mon compte</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 45, marginTop: 20}}>
                                    <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> setIndex(index-1)}>
                                        <Text>Précédent</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <Connect/>

                    </View>
                    
                )
            }else{
                return (
                    <View style={styles.container}>

                        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
                            <Text>{erreur}</Text>
                        </View>
                        
                        <View style={{marginRight: 50, marginLeft: 50}}>
                            <View>
                                <Text style={{fontSize: 25}}>Récapitulatif</Text>
                
                                <Text style={{marginLeft: 10, fontSize: 18, marginTop: 30}}>Mail</Text>
                                <Text style={{marginLeft: 20}}>{mail}</Text>

                                <Text style={{marginLeft: 10, fontSize: 18, marginTop: 30}}>Pseudo</Text>
                                <Text style={{marginLeft: 20, marginBottom: 30}}>{pseudo}</Text>

                                <View style={styles.inputCheckBox}>
                                    <CheckBox
                                    onPress={checkBox?alert(cgu):""}
                                    color={'#FEA52A'}
                                    value={checkBox}
                                    onValueChange={setCheckBox}
                                    />
                                    <Text style={{marginBottom: 'auto', marginTop: 'auto'}}>Je reconnais avoir lu et compris les CGU et je les accepte</Text>
                                </View>

                                <Text style={{fontSize: 20, marginLeft: 'auto', marginRight: 'auto'}}>Il manque certaines informations ou ces informations ne sont pas valides</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 45, marginTop: 20}}>
                                    <TouchableOpacity style={{backgroundColor: '#eee', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100}} onPress={()=> setIndex(index-1)}>
                                        <Text>Précédent</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>

                        <Connect/>

                    </View>
                    
                )
            }
            
        default :
            return(
                <Text>Erreur</Text>
            )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#eee',
    },
    input: {
        elevation: 5,
        backgroundColor: 'white',
        paddingLeft: 20,
        minWidth: 250,
        paddingVertical: 10,
        borderRadius: 100,
        marginTop: 20,
    },
    inputImage: {
        height: 100,
        width: 100,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 100,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 30,
    },
    inputCheckBox: {
        marginBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
    },
})