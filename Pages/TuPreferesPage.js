import React from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';

import TopBarre from '../Components/TopBarre';
import globalStyles from '../Styles/globalStyles';
import { getAfficheAssociations } from '../service/AfficheService';
import AlertText from '../Components/AlertText';

export default function TuPreferesPage(props) {

    let [select, setSelect] = useState("none");
    let [afficheAssociations, setAfficheAssociations] = useState("");

    let [images, setImages] = useState("");
    let [image1, setImage1] = useState("");
    let [image2, setImage2] = useState("");

    let [afficheId1, setAfficheId1] = useState("");
    let [afficheId2, setAfficheId2] = useState("");

    let [historique, setHistorique] = useState("");


    let [index, setIndex] = useState(0);


    useEffect(async () => {
        let tmp = await getAfficheAssociations(5);
    }, []);

    useEffect(async () => {
        await getAfficheAssociations(5)
        .then((data) => {
            setImage1(data[0].Image1)
            setImage2(data[0].Image2)
            setAfficheId1(data[0].AfficheId1)
            setAfficheId2(data[0].AfficheId2)
            setImages(data);
        });
    }, []);
    
    function chooseAffiche(afficheId, image) {
        if(index < images.length - 1) {
            let tmp = index;
            tmp = tmp + 1;
            setImage1(images[tmp].Image1);
            setImage2(images[tmp].Image2);
            setAfficheId1(images[tmp].AfficheId1);
            setAfficheId2(images[tmp].AfficheId2)
            setIndex(tmp);
            setHistorique([...historique, ...[image]])
        }
    }

    let Versus= () => {
        return(
          <TouchableOpacity activeOpacity={1} onPress={() => console.log("")} style={{position: 'absolute', elevation: 7, bottom: 0, width: 127.5, borderBottomLeftRadius: 19, borderTopRightRadius: 19, height: 50, backgroundColor: '#FEA52A'}}>
            <Text style={[globalStyles.fontFamily ,{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 21, color: 'white'}]}>Tu préfères</Text>
          </TouchableOpacity >
        )
    }

    var renderItemAssociation = (image) => {
        return (
            <View>
                <Image style={{height: 80, backgroundColor: 'red', width: 65, margin: 3, borderRadius: 5}} source={{uri: image.item}}/>
            </View>
        )
    }
        
    return (
      <View style={styles.container}>
        <TopBarre/>

        <AlertText title={"Tu préfères"}/>
        
        <TouchableOpacity style={{position: 'absolute', top: 380, left: 80}} onPress={() => chooseAffiche(afficheId1, image1)}>
          <Image style={{height: 300, backgroundColor: '#ddd', width: 200, borderRadius: 19, marginBottom: 'auto'}} source={{uri : image1}}/>
        </TouchableOpacity>
        
        <View style={{position: 'absolute', top: 130, right: 40}} >
          <TouchableOpacity onPress={() => chooseAffiche(afficheId2, image2)}>
              <Image style={{height: 300, backgroundColor: '#ddd', width: 200, borderRadius: 19, marginBottom: 'auto'}} source={{uri : image2}}/>
          </TouchableOpacity>  
          
          <Versus/>    
        </View>
        
        <View style={{height: 100, top: '70%'}}>
            <ScrollView horizontal={true}>
                <FlatList data={historique} renderItem={renderItemAssociation} keyExtractor={item => item} numColumns="100"/>
            </ScrollView>
        </View>

      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
})
