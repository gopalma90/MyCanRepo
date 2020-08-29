import React, { useState, useContext } from 'react'
import {
    View, ScrollView, Text, Button, BackHandler, TextInput, StyleSheet,
    Alert,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {urlContext} from '../App'


const Register = (props) => {
    const baseurl =    useContext(urlContext);
    
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
        if ( isNaN(doorno) ) {
            Alert.alert('Invalid data', 'Doorno should be a number.', [{ text: 'OK' }]); 
        }
        if ( isNaN(floorno) ) {
            Alert.alert('Invalid data', 'Floorno should be a number.', [{ text: 'OK' }]); 
        }
        if (shopname && supplierid) {
            Alert.alert('Invalid data', 'Please provide either Shop name  if you are supplier and SupplierId if you are consumer. Not both ', [{ text: 'OK' }]);
        }
        if ( isNaN(contactno) ){
            Alert.alert('Invalid data', 'Contact number should not contain letters', [{ text: 'OK' }]); 
        }
        if (shopname) {
            fetch(`${baseurl}/supplier`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "contact": contactno,
                    "shopname": shopname,
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
                .then((response) => response.json())
                .then((responsejson) => {
                    _setData(JSON.stringify(responsejson));
                    var iddata = " SupplierId " +  responsejson.id 
                    Alert.alert('Successfully registered', JSON.stringify(iddata) , [{ text: 'OK and Restart' }])
                })
                .catch(function (error) {
                    console.log('There has been a problem in registering the supplier ' + error.message);
                    Alert.alert('Sorry', 'Registration failed. Please restart the app and try again', [{ text: 'OK'}]  );
                });
        }
        else if (supplierid) {
            fetch(`${baseurl}/customer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
                .then((response) => response.json())
                .then((responsejson) => {
                    _setData(JSON.stringify(responsejson));
                    Alert.alert('Successfully registered', 'Press Ok and restart the app.', [{ text: 'OK' }])

                })
                .catch(function (error) {
                    console.log('There has been a problem with your fetch operation: ' + error.message);
                    Alert.alert('Sorry', 'Registration failed. Please restart the app and try again', [{ text: 'OK'}]  );
                });
        }
        else {
            Alert.alert('Invalid data', 'Please provide Shopname if you are supplier and SupplierId if you are consumer', [{ text: 'OK' }]);

        }
    }
    return (
        <ScrollView style={styles.container}>

            <Text style={styles.textcss}>Enter Your details</Text>

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Name"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleName} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Contact no"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleContact} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Door No"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleDoorNo} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Street"
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
                placeholder="Area"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleArea} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="City"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleCity} />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="State"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleState} />

            <Text style={styles.textcss1}>Enter the Shopname if you are a supplier</Text>

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="ShopName"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleShopName} />

            <Text style={styles.textcss1} >Enter the SupplierId if you are a Consumer</Text>
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="SupplierId"
                placeholderTextColor="#a9a9a9"
                autoCapitalize="none"
                onChangeText={handleSupplierId} />
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
