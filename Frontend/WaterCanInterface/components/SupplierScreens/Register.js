import React, { useState, useContext } from 'react'
import {
    View, ScrollView, Text, Button, BackHandler, TextInput, StyleSheet,
    Alert,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {urlContext, timeoutContext} from '../../App'
import axios from 'axios'

const Register = (props) => {
    const baseurl =    useContext(urlContext);
    const defaultTimeout = useContext(timeoutContext) ;

    const [contactno, setContactno] = useState()
    const [name, setName] = useState()
    const [doorno, setDoorno] = useState()
    const [street, setStreet] = useState()
    const [floorno, setFloorno] = useState()
    const [apartmentname, setApartmentName] = useState()
    const [area, setArea] = useState()
    const [city, setCity] = useState()
    const [states, setStates] = useState()
    const [shopname, setShopname] = useState()
    const [supplierid, setSupplierId] = useState()


    const [id, setId] = useState()

    handleName = (text) => {
        setName(text)
    }
    handleContact = (text) => {
        setContactno(text)
    }
    handleDoorNo = (text) => {
        setDoorno(text)
    }
    handleStreet = (text) => {
        setStreet(text)
    }
    handleFloorNo = (text) => {
        setFloorno(text)
    }
    handleApartmentName = (text) => {
        setApartmentName(text)
    }
    handleArea = (text) => {
        setArea(text)
    }
    handleCity = (text) => {
        setCity(text)
    }
    handleState = (text) => {
        setStates(text)
    }
    handleShopName = (text) => {
        setShopname(text)
    }
    handleSupplierId = (text) => {
        setSupplierId(text)
    }

    _setData = async (data) => {
        try {
            await AsyncStorage.setItem('@clientdata', data);
        }
        catch (error) {
            console.log('prob storing the id: ' + error.message);
        }
    }
    registerData = () => {
        
        if (shopname && supplierid) {
            Alert.alert('Invalid data', 'Please provide either Shop name  if you are supplier and SupplierId if you are consumer. Not both ', [{ text: 'OK' }]);
            return;
        }
        if ( isNaN(contactno) ){
            Alert.alert('Invalid data', 'Contact number should not contain letters', [{ text: 'OK' }]); 
            return;
        }
        if ( doorno === '') {
            Alert.alert('Invalid data', 'Door number cannotbe empty', [{ text: 'OK' }]); 

        }
        if ( street === '') {
            Alert.alert('Invalid data', 'Street name cannot be empty', [{ text: 'OK' }]); 
        }

        if ( area === '') {
            Alert.alert('Invalid data', 'Area name cannot be empty', [{ text: 'OK' }]); 
        }

        if ( city === '') {
            Alert.alert('Invalid data', 'City name cannot be empty', [{ text: 'OK' }]); 
        }

        if ( name === '') {
            Alert.alert('Invalid data', 'Please provide your name', [{ text: 'OK' }]); 
        }
        if (shopname) {
            axios( { 
                url: `${baseurl}/supplier`, 
                method: 'POST',
                timeout: defaultTimeout,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    "name": name,
                    "contact": contactno,
                    "shopname": shopname,
                    "address": {
                        "doorno": doorno,
                        "floor":  floorno ,
                        "street": street,
                        "apartmentname": apartmentname,
                        "area": area,
                        "city": city,
                        "state": states,
                    }
                }),
            })
                .then((responsejson) => {
                    _setData(JSON.stringify(responsejson.data));
                    var iddata = " SupplierId " +  responsejson.data.id 
                    Alert.alert('Successfully registered', JSON.stringify(iddata) , [{ text: 'OK and Restart' }])
                })
                .catch( error=> {
                    console.log('There has been a problem in registration. ' + error.message);
                    Alert.alert('Sorry', 'Registration failed. Please check network or try again later', [{ text: 'OK'}]  );
                });
        }
        else if (supplierid) {
            axios({ 
                url: `${baseurl}/customer`, 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    "name": name,
                    "contact": contactno,
                    "supplierid": supplierid,
                    "address": {
                        "doorno": doorno,
                        "floor": floorno,
                        "street": street,
                        "apartmentname": apartmentname,
                        "area": area,
                        "city": city,
                        "state": states,
                    }
                }),
            })
                .then((responsejson) => {
                    _setData(JSON.stringify(responsejson.data));
                    Alert.alert('Successfully registered', 'Press Ok and restart the app.', [{ text: 'OK' }])

                })
                .catch(function (error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    Alert.alert('Sorry', 'Registration failed. Please restart the app and try again', [{ text: 'OK'}]  );
                });
        }
        else {
            Alert.alert('Invalid data', 'Please provide Shopname if you are supplier and SupplierId if you are consumer', [{ text: 'OK' }]);
            return;
        }
    }
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.textcss}>Enter Your details</Text>

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Name ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleName} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Contact no  ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleContact} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Door No  ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleDoorNo} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Street  ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleStreet} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Floor No"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleFloorNo} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Apartment Name"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleApartmentName} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Area  ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleArea} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="City  ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleCity} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="State"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleState} />


            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="ShopName ( Mandatory field) "
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleShopName} />

            <View style={styles.buttonstyle}>
                <Button  
                    color = "#dc143c"
                    title="Cancel"
                    onPress={() => BackHandler.exitApp()}
                />
                <Button
                    color = "#228b22"
                    title="Submit"
                    onPress={() => registerData()}
                />
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    input: {
        margin: "2%",
        height: "5%",
        borderColor: 'black',
        borderWidth: 1
    },
    buttonstyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: "5%",
     },
    textcss: {
        color: 'black',
        marginLeft : "5%",
        alignContent : 'center',
    },
    textcss1: {
        color: 'black',
        marginLeft : "5%",
        alignContent : 'center',
    },
  
});


export default Register;
