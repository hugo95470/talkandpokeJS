import * as SecureStore from 'expo-secure-store';

import { getAffiche } from '../service/OfflineAfficheService';

//GET
export const getReactionCount = async (reaction) => {
    return JSON.parse(await SecureStore.getItemAsync(reaction)).length();
}

export const getReactionsByEmotion = async (reaction) => {

    let reactions = JSON.parse(await SecureStore.getItemAsync(reaction));

    let affiches = [];
    
    if(reactions != null) {
        reactions.forEach(a => {
            affiches.push(getAffiche(a));
        });
    }

    return affiches;
}

export const getReactionsByAffiche = async (afficheId) => {
    let likes = JSON.parse(await SecureStore.getItemAsync('likes'));
    let coeurs = JSON.parse(await SecureStore.getItemAsync('coeurs'));
    let dislikes = JSON.parse(await SecureStore.getItemAsync('dislikes'));
    let pokes = JSON.parse(await SecureStore.getItemAsync('pokes'));
    let mes = JSON.parse(await SecureStore.getItemAsync('mes'));

    let reactions = [];

    if(likes != null && likes.includes(afficheId))
        reactions.unshift({Emotion: 'like'})
    
    if(dislikes != null && dislikes.includes(afficheId))
        reactions.unshift({Emotion: 'dislike'})

    if(coeurs != null && coeurs.includes(afficheId))
        reactions.unshift({Emotion: 'coeur'})

    if(pokes != null && pokes.includes(afficheId))
        reactions.unshift({Emotion: 'poke'})

    if(mes != null && mes.includes(afficheId))
        reactions.unshift({Emotion: 'me'})
        
    return reactions;
}


//ADD
export const addReaction = async (afficheId, reaction) => {
    let reactions = JSON.parse(await SecureStore.getItemAsync(reaction));

    if(reactions != null) {
        if(!reactions.includes(afficheId))
            reactions.push(afficheId);
    } else {
        reactions = [];
        reactions.push(afficheId);
    }

    await SecureStore.setItemAsync(reaction, JSON.stringify(reactions));
}


//REMOVE
export const removeReaction = async (afficheId, reaction) => {
    let reactions = JSON.parse(await SecureStore.getItemAsync(reaction));

    let tmp = [];
    if(reactions != null) {
        if(reactions.includes(afficheId)) {
            tmp = reactions.filter(dl => dl != afficheId);
            await SecureStore.setItemAsync(reaction, JSON.stringify(tmp));
        }
    } 
}



