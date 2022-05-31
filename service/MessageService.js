import {fetchtalkandpokeapi} from './Fetcher';


export const getAfficheMessage = async (afficheId, limit) => {
    return await fetchtalkandpokeapi('Message/GetMessagesAffiche.php', [["AfficheId", afficheId], ["Limite", limit]])
};

export const getAfficheMessageByDate = async (afficheId, limit, date) => {
    return await fetchtalkandpokeapi('Message/GetMessagesAffiche.php', [["AfficheId", afficheId], ["Limite", limit], ["Date", date]])
};

export const getUtilisateurMessages = async (destinataireId, nombre, tokenUtilisateur, dateEnvoi) => {
    return await fetchtalkandpokeapi('Message/GetMessagesDiscussion.php', [["DestinataireId", destinataireId], ["Nombre", nombre], ["TokenUtilisateur", tokenUtilisateur], ["DateEnvoi", dateEnvoi]])
};

export const getUtilisateursContacts = async (tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetContacts.php', [["TokenUtilisateur", tokenUtilisateur]])
};

export const getUtilisateurNotification = async (tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetNotification.php', [["TokenUtilisateur", tokenUtilisateur]])
};

export const getMessageAfficheAssociation = async (messageId, tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetMessageAfficheAssociation.php', [["MessageId", messageId], ["TokenUtilisateur", tokenUtilisateur]])
};

export const GetTuPreferesMessage = async (messageId, tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/GetTuPreferesMessage.php', [["MessageId", messageId], ["TokenUtilisateur", tokenUtilisateur]])
};

//Add
export const AddTuPreferes = async (contactId, tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Message/AddTuPreferes.php', [["ContactId", contactId], ["TokenUtilisateur", tokenUtilisateur]])
};

//Read
export const readMessage = async (tokenUtilisateur, contactId) => {
    return await fetchtalkandpokeapi('Message/ReadMessage.php', [["TokenUtilisateur", tokenUtilisateur], ["ContactId", contactId]])
};