import Affiches from '../Data/Affiche';
import AfficheTag from '../Data/AfficheTag';
import * as SecureStore from 'expo-secure-store';

export const getAffiches = () => {
    return JSON.parse(Affiches);
}

export const getRandomAffiche = (limit = 1) => {
    let affiches = JSON.parse(Affiches);
    return affiches.sort(() => .5 - Math.random()).slice(0,limit)
}

export const getAffiche = (afficheId) => {
    let affiches = JSON.parse(Affiches);
    return affiches.find(x => x.AfficheId == afficheId)
}

export const getAfficheDetails = (afficheId) => {
    let affiches = JSON.parse(Affiches);
    let affiche = affiches.find(x => x.AfficheId == afficheId)

    let afficheSup = affiches.find(x => x.AfficheTitre == affiche.AfficheTitreSup)

    affiche.AfficheDescriptionSup = afficheSup.Description;

    return affiche;
}

export const getAffichePhoto = (afficheId) => {
    let affiches = JSON.parse(Affiches);
    let affichesTag = JSON.parse(AfficheTag);

    let affiche = affiches.find(a => a.AfficheId == afficheId);
    let afficheTag = affichesTag.find(at => at.AfficheId == affiche.AfficheId);

    let affichestagPhoto = affichesTag.filter(at => at.TagId == afficheTag.TagId);
    let affichesPhotoCode = []

    affichestagPhoto.forEach(ap => {
        let affichePhoto = affiches.find(a => a.AfficheId == ap.AfficheId)
        if(affichePhoto != null)
            affichesPhotoCode.push(affichePhoto.Code);
    });

    return affichesPhotoCode;
}

export const getAfficheByTag = (tagId, limit = 9) => {
    let affiches = JSON.parse(Affiches);
    let afficheTag = JSON.parse(AfficheTag)
  
    let afficheTagAffiche = afficheTag.filter(x => x.TagId == tagId)
  
    return affiches.filter(x => afficheTagAffiche.find(y => y.AfficheId == x.AfficheId)).sort(() => .5 - Math.random()).slice(0,limit);
  
}

export const getAfficheNotReacted = async (limit = 1) => {
    let affiches = JSON.parse(Affiches);
    let coeurs = JSON.parse(await SecureStore.getItemAsync('coeurs'));
    let likes = JSON.parse(await SecureStore.getItemAsync('likes'));
    let dislikes = JSON.parse(await SecureStore.getItemAsync('dislikes'));

    affiches.filter(a => coeurs.includes(a.AfficheId) || likes.includes(a.AfficheId) || dislikes.includes(a.AfficheId))
  
    return affiches.sort(() => .5 - Math.random()).slice(0,limit);
}