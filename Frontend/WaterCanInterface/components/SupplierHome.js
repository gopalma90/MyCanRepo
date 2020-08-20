
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

  showAddress = (item) => {

    var add;
    if (item.addr.doorno)
      add = "door no: " + item.addr.doorno
    if (item.addr.floorno)
      add += "   Floor no: " + item.addr.floorno
    if (item.addr.street)
      add += "   Street name: " + item.addr.street
    if (item.addr.aptname)
      add += "   Apartment name: " + item.addr.aptname
    if (item.addr.area)
      add += "   Area: " + item.addr.area
    if (item.addr.city)
      add += "   City: " + item.addr.city

    Alert.alert('Customer Address', JSON.stringify(add), [{ text: 'OK' }]);
  }


  renderData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
        <Text style={styles.title}>Name: {item.customer.name} quantity: {item.orders.quantity}</Text>
        <View style={styles.buttonstyles} >
          <Button title="Delivered"
            onPress={() => Alert.alert('Delivered', 'Can delivered', [{ 'text': 'OK' }])}
          />
        </View>
        <View style={styles.buttonstyles} >
          <Button title="Paid"
            onPress={() => Alert.alert('Paid', 'Paid money', [{ 'text': 'OK' }])}
          />
        </View>

      </TouchableOpacity>
    );
  };


  if (!gotOrders) {
    return (
      <ScrollView style={styles.container}>

        <Text style={styles.textcss} >Click to get orders</Text>
        <View style={styles.fixToText}>
          <Button
            title="Cancel"
            onPress={() => BackHandler.exitApp()}
          />
          <Button
            title="GetOrder"
            onPress={() => getOrders()}
          />
        </View>
      </ScrollView>
    )
  }
  else {
    return (
      //<View style={styles.container}>{renderData()}</View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textcss}> Your Pending orders are </Text>
        <FlatList
          style={styles.listcolor}
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  textcss: {
    color: 'black',
    marginLeft: 15,
    alignContent: 'center',
    fontSize: 30,
  },
  buttonstyles: {
    marginLeft: 10,
    height: 30,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item: {
    padding: 5,
    flexDirection: 'row',
    borderColor: 'black',
    marginHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
  },
  listcolor: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 15,
    alignContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
});

export default SupplierHome;
