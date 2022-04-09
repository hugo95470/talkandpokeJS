import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import globalStyles from '../Styles/globalStyles';


export default function AlertText(props) {

    let [show, setShow] = useState(false);

    if(show) {
        return (
            <View>
                <TouchableOpacity onPress={() => setShow(!show)}>
                    <Text style={globalStyles.title}>{props.title}</Text>
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={show}>

                        <TouchableOpacity style={styles.background} onPress={() => setShow(!show)}></TouchableOpacity>

                        <View style={{margin: 30}}>
                            <View style={[globalStyles.center, globalStyles.borderRadius, globalStyles.white, {marginTop: 250, paddingBottom: 60}]}>
                                <View style={{top: -20, left: -20, backgroundColor: 'white', elevation: 5, borderRadius: 100, position: 'absolute'}}>
                                    <Text style={[globalStyles.mediumText, {margin: 10, marginVertical: 5, fontWeight: '600'}]}>{props.title}</Text>
                                </View>

                                <Text style={[globalStyles.mediumText, {padding: 30}]}>{props.description}</Text>

                                <TouchableOpacity onPress={() => setShow(!show)} style={globalStyles.button}>
                                    <Text>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    
                </Modal>
               
            </View>
        )
    }else{
        return (
            <TouchableOpacity onPress={() => setShow(!show)}>
                <Text style={globalStyles.title}>{props.title}</Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        opacity: 0.8,
        backgroundColor: '#eee',
        height: '100%',
        width: '100%',
    },
})
