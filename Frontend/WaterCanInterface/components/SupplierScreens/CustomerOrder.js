
import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';

import { dataContext } from '../HomeScreen'
import { urlContext } from '../../App'

const CustomerOrder = ({ route, navigation }) => {


  const baseurl = useContext(urlContext)
  const data = useContext(dataContext)
  const items = route.params.data;
  const [pendingCans, setPendingCans] = useState()


  handlePendingCans = (text) => {
    setPendingCans(text)
  }


  showAddress = () => {
    var add;
    if (items.addr.doorno)
      add = "door no: " + items.addr.doorno
    if (items.addr.floorno)
      add += "   Floor no: " + items.addr.floorno
    if (items.addr.street)
      add += "   Street name: " + items.addr.street
    if (items.addr.aptname)
      add += "   Apartment name: " + items.addr.aptname
    if (items.addr.area)
      add += "   Area: " + items.addr.area
    if (items.addr.city)
      add += "   City: " + items.addr.city

    Alert.alert('Customer Address', JSON.stringify(add), [{ text: 'OK' }]);
  }


  updateDeliveredStatus = () => {
    fetch(`${baseurl}/supplier/${data.id}/candelivered`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          // updateparentorder(items)
          Alert.alert('Success', "Order status updated successfully", [{ text: 'Ok' }])
          navigation.navigate('GetOrders', { order: items });
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });
  }

  updateOrderDismissStatus = () => {
    fetch(`${baseurl}/supplier/${data.id}/dismissorder`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          // updateparentorder(items)
          Alert.alert('Success', "Order cancellation successful", [{ text: 'Ok' }])
          navigation.navigate('GetOrders', { order: items });
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });
  }


  updatePendingcans = (text) => {

    fetch(`${baseurl}/supplier/${data.id}/updatecustomerpendingcans`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "customer": {
          "id": items.customer.id,
        },
        "pendingcans": {
          "quantity": pendingCans,
        },
      }),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          Alert.alert('Success', "Pending can status updated successfully", [{ text: 'Ok' }])
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });

  }

  updatePaidStatus = () => {

    fetch(`${baseurl}/supplier/${data.id}/paidforcan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          //  updateparentorder(items)
          Alert.alert('Success', "Order status updated successfully", [{ text: 'Ok' }])
          navigation.navigate('GetOrders', { order: items });
        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        throw error;
      });
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentstyle}>
        <Text style={styles.title}>Name: {items.customer.name}</Text>
        <Text style={styles.title}>Quantity: {items.orders.quantity} </Text>
        <Text style={styles.title}>Contact: {items.customer.contact}</Text>
      </View>
      <View style={styles.deliveredbuttonstyles}>
        <Button title="Delivered"
          onPress={() => updateDeliveredStatus()}
        />
      </View>

      <View style={styles.dismissbuttonstyles} >
        <Button title="Paid"
          onPress={() => updatePaidStatus()}
        />
      </View>


      <View style={styles.dismissbuttonstyles} >
        <Button title="Get Customer address"
          onPress={() => showAddress()}
        />
      </View>

      <View style={styles.dismissbuttonstyles} >

        <Button title="Reject order"
          onPress={() => updateOrderDismissStatus()}
        />
      </View>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Pending cans with customer"
        placeholderTextColor="#a9a9a9"
        autoCapitalize="none"
        onChangeText={handlePendingCans}
      />


      <View style={styles.dismissbuttonstyles} >
        <Button title="Update Pending cans"
          onPress={() => updatePendingcans()}
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
  contentstyle: {
    borderColor: 'black',
    borderWidth: 1
  },
  input: {
    margin: "5%",
    height: "10%",
    borderColor: 'black',
    borderWidth: 1
  },
  textcss: {
    color: 'black',
    marginLeft: "2%",
    alignContent: 'center',
  },
  title: {
    fontSize: 15,
    alignContent: 'center',
  },
  deliveredbuttonstyles: {
    margin: "2%",
  },
  contentstyle: {
    margin: "5%"
  },
  dismissbuttonstyles: {
    margin: "2%",
  },


});

export default CustomerOrder;