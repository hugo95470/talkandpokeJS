import Context from '../navigation/userContext';
import { useContext } from 'react';

export { fetchtalkandpokeapi, fetchtalkandpokeapiNoJson };


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
    const resp = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log("=================================================================");
        console.log(url);
        console.log(data);
        return data;
    })
    .catch(
        alert('there was an error fetching our server, please try again later')
    );
    

    return await resp;
};

const fetchtalkandpokeapiNoJson = async (endpoint, params = undefined, header = undefined) => {
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
    
    
    const resp = await fetch(url)
    .then((data) => {
        console.log("=================================================================");
        console.log(url);
        console.log(data);
        return data;
    });
    

    return resp;
};
