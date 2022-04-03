import React from 'react';
import { View } from 'react-native';

import AfficheCollectionview from '../Components/AfficheCollectionView';
import TopBarre from '../Components/TopBarre';

export default function AcceuilPage(props) {
    return (
        <View>
            <TopBarre navigation={props.navigation}/>

            <AfficheCollectionview navigation={props.navigation}/>
        </View>
    )
}