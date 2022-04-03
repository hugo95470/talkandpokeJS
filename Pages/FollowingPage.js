import React from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';

import AlertText from '../Components/AlertText';
import TopBarre from '../Components/TopBarre';
import { loadUtilisateurFollowing } from '../service/UtilisateurService';

export default function FollowingPage(props) {   

    let [followers, setFollowers] = useState("");

    useEffect(async () => {
        setFollowers(await loadUtilisateurFollowing(props.route.params.utilisateurId))
    }, []);

    var renderItemUtilisateur = ({ item }) => (
        <View style={{backgroundColor: '#DDD', flexDirection: 'row', width: '95%', borderRadius: 19, padding: 10, paddingLeft: 0, margin: '2.5%'}}>
            <Image style={{height: 65, width: 65, marginBottom: 'auto', marginTop: 'auto', marginLeft: 10, marginRight: 20, borderRadius: 100}} source={{uri: item.Image}}/>

            <Text style={{fontSize: 20, marginBottom: 'auto', marginTop: 'auto'}}>{item.Pseudo}</Text>
        </View>
    );

    return(
        <View>
            <TopBarre navigation={props.navigation}/>

            <AlertText title={'Following'} description={'La liste de toutes les personnes que ce compte suit'}/>

            <FlatList data={followers} renderItem={renderItemUtilisateur} keyExtractor={item => item.Identifier} 
              numColumns="1">
            </FlatList>

        </View>
    )
}
