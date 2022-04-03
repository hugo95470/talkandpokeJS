import {fetchtalkandpokeapi} from './Fetcher';

export { loadTagUtilisateurDescription };

const loadTagUtilisateurDescription = async (nombre, utilisateurToken) => {
    return await fetchtalkandpokeapi('Tag/GetUtilisateurTagDescription.php', [["Limit", nombre], ["TokenUtilisateur", utilisateurToken]])
};



