import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';


export default function AlertText(props) {

    let [show, setShow] = useState(false);

    if(show) {
        return (
            <View>
                <TouchableOpacity onPress={() => setShow(!show)}>
                    <Text style={styles.title}>{props.title}</Text>
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={show}>

                        <View style={styles.background}>
                            
                        </View>
                        <View style={{margin: 30, zIndex: 100}}>
                            <View style={{marginLeft: 'auto', marginRight: 'auto', zIndex: 100, marginTop: 250, backgroundColor: 'white', borderRadius: 19}}>
                                <View style={{top: -20, left: -20, backgroundColor: 'white', elevation: 5, borderRadius: 100, position: 'absolute'}}>
                                    <Text style={{paddingHorizontal: 15, paddingVertical: 10, fontSize: 17}}>{props.title}</Text>
                                </View>
                                <Text style={{padding: 30, fontSize: 17}}>{props.description}</Text>
                                <TouchableOpacity onPress={() => setShow(!show)} style={{backgroundColor: '#FEA52A', marginLeft: 'auto', marginRight: 45, paddingTop: 13, paddingLeft: 12, height: 45, width: 45, borderRadius: 5, right: -25, top: -25}}>
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
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
    },
    background: {
        position: 'absolute',
        opacity: 0.8,
        backgroundColor: '#eee',
        height: '100%',
        zIndex: 100,
        width: '100%',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
})
