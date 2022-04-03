import React, { useContext } from 'react';
import { StyleSheet, ScrollView, Image, RefreshControl, View, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

import AffinitesCollectionView from '../Components/AffinitesCollectionView';
import AfficheMedium from '../Components/AfficheMedium';
import Loading from '../Components/Loading';
import AlertText from './AlertText';
import { loadAffiches } from '../service/AfficheService.js';

export default function AfficheCollectionView(props) {


    let [isEndReached, setIsEndReached] = useState(false);

    let [affiches, setAffiches] = useState("");
    let [reload, setReload] = useState(false);

    useEffect(async () => {
        loadData();
    }, []);

    useEffect(() => {
        if(isEndReached) {
            loadData();
            setIsEndReached(false);
        }
    }, [isEndReached]);


    const [refreshing, setRefreshing] = React.useState(false);

    async function loadData() {
        if(props.Categorie != undefined){
            fetch(global.apiUrl + 'Affiche/GetAfficheByTag.php?Tag=' + props.Categorie)
            .then((response) => response.json())
            .then((data) => {
                let newstate = [...affiches, ...data]

                setAffiches(newstate);
            }); 
        }else{
            let data = await loadAffiches("20");
            setAffiches([...affiches, ...data]);
        }
    }

    async function reloadAffiches() {
        setReload(true)
        if(props.Categorie != undefined){
            fetch(global.apiUrl + 'Affiche/GetAfficheByTag.php?Tag=' + props.Categorie)
            .then((response) => response.json())
            .then((data) => setAffiches(data)); 
        }else{
            setAffiches(await loadAffiches("20"));
        }
    }
    
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);

        //ICI FAIRE LE REFRESH DES AFFICHES
        setAffiches("");
        await reloadAffiches();
        setRefreshing(false);
        
    }, []);

    var renderItemAffiche = ({ item }) => (
        <AfficheMedium item={item} navigation={props.navigation}/>
    );

    var headerFlatList = () => {
        return (
            <View  style={{zIndex: 100}}>
                <View style={{position: 'relative'}}>
                    <AlertText title={"Compatibilités"} description={"c'est ici que vous pouvez voir qui sont les personnes avec qui vous avez des affinités, notre algorithme se fit sur vos réactions et celles des autres"}/>
                </View>

                <ScrollView horizontal={true} style={{height: 130, marginTop: 5}} showsHorizontalScrollIndicator={false}>
                    <AffinitesCollectionView reload={reload} navigation={props.navigation}/>
                </ScrollView>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{position: 'relative'}}>
                        <AlertText style={styles.title} title={"Affiches"} description={"Ici vous pouvez avoir un aperçu général de toutes les affiches et les nouveautés"}/>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('MenuOeuvresPage')} style={styles.logo}>
                        <Image style={{height: 40, width: 40, opacity: 0.6, marginTop: 10, marginBottom: 'auto'}} source={require('../Images/SquareMenu.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View>
            <FlatList refreshControl={
                <RefreshControl colors={["#FEA52A", "#FEA52A"]} refreshing={refreshing} onRefresh={onRefresh} />
            } ListHeaderComponent={headerFlatList} data={affiches} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} 
              numColumns="2" onEndReachedThreshold={0.3} onEndReached={() =>{setIsEndReached(true)}}>
            </FlatList>
            <Loading load={affiches == "" ? true : false}/>  
        </View>  
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
        color: 'black',
    },
    logo: {
        marginRight: 10,
        marginTop: 10,
    }
})