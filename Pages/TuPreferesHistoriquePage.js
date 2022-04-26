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
    const { Finish } = props.route.params;
    const { ContactPseudo } = props.route.params;



    let utilisateurCouleur = ExpediteurId == context.utilisateurId ? "rgb(22, 105, 123)" : "#FEA52A";
    let contactCouleur = ExpediteurId == context.utilisateurId ? "#FEA52A" : "rgb(22, 105, 123)";
    
    var [associations, setAssociations] = useState("");
    var [isRead, setIsread] = useState(false);

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
            <View style={{flexDirection:'row', marginBottom: 5}}>
                <Affiche reaction1={item.UtilisateurReaction=="0"?"1":"0"} afficheId={item.Affiche1Id} reaction2={item.ContactReaction=="0"?"1":"0"} image={item?item.Image1:""}/>
                <View style={[globalStyles.shadows, globalStyles.cercle, {top: '40%', left: '43%', position: 'absolute', backgroundColor: '#FEA52A'}]}>
                    <Text style={[globalStyles.white, {padding: 15, fontSize: 18}]}>Ou</Text>
                </View>
                <Affiche reaction1={item.UtilisateurReaction=="1"?"1":"0"} afficheId={item.Affiche1Id} reaction2={item.ContactReaction=="1"?"1":"0"} image={item?item.Image2:""}/>
            </View>
        )
        
    };

    var finishModal = ({ item }) => {
        if(Finish && !isRead){
            return (
                <Modal animationType="slide" transparent={true} visible={showSuggestion}>
                    <View style={styles.background}></View>

                    <View style={[globalStyles.center, {zIndex: 100, backgroundColor: '#FFF', borderRadius: 19, width: '90%'}]}>
                        <Text>Bien joué ! Il n'y a plus qu'a attendre la réponse de {ContactPseudo}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setIsread(true)} style={{marginLeft: 'auto', backgroundColor: '#FEA52A', borderRadius: 19, paddingHorizontal: 20, paddingVertical: 10, marginRight: 20, marginBottom: 20, marginTop: 20}}>
                        <Text>Ok</Text>
                    </TouchableOpacity>
                </Modal>
            )
        }else {
            return (
                <View></View>
            )
        }
    };

        

    return (
        <View>
            <View style={{position: 'absolute'}}>
                <BackArrowView navigation={props.navigation}/>
            </View>
            <View style={[globalStyles.center, {marginTop: 50}]}>
                <AlertText title={"Tu préfères"} description={"Voici la liste des réactions que vous avez eu, en orange, ta réaction et en bleu, sa réaction"}/>
            </View>

            <FlatList style={{height: '84%', marginTop: 30}} data={associations} renderItem={renderItemAssociation} keyExtractor={item => item.UtilisateurAfficheAssociationId} numColumns="1"/>

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