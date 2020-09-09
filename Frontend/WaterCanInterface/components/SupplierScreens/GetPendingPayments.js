
import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Button,
    Alert,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios'

import { dataContext } from '../HomeScreen'
import { urlContext, timeoutContext } from '../../App'
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';



const GetPendingPayments = ({ navigation }) => {

    const baseurl = useContext(urlContext)
    const data = useContext(dataContext)
    const defaultTimeout = useContext(timeoutContext)

    const [isLoading, setisLoading] = useState(true)
    const [payments, setpayments] = useState()
    const [gotPendingAmount, setGotPendingAmount] = useState(0)


    useEffect(() => {

        axios({
            url: `${baseurl}/supplier/${data.id}/getpendingpayments`,
            method: 'GET',
            timeout: defaultTimeout,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((responsejson) => {
                if (responsejson.data) {
                    setpayments(responsejson.data)
                    setGotPendingAmount(1);
                    setisLoading(false);
                }
                else {
                    Alert.alert('Sorry', 'Unable to fetch payment data. Retry later', [{ text: 'OK' }]);
                    setisLoading(false);
                }
            })
            .catch(function (error) {
                console.log('problem reading the payments ' + error.message);
                Alert.alert('Sorry', 'Unable to fetch payment data. Retry later', [{ text: 'OK' }]);
            });

    }, []);

    showAddress = (item) => {

        var add;
        if (item.addr.doorno)
            add = "door no: " + item.addr.doorno
        if (item.addr.floorno)
            add += "   Floor no: " + item.addr.floorno
        if (item.addr.street)
            add += "   Street name: " + item.addr.street
        if (item.addr.aptname)
            add += "   Apartment name: " + item.addr.aptname
        if (item.addr.area)
            add += "   Area: " + item.addr.area
        if (item.addr.city)
            add += "   City: " + item.addr.city

        Alert.alert('Customer Address', JSON.stringify(add), [{ text: 'OK' }]);
    }

    updatePendingPayments = (item) => {
        setpayments(prevpaymentlist => {
            return prevpaymentlist.filter(singlepayment => singlepayment.customer.id != item.customer.id)
        });
    }

    updateFullPaymentData = (item) => {

        axios({
            url: `${baseurl}/supplier/${data.id}/updatemoneysettled`,
            method: 'PUT',
            timeout: defaultTimeout,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(item),
        })
            .then((responsejson) => {
                if (responsejson.data) {
                    updatePendingPayments(item)
                }
                else {
                    Alert.alert('failure', " Unable to update payment status", [{ text: 'OK' }]);
                }
            })
            .catch(function (error) {
                console.log('problem setting payment status ' + error.message);
                Alert.alert('failure', " Unable to update payment status", [{ text: 'OK' }]);
            });
    }

    renderPendingPaymentData = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
                <Text style={styles.title}>Name: {item.customer.name}; Amount: {item.amount}; Contact: {item.customer.contact}</Text>
                <View style={styles.buttonsstyling}>

                    <View style={styles.buttonstyles} >
                        <Button title="Paid"
                            onPress={() => updateFullPaymentData(item)}  // ToDo, set payment history
                        />
                    </View>

                </View>

            </TouchableOpacity>
        );
    };

    if (isLoading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>
    }
    else {
        if (gotPendingAmount) {
            if (payments.length == 0) {
                return (
                    <Text> You dont have any pending payments</Text>
                );
            }
            return (
                //<View style={styles.container}>{renderData()}</View>
                <SafeAreaView style={styles.container}>
                    <Text style={styles.textcss}> Your Payment balances are </Text>
                    <FlatList
                        style={styles.listcolor}
                        data={payments}
                        renderItem={renderPendingPaymentData}
                    />
                </SafeAreaView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    textcss: {
        color: 'black',
        marginLeft: "2%",
        alignContent: 'center',
    },
    buttonsstyling: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: "1%",
    },
    buttonstyles: {
        height: "75%",
        width: "90%",
        flexDirection: 'row',
        marginLeft: "5%",
    },
    item: {
        borderColor: 'black',
        marginHorizontal: "1%",
        marginVertical: "2%",
        borderWidth: 1,
    },
    listcolor: {
        backgroundColor: 'white',
    },
    title: {
        fontSize: 15,
        alignContent: 'center',
    },
});

export default GetPendingPayments;