import { StyleSheet, View, Image, SafeAreaView, FlatList, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState  } from 'react';

import globalStyles from '../../Styles/globalStyles';
import images from '../../Components/ImageTagMapper'
import AlertText from '../AlertText';
import { getRandomTag } from '../../service/OfflineTagService';

export default function AfficheGrideView(props) {

    let [tags, setTags] = useState("");

    useEffect(async () => {
        setTags(await getRandomTag(4));
    }, []);

    let limiteNews = new Date();
    // add a day
    limiteNews.setDate(limiteNews.getDate() - 7);

    let ItemAffiche = ({ image, tag, tagId }) => {  
        
        return(
            <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('OeuvresPage', {TagId: tagId, OeuvreTypeLibelle: tag, image: image})}>
                <View style={[globalStyles.shadows, {margin: 10}]}>

                    <ImageBackground isBackground imageStyle={{ borderRadius: 15}} source={images[image]} resizeMode="cover" style={[styles.affiche, globalStyles.borderRadius]}>
                        <Text style={{marginRight: 'auto', marginLeft: 5, color: 'white', backgroundColor: '#aaa9', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5, marginTop: 'auto', marginBottom: 5,fontFamily: 'sans-serif-light'}}>{tag}</Text>
                    </ImageBackground>                        

                </View>
            </TouchableOpacity>
        );            
    }

    let renderItemAffiche = ({ item }) => (
        <ItemAffiche tag={item.Tag} image={item.Image} tagId={item.TagId}/>
    )


    return(
        <SafeAreaView>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AlertText title={"Tags"} description={"Decouvrez ici 4 tags aléatoirement qui pourraient vous plairent :)"}/>
                
                <TouchableOpacity style={[{backgroundColor: '#FEA52AAA', borderRadius: 5, marginRight: 7, marginTop: 7, padding: 3}]} onPress={() => props.navigation.navigate('MenuOeuvresPage')}>
                    <Image style={{height: 40, width: 40, opacity: 1, marginBottom: 'auto'}} source={require('../../Images/SquareMenu.png')}/>
                </TouchableOpacity>
            </View>
            
            <FlatList data={tags} renderItem={renderItemAffiche} keyExtractor={item => item.TagId} numColumns="2">
            </FlatList>
        </SafeAreaView>
        
    ) 

}

const styles = StyleSheet.create({
    affiche: {
        height: Dimensions.get('window').width/2 - 20,
        zIndex: -1,
        width: Dimensions.get('window').width/2 - 20,
        backgroundColor: '#ddd',
        borderRadius: 19,
    },
})

