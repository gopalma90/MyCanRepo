
import React, { Component, useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Button,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { dataContext } from '../HomeScreen'
import { urlContext } from '../../App'
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';


const GetOrders = ({ navigation }) => {

  const baseurl = useContext(urlContext)
  const data = useContext(dataContext)

  const [orders, setorders] = useState()
  const [gotOrders, setGotOrders] = useState(0)
  const [isLoading, setisLoading] = useState(true)


  useEffect(() => {
    console.log(' getorders supplierid ' + data.id);

    fetch(`${baseurl}/supplier/${data.id}/getpendingorders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responsejson) => {
        setorders(responsejson)
        console.log(" orders = " + JSON.stringify(responsejson))

        setGotOrders(1);
        setisLoading(false);

      })
      .catch(function (error) {
        console.log('problem reading the order ' + error.message);
        throw error;
      });
  }, []);


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


  updateDeliveredStatus = (item) => {
    fetch(`${baseurl}/supplier/${data.id}/candelivered`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          updateOrders(item)
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });
  }

  updateOrderDismissStatus = (item) => {
    fetch(`${baseurl}/supplier/${data.id}/dismissorder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          updateOrders(item)
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });
  }

  updateOrders = (item) => {
    setorders(prevOrders => {
      return prevOrders.filter(singleorder => singleorder.orders.id != item.orders.id)
    });
  }

  updatePaidStatus = (item) => {
    fetch(`${baseurl}/supplier/${data.id}/paidforcan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          updateOrders(item)
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });
  }


  renderOrdersData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
        <View style={styles.textstyles}>
          <View style={styles.contentstyle}>
            <Text style={styles.title}>Name: {item.customer.name}</Text>
            <Text style={styles.title}>Quantity: {item.orders.quantity} </Text>
            <Text style={styles.title}>Contact: {item.customer.contact}</Text>
          </View>
          <View style={styles.deliveredbuttonstyles}>
            <Button title="Delivered"
              onPress={() => updateDeliveredStatus(item)}
            />
          </View>
        </View>
        <View style={styles.buttonsstyling}>
          <View style={styles.paidbuttonstyles} >

            <Button title="Cancel"
              onPress={() => updateOrderDismissStatus(item)}
            />
          </View>
          <View style={styles.dismissbuttonstyles} >
            <Button title="Paid"
              onPress={() => updatePaidStatus(item)}
            />
          </View>
        </View>

      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>
  }
  else {
    if (gotOrders) {
      if (orders.length == 0) {
        return (
          <Text> You dont have any pending orders</Text>
        );
      }
      return (
        //<View style={styles.container}>{renderData()}</View>
        <SafeAreaView style={styles.container}>
          <Text style={styles.textcss}> Your Pending orders are </Text>
          <FlatList
            style={styles.listcolor}
            data={orders}
            renderItem={renderOrdersData}
          />
        </SafeAreaView>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  textcss: {
    color: 'black',
    marginLeft: "2%",
    alignContent: 'center',
  },

  buttonsstyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: "1%",
  },
  buttonstyles: {
    height: "75%",
    width: "90%",
    flexDirection: 'row',
    marginLeft: "5%",
  },
  item: {
    borderColor: 'black',
    marginHorizontal: "1%",
    marginVertical: "2%",
    borderWidth: 1,
  },
  listcolor: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 15,
    alignContent: 'center',
  },
  textstyles: {
    flexDirection: 'row',
  },
  deliveredbuttonstyles: {
    marginTop: "5%",
    marginLeft: "5%",
  }
});


export default GetOrders;
