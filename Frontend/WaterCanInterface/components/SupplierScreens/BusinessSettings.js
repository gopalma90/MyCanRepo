
import React, { useState, useContext } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TextInput

} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import { urlContext, timeoutContext } from '../../App'
import { dataContext } from '../HomeScreen'

const BusinessSettings = ({ navigation }) => {

  const [canCost, setCanCost] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);


  const baseurl = useContext(urlContext)
  const data = useContext(dataContext)
  const defaultTimeout = useContext(timeoutContext)


  handleCanCost = (text) => {
    setCanCost(text)
  }

  handleFromDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setFromDate(currentDate);
  };


  handleToDate =(event, selectedDate) => {
    const currentDate = selectedDate;
    setToDate(currentDate);
  };

  showFromDate = () => {
    setShowFrom( true );

  }

  showToDate = () => {
    setShowTo( true );

  }
  updateCanCost = () => {
    Alert.alert('Success', 'updated can cost', [{ text: 'OK' }]);
  }
  return (
    <ScrollView style={styles.container}>

      <View style={styles.fixToText}>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Set your can price"
          placeholderTextColor="#a9a9a9"
          autoCapitalize="none"
          onChangeText={handleCanCost} />


        <View style={styles.updatebutton}>
          <Button
            title="Update Cost"
            onPress={() => updateCanCost()}
          />
        </View>
      </View>

        <Text> Set your vacation time here</Text>

        <View style={styles.datestyles} >

        <TextInput  style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="From"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={showFromDate} 
              c/>


        <TextInput  style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="To"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={showToDate} />

        {showFrom && (<DateTimePicker
          testID="dateTimePicker"
          value={fromDate}
          display="default"
           onChange={handleFromDate}
        />)
        }



        { showTo && (<DateTimePicker
         testID="dateTimePicker"
         value={toDate}
         display="default"
          onChange={handleToDate}
        />)
        }
      </View>
    </ScrollView>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    margin: "3%",
    height: "60%",
    width: "60%",
    borderColor: 'black',
    borderWidth: 1
  },

  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: "3%",
  },

  updatebutton: {
    marginTop: "3%",
  },
  datestyles: {
    flexDirection : 'row'
  }
});

export default BusinessSettings;