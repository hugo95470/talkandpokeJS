import React, { useContext } from 'react';
import { View } from 'react-native';

import ProfilView from '../Components/ProfilView';
import TopBarre from '../Components/TopBarre';
import Context from '../navigation/userContext';

export default function ProfilPage(props) {   

    const context = useContext(Context)

    return(
        <View>
            <TopBarre title={"Profil"} navigation={props.navigation}/>

            <ProfilView profilId={context.utilisateurId} navigation={props.navigation}></ProfilView>
        </View>
    )
}
