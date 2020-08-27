
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

/*

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>Name: {item.customer.name} quantity: {item.orders.quantity}</Text>
  </TouchableOpacity>
);

*/

const SupplierHome = (props) => {

  const [orders, setorders] = useState()
  const [gotOrders, setGotOrders] = useState(0)

  const [payments, setpayments] = useState()
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

  updatePendingPayments = (item) => {
    setpayments(prevpaymentlist => {
      return prevpaymentlist.filter(singlepayment => singlepayment.customer.id != item.customer.id)
    });
  }

  updateFullPaymentData = (item) => {

    fetch(`${props.url}/supplier/${props.data.id}/updatemoneysettled`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        if (responsejson) {
          updatePendingPayments(item)
        }
      })
      .catch(function (error) {
        console.log('problem setting payment status ' + error.message);
        throw error;
      });
  }

  renderPendingPaymentData = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
        <Text style={styles.title}>Name: {item.customer.name}; Amount: {item.amount}; Contact: {item.customer.contact}</Text>
        <View style={styles.buttonsstyling}>

          <View style={styles.buttonstyles} >
            <Button title="Paid"
              onPress={() => updateFullPaymentData(item)}  // ToDo, set payment history
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
    if (orders.length == 0) {
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
    if (payments.length == 0) {
      return (
        <Text style={styles.textcss}> You dont have any pending payments</Text>
      )
    }
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

        <View style={styles.functionalbuttonstyles}>

          <View style={styles.homebuttonsstyles}>
            <Button
              title="GetOrder"
              onPress={() => getOrders()}
            />
          </View>
          <View style={styles.homebuttonsstyles}>
            <Button
              title="Get pending payments"
              onPress={() => getPendingPayments()}
            />
          </View>
        </View>
        <View style={styles.cancelbuttonsstyles}>
          <Button
            title="Cancel"
            onPress={() => BackHandler.exitApp()}
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
  functionalbuttonstyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "5%",
    marginHorizontal: "2%",
  },
  textcss: {
    color: 'black',
    marginLeft: "2%",
    alignContent: 'center',
  },

  homebuttonstyles: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelbuttonsstyles: {
    margin: "3%",
    marginHorizontal: "2%",
  },
  buttonsstyling: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom : "1%",
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
    marginTop : "5%",
    marginLeft: "5%",
  }
});

export default SupplierHome;
