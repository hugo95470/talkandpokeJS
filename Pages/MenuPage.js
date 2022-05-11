import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, RefreshControl, ScrollView, ImageBackground, TouchableOpacity, Image } from 'react-native';

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
                <TouchableOpacity onPress={() => props.navigation.navigate('ContactPage', {_profilId: compatibilites[0].UtilisateurId, _image: compatibilites[0].Image})} style={[styles.firstAffin]}>
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

    return (
        <View>
            <TopBarre title={"Compatibilités"} navigation={props.navigation}/>


            <ScrollView style={{height: '90%'}} refreshControl={<RefreshControl
                    colors={["#FEA52A", "#FEA52A"]}
                    refreshing={refreshing}
                    onRefresh={onRefresh} />}>
                

                {/* FIRST AFFINITE  */} 
                
                <ImageBackground isBackground resizeMode="cover" style={{height: Dimensions.get('window').height - 250, top: -100, width: Dimensions.get('window').width}} source={require('../Images/Podium.jpeg')}>
                    <First/>

                    <Second/>

                    <Third/>
                </ImageBackground>

                <View style={[globalStyles.shadows, {backgroundColor: '#fff', paddingTop: 20, borderTopLeftRadius: 25, top: -118, borderTopRightRadius: 25, width: Dimensions.get('window').width}]}>
                    <View style={[{width: 30, marginLeft: 'auto', marginRight: 'auto', height: 5, backgroundColor: '#ddd', borderTopRightRadius: 100, borderTopLeftRadius: 100}]}></View>
                    <UtilisateurTagView navigation={props.navigation}/>  
                </View>


                {/* <ImageBackground isBackground resizeMode="cover" style={{height: '70%', width: '100%'}} source={require('../Images/Podium.jpeg')}>
                    <View>
                        <First/>
                    </View>

                    <View style={{flexDirection: 'row', top: 20, width: Dimensions.get('window').width}}>
                        <Second/>

                        <Third/>
                    </View>

                    <View style={[globalStyles.shadows, {top: 40, backgroundColor: '#fff', paddingTop: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25, width: Dimensions.get('window').width}]}>
                        <View style={[{width: 30, marginLeft: 'auto', marginRight: 'auto', height: 5, backgroundColor: '#ddd', borderRadius: 100}]}></View>
                        <UtilisateurTagView navigation={props.navigation}/>   
                    </View>
                </ImageBackground> */}
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
