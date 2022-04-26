import {fetchtalkandpokeapi} from './Fetcher';
import * as Notifications from 'expo-notifications';

export const registerNotification = async () => {
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

export const sendPushNotification = async (_expoPushToken, _message, _title) => {
    const message = {
      to: _expoPushToken,
      sound: 'default',
      title: _title,
      body: _message,
      data: { someData: 'goes here' },
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