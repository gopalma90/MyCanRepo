/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
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

export const urlContext = React.createContext();

//const App: () => React$Node = () => {
console.disableYellowBox = true;  // TO Suppress warnings
//LogBox.ignoreAllLogs()
const App = () => {
  var baseurl = 'http://' + GlobalVars.BASE_URL + ':' + GlobalVars.PORT + GlobalVars.VERSION

  return (
    <>
      <urlContext.Provider value={baseurl} >
        <HomeScreen url={baseurl}/>
      </urlContext.Provider>
    </>
  );
};

export default App;
