import { StyleSheet, Text, Image, TextInput, FlatList, TouchableOpacity, ImageBackground, View, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';

import images from '../Components/ImageTag'
import AlertText from '../Components/AlertText';
import AfficheMedium from '../Components/AfficheMedium';
import globalStyles from '../Styles/globalStyles';


//TODO: REFACTOR


export default function MenuOeuvres(props) {

    var [categories, setCategories] = useState(JSON.parse('[{"TagId":"8d3aa496-561b-11ec-9700-ee87d8a3a860","Tag":"Animaux","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"1","NombreAffiche":"18","Image":"animaux"},{"TagId":"29bddfa9-561b-11ec-9700-ee87d8a3a860","Tag":"Architecture","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"6","Image":"architecture"},{"TagId":"930a69a7-8fdf-11ec-99ab-f6a869132479","Tag":"Citation","CreatedDate":"2022-02-17T08:22:04Z","IsMain":"1","TagPrecision":"0","NombreAffiche":"0","Image":"citation"},{"TagId":"b9e81702-561b-11ec-9700-ee87d8a3a860","Tag":"Concept","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"26","Image":"concept"},{"TagId":"d9cfa8b5-5c58-11ec-9700-ee87d8a3a860","Tag":"Evenement","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"3","Image":"evenement"},{"TagId":"11960fd5-561b-11ec-9700-ee87d8a3a860","Tag":"Film","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"1","NombreAffiche":"0","Image":"film"},{"TagId":"a818b089-561b-11ec-9700-ee87d8a3a860","Tag":"Jeux","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"4","Image":"jeux"},{"TagId":"7226b2ff-561b-11ec-9700-ee87d8a3a860","Tag":"Lieu","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"7","Image":"lieu"},{"TagId":"8700bbae-561b-11ec-9700-ee87d8a3a860","Tag":"Musique","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"0","Image":"musique"},{"TagId":"64d2da4a-561b-11ec-9700-ee87d8a3a860","Tag":"Nourriture","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"0","NombreAffiche":"28","Image":"nourriture"},{"TagId":"7d9b2fa0-561b-11ec-9700-ee87d8a3a860","Tag":"Sport","CreatedDate":"2022-02-07 21:14:33","IsMain":"1","TagPrecision":"1","NombreAffiche":"14","Image":"sport"}]'));
    var [affiches, setAffiches] = useState("");

    var [isAllTags, setIsAllTags] = useState(false);

    var [textRecherche, setTextRecherche] = useState('Recherche');
    var [recherche, setRecherche] = useState("");

    useEffect(()=> {
        fetch(global.apiUrl + 'Tag/Tag.php?Main=true')
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, [])

    useEffect(()=> {
        if(recherche != "") {
            fetch(global.apiUrl + 'Affiche/RechercheAffiche.php?Recherche=' + recherche)
            .then((response) => response.json())
            .then((data) => setAffiches(data));
        }
    }, [recherche])

    function loadAllTags() {
        fetch(global.apiUrl + 'Tag/Tag.php?Main=false')
        .then((response) => response.json())
        .then((data) => setCategories(data));

        setIsAllTags(true);
    }

    var ImageTag = ({image, title}) => {
        if(image.includes('http')) {
            return (
                <ImageBackground isBackground imageStyle={{ borderRadius: 19, backgroundColor: '#aaa', width: '100%', height: '100%'}} source={{uri: image}} resizeMode="cover" style={styles.categorie}>
                    <Text style={{marginRight: 'auto', marginLeft: 5, color: 'white', backgroundColor: '#aaa9', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5, marginTop: 'auto', marginBottom: 5,fontFamily: 'sans-serif-light'}}>{title}</Text>
                </ImageBackground>
            );
        }else{
            return (
                <ImageBackground isBackground imageStyle={{ borderRadius: 19, backgroundColor: '#aaa', width: '100%', height: '100%'}} source={images[image]} resizeMode="cover" style={styles.categorie}>
                    <Text style={{marginRight: 'auto', marginLeft: 5, color: 'white', backgroundColor: '#aaa9', borderRadius: 100, paddingHorizontal: 10, paddingVertical: 5, marginTop: 'auto', marginBottom: 5,fontFamily: 'sans-serif-light'}}>{title}</Text>
                </ImageBackground>
            );
        }
    }

    var ItemCategorie = ({ title, image, tagId }) => {

        return(
            <TouchableOpacity activeOpacity={1}  onPress={() => props.navigation.navigate('OeuvresPage', {TagId: tagId, OeuvreTypeLibelle: title, image: image})}>
                <View style={[globalStyles.shadows, styles.categorie]}>
                
                    <ImageTag image={image} title={title}/>
                    
                </View>

            </TouchableOpacity>
        );
        
    }

    var renderItemCategorie = ({ item }) => (
        <ItemCategorie title={item.Tag} image={item.Image} tagId={item.TagId}/>
    );

    var _header = () => {
        return (
            <View>
                <TouchableOpacity style={{marginRight: 'auto', marginTop: 50, marginLeft: 20, marginBottom: 20}} onPress={() => props.navigation.pop()}>
                    <View style={{height: 50, width: 50, borderRadius: 100, alignSelf: 'flex-end', backgroundColor: 'rgb(254, 165, 42)'}}>
                        <Image style={{height: 50, width: 50, opacity: 0.5}} source={{uri: 'https://www.esnaturopathiemaroc.com/wp-content/uploads/2017/11/chevron_left_black.png'}}/>
                    </View>
                </TouchableOpacity>

                <AlertText title={"Recherche"} description={"Vous pouvez retrouver ici toutes les affiches regroupé par catégories"}/>
            </View>
        );
    }

    var VoirPlus = () => {
        if(!isAllTags) {
            return (
                <TouchableOpacity style={[globalStyles.orangeShadows, {backgroundColor: '#FEA52A', marginLeft: 10, width: 130, paddingHorizontal: 25, paddingVertical: 15, borderRadius: 100}]} onPress={()=> loadAllTags()}>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', color: '#EEE'}}>Voir plus  + </Text>
                </TouchableOpacity>
                
            );
        }else { return (<View></View>); }
    }

    var renderItemAffiche = ({ item }) => {
        return(
            <AfficheMedium item={item} navigation={props.navigation}/>
        );
    }

    var Menu = () => {
        if(recherche == "") {
            return (
                <View style={{width: '100%', height: Dimensions.get('window').height-30}}>
                    <FlatList data={categories} ListHeaderComponent={_header} renderItem={renderItemCategorie} keyExtractor={item => item.TagId} numColumns="3"/>
                </View>
            );
        }else {
            return (
                <View style={{width: '100%', height: Dimensions.get('window').height}}>
                    <FlatList data={affiches} ListHeaderComponent={_header} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="2"/>
                </View>
            )
        }
    }

   

    return (
        <View>

            <Menu/>

            <View style={{position: 'absolute', flexDirection: 'row', top: Dimensions.get('window').height - 80, width: Dimensions.get('window').width}}>
                <VoirPlus/>

                <View style={{flexDirection: 'row', width: '60%', marginLeft: 'auto', marginRight: 10, backgroundColor: 'white', borderRadius: 100, elevation: 5, padding: 10}}>
                    <Image style={{height: 20, width: 20, marginTop: 'auto', marginBottom: 'auto', marginRight: 20}} source={require("../Images/Loupe.png")}/>
                    <TextInput style={{fontSize: 15, width: '100%', fontFamily: 'sans-serif-light'}} placeholder={textRecherche} value={recherche} onChangeText={setRecherche}/>
                    <TouchableOpacity style={{position: 'absolute', right: 13, top: 13}} onPress={() => setRecherche("")}>
                        <Image style={{height: 20, width: 20}} source={{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/768px-Grey_close_x.svg.png'}}/>
                    </TouchableOpacity>
                </View> 
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        marginLeft: 10,
        color: 'black',
    },
    categorie: {
        height: Dimensions.get('window').width/3 - 10,
        width: Dimensions.get('window').width/3 - 10,
        borderRadius: 100,
    },
    categorie: {
        borderRadius: 100,
        marginTop: 2,
        marginLeft: 2,
        height: Dimensions.get('window').width/3,
        width: Dimensions.get('window').width/3,
        backgroundColor : '#0000',
    },
  })