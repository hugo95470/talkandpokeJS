import {fetchtalkandpokeapi} from './Fetcher';

//GET
export const getUtilisateurCoeurs = async (utilisateurId, contactId) => {
    return await fetchtalkandpokeapi('Reaction/GetCoeurs.php', [["UtilisateurId", utilisateurId], ["ContactId", contactId]])
};

export const getUtilisateurLikes = async (utilisateurId, contactId) => {
    return await fetchtalkandpokeapi('Reaction/GetLikes.php', [["UtilisateurId", utilisateurId], ["ContactId", contactId]])
};

export const getUtilisateurDislikes = async (utilisateurId, contactId) => {
    return await fetchtalkandpokeapi('Reaction/GetDislikes.php', [["UtilisateurId", utilisateurId], ["ContactId", contactId]])
};

export const getUtilisateurMes = async (utilisateurId) => {
    return await fetchtalkandpokeapi('Reaction/GetMe.php', [["UtilisateurId", utilisateurId]])
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
    return await fetchtalkandpokeapi('Reaction/GetAffichePoke.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

export const getAfficheUtilisateurMe = async (afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetAfficheMe.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

//DELETE


//ADD
export const addAfficheMe = async (afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/AddDescribMe.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

export const addReaction = async (emotion, afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/AddReaction.php', [["Emotion", emotion], ["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};

export const addPoke = async (afficheId, utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/AddPoke.php', [["AfficheId", afficheId], ["TokenUtilisateur", utilisateurToken]])
};


