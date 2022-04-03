import {fetchtalkandpokeapi} from './Fetcher';


//LOAD
export const loadUtilisateurInformations = async (tokenUtilisateur) => {
    return await fetchtalkandpokeapi('Utilisateur/GetUtilisateur.php', [["TokenUtilisateur", tokenUtilisateur]])
};

export const loadUtilisateurFollowers = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetFollowers.php', [["UtilisateurId", utilisateurId]])
};

export const loadUtilisateurFollowing = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Utilisateur/GetFollowing.php', [["UtilisateurId", utilisateurId]])
};

export const loadUtilisateurAffinites = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Utilisateur/GetAffinite.php', [["TokenUtilisateur", utilisateurToken], ["Nombre", "20"]])
};

export const loadUtilisateurIdentifiants = async (mail) => {
    return await fetchtalkandpokeapi('Utilisateur/GetIdentifiants.php', [["Mail", mail]])
};

export const loadUtilisateurToken = async (utilisateurId, password) => {
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