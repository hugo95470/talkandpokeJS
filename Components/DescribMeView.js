import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Text, ImageBackground, View, Image} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';
import AlertText from './AlertText'

function DescribMeView(props) {

    const context = useContext(Context)

    //AFFICHAGE DES AFFINITES
    var [pokes, setPokes] = useState("");
            
    
    var DeleteButton = ({ newsId }) => {
        if(props.utilisateurId == context.utilisateurId){
            return(
                <TouchableOpacity onPress={() => fetch(global.apiUrl + 'Reaction/DeleteDescribMe.php?UtilisateurId=' + props.utilisateurId + '&NewsId=' + newsId + '&TokenUtilisateur=' + context.utilisateurToken).then(getDescribeMe())} style={{position: 'absolute', right: 0, height: 25, width: 25, borderRadius: 100, backgroundColor: 'orange'}}>
                    <Text style={{position: 'absolute', color: 'white', left: 9, bottom: 5}}>x</Text>
                </TouchableOpacity>
            );
        }else{
            return(<View></View>)
        }
        
    }

    var ItemAffiche = ({ image, AfficheId }) => {
        return(
            <TouchableOpacity  activeOpacity={1} style={{marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'transparent', padding: 4, borderRadius: 19}} onPress={() => props.navigation.push('DetailsOeuvrePage', {AfficheId: AfficheId, _Image: image})}>
                <ImageBackground imageStyle={{ borderRadius: 15, height: 150, width: 100}} source={{uri: image}} resizeMode="cover" style={styles.Affiche}>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    var renderItemAffiche = ({ item }) => {
        return(
            <ItemAffiche style={styles.containerAffiches} image={item.Image} AfficheId={item.AfficheId} />
            )
    };


    useEffect(() => {
        getDescribeMe()
    }, [props.utilisateurId]);

    function getDescribeMe(){
        fetch(global.apiUrl + 'Reaction/GetDescribMe.php?UtilisateurId=' + props.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
        .then((response) => response.json())
        .then((data) => setPokes(data));  
    }

    if(pokes != "")
        return (

            <View>
                <View style={styles.containerReaction}>
                    <Image style={{height: 60, width: 60, margin: 4}} source={require('../Images/DescribMe.png')}/>

                    <AlertText title={"Me"} description={"Cette onglet regroupe les affiches qui selon vous vous représentent le plus, choisissez bien !"}/>
                </View>
                
                <FlatList data={pokes} renderItem={renderItemAffiche} keyExtractor={item => item.AfficheId} numColumns="3"/>
            </View>   

        )
    else
        return(
            <View></View>
        )
}

const styles = StyleSheet.create({
    containerReaction: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 100,
        elevation: 5,
        margin: 10,
        width: 68,
        height: 68,
    },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Affiche: {
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
})


export default DescribMeView