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