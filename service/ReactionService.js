import {fetchtalkandpokeapi} from './Fetcher';

export const loadUtilisateurCoeurs = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetCoeurs.php', [["TokenUtilisateur", utilisateurToken]])
};

export const loadUtilisateurLikes = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetLikes.php', [["TokenUtilisateur", utilisateurToken]])
};

export const loadUtilisateurDislikes = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetDislikes.php', [["TokenUtilisateur", utilisateurToken]])
};

export const loadUtilisateurMes = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetDescribMe.php', [["TokenUtilisateur", utilisateurToken]])
};

export const loadUtilisateurPokes = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Reaction/GetPokes.php', [["TokenUtilisateur", utilisateurToken]])
};



