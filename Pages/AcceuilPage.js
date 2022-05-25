import React from 'react';
import { View, ScrollView } from 'react-native';

import TopBarre from '../Components/TopBarre';
import AfficheGrideView from '../Components/AcceuilComponents/AfficheGridView';
import AffinitesCollectionView from '../Components/AffinitesCollectionView';
import RecommendedTag from '../Components/AcceuilComponents/RecommendedTag';
import TagGridView from '../Components/AcceuilComponents/TagGridView';
import RecentAfficheView from '../Components/AcceuilComponents/RecentAfficheView';

export default function AcceuilPage(props) {

    return (
        <View>
            <TopBarre title={"Acceuil"} navigation={props.navigation}/>

            <ScrollView style={{height: '90%'}}>

                <AffinitesCollectionView navigation={props.navigation}/>
                <RecommendedTag navigation={props.navigation}/>
                <TagGridView navigation={props.navigation}/>
                <RecentAfficheView navigation={props.navigation}/>
                <AfficheGrideView navigation={props.navigation}/>

                <View style={{height: 100}}></View>
            </ScrollView>
            

        </View>
    )
}