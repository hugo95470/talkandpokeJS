import Context from '../navigation/userContext';
import { useContext } from 'react';

export { fetchtalkandpokeapi };


const fetchtalkandpokeapi = async (endpoint, params = undefined, header = undefined) => {
    //const context = useContext(Context);

    let url = global.apiUrl + endpoint;

    if(params != undefined) {
        for(let i = 0; i < params.length; i++) {
            if(i == 0) 
                url = url + "?" + params[i][0] + '=' + params[i][1];
            else
                url = url + "&" + params[i][0] + '=' + params[i][1];
        }
    }
    
    console.log(url)
    const resp = await fetch(url);

    return await resp.json();
};
