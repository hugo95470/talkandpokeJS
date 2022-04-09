import React, { useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import Context from '../navigation/userContext';

export default function BackArrowView(props) {

    const context = useContext(Context);

    if(props.profilId != context.utilisateurId){
        return(
            <View style={{flexDirection: 'row', height: 100}}>
                <TouchableOpacity style={{position: 'absolute', left: 20, bottom: 0}} onPress={() => props.navigation.pop()}>
                    <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
        
    }else{
        return(
            <View>
            </View>
        )
    }
}
