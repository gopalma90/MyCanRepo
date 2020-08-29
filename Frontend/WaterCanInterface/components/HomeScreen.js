
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './Register'
import CustomerHome from './CustomerScreens/CustomerHome'
import SupplierHome from './SupplierScreens/SupplierHome'
import GetOrders from './SupplierScreens/GetOrders'
import GetPendingPayments from './SupplierScreens/GetPendingPayments'
import GetPendingOrders from './CustomerScreens/GetPendingOrders'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'


export const dataContext = React.createContext();


const SupplierStack = createStackNavigator();
const CustomerStack = createStackNavigator();



function HomeScreen(props) {

  const [clientdata, setclientdata] = useState()
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    _retrieveData();
  }, []);


  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@clientdata');
      if (value !== null) {
        console.log(" suppliedid = " + value)
        setclientdata(JSON.parse(value));
        setisLoading(false)
      }
      else {
        console.log(" no client data found ");
        setisLoading(false)
      }
    } catch (error) {
      console.log("prob reading from async storage " + error.message)
      Alert.alert("Sorry", 'Unable to get your details. Please restart the app', [{ text: 'OK'}] );
    }
  }

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }

  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>
  }
  else {

    console.log(" data = " + clientdata)

    if (isEmpty(clientdata)) {
      return <Register url={props.url} />
    }
    else if (clientdata.hasOwnProperty('shopname')) {
      return (
        <dataContext.Provider value={clientdata} >
          <NavigationContainer>
            <SupplierStack.Navigator>
              <SupplierStack.Screen name="Supplierhome" component={SupplierHome} options={{ title: 'Home' }} />
              <SupplierStack.Screen name="GetOrders" component={GetOrders} options={{ title: 'PendingOrders' }} />
              <SupplierStack.Screen name="GetPendingPayments" component={GetPendingPayments} options={{ title: 'PendingPayments' }} />
            </SupplierStack.Navigator>
          </NavigationContainer>
        </dataContext.Provider>
      );
    }
    else if (clientdata.hasOwnProperty('supplierid')) {
      return (
        <dataContext.Provider value={clientdata} >
          <NavigationContainer>
            <CustomerStack.Navigator>
              <CustomerStack.Screen name="Customerhome" component={CustomerHome} options={{ title : 'Home'}} />
              <CustomerStack.Screen name="GetPendingOrders" component={GetPendingOrders} options={{ title : 'PendingOrders'}} />
            </CustomerStack.Navigator>
          </NavigationContainer>
        </dataContext.Provider>
      );
    }
    else {
      console.log(" Nothing interesting to do here ")
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default HomeScreen;
