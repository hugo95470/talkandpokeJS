import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';

import globalStyles from '../Styles/globalStyles';
import afficheImage from '../Mapper/AfficheImageMapper';

export default function AfficheMedium(props) {
    
    return(
        <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.navigate('DetailsOeuvrePage', {AfficheId: props.AfficheId, _Image: props.code})}>
            <View style={[globalStyles.shadows, {margin: 3}]}>

                    <ImageBackground isBackground imageStyle={{ borderRadius: 15}} source={afficheImage[props.code]} resizeMode="cover" style={[styles.affiche, globalStyles.borderRadius]}>
                        {/* <Image style={{position: 'absolute', top: 10, left: 10, height: 25, width: 25, borderRadius: 100}} source={{uri: imageSup}}/> */}

                        <View intensity={250} style={styles.TitreContainer}>
                            <Text style={styles.Titre}>{props.afficheTitre}</Text>
                        </View>

                        <TouchableOpacity style={{position: 'absolute', bottom: 7, left: 7, position: 'absolute', bottom: 7, right: 10,}} activeOpacity={1} onPress={() => props.navigation.navigate('MessagePage', {_isOeuvre: true, _oeuvreId: props.AfficheId})}>
                            <Image style={{height: 20, width: 22}} source={{uri: 'https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-388b76121ea0e4223a20cfea7b202e09.png'}}/>
                        </TouchableOpacity>

                    </ImageBackground>                        

            </View>
        </TouchableOpacity>
    );

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

