import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect, useRef  } from 'react';
import bcrypt from 'react-native-bcrypt';
import 'react-native-gesture-handler';

import BottomTabNavigator from "./navigation/TabNavigator";
import Context from './navigation/userContext';
import './AppConfig';
import { getUtilisateurToken, getUtilisateurIdentifiants, setNotificationToken, connect } from './service/UtilisateurService';
import { registerNotification } from './service/NotificationService';

export default function App() {

  var [utilisateurId, setUtilisateurId] = useState("");
  var [utilisateurToken, setUtilisateurToken] = useState("");
  var [utilisateurPassword, setUtilisateurPassword] = useState("");
  var [utilisateurPhoto, setUtilisateurPhoto] = useState("");

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
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
      if(_utilisateurToken != null) {
        getUtilisateurIdentifiants(_utilisateurMail)
        .then(async (data) => {
          if(bcrypt.compareSync(_utilisateurPassword, data.MotDePasse)){
            await getUtilisateurToken(data.UtilisateurId, _utilisateurPassword)
            .then(async (dataToken) => {
              await SecureStore.setItemAsync('utilisateurToken', dataToken);
              await SecureStore.setItemAsync('utilisateurPhoto', data.Image);
              _utilisateurToken = dataToken;
            })

            await registerNotification()
            .then(async (token) => {
              await setNotificationToken(data.UtilisateurId, token);
            })

            await connect(data.UtilisateurId , '1');
          }
          else{
            await connect(data.UtilisateurId , '0');
          }
        })

        setUtilisateurId(_utilisateurId);
        setUtilisateurToken(_utilisateurToken);
        setUtilisateurPassword(_utilisateurPassword);
        setUtilisateurPhoto(_utilisateurPhoto);
      }
    };

    getUtilisateur();
    
    return () => {
      mounted.current = false;
    };

  }, []);

  let utilisateur = { utilisateurId: utilisateurId, 
                      setUtilisateurId: setUtilisateurId, 
                      utilisateurPhoto: utilisateurPhoto, 
                      setUtilisateurPhoto: setUtilisateurPhoto, 
                      utilisateurToken: utilisateurToken, 
                      setUtilisateurToken: setUtilisateurToken, 
                      utilisateurPassword: utilisateurPassword, 
                      setUtilisateurPassword: setUtilisateurPassword}

  return (

    <Context.Provider value={utilisateur}>
      <NavigationContainer>

        <BottomTabNavigator/>

      </NavigationContainer>
    </Context.Provider>
      
  );
}