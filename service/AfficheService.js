import {fetchtalkandpokeapi} from './Fetcher';

export const getAffiches = async (nombre) => {
    return await fetchtalkandpokeapi('Affiche/GetAffiches.php', [['Nombre', nombre], ['Date', '2021-06-12 00:00:00']])
};

export const getSwipeAffiches = async (nombre, tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Affiche/GetSwipeAffiches.php', [['Nombre', nombre], ['TokenUtilisateur', tokenUtilisateur]])
};

export const getAffichesByTag = async (tagId, limit = 20) => {
    return await fetchtalkandpokeapi('Affiche/GetAfficheByTag.php', [['TagId', tagId], ['Limit', limit]])
};

export const getAffichesPhoto = async (afficheId) => {
    return await fetchtalkandpokeapi('Affiche/GetPhotoAffiche.php', [['AfficheId', afficheId]])
};

export const getAffichesLiens = async (afficheId, appartient=false) => {
    return await fetchtalkandpokeapi('Affiche/GetLiens.php', [['AfficheId', afficheId], ['Appartient', appartient]])
};

export const getAfficheAssociations = async (nombre) => {
    return await fetchtalkandpokeapi('Affiche/GetAffichesAssociation.php', [['Nombre', nombre]])
};

//ADD
export const AddUtilisateurAfficheAssociation = async (tokenUtilisateur, afficheAssociationId, utilisateurMessageId, utilisateurReaction) => {
    return await fetchtalkandpokeapi('Affiche/AddUtilisateurAfficheAssociationReaction.php', [['TokenUtilisateur', tokenUtilisateur], ['AfficheAssociationId', afficheAssociationId], ['UtilisateurMessageId', utilisateurMessageId], ['UtilisateurReaction', utilisateurReaction]])
};

//UPDATE
export const UpdateUtilisateurAfficheAssociation = async (tokenUtilisateur, afficheAssociationId, utilisateurMessageId, utilisateurReaction) => {
    return await fetchtalkandpokeapi('Affiche/UpdateUtilisateurAfficheAssociationReaction.php', [['TokenUtilisateur', tokenUtilisateur], ['AfficheAssociationId', afficheAssociationId], ['UtilisateurMessageId', utilisateurMessageId], ['UtilisateurReaction', utilisateurReaction]])
};


