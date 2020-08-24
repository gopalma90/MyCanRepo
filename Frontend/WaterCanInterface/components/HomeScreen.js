
import React, { Component, useState, useEffect } from 'react';
import Register from './Register'
import CustomerHome from './CustomerHome'
import SupplierHome from './SupplierHome'

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

//class HomeScreen extends Component {
function HomeScreen (props){

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
    }
  }

  /*
    componentDidMount() {
      this.setState({ clientdata : this._retrieveData() } );
    }
  */

  function isEmpty (obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return false;
    }
    return true;
  }
  
    if (isLoading) {
      return <View style={styles.container}><ActivityIndicator size="large"/></View>
    }
    else {

      console.log(" data = " + clientdata)

      if ( isEmpty(clientdata)) {
        return <Register url={props.url}/>
      }
      else if (clientdata.hasOwnProperty('shopname')) {
        return <SupplierHome data={clientdata} url={props.url} />;
      }
      else if (clientdata.hasOwnProperty('supplierid')) {
        return <CustomerHome data={clientdata} url={props.url} />;
      }
      else {
        console.log( " nothing interesting to do here ")
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
