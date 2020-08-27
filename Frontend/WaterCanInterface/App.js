/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState , useEffect } from 'react';
import HomeScreen from './components/HomeScreen'
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
} from 'react-native/Libraries/NewAppScreen'
import GlobalVars from './GlobalVars'


//const App: () => React$Node = () => {
console.disableYellowBox = true;  // TO Suppress warnings

const App = () => {
  var baseurl = 'http://' + GlobalVars.BASE_URL + ':' + GlobalVars.PORT + GlobalVars.VERSION
  return (
    <>
      <HomeScreen url={baseurl}/>
    </>
  );
};

export default App;
