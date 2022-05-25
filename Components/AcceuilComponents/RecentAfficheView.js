import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState  } from 'react';


import AlertText from '../AlertText';
import AfficheSmall from '../AfficheSmall';
import { getLatestAffiches } from '../../service/OfflineHistoryService';

export default function RecentAfficheView(props) {

    let [affiches, setAffiches] = useState([]);

    useEffect(async () => {
        setAffiches(await getLatestAffiches());
    }, []);

    let limiteNews = new Date();
    // add a day
    limiteNews.setDate(limiteNews.getDate() - 7);

    let renderItemAffiche = ({ item }) => (
        <AfficheSmall navigation={props.navigation} code={item.Code} afficheTitre={item.AfficheTitre} image={item.Image} date={item.CreateDate} imageSup={item.ImageSup} AfficheTitreSup={item.AfficheTitreSup} AfficheId={item.AfficheId}/>
    )

    let EmptyView = () => {
        if(affiches != null || affiches != []) {
            return (<View></View>)
        } else {
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate('SwipePage')}>
                    <Text style={{margin: 20}}>Aucune activité récente pour l'instant ? a͟l͟l͟e͟z͟ v͟o͟u͟s͟ e͟n͟ f͟a͟i͟r͟e͟ ! 😁👍</Text>
                </TouchableOpacity>
            )
        }
    }
    

    return(
        <View>
            <AlertText title={"Recent"} description={"Retrouvez ici les dernière affiches vus"}/>
            
            <FlatList data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="3">
            </FlatList>

            <EmptyView/>
        </View>
        
    ) 

}

