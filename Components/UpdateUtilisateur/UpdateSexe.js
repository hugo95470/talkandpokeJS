import React, { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Context from '../../navigation/userContext';
import { updateUtilisateurSexe } from '../../service/UtilisateurService.js';

export default function UpdateSexe(props) {

    const context = useContext(Context)

    let [sexe, setSexe] = useState(props.sexe);

    async function changeSexe(){
        await updateUtilisateurSexe(context.utilisateurToken, sexe)
        .then(alert('Sexe changé !'))
    }

    var HommeSexe = () => {
        if(sexe){
            return(
                <View style={{backgroundColor: 'rgb(254, 165, 42)', marginTop: 'auto', marginBottom: 'auto', height: 18, width: 18, borderRadius: 100}}>
                    <Text style={{color: 'white', marginLeft: 'auto', marginRight: 'auto'}}>✓</Text>
                </View>
            );
        }else{
            return(
                <View style={{borderWidth: 1, marginTop: 'auto', marginBottom: 'auto', height: 18, width: 18, borderRadius: 100}}></View>
            )
        }
        
    }

    var FemmeSexe = () => {
        if(sexe){
            return(
                <View style={{borderWidth: 1, marginTop: 'auto', marginBottom: 'auto', height: 18, width: 18, borderRadius: 100}}></View>
            )
        }else{
            return(
                <View style={{backgroundColor: 'rgb(254, 165, 42)', marginTop: 'auto', marginBottom: 'auto', height: 18, width: 18, borderRadius: 100}}>
                    <Text style={{color: 'white', marginLeft: 'auto', marginRight: 'auto'}}>✓</Text>
                </View>
            );
        }
        
    }

    return (
        <View style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Text style={styles.title}>Sexe</Text>
            <View style={{height: 140, width: 320, backgroundColor: 'white', borderRadius: 19}}>

                <View style={{flexDirection: 'row', marginLeft: 30, marginRight: 'auto', marginTop: 10}}>
                    <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginTop: 20}}>
                        <TouchableOpacity onPress={() => setSexe(1)} style={{marginTop: 'auto', marginBottom: 'auto', height: 20, width: 20, borderRadius: 100}}>
                            <HommeSexe/>
                        </TouchableOpacity>
                        <Text style={{margin: 5}}>Homme</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
                        <TouchableOpacity onPress={() => setSexe(0)} style={{marginTop: 'auto', marginBottom: 'auto', height: 20, width: 20, borderRadius: 100}}>
                            <FemmeSexe/>
                        </TouchableOpacity>
                        <Text style={{margin: 5}}>Femme</Text>
                    </View>
                </View>


                

                <TouchableOpacity onPress={async () => changeSexe()} style={{backgroundColor: 'rgb(254, 165, 42)', width: 120, height: 50, position: 'absolute', right: 10, bottom: 10, borderRadius: 100, margin: 5}}>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto', marginTop: 'auto'}}>Sauvegarder</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 10,
        color: 'black',
        marginBottom: 5
    },
})