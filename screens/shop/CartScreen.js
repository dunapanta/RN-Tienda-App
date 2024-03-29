import React, {useState} from 'react'
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import CardItem from '../../components/shop/CardItem'
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

const CartScreen = () => {
    const [isLoading, setIsLoading] = useState(false)

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                productPushToken: state.cart.items[key].pushToken
            })
        }

        return transformedCartItems.sort( (a, b) => a.productId > b.productId ? 1 : -1)
    }) 

    const dispatch = useDispatch()

    const sendOrderHandler = async () => {
        setIsLoading(true)

        await dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))

        setIsLoading(false)
    }

    return(
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ? <ActivityIndicator size="small" color={Colors.primaryDark}/> : (
                <Button 
                    color={Colors.secondary} 
                    title="Ordenar Ahora" 
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler}
                />)}
            </View>
            <FlatList 
                keyExtractor={item => item.productId}
                data={cartItems}
                renderItem={itemData => (
                    <CardItem 
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={ () => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId))
                        }}
                    />
                )}
            />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Tu Carrito'
}

const styles = StyleSheet.create({
    screen:{
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        // funciona en ios
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // funciona en android
        elevation: 5,

        borderRadius: 10,
        backgroundColor: Colors.primaryLight,
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount:{
        color: Colors.secondaryDarker
    }
})

export default CartScreen