
import React, { useState, useContext } from 'react'
import {
    StyleSheet,
    ScrollView,
    View,
    Button,
    TextInput

} from 'react-native';

import { urlContext, timeoutContext } from '../../App'
import { dataContext } from '../HomeScreen'

const BusinessSettings = ({ navigation }) => {

    const [canCost, setCanCost] = useState();

    const baseurl = useContext(urlContext)
    const data = useContext(dataContext)
    const defaultTimeout = useContext(timeoutContext)
  
    handleCanCost = (text) => {
        setCanCost(text)
    }

    updateCanCost = () => {
        Alert.alert('Success', 'updated can cost', [{ text: 'OK'}]  );
    }
    return (
        <ScrollView style={styles.container}>

            <View style={styles.fixToText}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Set your can price"
                    placeholderTextColor="#a9a9a9"
                    autoCapitalize="none"
                    onChangeText={handleCanCost} />


                <View style={styles.updatebutton}>
                    <Button
                        title="Update Cost"
                        onPress={() => updateCanCost()}
                    />
                </View>
            </View>


        </ScrollView>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    margin: "3%",
    height: "60%",
    width: "60%",
    borderColor: 'black',
    borderWidth: 1
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: "3%",
  },
  
  updatebutton: {
    marginTop: "3%",
  },
});

export default BusinessSettings;