
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
import { urlContext , timeoutContext } from '../../App'


const GetPendingPayments = ({ navigation }) => {

    const [totalcancount, setTotalCanCount] = useState(0);
    const [pendingcans, setPendingCans] = useState();
    const [gotpendingcans, setGotPendingCans] = useState(0);
    const [isLoading, setisLoading] = useState(1);

    const baseurl = useContext(urlContext)
    const data = useContext(dataContext)
    const defaultTimeout = useContext( timeoutContext )

    calculateTotalCanCount = ( response) => {        
        var count = 0;
        for ( i in response ) {
            count += response[i].quantity ;
        }

        setTotalCanCount(count);
    }


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

    useEffect(() => {
        axios( {
            url: `${baseurl}/supplier/${data.id}/getallpendingcans`,
            method: 'GET',
            timeout : defaultTimeout,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((responsejson) => {
                if ( responsejson.data ) {
                setPendingCans(responsejson.data)
                calculateTotalCanCount (responsejson.data);
                setGotPendingCans(1);
                setisLoading(false);
            }
            else {
                Alert.alert('Sorry', 'Unable to fetch pending can details. Please retry later', [{ text: 'OK'}]  );

            }
            })
            .catch(error => {
                console.log('problem reading the pendingcans ' + error.message);
                Alert.alert('Sorry', 'Unable to fetch data. Retry later', [{ text: 'OK'}]  );
            });

    }, []);

    renderPendingCans = ( {item} ) => {
        return (
            <TouchableOpacity onPress={() => showAddress(item)} style={[styles.item]}>
                <Text style={styles.title}>Name: {item.customer.name}; PendingCan: {item.quantity}; Contact: {item.customer.contact}</Text>
            </TouchableOpacity>
        );
    }

    if (isLoading) {
        return <View style={styles.container}><ActivityIndicator size="large" /></View>
    }
    else {
        if (gotpendingcans) {
            if (pendingcans.length == 0) {
                return (
                    <Text> You dont have any pending cans with customer</Text>
                );
            }
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.heading}> Total pending cans Can: {totalcancount} </Text>
                    <Text style={styles.textcss}> Your Pendingcans </Text>
                    <FlatList
                        style={styles.listcolor}
                        data={pendingcans}
                        renderItem={renderPendingCans}
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
   
    heading : {
        margin: "3%",
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