import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, FlatList, Text, View, Image} from 'react-native';
import { useEffect, useState } from 'react';

import Context from '../navigation/userContext';

function UtilisateurTagView(props) {

        const context = useContext(Context)

        //AFFICHAGE DES AFFINITES
        var [liens, setLiens] = useState("");

        var ItemAffiche = ({ image, utilisateurId, pseudo, pourcentage}) => {
            return(
                <TouchableOpacity style={{marginLeft: 10, marginRight: 10, marginBottom: 40, marginTop: 10}} onPress={() => props.navigation.navigate('ContactPage', {_profilId: utilisateurId, _image: image})}>
                    <View style={styles.shadow}>
                        <Image source={{uri: image}} resizeMode="cover" style={styles.affiniteImage}/>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'black', textAlign: 'center', fontSize: 14, fontFamily: 'sans-serif-light',}}>{pourcentage} %</Text>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'black', textAlign: 'center', fontSize: 16, fontFamily: 'sans-serif-light',}}>{pseudo}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        var renderItemAffiche = ({ item }) => {
            return(
                <ItemAffiche style={styles.containerAffiches} pseudo={item.Pseudo} image={item.Image} pourcentage={item.Pourcentage} utilisateurId={item.UtilisateurId}/>
                )
        };

        let mounted = true;

        useEffect(() => {
            if(mounted){
                 getReactions();
            }

            return () => mounted = false;
        }, [props.utilisateurId, context.utilisateurId, context.utilisateurToken]);

        async function getReactions() {
            await fetch(global.apiUrl + 'Tag/GetUtilisateurTagScoreByTag.php?UtilisateurId=' + context.utilisateurId + '&TokenUtilisateur=' + context.utilisateurToken)
            .then((response) => response.json())
            .then((data) => {
                const _liens = Object.entries(data).map(obj => {
                    var rObj = {};

                    rObj['tag'] = obj[1].Tag;
                    rObj['data'] = [{Identifier: obj[1].Identifier, Pourcentage: obj[1].Pourcentage, Image: obj[1].Image, Pseudo: obj[1].Pseudo, UtilisateurId: obj[1].UtilisateurId}];
                    return rObj;
                  })
                  .reduce((item, { tag, data }) => {
                    if (!item[tag]) item[tag] = [];
                    item[tag].push(data[0]);
                    return item;
                  }, {});
                setLiens(_liens)
            });  
        }

        return (
            Object.entries(liens).map(data => {
                return(
                    <View>
                        <TouchableOpacity activeOpacity={1} onPress={() => alert('Lorsqu\'une affiche est surligné de orange, cela signifie que cette personne a eu la même réaction que vous !')}>
                            <Text style={{marginBottom: 'auto', marginTop: 'auto', marginLeft: 10, fontSize: 20, width: 200}}>{data[0]}</Text>
                        </TouchableOpacity>
                        <ScrollView horizontal={true} style={{height: 130, marginTop: 5}} showsHorizontalScrollIndicator={false}>
                            <FlatList data={data[1]} renderItem={renderItemAffiche} keyExtractor={item => item.Identifier} numColumns="10"/>                
                        </ScrollView>
                    </View>
                )
            })
            
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
    emoji: {
        height: 40,
        width: 40, 
        margin: 15,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        maxWidth: 150,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      header: {
        fontSize: 32,
        backgroundColor: "#fff"
      },
      affiniteImage: {
        height: 80,
        width: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'flex-end',
        borderRadius: 100,          
      },
      title: {
        fontSize: 25,
        marginLeft: 30,
        color: 'black',
      },
    containerAffiches: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      TitreContainer: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
    },
    Titre: {
        fontSize: 10,
    },
    affiche: {
        height: 100,
        width: 100,
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
    Affiche: {
        height: 100,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
    shadow: {
        height: 84,
        width: 84,
        padding: 2,
        backgroundColor: 'white',
        borderRadius: 100, 
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,  
    },
})


export default UtilisateurTagView