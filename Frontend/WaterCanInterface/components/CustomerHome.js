
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
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


/*
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>Name: {item.customer.name} quantity: {item.orders.quantity}</Text>
  </TouchableOpacity>
);
*/

const CustomerHome = (props) => {

  const [quantity, setQuantity] = useState()
  const [pendingorders, setPendingOrders] = useState()
  const [gotpendingorders, setGotPendingOrders] = useState(0)

  handleQuantity = (text) => {
    setQuantity(text);
  }

  placeOrder = () => {

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
        if ( responsejson) {
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

  updateOrderDismissStatus = ( item ) => {

    fetch(`${props.url}/cancelorder/${item.id}/bycustomer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          setPendingOrders(prevOrders => {
            return prevOrders.filter(singleorder => singleorder.id != item.id)
          });
        }
      })
      .catch(function (error) {
        console.log('problem cancelling order ' + error.message);
        throw error;
      });
  }


  getCustomerOrders = () => {

    fetch(`${props.url}/getcustomerpendingorders/${props.data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((responsejson) => {
        setPendingOrders(responsejson)
        setGotPendingOrders(1)
      })
      .catch(function (error) {
        console.log('problem retrieving the order ' + error.message);
        throw error;
      });
  }

  renderCustomerOrdersData = ({ item }) => {
    var date = item.orderdate;

    date = date.substring( 0, date.length - 10 );
    date = date.split("T")[0];
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.contentstyle}>
          <View style={styles.itemstyles} >
            <Text style={styles.title}> Quantity: {item.quantity}</Text>
            <Text style={styles.title}> DateOrdered: {date}</Text>
          </View>
          <View style={styles.buttonstyles}>
            <Button title="Cancel Order"
              onPress={() => updateOrderDismissStatus(item)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  if (gotpendingorders) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.textcss}> Your Pending orders are </Text>
        <FlatList
          style={styles.listcolor}
          data={pendingorders}
          renderItem={renderCustomerOrdersData}
        />
      </SafeAreaView>

    );
  }
  else {
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
            onPress={() => getCustomerOrders()}
          />
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    margin: 10,
    height: 35,
    width: 250,
    borderColor: 'black',
    borderWidth: 1
  },
  item: {
    borderColor: 'black',
    marginHorizontal: 5,
    marginVertical: 8,
    borderWidth: 1,
    height: 80,
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
    fontSize: 20,
  },
  orderbuttonstyles: {
    marginTop: 10,
  },
  getorderbuttonstyles: {
    margin: 20,
  },
  listcolor: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    alignContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    
  },
  itemstyles: {
    marginLeft: 5,
    height: 70,
    width: 500,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonstyles: {
    marginLeft: 300,
    marginTop:-60,
    width: 90,
    height: 90,
  },
  contentstyle : {
    height: 90,
    flexDirection: 'column',
  }
  
});

export default CustomerHome;
