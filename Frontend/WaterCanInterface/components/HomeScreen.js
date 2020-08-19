
import React, { Component, useState } from 'react';
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientdata: {},
      isLoading: true,
    }
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@clientdata');
      if (value !== null) {
        console.log(" suppliedid = " + value)
        this.setState({
          clientdata: JSON.parse(value),
          isLoading: false,
        });
      }
      else {
        console.log(" no client data found ");
        this.setState({
          isLoading: false,
        })
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

  isNotEmpty = (obj) => {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop))
        return true;
    }
    return false;
  }
  render() {

    if (this.state.isLoading) {
      return <Text> Loading page </Text> // TODO: show loading page.
    }
    else {

      console.log(" data = " + this.state.clientdata )

      if (this.state.clientdata.hasOwnProperty('shopname')) {
        return <SupplierHome data={this.state.clientdata} />;

      }
      else if (this.state.clientdata.hasOwnProperty('supplierid')) {
        return <CustomerHome data={this.state.clientdata} />;
      }

      else {
        return <Register />
      }
    }
  };

};

export default HomeScreen;
