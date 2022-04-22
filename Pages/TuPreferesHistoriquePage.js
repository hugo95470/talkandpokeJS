import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Image, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';

import TopBarre from '../Components/TopBarre';
import { getMessageAfficheAssociation } from '../service/MessageService';
import Context from '../navigation/userContext';
import AlertText from '../Components/AlertText';
import globalStyles from '../Styles/globalStyles';
import BackArrowView from '../Components/BackArrowView';

export default function TuPreferesHistoriquePage(props) {

    const context = useContext(Context)

    const { MessageId } = props.route.params;
    const { ExpediteurId } = props.route.params;

    let utilisateurCouleur = ExpediteurId == context.utilisateurId ? "rgb(22, 105, 123)" : "#FEA52A";
    let contactCouleur = ExpediteurId == context.utilisateurId ? "#FEA52A" : "rgb(22, 105, 123)";
    
    var [associations, setAssociations] = useState("");

    useEffect(async () => {
        setAssociations(await getMessageAfficheAssociation(MessageId, context.utilisateurToken));
    }, []);

    var Affiche = ({image, reaction1, reaction2, afficheId}) => (
        <TouchableOpacity onPress={() => props.navigation.navigate('DetailsOeuvrePage', {AfficheId: afficheId, _Image: image})} style={[globalStyles.center, {borderWidth: 5, borderColor: reaction1=="1"?contactCouleur:"transparent", borderRadius: 30}]}>
            <View style={[{borderWidth: 5, borderColor: reaction2=="1"?utilisateurCouleur:"transparent", borderRadius: 24}]}>
                <Image style={[styles.affiche]} source={{uri: image}}/>
            </View>
        </TouchableOpacity>
    );

    var renderItemAssociation = ({ item }) => {
        return (
            <View style={{flexDirection:'row'}}>
                <Affiche reaction1={item.UtilisateurReaction=="0"?"1":"0"} afficheId={item.Affiche1Id} reaction2={item.ContactReaction=="0"?"1":"0"} image={item?item.Image1:""}/>
                <View style={[globalStyles.shadows, globalStyles.cercle, {top: '40%', left: '43%', position: 'absolute', backgroundColor: '#FEA52A'}]}>
                    <Text style={[globalStyles.white, {padding: 15, fontSize: 18}]}>Ou</Text>
                </View>
                <Affiche reaction1={item.UtilisateurReaction=="1"?"1":"0"} afficheId={item.Affiche1Id} reaction2={item.ContactReaction=="1"?"1":"0"} image={item?item.Image2:""}/>
            </View>
        )
        
    };

    return (
      <View>
        <BackArrowView navigation={props.navigation}/>

        <AlertText title={"Tu préfères"} description={"Voici la liste des réactions que vous avez eu, en orange, ta réaction et en bleu, sa réaction"}/>

        <FlatList style={{height: '88%', marginTop: 30}} data={associations} renderItem={renderItemAssociation} keyExtractor={item => item.UtilisateurAfficheAssociationId} numColumns="1"/>

      </View>
    )
}

const styles = StyleSheet.create({
    affiche: {
        height: 240,
        width: Dimensions.get('window').width/2-30,
        borderRadius: 19,
    }
});