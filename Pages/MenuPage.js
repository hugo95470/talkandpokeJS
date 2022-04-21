import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, ScrollView, TouchableOpacity, Image } from 'react-native';

import Context from '../navigation/userContext';
import TopBarre from '../Components/TopBarre';
import UtilisateurTagView from '../Components/UtilisateurTagView';
import AlertText from '../Components/AlertText';
import globalStyles from '../Styles/globalStyles';


//TODO: REFACTOR


export default function Menu(props) {

    const context = useContext(Context)

    let [refreshing, setRefreshing] = React.useState(false);

    let [compatibilites, setCompatibilites] = useState("");

    let mounted = false

    useEffect(() => {
        if(!mounted) {
            loadCompatibilites()
        }

        return () => mounted = true;

    }, []);

    function loadCompatibilites() {
        fetch(global.apiUrl + 'Tag/GetUtilisateurTagScoreByUtilisateur.php?TokenUtilisateur=' + context.utilisateurToken + '&UtilisateurId=' + context.utilisateurId + '&Limit=3')
        .then((response) => response.json())
        .then((data) => {
            setCompatibilites(data);
        }); 
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        //ICI FAIRE LE REFRESH
        loadCompatibilites()

        setRefreshing(false)
    }, []);

    var First = () => {
        if(compatibilites != undefined && compatibilites != ""){
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[0].UtilisateurId, _image: compatibilites[0].Image})} style={[styles.firstAffin, globalStyles.shadows]}>
                    <Image style={{height: 120, width: 120, borderRadius: 100, marginTop: 10, marginBottom: 'auto'}} source={{uri: compatibilites[0].Image}}/>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[0].Pourcentage} %</Text>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[0].Pseudo}</Text>
                </TouchableOpacity>
                );
        }else {
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate('SwipePage')} style={styles.firstAffin}>
                    <Text style={{margin: 20}}>Aucune affinité pour l'instant ? a͟l͟l͟e͟z͟ v͟o͟u͟s͟ e͟n͟ f͟a͟i͟r͟e͟ ! 😁👍</Text>
                </TouchableOpacity>
            );
        }
        
    };

    var Second = () => {
        if(compatibilites[1] != undefined){
            return (
                <TouchableOpacity style={[{left: 30, top: -70}, globalStyles.shadows]} onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[1].UtilisateurId, _image: compatibilites[1].Image})}>
                    <Image style={{height: 120, width: 120, borderRadius: 100, marginTop: 10, marginBottom: 'auto'}} source={{uri: compatibilites[1].Image}}/>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[1].Pourcentage} %</Text>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[1].Pseudo}</Text>
                </TouchableOpacity>
                );
        }else {
            return (
                <View></View>
            );
        }
        
    };

    var Third = () => {
        if(compatibilites[2] != undefined){
            return (
                <TouchableOpacity style={[{position: 'absolute', right: 30, top: -40}, globalStyles.shadows]} onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[2].UtilisateurId, _image: compatibilites[2].Image})}>
                    <Image style={{height: 120, width: 120, borderRadius: 100, marginTop: 10, marginBottom: 'auto'}} source={{uri: compatibilites[2].Image}}/>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[2].Pourcentage} %</Text>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[2].Pseudo}</Text>
                </TouchableOpacity>
                );
        }else {
            return (
                <View></View>
            );
        }
        
    };

    return (
        <View>
            <TopBarre navigation={props.navigation}/>


            <ScrollView style={{height: Dimensions.get('window').height}} refreshControl={<RefreshControl
                    colors={["#FEA52A", "#FEA52A"]}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}>
                
                <AlertText title={"Compatibilités"} description={"Découvrez ici les personnes qui vous correspondent en fonction de vos réactions"}/>

                {/* FIRST AFFINITE  */} 
                <View style={{left: - Dimensions.get('window').width, width: Dimensions.get('window').width * 3, backgroundColor: '#fff', minHeight: Dimensions.get('window').height, borderTopLeftRadius: 5000, borderTopRightRadius: 5000, top: 100}}>
                    <View>
                        <First/>
                    </View>

                    <View style={{flexDirection: 'row', top: -20, left: Dimensions.get('window').width, width: Dimensions.get('window').width}}>
                        <Second/>

                        <Third/>
                    </View>

                    <View style={{left: Dimensions.get('window').width, top: -40, width: Dimensions.get('window').width}}>
                        <UtilisateurTagView navigation={props.navigation}/>   
                    </View>



                    <View style={{height: 300}}></View>

                </View>
            </ScrollView>
        </View>
    )        
}


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    firstAffin: {
        marginLeft: 'auto',
        marginRight: 'auto',
        top: -70
    }
  })
