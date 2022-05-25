import * as SecureStore from 'expo-secure-store';

import { getAffiche } from '../service/OfflineAfficheService';

//GET
export const getLatestAffiches = async () => {
    let tmp = JSON.parse(await SecureStore.getItemAsync('lastAffiches'));

    let affiches = [];

    tmp.forEach(a => {
        affiches.push(getAffiche(a));
    });

    return affiches;
}


//ADD
export const addLatestAffiche = async (afficheId) => {
    let lastAffiches = JSON.parse(await SecureStore.getItemAsync('lastAffiches'));


    if(lastAffiches != null) {
        if(lastAffiches.includes(afficheId)) {
            let tmp = [];

            tmp = lastAffiches.filter(la => la != afficheId);
    
            tmp.unshift(afficheId);

            lastAffiches = tmp;
    
        } else {
            if(lastAffiches.length > 9) {
                lastAffiches.shift();
            }
            
            lastAffiches.unshift(afficheId);
        }
    } else {
        lastAffiches = [];
        lastAffiches.unshift(afficheId);
    }

    await SecureStore.setItemAsync("lastAffiches", JSON.stringify(lastAffiches));
}
