
import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { urlContext } from '../../App'
import { dataContext } from '../HomeScreen'
import GetPendingOrders from './GetPendingOrders'


const CustomerHome = ({ navigation }) => {

  const baseurl = useContext(urlContext)
  const data = useContext(dataContext)

  const [quantity, setQuantity] = useState()

  handleQuantity = (text) => {
    setQuantity(text);
  }

  placeOrder = () => {

    fetch(`${baseurl}/placeorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "quantity": quantity,
        "customerid": data.id,
        "supplierid": data.supplierid,
      }),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          Alert.alert('Success', 'Order placed successfuly.', [{ text: 'OK' }])
        }
        else {
          Alert.alert('Failure', 'Unable to place order. Try later', [{ text: 'OK' }])
        }
      })
      .catch(function (error) {
        console.log('problem placing the order ' + error.message);
        throw error;
      });
  }

  return (

    <ScrollView style={styles.container}>
      <Text style={styles.textcss} >Enter can quantity here to place order</Text>
      <View style={styles.fixToText}>

        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Quantity"
          placeholderTextColor="#a9a9a9"
          autoCapitalize="none"
          onChangeText={handleQuantity} />
        <View style={styles.orderbuttonstyles}>
          <Button
            title="Place Order"
            onPress={() => placeOrder()}
          />
        </View>
      </View>
      <View style={styles.getorderbuttonstyles}>
        <Button
          title="Get my pending orders"
          //onPress={() => getCustomerOrders()}
          onPress={() => navigation.navigate('GetPendingOrders')}

        />
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
  textcss: {
    color: 'black',
    marginLeft: "3%",
    alignContent: 'center',
    fontSize: 20,
  },
  orderbuttonstyles: {
    marginTop: "3%",
  },
  getorderbuttonstyles: {
    margin: "3%",
  },
});

export default CustomerHome;
