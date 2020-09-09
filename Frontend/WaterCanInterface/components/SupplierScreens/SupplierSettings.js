
import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Button,
    
} from 'react-native';

const SupplierSettings = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonstyles}>
                <Button title="Business Settings"
                    onPress={() => navigation.navigate('BusinessSettings')}
                />
            </View>
        </ScrollView>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonstyles: {
        margin: "2%",
    }
});

export default SupplierSettings;