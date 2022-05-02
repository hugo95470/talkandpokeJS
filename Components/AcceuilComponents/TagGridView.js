import { StyleSheet, View, Image, SafeAreaView, FlatList, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';
import { useEffect, useState  } from 'react';

import globalStyles from '../../Styles/globalStyles';
import images from '../../Components/ImageTag'
import AlertText from '../AlertText';

export default function AfficheGrideView(props) {

    let [tags, setTags] = useState(JSON.parse('[{"TagId":"8d3aa496-561b-11ec-9700-ee87d8a3a860","Tag":"Animaux","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"1","NombreAffiche":"18","Image":"animaux"},{"TagId":"29bddfa9-561b-11ec-9700-ee87d8a3a860","Tag":"Architecture","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"6","Image":"architecture"},{"TagId":"930a69a7-8fdf-11ec-99ab-f6a869132479","Tag":"Citation","CreatedDate":"2022-02-17T08:22:04Z","IsMain":"1","TagPrecision":"0","NombreAffiche":"0","Image":"citation"},{"TagId":"b9e81702-561b-11ec-9700-ee87d8a3a860","Tag":"Concept","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"26","Image":"concept"}]'));

    useEffect(async () => {
        //let data = await getTag("9");
        //setTags(data);
    }, []);

    let limiteNews = new Date();
    // add a day
    limiteNews.setDate(limiteNews.getDate() - 7);

    let ItemAffiche = ({ image, tag }) => {  
        
        return(
            <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('DetailsOeuvrePage', {AfficheId: AfficheId, _Image: image})}>
                <View style={[globalStyles.shadows, {margin: 10}]}>

                    <ImageBackground isBackground imageStyle={{ borderRadius: 15}} source={images[image]} resizeMode="cover" style={[styles.affiche, globalStyles.borderRadius]}>
                        <Text style={{marginRight: 'auto', marginLeft: 5, color: 'white', backgroundColor: '#aaa9', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5, marginTop: 'auto', marginBottom: 5,fontFamily: 'sans-serif-light'}}>{tag}</Text>
                    </ImageBackground>                        

                </View>
            </TouchableOpacity>
        );            
    }

    let renderItemAffiche = ({ item }) => (
        <ItemAffiche tag={item.Tag} image={item.Image}/>
    )


    return(
        <SafeAreaView>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <AlertText title={"Tags"} description={"Decouvrez ici 4 tags aléatoirement qui pourraient vous plairent :)"}/>
                
                <TouchableOpacity style={[styles.logo, {backgroundColor: '#FEA52AAA', borderRadius: 5, marginRight: 7, marginTop: 7, padding: 3}]} onPress={() => props.navigation.navigate('MenuOeuvresPage')}>
                    <Image style={{height: 40, width: 40, opacity: 1, marginBottom: 'auto'}} source={require('../../Images/SquareMenu.png')}/>
                </TouchableOpacity>
            </View>
            
            <FlatList data={tags} renderItem={renderItemAffiche} keyExtractor={item => item.TagId} numColumns="2">
            </FlatList>
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
        height: Dimensions.get('window').width/2 - 20,
        zIndex: -1,
        width: Dimensions.get('window').width/2 - 20,
        backgroundColor: '#ddd',
        borderRadius: 19,
    },
})

