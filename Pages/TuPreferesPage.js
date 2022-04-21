import React from 'react';
import { StyleSheet, Dimensions, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';

import TopBarre from '../Components/TopBarre';
import globalStyles from '../Styles/globalStyles';
import { getAfficheAssociations } from '../service/AfficheService';

export default function TuPreferesPage(props) {

    let [select, setSelect] = useState("none");
    let [afficheAssociations, setAfficheAssociations] = useState("");

    let [afficheAssociation, setAfficheAssociation] = useState("");

    useEffect(async () => {
        let tmp = await getAfficheAssociations(5);

        setAfficheAssociation(tmp[0])
        setAfficheAssociations(tmp);
    }, []);

    return (
      <View>
            <TopBarre/>

            <View>
                <Text style={[globalStyles.title, {margin: 20}]}>Tu preferes </Text>
            </View>

            <Image style={{position: 'absolute',top: Dimensions.get('window').height/3, left: Dimensions.get('window').width/8, height: 80, width: 80, opacity: 1, transform: [{ rotate: '90deg' }], marginBottom: 'auto'}} source={require('../Images/doubleFleche.png')}/>

            <TouchableOpacity onPress={() => setSelect('left')} style={[styles.afficheLeft, {backgroundColor: select=="left"?"#FEA52A":"transparent"}]}>
                <ImageBackground isBackground imageStyle={{ borderRadius: 15}} source={{uri: afficheAssociation?afficheAssociation.Image1:""}} resizeMode="cover" style={[styles.affiche, globalStyles.borderRadius]}>
                    <View intensity={250} style={styles.TitreContainer}>
                        <Text style={styles.Titre}>{afficheAssociation?afficheAssociation.AfficheTitre1:""}</Text>
                    </View>

                    <TouchableOpacity style={{height: 30, borderRadius: 100, width: 100, backgroundColor: 'lightgrey', position: 'absolute', bottom: 10, left: 10}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: afficheAssociation?afficheAssociation.AfficheId1:"", _Image: afficheAssociation?afficheAssociation.Image1:""})}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontWeight: '700', fontFamily: 'sans-serif-light'}}>+ Info</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelect('right')} style={[styles.afficheRight, {backgroundColor: select=="right"?"#FEA52A":"transparent"}]}>
                <ImageBackground isBackground imageStyle={{ borderRadius: 15}} source={{uri: afficheAssociation?afficheAssociation.Image2:""}} resizeMode="cover" style={[styles.affiche, globalStyles.borderRadius]}>
                    <View intensity={250} style={styles.TitreContainer}>
                        <Text style={styles.Titre}>{afficheAssociation?afficheAssociation.AfficheTitre2:""}</Text>
                    </View>

                    <TouchableOpacity style={{height: 30, borderRadius: 100, width: 100, backgroundColor: 'lightgrey', position: 'absolute', bottom: 10, left: 10}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: afficheAssociation?afficheAssociation.AfficheId2:"", _Image: afficheAssociation?afficheAssociation.Image2:""})}>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontWeight: '700', fontFamily: 'sans-serif-light'}}>+ Info</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity style={styles.valideButton}>
                <Image style={[globalStyles.center, { height: 40, tintColor: '#FEA52A', width: 40, opacity: 1}]} source={require('../Images/tickIcone.webp')}/>
            </TouchableOpacity>

      </View>
    )
}

const styles = StyleSheet.create({
    afficheRight: {
        position: 'absolute',
        right: -10,
        top: Dimensions.get('window').height/6,
        transform: [{ rotate: '5deg' }],
        padding: 10,
        borderRadius: 19,
    },
    afficheLeft: {
        position: 'absolute',
        top: Dimensions.get('window').height/2,
        left: -10,
        transform: [{ rotate: '-10deg' }],
        padding: 10,
        borderRadius: 19,
    },
    TitreContainer: {
        backgroundColor: "#aaa9",
        padding: 0,
        paddingHorizontal: 5,
        paddingVertical: 5,
        minWidth: 100,
        marginRight: -9,
        position: 'absolute', 
        right: '4%', 
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
        height: 350,
        width: Dimensions.get('window').width/1.7,
        backgroundColor: '#ddd',
    },
    valideButton: {
        position: 'absolute',
        right: 20,
        top: Dimensions.get('window').height - 150,
        backgroundColor: '#ddd',
        height: 80,
        width: 80,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: '#FEA52A',
    }
})
