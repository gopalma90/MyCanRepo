
import React, { Component, useState } from 'react';
import Register from './Register'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const CustomerHome = (props) => {

  const [quantity, setQuantity] = useState()

  handleQuantity = (text) => {
    setQuantity(text);
  }

  placeOrder = () => {
    console.log(' customerid ' + JSON.stringify(props.data.id));
    console.log(' supplier ' + JSON.stringify(props.data.supplierid));

    //console.log (" supplierid = " + {props.data.supplierid} );


    fetch(`${props.url}/placeorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "quantity": quantity,
        "customerid": props.data.id,
        "supplierid": props.data.supplierid,
      }),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        Alert.alert('Success', 'Order placed successfuly.', [{ text: 'OK' }])
      })
      .catch(function (error) {
        console.log('problem placing the order ' + error.message);
        throw error;
      });
  }

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.textcss} >Enter can quantity here.</Text>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Quantity"
        placeholderTextColor="#a9a9a9"
        autoCapitalize="none"
        onChangeText={handleQuantity} />
      <View style={styles.fixToText}>
        <Button
          style={styles.cancelButton}
          title="Cancel"
          onPress={() => BackHandler.exitApp()}
        />
        <Button
          style={styles.submitButton}
          title="Order"
          onPress={() => placeOrder()}
        />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: 'black',
    borderWidth: 1
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  textcss: {
    color: 'black',
    marginLeft: 15,
    alignContent: 'center',
  },
});

export default CustomerHome;
