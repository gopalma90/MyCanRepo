
import React, { useContext } from 'react';
import { urlContext } from '../../App'

import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  BackHandler,
} from 'react-native';

//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import { dataContext } from '../HomeScreen'


const SupplierHome = ({ navigation }) => {

  const baseurl = useContext(urlContext)
  const data = useContext(dataContext)

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.textcss} >Welcome </Text>

      <View style={styles.functionalbuttonstyles}>

        <View style={styles.homebuttonsstyles}>
          <Button
            title="Get Pending Orders"
            onPress={() => navigation.navigate('GetOrders')}
          />
        </View>
        <View style={styles.homebuttonsstyles}>
          <Button
            title="Get Pending payments"
            onPress={() => navigation.navigate('GetPendingPayments')}
          />
        </View>
      </View>
      <View style={styles.homebuttonsstyles}>
          <Button
            title="Get Pending Cans"
            onPress={() => navigation.navigate('GetPendingCans')}
          />
        </View>
      <View style={styles.cancelbuttonsstyles}>
        <Button
          title="Exit"
          onPress={() => BackHandler.exitApp()}
        />
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  functionalbuttonstyles: {
    marginTop: "5%",
    marginHorizontal: "2%",
  },
  homebuttonsstyles: {
    margin: "3%",
    marginHorizontal: "2%",
  },
  textcss: {
    color: 'black',
    marginLeft: "2%",
    alignContent: 'center',
  },
  cancelbuttonsstyles: {
    margin: "3%",
    marginHorizontal: "2%",
  },
});

export default SupplierHome;
