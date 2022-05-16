import { StyleSheet, View, Image, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState  } from 'react';

import globalStyles from '../../Styles/globalStyles';
import { getAfficheByTag } from '../../service/OfflineAfficheService';
import AlertText from '../AlertText';
import images from '../../Components/ImageTagMapper';
import { getRandomTag } from '../../service/OfflineTagService';
import AfficheSmall from '../AfficheSmall'

export default function RecommendedTag(props) {

    let [affiches, setAffiches] = useState("");
    let [tags, setTags] = useState("");
    let [tag, setTag] = useState("");

    useEffect(async () => {
        
        let tmpTags = await getRandomTag(4);

        setTags(tmpTags);
        setTag(tmpTags[0].TagId);

        await setAffichesTag(tmpTags[0].TagId);
    }, []);

    async function setAffichesTag(tagId) {
        setTag(tagId)

        let data = await getAfficheByTag(tagId, 9);
        setAffiches(data);
    }

    let limiteNews = new Date();
    // add a day
    limiteNews.setDate(limiteNews.getDate() - 7);

    let renderItemAffiche = ({ item }) => (
        <AfficheSmall navigation={props.navigation} afficheTitre={item.AfficheTitre} code={item.Code} image={item.Image} date={item.CreateDate} imageSup={item.ImageSup} AfficheTitreSup={item.AfficheTitreSup} AfficheId={item.AfficheId}/>
    )

    let renderTag = ({ item }) => (
        <TouchableOpacity onPress={() => setAffichesTag(item.TagId)} style={{height: 40, flexDirection: 'row', paddingHorizontal: 10, margin: 5, backgroundColor: tag==item.TagId?"#FEA52A":"#ccc", elevation: 3, borderRadius: 5}}>
            
            <Image style={[globalStyles.center, {marginRight: 5, height: 25, width: 25, borderRadius: 100}]} source={images[item.Image]}/>
            
            <Text style={globalStyles.center}>{item.Tag}</Text>
        </TouchableOpacity>
    )

    return(
        <View>
            <AlertText title={"Recommandés"}  description={"Decouvrez ici des tags qui vous sont recommandés"}/>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <FlatList data={tags} renderItem={renderTag} keyExtractor={item => item.TagId} numColumns="20"></FlatList>
            </ScrollView>
            
            <FlatList data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.AfficheId} numColumns="3"></FlatList>
        </View>
        
    ) 

}
