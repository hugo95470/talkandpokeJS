import {fetchtalkandpokeapi, fetchtalkandpokeapiNoJson} from './Fetcher';


//GET
export const getUtilisateurInformations = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetUtilisateur.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurFollowers = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetFollowers.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurFollowing = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetFollowing.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurAffinites = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Utilisateur/GetAffinite.php', [["TokenUtilisateur", utilisateurToken], ["Nombre", "20"]])
};

export const getContactAffinites = async (utilisateurToken, utilisateurId, contactId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetAffinite.php', [["TokenUtilisateur", utilisateurToken], ["UtilisateurId", utilisateurId], ["ContactId", contactId]])
};

export const getContactFriend = async (utilisateurToken, utilisateurId, friendId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetAffinite.php', [["TokenUtilisateur", utilisateurToken], ["UtilisateurId", utilisateurId], ["FriendId", friendId]])
};

export const getUtilisateurIdentifiants = async (mail) => {
    return await fetchtalkandpokeapi('Utilisateur/GetIdentifiants.php', [["Mail", mail]])
};

export const getUtilisateurToken = async (utilisateurId, password) => {
    return await fetchtalkandpokeapi('Utilisateur/SetTokenUtilisateur.php', [["UtilisateurId", utilisateurId], ["Password", password]])
};

export const getUtilisateurPassword = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Utilisateur/GetMotDePasse.php', [["TokenUtilisateur", utilisateurToken]])
};

//CONNEXION
export const connect = async (utilisateurId, success) => {
    return await fetchtalkandpokeapi('Utilisateur/Connect.php', [["UtilisateurId", utilisateurId], ["Success", success]])
};

//UPDATE
export const setNotificationToken = async (utilisateurId, token) => {
    return await fetchtalkandpokeapi('Utilisateur/SetToken.php', [["UtilisateurId", utilisateurId], ["Token", token]])
};

export const updateUtilisateurPassword = async (utilisateurToken, password) => {
    return await fetchtalkandpokeapi('Utilisateur/UpdateMotDePasse.php', [["TokenUtilisateur", utilisateurToken], ["MotDePasse", password]])
};

export const updateUtilisateurSexe = async (utilisateurToken, sexe) => {
    return await fetchtalkandpokeapi('Utilisateur/UpdateSexe.php', [["TokenUtilisateur", utilisateurToken], ["Sexe", sexe]])
};

export const updateFriend = async (utilisateurToken, friendId) => {
    return await fetchtalkandpokeapi('Utilisateur/SetFriends.php', [["TokenUtilisateur", utilisateurToken], ["FriendId", friendId]])
};