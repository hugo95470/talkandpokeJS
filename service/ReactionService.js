import {fetchtalkandpokeapi} from './Fetcher';

//GET
export const getUtilisateurCoeurs = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Reaction/GetCoeurs.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurLikes = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Reaction/GetLikes.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurDislikes = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Reaction/GetDislikes.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurMes = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Reaction/GetDescribMe.php', [["UtilisateurId", utilisateurId]])
};

export const getUtilisateurPokes = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Reaction/GetPokes.php', [["UtilisateurId", utilisateurId]])
};

export const getNombreReaction = async (utilisateurId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetNombreReactions.php', [["UtilisateurId", utilisateurId], ["TokenUtilisateur", utilisateurToken]])
};

export const getAfficheUtilisateurReactions = async (afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetReactions.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

export const getAfficheUtilisateurPoke = async (afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetPokes.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

export const getAfficheUtilisateurMe = async (afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetDescribMe.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

//DELETE



