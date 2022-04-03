import { View, Text, ActivityIndicator } from 'react-native';

export default function Loading(props) {
    if(props.load){
        return (
            <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto'}}>
                <Text style={{marginRight: 20, marginTop: 200, fontSize: 22}}>Chargement</Text>
                <ActivityIndicator style={{marginTop: 200}} size="large" color="#FEA52A" />
            </View>
        )
    }else{
        return (
            <View></View>
        )
    }
}
