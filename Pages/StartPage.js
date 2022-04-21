import React, { useContext } from 'react';
import { View } from 'react-native';

import Context from '../navigation/userContext';
import WizardView from '../Components/WizardView';

export default function StartPage(props) {   

    const context = useContext(Context)

    return(
        <View style={{backgroundColor: '#FEA52A', height: '100%'}}>
            <WizardView/>
        </View>
    )
}
