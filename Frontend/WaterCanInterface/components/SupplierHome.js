
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
  const [payments, setpayments] = useState()
  const [gotOrders, setGotOrders] = useState(0)
  const [gotPendingAmount, setGotPendingAmount] = useState(0)



  getOrders = () => {
    console.log(' getorders supplierid ' + props.data.id);

    fetch(`${props.url}/supplier/${props.data.id}/getpendingorders`, {
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

  updateOrders = (item) => {
    setorders(prevOrders => {
      return prevOrders.filter(singleorder => singleorder.orders.id != item.orders.id)
    });
  }

  updateDeliveredStatus = (item) => {
    fetch(`${props.url}/supplier/${props.data.id}/candelivered`, {
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

  updatePaidStatus = (item) => {
    fetch(`${props.url}/supplier/${props.data.id}/paidforcan`, {
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
    fetch(`${props.url}/supplier/${props.data.id}/dismissorder`, {
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

  renderOrdersData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
        <Text style={styles.title}>Name: {item.customer.name}; Quantity: {item.orders.quantity}; Contact: {item.customer.contact}</Text>
        <View style={styles.buttonsstyling}> 
        <View style={styles.buttonstyles} >
          <Button title="Delivered"
            onPress={() => updateDeliveredStatus(item)}
          />
        </View>
        <View style={styles.buttonstyles} >
          <Button title="Paid"
            onPress={() => updatePaidStatus(item)}
          />
        </View>
        <View style={styles.buttonstyles} >
          <Button title="Dismiss"
            onPress={() => updateOrderDismissStatus(item)}
          />
        </View>
        </View>

      </TouchableOpacity>
    );
  };

  renderPendingPaymentData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
        <Text style={styles.title}>Name: {item.customer.name}; Amount: {item.amount}; Contact: {item.customer.contact}</Text>
        <View style={styles.buttonsstyling}> 
        
        <View style={styles.buttonstyles} >
          <Button title="Paid"
            onPress={() =>  Alert.alert('text', "text message", [{ text: 'OK' }]) }  // ToDo, set payment history
          />
        </View>
        
        </View>

      </TouchableOpacity>
    );
  };

  getPendingPayments = () => {

    fetch(`${props.url}/supplier/${props.data.id}/getpendingpayments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responsejson) => {
        setpayments(responsejson)
        setGotPendingAmount(1);
      })
      .catch(function (error) {
        console.log('problem reading the payments ' + error.message);
        throw error;
      });
  }

  if (gotOrders) {
    if ( orders.length == 0){
      return (
        <Text style={styles.textcss}> You dont have any pending orders </Text>
      )
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
    )
  }
  else if (gotPendingAmount) {
    return (
      //<View style={styles.container}>{renderData()}</View>
      <SafeAreaView style={styles.container}>
        <Text style={styles.textcss}> Your Payment balances are </Text>
        <FlatList
          style={styles.listcolor}
          data={payments}
          renderItem={renderPendingPaymentData}
        />
      </SafeAreaView>
    )
  }
  else {
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
          <Button
            title="Get pending payments"
            onPress={() => getPendingPayments()}
          />
        </View>
      </ScrollView>
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
    marginLeft: 5,
    height: 30,
    width: 90,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonsstyling: {
    flexDirection: 'row',
  },
  item: {
    borderColor: 'black',
    marginHorizontal: 5,
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
