import React from 'react';
import { View } from 'react-native';

import ProfilView from '../Components/ProfilView';

export default function ContactPage(props) {   

    let { profilId } = ""
    let { image } = ""
    try {
        profilId = props.profilId;
        profilId = props.route.params._profilId;
        image = props.route.params._image;
    } catch (error) {
        console.log(error);
    }

    return(
        <View>
            <ProfilView profilId={profilId} Image={image} navigation={props.navigation}></ProfilView>
        </View>
    )
}
