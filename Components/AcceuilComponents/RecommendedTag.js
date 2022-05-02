import { StyleSheet, View, Image, SafeAreaView, FlatList, ScrollView, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState  } from 'react';

import globalStyles from '../../Styles/globalStyles';
import { getAffiches } from '../../service/AfficheService';
import AlertText from '../AlertText';
import images from '../../Components/ImageTag';

export default function RecommendedTag(props) {

    let [affiches, setAffiches] = useState("");
    let [tags, setTags] = useState([{"Tag": "Architecture", "TagId": "1", "Image": "architecture"}, {"Tag": "Citation", "TagId": "2", "Image": "citation"}, {"Tag": "Animaux", "TagId": "3", "Image": "animaux"}, {"Tag": "Evenement", "TagId": "4", "Image": "evenement"}]);
    let [tag, setTag] = useState("1");

    useEffect(async () => {
        let data = await getAffiches("9");
        setAffiches(data);
    }, []);

    let limiteNews = new Date();
    // add a day
    limiteNews.setDate(limiteNews.getDate() - 7);

    let ItemAffiche = ({ image, date, imageSup, afficheTitre, AfficheId, AfficheTitreSup }) => {  
            
        if(afficheTitre == AfficheTitreSup){
            AfficheTitreSup = 'Nouveauté'
        }

        return(
            <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('DetailsOeuvrePage', {AfficheId: AfficheId, _Image: image})}>
                <View style={[globalStyles.shadows, {margin: 3}]}>

                        <ImageBackground isBackground imageStyle={{ borderRadius: 15}} source={{uri: image}} resizeMode="cover" style={[styles.affiche, globalStyles.borderRadius]}>
                            <Image style={{position: 'absolute', top: 10, left: 10, height: 25, width: 25, borderRadius: 100}} source={{uri: imageSup}}/>

                            <View intensity={250} style={styles.TitreContainer}>
                                <Text style={styles.Titre}>{afficheTitre}</Text>
                            </View>

                            <TouchableOpacity style={{position: 'absolute', bottom: 7, left: 7, position: 'absolute', bottom: 7, right: 10,}} activeOpacity={1} onPress={() => props.navigation.navigate('MessagePage', {_isOeuvre: true, _oeuvreId: AfficheId})}>
                                <Image style={{height: 20, width: 22}} source={{uri: 'https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-388b76121ea0e4223a20cfea7b202e09.png'}}/>
                            </TouchableOpacity>

                        </ImageBackground>                        

                </View>
            </TouchableOpacity>
        );            
    }

    let renderItemAffiche = ({ item }) => (
        <ItemAffiche afficheTitre={item.AfficheTitre} image={item.Image} date={item.CreateDate} imageSup={item.ImageSup} AfficheTitreSup={item.AfficheTitreSup} AfficheId={item.AfficheId}/>
    )

    let renderTag = ({ item }) => (
        <TouchableOpacity onPress={() => setTag(item.TagId)} style={{height: 40, flexDirection: 'row', paddingHorizontal: 10, margin: 5, backgroundColor: tag==item.TagId?"#FEA52A":"#ccc", elevation: 3, borderRadius: 5}}>
            
            <Image style={[globalStyles.center, {marginRight: 5, height: 25, width: 25, borderRadius: 100}]} source={images[item.Image]}/>
            
            <Text style={globalStyles.center}>{item.Tag}</Text>
        </TouchableOpacity>
    )

    return(
        <SafeAreaView>
            <AlertText title={"Recommandés"}  description={"Decouvrez ici des tags qui vous sont recommandés"}/>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <FlatList data={tags} renderItem={renderTag} keyExtractor={item => item.TagId} numColumns="20"></FlatList>
            </ScrollView>
            
            <FlatList data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.TagId} numColumns="3"></FlatList>
        </SafeAreaView>
        
    ) 

}

const styles = StyleSheet.create({
    
    TitreContainer: {
        backgroundColor: "#aaac",
        padding: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        minWidth: 100,
        marginRight: -9,
        position: 'absolute', 
        right: '5%', 
        bottom: '10%',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        elevation: 3,
    },
    Titre: {
        borderRadius: 19,
        padding: 10,
        width: 'auto',
        fontSize: 14,
        fontFamily: 'sans-serif-light',
    },
    affiche: {
        height: 170,
        zIndex: -1,
        width: Dimensions.get('window').width/3 - 6,
        backgroundColor: '#ddd',
        borderRadius: 19,
    },
})

