import {fetchtalkandpokeapi} from './Fetcher';


export const getUtilisateurTagScoreByTag = async (utilisateurToken) => {
    return await fetchtalkandpokeapi('Tag/GetUtilisateurTagScoreByTag.php', [["TokenUtilisateur", utilisateurToken]])
};