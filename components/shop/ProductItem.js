import React from 'react'
import { View, Text, Image, Button, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const ProdctItem  = ({ image, title, price, onViewDetail, onAddToCart }) => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: image}}/>
            </View>
            <View style={styles.detailInfo}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button title="Ver Detalles" onPress={onViewDetail} color={Colors.secondary}/>
                <Button title="Añadir al Carrito" onPress={onAddToCart} color={Colors.secondary}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product: {
        // funciona en ios
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // funciona en android
        elevation: 5,

        borderRadius: 10,
        backgroundColor: Colors.primaryLight,
        height: 300,
        margin: 20,
    },
    detailInfo:{
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    imageContainer:{
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title:{
        fontSize: 20,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: Colors.secondaryDark
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProdctItem