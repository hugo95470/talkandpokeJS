import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, RefreshControl, TextInput, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';

import Context from '../navigation/userContext';
import TopBarre from '../Components/TopBarre';
import UtilisateurTagView from '../Components/UtilisateurTagView';
import AlertText from '../Components/AlertText';
import globalStyles from '../Styles/globalStyles';
import { getUtilisateurBySearch } from '../service/UtilisateurService';


//TODO: REFACTOR


export default function Menu(props) {

    const context = useContext(Context)

    let [refreshing, setRefreshing] = React.useState(false);
    var [recherche, setRecherche] = useState("");
    var [utilisateursSearch, setUtilisateursSearch] = useState("");

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
                <TouchableOpacity onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[0].UtilisateurId, _image: compatibilites[0].Image})} style={[styles.firstAffin]}>
                    <Image style={{height: 120, width: 120, borderRadius: 100, marginTop: 10, marginBottom: 'auto'}} source={{uri: compatibilites[0].Image}}/>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[0].Pourcentage} %</Text>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto'}}>{compatibilites[0].Pseudo}</Text>
                </TouchableOpacity>
                );
        }else {
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate('SwipePage')} style={styles.firstAffin}>
                    <Text style={{marginVertical: 20}}>Aucune affinité pour l'instant ? a͟l͟l͟e͟z͟ v͟o͟u͟s͟ e͟n͟ f͟a͟i͟r͟e͟ ! 😁👍</Text>
                </TouchableOpacity>
            );
        }
        
    };

    var Second = () => {
        if(compatibilites[1] != undefined){
            return (
                <TouchableOpacity style={styles.secondAffin} onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[1].UtilisateurId, _image: compatibilites[1].Image})}>
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
                <TouchableOpacity style={styles.thirdAffin} onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[2].UtilisateurId, _image: compatibilites[2].Image})}>
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
    
    useEffect(()=> {
        if(recherche != "") {
            getUtilisateurBySearch(recherche)
            .then((data) => setUtilisateursSearch(data));
        }
    }, [recherche])

    var ItemUtilisateur = ({ pseudo, image, utilisateurId }) => {
        return(
            <TouchableOpacity style={[globalStyles.shadows, globalStyles.center, {flexDirection: 'row', backgroundColor: 'white', marginBottom: 10, width: '90%'}]} activeOpacity={1} onPress={() => props.navigation.navigate('ContactPage', {_profilId: utilisateurId, _image: image})}>
                <Image style={{height: 80, width: 80, marginHorizontal: 15, marginVertical: 10, borderRadius: 1000}} source={{uri: image}}/>
                <Text style={[globalStyles.title, globalStyles.center]}>{pseudo}</Text>
            </TouchableOpacity>
        );
        
    }

    var renderItemUtilsateur = ({ item }) => (
        <ItemUtilisateur pseudo={item.Pseudo} image={item.Image} utilisateurId={item.UtilisateurId}/>
    );

    var UtilisateurView = () => {
        if(recherche != "") {
            return(
                <FlatList data={utilisateursSearch} renderItem={renderItemUtilsateur} keyExtractor={item => item.Identifier} numColumns="1"/>
                )
        }else {
            return (
                <UtilisateurTagView navigation={props.navigation}/>  
            )
        }
    }

    return (
        <View>
            <TopBarre title={"Compatibilités"} navigation={props.navigation}/>


            <ScrollView style={{height: '90%'}} refreshControl={<RefreshControl
                    colors={["#FEA52A", "#FEA52A"]}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}>
                

                {/* FIRST AFFINITE  */} 
                <View style={{backgroundColor: '#FEA52A'}}>
                    <ImageBackground style={{height: Dimensions.get('window').height - 250, top: -100, width: Dimensions.get('window').width}} source={require('../Images/Podium.jpeg')}>
                        <First/>

                        <Second/>

                        <Third/>
                    </ImageBackground>

                </View>
                

                <View style={[globalStyles.shadows, {backgroundColor: '#fff', paddingTop: 20, paddingBottom: 300, borderTopLeftRadius: 25, top: -118, borderTopRightRadius: 25, width: Dimensions.get('window').width}]}>
                    <View style={[{width: 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10, height: 5, backgroundColor: '#ddd', borderRadius: 100}]}></View>
                    
                    <UtilisateurView/>


                </View>
            </ScrollView>

            {/* SEARCH BAR */}
            <View style={[{width: '100%', position: 'absolute', bottom: 0}]}>
                <View style={{flexDirection: 'row', width: '90%', marginLeft: 'auto', marginRight: 10, marginBottom: 20, backgroundColor: 'white', borderRadius: 100, elevation: 5, padding: 10}}>
                    <Image style={{height: 20, width: 20, marginTop: 'auto', marginBottom: 'auto', marginRight: 20}} source={require("../Images/Loupe.png")}/>
                    <TextInput style={{fontSize: 15, width: '100%', fontFamily: 'sans-serif-light'}} placeholder={"Recherche un utilisateur"} value={recherche} onChangeText={setRecherche}/>
                    <TouchableOpacity style={{position: 'absolute', right: 13, top: 13}} onPress={() => setRecherche("")}>
                        <Image style={{height: 20, width: 20}} source={{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/768px-Grey_close_x.svg.png'}}/>
                    </TouchableOpacity>
                </View> 
            </View>
            
        </View>
    )        
}


const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    firstAffin: {
        position: 'absolute',
        left: '24%',
        top: '24%'
    },
    secondAffin: {
        position: 'absolute',
        left: '57%',
        top: '43%'
    },
    thirdAffin: {
        position: 'absolute',
        left: '12%',
        top: '62%'
    }
  })
