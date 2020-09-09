
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
import axios from 'axios'

import { dataContext } from '../HomeScreen'
import { urlContext, timeoutContext } from '../../App'

const CustomerOrder = ({ route, navigation }) => {


  const baseurl = useContext(urlContext)
  const defaultTimeout = useContext( timeoutContext )
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
    axios({
      url: `${baseurl}/supplier/${data.id}/candelivered`,
      method: 'POST',
      timeout : defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(items),
    })
      .then((responsejson) => {
        if (responsejson) {
          // updateparentorder(items)
          if ( responsejson.data ) {
            Alert.alert('Success', "Order status updated successfully", [{ text: 'Ok' }])
          }
          navigation.navigate('GetOrders', { order: items });
        }
      })
      .catch(error => {
        console.log('problem setting delivery status ' + error.message);
        Alert.alert('Failure', "Order status updated failed", [{ text: 'Ok' }])
      });
  }

  updateOrderDismissStatus = () => {
    axios( {
      url: `${baseurl}/supplier/${data.id}/dismissorder`,
      timeout : defaultTimeout,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(items),
    })
      .then((responsejson) => {
        if (responsejson) {
          // updateparentorder(items)
          console.log ( "updateOrderDismissStatus  " + responsejson.data)
          if ( responsejson.data ) {

          Alert.alert('Success', "Order cancellation successful", [{ text: 'Ok' }])
          }
          navigation.navigate('GetOrders', { order: items });
        }
      })
      .catch(error => {
        console.log('problem setting delivery status ' + error.message);
        Alert.alert('Failure', "Unable to reject order", [{ text: 'Ok' }])
      });
  }


  updatePendingcans = (text) => {

    axios( {
      url: `${baseurl}/supplier/${data.id}/updatecustomerpendingcans`,
      method: 'PUT',
      timeout : defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        "customer": {
          "id": items.customer.id,
        },
        "pendingcans": {
          "quantity": pendingCans,
        },
      }),
    })
      .then((responsejson) => {
        if (responsejson.data) {
          Alert.alert('Success', "Pending can status updated successfully", [{ text: 'Ok' }])
        }
        else {
          Alert.alert('failure', "unable to update pending cans", [{ text: 'Ok' }])

        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        Alert.alert('Failure', "Pending can status not updated", [{ text: 'Ok' }])
      });

  }

  updatePaidStatus = () => {

    axios( {
      url: `${baseurl}/supplier/${data.id}/paidforcan`,
      method: 'POST',
      timeout : defaultTimeout,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(items),
    })
      .then((responsejson) => {
        if (responsejson.data) {
          //  updateparentorder(items)
          Alert.alert('Success', "Order status updated successfully", [{ text: 'Ok' }])
          navigation.navigate('GetOrders', { order: items });
        }
        else {
          Alert.alert('Failure', "Order status update failed", [{ text: 'Ok' }])

        }
      })
      .catch(function (error) {
        console.log('problem setting delivery status ' + error.message);
        Alert.alert('Failure', "Order status update failed", [{ text: 'Ok' }])
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