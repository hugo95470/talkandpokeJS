import Affiches from '../Data/Affiche.js';
import AfficheTag from '../Data/AfficheTag.js';

export const getAffiches = async () => {
    return JSON.parse(Affiches);
}

export const getRandomAffiche = async (limit = 1) => {
    let affiches = JSON.parse(Affiches);
    return affiches.sort(() => .5 - Math.random()).slice(0,limit)
}

export const getAffiche = async (afficheId) => {
    let affiches = JSON.parse(Affiches);
    return affiches.find(x => x.AfficheId == afficheId)
}

export const getAfficheByTag = async (tagId, limit = 9) => {
    let affiches = JSON.parse(Affiches);
    let afficheTag = JSON.parse(AfficheTag)
  
    let afficheTagAffiche = afficheTag.filter(x => x.TagId == tagId)
  
    return affiches.filter(x => afficheTagAffiche.find(y => y.AfficheId == x.AfficheId)).sort(() => .5 - Math.random()).slice(0,limit) ;
  
  }