import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import bcrypt from 'react-native-bcrypt';
import 'react-native-gesture-handler';

import * as Notifications from 'expo-notifications';
import BottomTabNavigator from "./navigation/TabNavigator";
import Context from './navigation/userContext';
import './AppConfig';

export default function App() {

  var [utilisateurId, setUtilisateurId] = useState("");
  var [utilisateurToken, setUtilisateurToken] = useState("");
  var [utilisateurPassword, setUtilisateurPassword] = useState("");
  var [utilisateurPhoto, setUtilisateurPhoto] = useState("");

  const mounted = false;

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    async function getUtilisateur() {
      let _utilisateurId = null;
      let _utilisateurToken = null;
      let _utilisateurPassword = null;
      let _utilisateurMail = null;
      let _utilisateurPhoto = 'https://media.graphcms.com/HVBvcvHSY2y2xC5rcmXW';

      try {
        _utilisateurId = await SecureStore.getItemAsync('utilisateurId');
        _utilisateurToken = await SecureStore.getItemAsync('utilisateurToken');
        _utilisateurPassword = await SecureStore.getItemAsync('utilisateurPassword');
        _utilisateurMail = await SecureStore.getItemAsync('utilisateurMail');
        _utilisateurPhoto = await SecureStore.getItemAsync('utilisateurPhoto');
      } catch (e) {
        // Restoring token failed
      }

      //On refresh le token
      if(_utilisateurId != null && _utilisateurToken != null && _utilisateurPassword != null && _utilisateurMail != null) {
        fetch(global.apiUrl + 'Utilisateur/GetIdentifiants.php?Mail=' + _utilisateurMail)
        .then((response) => response.json())
        .then((data) => {
            if(data == false){
                setErreur("Il doit y avoir une erreur dans vos identifiants")
            }else{
                if(bcrypt.compareSync(_utilisateurPassword, data.MotDePasse)){
                    fetch(global.apiUrl + 'Utilisateur/SetTokenUtilisateur.php?UtilisateurId=' + data.UtilisateurId + '&Password=' + _utilisateurPassword)
                    .then((response) => response.json())
                    .then((dataToken) => {
                        save('utilisateurToken', dataToken);
                        save('utilisateurPhoto', data.Image);
                        _utilisateurToken = dataToken;
                    })

                    registerNotification()
                    .then(token => {
                        fetch('https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes/Utilisateur/SetToken.php?UtilisateurId=' + data.UtilisateurId + '&Token=' + token)
                    })
                    .catch(err => alert(err))

                    fetch(global.apiUrl + 'Utilisateur/Connect.php?UtilisateurId=' + data.UtilisateurId + '&Success=1')
                    
                }
                else{
                    setErreur("Il doit y avoir une erreur dans vos identifiants")
                    fetch(global.apiUrl + 'Utilisateur/Connect.php?UtilisateurId=' + data.UtilisateurId + '&Success=0')
                }
            }
        })
      }

      async function save(key, value){
        await SecureStore.setItemAsync(key, value)
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUtilisateurId(_utilisateurId);
      setUtilisateurToken(_utilisateurToken);
      setUtilisateurPassword(_utilisateurPassword);
      setUtilisateurPhoto(_utilisateurPhoto);
    };

    if(!mounted){
      getUtilisateur();
    }
    
    return () => mounted = true;

  }, []);

  async function registerNotification(){
    const {status} = await Notifications.requestPermissionsAsync()
    if (status != 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()
    }
    if(status != 'granted'){
        alert('failed to take the push token')
        return;
    }

    _token = (await Notifications.getExpoPushTokenAsync()).data;
    return _token;
}

  let utilisateur = {utilisateurId: utilisateurId, utilisateurPhoto: utilisateurPhoto, setUtilisateurPhoto: setUtilisateurPhoto, setUtilisateurId: setUtilisateurId, utilisateurToken: utilisateurToken, setUtilisateurToken: setUtilisateurToken, utilisateurPassword: utilisateurPassword, setUtilisateurPassword: setUtilisateurPassword, 'urlAPI': 'https://hugocabaret.onthewifi.com/TalkAndPoke/API/requetes'}

  return (

    <Context.Provider value={utilisateur}>
      <NavigationContainer>

        <BottomTabNavigator/>

      </NavigationContainer>
    </Context.Provider>
      
  );
}