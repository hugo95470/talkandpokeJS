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
import { addContact } from './service/OfflineMessageService';

export default function App() {

  let [utilisateurId, setUtilisateurId] = useState("");
  let [utilisateurToken, setUtilisateurToken] = useState("");
  let [utilisateurPassword, setUtilisateurPassword] = useState("");
  let [utilisateurPhoto, setUtilisateurPhoto] = useState("");
  let [utilisateurPseudo, setUtilisateurPseudo] = useState("");
  let [notif, setNotif] = useState(null);
  let [intro, setIntro] = useState("");
  let [contacts, setContacts] = useState("");

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    // Fetch the token from storage then navigate to our appropriate place
    async function getUtilisateur() {
      let _utilisateurId = null;
      let _utilisateurToken = null;
      let _utilisateurPassword = null;
      let _utilisateurPseudo = null;
      let _utilisateurMail = null;
      let _utilisateurPhoto = 'https://media.graphcms.com/HVBvcvHSY2y2xC5rcmXW';
      let _intro = null;
      let _notif = null;
      let _contacts = null;

      try {
        _utilisateurId = await SecureStore.getItemAsync('utilisateurId');
        _utilisateurToken = await SecureStore.getItemAsync('utilisateurToken');
        _utilisateurPassword = await SecureStore.getItemAsync('utilisateurPassword');
        _utilisateurPseudo = await SecureStore.getItemAsync('utilisateurPseudo');
        _utilisateurMail = await SecureStore.getItemAsync('utilisateurMail');
        _utilisateurPhoto = await SecureStore.getItemAsync('utilisateurPhoto');
        _contacts = await SecureStore.getItemAsync('contacts');
        _intro = await SecureStore.getItemAsync('intro');


        await SecureStore.setItemAsync('contacts', '[{"ExpediteurId":"d617f2c1-5eb1-11ec-9700-ee87d8a3a860","rn":"1","ContactId":"d617f2c1-5eb1-11ec-9700-ee87d8a3a860","Pseudo":"Oror","CreatedDate":"2022-02-28 22:50:02","Image":"https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/CategorieImage/profil6.png","Message":"regardes ca !#!#https://hugocabaret.onthewifi.com/TalkAndPoke/Affiches/Ville.png#!#"},{"ExpediteurId":"480d9ad0-5619-11ec-9700-ee87d8a3a860","rn":"1","ContactId":"b244ca4f-5619-11ec-9700-ee87d8a3a860","Pseudo":"DeepSpace","CreatedDate":"2021-12-21 23:25:03","Image":"https://d1fmx1rbmqrxrr.cloudfront.net/cnet/optim/i/edit/2019/04/eso1644bsmall__w770.jpg","Message":"Hello"}]')
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
                await SecureStore.setItemAsync("utilisateurPseudo", data.Pseudo);
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
        setUtilisateurPseudo(_utilisateurPseudo);
        setIntro(_intro);
        setNotif(_notif);
        setContacts(null);
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
                      setUtilisateurPseudo: setUtilisateurPseudo, 
                      utilisateurPseudo: utilisateurPseudo, 
                      setUtilisateurPassword: setUtilisateurPassword,
                      notif: notif,
                      setNotif: setNotif,
                      intro: intro,
                      setIntro: setIntro}

  
  const notificationListener = useRef();

  const updateNotif = async (newNotif) => {
    if(notif != undefined && notif != null) {
      setNotif([...[newNotif.ExpediteurId], ...notif]);
    } else {
      setNotif([newNotif.ExpediteurId]);
    }
    await addContact(newNotif);
  } 

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      let _notif = notification.request.trigger.remoteMessage.data;

      updateNotif({ExpediteurId: JSON.parse(_notif.body).ExpediteurId, Image: JSON.parse(_notif.body).Image, ContactId: JSON.parse(_notif.body).ExpediteurId, Pseudo: JSON.parse(_notif.body).Pseudo, Message: JSON.parse(_notif.body).Message, CreatedDate: JSON.parse(_notif.body).CreatedDate});      
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