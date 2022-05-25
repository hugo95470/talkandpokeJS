import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect, useRef  } from 'react';
import bcrypt from 'react-native-bcrypt';
import 'react-native-gesture-handler';
import * as Notifications from 'expo-notifications';

import BottomTabNavigator from "./navigation/TabNavigator";
import Context from './navigation/userContext';
import './AppConfig';
import { getUtilisateurToken, getUtilisateurIdentifiants, setNotificationToken, connect } from './service/UtilisateurService';
import { getUtilisateurNotifications, registerNotification } from './service/NotificationService';

export default function App() {

  let [utilisateurId, setUtilisateurId] = useState("");
  let [utilisateurToken, setUtilisateurToken] = useState("");
  let [utilisateurPassword, setUtilisateurPassword] = useState("");
  let [utilisateurPhoto, setUtilisateurPhoto] = useState("");
  let [notif, setNotif] = useState(null);
  let [intro, setIntro] = useState("");

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
      let _intro = null;
      let _notif = null;

      try {
        _utilisateurId = await SecureStore.getItemAsync('utilisateurId');
        _utilisateurToken = await SecureStore.getItemAsync('utilisateurToken');
        _utilisateurPassword = await SecureStore.getItemAsync('utilisateurPassword');
        _utilisateurMail = await SecureStore.getItemAsync('utilisateurMail');
        _utilisateurPhoto = await SecureStore.getItemAsync('utilisateurPhoto');
        _intro = await SecureStore.getItemAsync('intro');

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
              try {
                await SecureStore.setItemAsync("utilisateurToken", dataToken);
                await SecureStore.setItemAsync("utilisateurPhoto", data.Image);
              }catch(error) {
                console.log("can't save ID")
              }
              
              await getUtilisateurNotifications(dataToken)
              .then(async (notifs) => {
                if(notifs)
                  setNotif(notifs)
              });



              _utilisateurToken = dataToken;
            })

            await registerNotification()
            .then(async (token) => {
              //TODO: ne sauvegarde pas
              console.log(token);
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
        setIntro(_intro);
        setNotif(_notif);
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
                      setUtilisateurPassword: setUtilisateurPassword,
                      notif: notif,
                      setNotif: setNotif,
                      intro: intro,
                      setIntro: setIntro}

  
  const notificationListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      let _notif = notification.request.trigger.remoteMessage.data;

      if(notif != undefined) {
        setNotif([...[{utilisateurId: _notif.ExpediteurId, message: JSON.parse(_notif.body).Message}], ...notif]);
      } else {
        setNotif([{utilisateurId: _notif.ExpediteurId, message: JSON.parse(_notif.body).Message}]);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return (

    <Context.Provider value={utilisateur}>
      <NavigationContainer>

        <BottomTabNavigator/>

      </NavigationContainer>
    </Context.Provider>
      
  );
}