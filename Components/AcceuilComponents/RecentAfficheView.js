import { StyleSheet, View, SafeAreaView, Image, FlatList, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState  } from 'react';

import { getRandomAffiche } from '../../service/OfflineAfficheService';
import AlertText from '../AlertText';
import AfficheSmall from '../AfficheSmall';

export default function RecentAfficheView(props) {

    let [affiches, setAffiches] = useState("");

    useEffect(async () => {
        let data = await getRandomAffiche(9);
        setAffiches(data);
    }, []);

    let limiteNews = new Date();
    // add a day
    limiteNews.setDate(limiteNews.getDate() - 7);

    let renderItemAffiche = ({ item }) => (
        <AfficheSmall navigation={props.navigation} code={item.Code} afficheTitre={item.AfficheTitre} image={item.Image} date={item.CreateDate} imageSup={item.ImageSup} AfficheTitreSup={item.AfficheTitreSup} AfficheId={item.AfficheId}/>
    )


    return(
        <SafeAreaView>
            <AlertText title={"Recent"} description={"Retrouvez ici les dernière affiches vus"}/>
            
            <FlatList data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="3">
            </FlatList>
        </SafeAreaView>
        
    ) 

}

