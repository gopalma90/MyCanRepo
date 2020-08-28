
import React, { useState, useContext, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Button,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';

import { dataContext } from '../HomeScreen'
import { urlContext } from '../../App'

const GetPendingOrders = ({ navigation }) => {

    const baseurl = useContext(urlContext)
    const data = useContext(dataContext)

    const [pendingorders, setPendingOrders] = useState()
    const [gotpendingorders, setGotPendingOrders] = useState(0)
    const [isLoading, setisLoading] = useState(true)


    useEffect(() => {
        getCustomerOrders();
    }, []);



    getCustomerOrders = () => {
        fetch(`${baseurl}/getcustomerpendingorders/${data.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responsejson) => {
                setPendingOrders(responsejson)
                setGotPendingOrders(1)
                setisLoading(false)
            })
            .catch(function (error) {
                console.log('problem retrieving the order ' + error.message);
                throw error;
            });
    }

    updateOrderDismissStatus = (item) => {

        fetch(`${baseurl}/cancelorder/${item.id}/bycustomer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then((response) => response.json())
            .then((responsejson) => {
                if (responsejson) {
                    setPendingOrders(prevOrders => {
                        return prevOrders.filter(singleorder => singleorder.id != item.id)
                    });
                }
            })
            .catch(function (error) {
                console.log('problem cancelling order ' + error.message);
                throw error;
            });
    }


    renderCustomerOrdersData = ({ item }) => {
        var date = item.orderdate;

        date = date.substring(0, date.length - 10);
        date = date.split("T")[0];
        return (
            <TouchableOpacity style={styles.item}>
                <View style={styles.contentstyle}>
                    <View style={styles.itemstyles} >
                        <Text style={styles.title}> Quantity: {item.quantity}</Text>
                        <Text style={styles.title}> Date: {date}</Text>
                    </View>
                    <View style={styles.buttonstyles}>
                        <Button title="Cancel Order"
                            onPress={() => updateOrderDismissStatus(item)}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    if (isLoading) {
        return <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    }
    else {
        if (gotpendingorders) {
            if (pendingorders.length == 0) {
                return (
                    <Text> You dont have any pending orders</Text>
                );
            }
            else {
                return (
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.textcss}> Your Pending orders are </Text>
                        <FlatList
                            style={styles.listcolor}
                            data={pendingorders}
                            renderItem={renderCustomerOrdersData}
                        />
                    </SafeAreaView>

                );
            }
        }
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        borderColor: 'black',
        marginHorizontal: "1%",
        marginVertical: "1%",
        borderWidth: 1,
        height: "30%",
        flex: 1,
        marginTop: "1%",

    },

    textcss: {
        color: 'black',
        marginLeft: "3%",
        alignContent: 'center',
        fontSize: 20,
    },

    listcolor: {
        backgroundColor: 'white',
    },
    title: {
        alignContent: 'center',
        marginLeft: 10,
    },
    itemstyles: {
        height: "150%",
        width: "100%",
        flexDirection: 'column',
        marginTop: "1%",
        justifyContent: 'space-around',
    },
    buttonstyles: {
        marginLeft: "65%",
        width: "30%",
        height: "20%",
    },
    contentstyle: {
        height: "30%",
        justifyContent: 'space-around',
        flexDirection: 'column',
    }

});


export default GetPendingOrders;