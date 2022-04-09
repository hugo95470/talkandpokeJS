import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground, Dimensions } from 'react-native';

import globalStyles from '../Styles/globalStyles';

export default function AfficheMedium(props) {

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
                            <Image style={{position: 'absolute', top: 10, left: 10, height: 50, width: 50, borderRadius: 100}} source={{uri: imageSup}}/>
                            <View intensity={250} style={styles.TitreContainer}>
                                <Text style={styles.Titre}>{afficheTitre}</Text>
                            </View>

                            <TouchableOpacity style={{position: 'absolute', bottom: 7, left: 7, position: 'absolute', bottom: 7, right: 10,}} activeOpacity={1} onPress={() => props.navigation.navigate('MessagePage', {_isOeuvre: true, _oeuvreId: AfficheId})}>
                                <Image style={{height: 20, width: 22}} source={{uri: 'https://storage.googleapis.com/multi-static-content/previews/artage-io-thumb-388b76121ea0e4223a20cfea7b202e09.png'}}/>
                            </TouchableOpacity>

                        </ImageBackground>                        
                        <TitreNews news={AfficheTitreSup} date={date}/>

                </View>
            </TouchableOpacity>
        );            
    }

    let TitreNews = ({news, date}) => {
        let dateNews = new Date(date)

        if((news == undefined || news == '') || (dateNews < limiteNews && String(news).toLowerCase() == 'nouveauté')){
            return(
                <View></View>
            )
        }else{
            return(
                <View style={{backgroundColor: 'rgba(255,255,255,0.7)', width: 'auto', position: 'absolute', bottom: 70, right: 50, borderRadius: 5, borderWidth: 2, borderColor: '#FEA52A', padding: 3, transform: [{ rotate: '-18deg' }]}}>
                    <Text style={{color: '#FEA52A', paddingHorizontal: 3, maxWidth: 150, height: 'auto' , fontWeight: '700', textAlign: 'center'}}>{String(news).toUpperCase()}</Text>
                </View>
            )
        }
    }

    return(
        <ItemAffiche afficheTitre={props.item.AfficheTitre} image={props.item.Image} date={props.item.CreateDate} imageSup={props.item.ImageSup} AfficheTitreSup={props.item.AfficheTitreSup} AfficheId={props.item.AfficheId}/>
    ) 

}

const styles = StyleSheet.create({
    
    TitreContainer: {
        backgroundColor: "#aaa9",
        padding: 0,
        paddingHorizontal: 5,
        paddingVertical: 5,
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
        fontSize: 17,
        fontFamily: 'sans-serif-light',
    },
    affiche: {
        height: 300,
        zIndex: -1,
        width: Dimensions.get('window').width/2 -7,
        backgroundColor: '#ddd',
        borderRadius: 19,
    },
})

