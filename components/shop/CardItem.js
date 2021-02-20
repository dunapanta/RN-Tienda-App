import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

const CardItem = ({ quantity, title, amount, onRemove }) => {


    return (
        <View style={styles.cardItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={onRemove}  
                >
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={22}
                            color="red"
                        />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardItem: {
        // funciona en ios
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // funciona en android
        elevation: 5,

        backgroundColor: '#b4ffff',
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans-bold', 
        color: Colors.secondaryDarker,
        fontSize: 16,
        marginRight: 4
    },
    title: {
        fontFamily: 'open-sans-bold', 
        color: Colors.secondaryDarker,
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold', 
        color: Colors.secondaryDarker,
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    },
})

export default CardItem