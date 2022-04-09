import {fetchtalkandpokeapi} from './Fetcher';


export const getAfficheMessage = async (afficheId, limit) => {
    return await fetchtalkandpokeapi('Message/GetMessagesAffiche.php', [["AfficheId", afficheId], ["Limite", limit]])
};

export const getUtilisateursContacts = async (tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetContacts.php', [["TokenUtilisateur", tokenUtilisateur]])
};

export const getUtilisateurNotification = async (tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetNotification.php', [["TokenUtilisateur", tokenUtilisateur]])
};