import {fetchtalkandpokeapi} from './Fetcher';
import * as Notifications from 'expo-notifications';


export const getUtilisateurNotifications = async (tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetNotification.php', [["TokenUtilisateur", tokenUtilisateur]])
};

export const registerNotification = async () => {
    const {status} = await Notifications.requestPermissionsAsync()
    if (status != 'granted'){
        const {status} = await Notifications.requestPermissionsAsync()
    }
    if(status != 'granted'){
        alert('Sans les notifications, vous ne pourrez pas acceder à la messagerie en direct ni aux alertes')
        return;
    }

    _token = (await Notifications.getExpoPushTokenAsync()).data;
    return _token;
}

export const sendPushNotification = async (_expoPushToken, _message, _title, _data) => {
    const message = {
      to: _expoPushToken,
      sound: 'default',
      title: _title,
      body: _message,
      data: _data,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}