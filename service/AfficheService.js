import {fetchtalkandpokeapi} from './Fetcher';

export { loadAffiches };

const loadAffiches = async (nombre) => {
    return await fetchtalkandpokeapi('Affiche/GetAffiches.php', [['Nombre', nombre], ['Date', '2021-06-12 00:00:00']])
};



