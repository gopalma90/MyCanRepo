
import React, { useState, useEffect } from 'react';
/*
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register'
import CustomerHome from './CustomerScreens/CustomerHome'
import SupplierHome from './SupplierScreens/SupplierHome'
import GetOrders from './SupplierScreens/GetOrders'
import GetPendingPayments from './SupplierScreens/GetPendingPayments'
import CustomerOrder from './SupplierScreens/CustomerOrder'
import GetPendingCans from './SupplierScreens/GetPendingCans'
import SupplierSettings from './SupplierScreens/SupplierSettings'
import BusinessSettings from './SupplierScreens/BusinessSettings'

import GetPendingOrders from './CustomerScreens/GetPendingOrders'

*/
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'


export const dataContext = React.createContext();



function RegistrationScreen({ route, navigation }) {

  // const [clientdata, setclientdata] = useState()
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
      Alert.alert("Sorry", 'Unable to get your details. Please restart the app', [{ text: 'OK' }]);
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
    return (
      <View>
        <View style={styles.buttonstyle}>
          <Button
            title="I'm a Supplier"
            onPress={() => navigation.navigate('SupplierRegistration')}
          />
        </View>
        <View style={styles.buttonstyle}>
          <Button
            title="I'm a consumer"
            onPress={() => navigation.navigate('CustomerRegistration')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttonstyle: {
    justifyContent: 'space-between',
    margin: "5%",
  },
});

export default RegistrationScreen;
