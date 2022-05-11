
import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import globalStyles from '../../Styles/globalStyles';

import Context from '../../navigation/userContext';

export default function View5(props) {   

    const context = useContext(Context)

    return(
        <View style={styles.center}>
          <View style={styles.container}>
            <View style={{height: 300}}>
              <Text style={[styles.center, {fontSize: 30}]}>Lance toi !</Text>
            </View>

            <TouchableOpacity onPress={() => {context.setIntro(0)}} style={{position: 'absolute', left: '50%', top: '85%', height: 50, borderRadius: 100, width: 150, backgroundColor: 'white'}}>
              <Text style={globalStyles.center}>Commencez !</Text>
            </TouchableOpacity>

          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  center: {
    marginBottom: 'auto',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});