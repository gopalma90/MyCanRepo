
import React, { Component, useState } from 'react';
import Register from './Register'
import {
  StyleSheet,
  View,
  FlatList,
  ListItem,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
  BackHandler,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>Name: {item.customer.name} quantity: {item.orders.quantity}</Text>
  </TouchableOpacity>
);



const SupplierHome = (props) => {

  const [orders, setorders] = useState()
  const [gotOrders, setGotOrders] = useState(0)

  getOrders = () => {
    console.log(' getorders supplierid ' + props.data.id);

    fetch(`http://192.168.1.5:8080/api/v1/supplier/${props.data.id}/getpendingorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responsejson) => {
        setorders(responsejson)
        setGotOrders(1);
      })
      .catch(function (error) {
        console.log('problem reading the order ' + error.message);
        throw error;
      });
  }

  /*
    renderData = () => {
  
      for ( var order in orders ) {
        return orders.map(order => {
          return <Text>Name: {order.customer.name} quantity: {order.orders.quantity}</Text>;
        });
      }
      
    };
  */

  showAddress = ( item ) => {
    console.log ( "door no = " + item.addr.doorno)
    
    Alert.alert ( 'Customer Address', "doorno:{item.addr.doorno}, {item.addr.floorno}floor, {item.addr.street}, {item.addr.aptname}, {item.addr.area}, {item.addr.city} ", [{text: 'OK'}]);
  }
  renderData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
        <Text style={styles.title}>Name: {item.customer.name} quantity: {item.orders.quantity}</Text>
      </TouchableOpacity>
    );
  };


  if (!gotOrders) {
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.textcss} >Click to get orders</Text>
        <Button
          style={styles.cancelButton}
          title="Cancel"
          onPress={() => BackHandler.exitApp()}
        />
        <Button
          style={styles.submitButton}
          title="GetOrder"
          onPress={() => getOrders()}
        />
      </ScrollView>
    )
  }
  else {
    return (
      //<View style={styles.container}>{renderData()}</View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={orders}
          renderItem={renderData}
        />
      </SafeAreaView>
    )
  }

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
  textcss: {
    color: 'black'
  },
  submitButton: {
    backgroundColor: 'green',
    marginRight: 20,
    width: 10,
    height: 40,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginLeft: 20,
    width: 10,
    height: 40
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
  },
});

export default SupplierHome;
