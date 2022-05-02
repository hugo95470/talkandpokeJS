import React from 'react';
import { View } from 'react-native';

import SwipeAfficheView from '../Components/SwipeAfficheView';
import TopBarre from '../Components/TopBarre';

export default function SwipePage({ navigation }) {
    return (
      <View>
        <TopBarre title={"Swipe"} navigation={navigation}/>

        <View style={{position: 'absolute', top: '130%', left: '10%'}}>
          <SwipeAfficheView navigation={navigation}/> 
        </View>
      </View>
      
    )
}
