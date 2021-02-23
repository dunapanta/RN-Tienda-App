import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

import CartItem from './CardItem'

const OrderItem = ({ amount, date }) => {
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.total}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <Button title="Detalles" color={Colors.secondary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    orderItem:{
        // funciona en ios
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // funciona en android
        elevation: 5,

        borderRadius: 10,
        backgroundColor: Colors.primaryLight,
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        margin: 15
    },
    total:{
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        color: Colors.secondaryDarker
    },
    date:{
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.secondaryDarker
    }
})

export default OrderItem