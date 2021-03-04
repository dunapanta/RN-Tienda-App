import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/orders'
import Colors from '../../constants/Colors'


const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect( () => {
        setIsLoading(true)
        dispatch(ordersActions.fetchOrders()).then( () => {
            setIsLoading(false)
        })
    }, [dispatch])

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryDark}/>
            </View>
        )
    }

    if(orders.length === 0) {
        return (
            <View style={styles.noProducts}>
                <Text style={styles.text}>Aún no se han econtrado ordenes</Text>
            </View>
        )
    }


    return (
        <FlatList 
            keyExtractor={item => item.id}
            data={orders}
            renderItem={itemData => (
                <OrderItem 
                    amount={itemData.item.totalAmount} 
                    date={itemData.item.readableDate} 
                    items={itemData.item.items}
                />
            )}
        />
    )
} 

OrdersScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Tus Ordenes',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={ () => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>
    ),

    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noProducts:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontFamily: 'open-sans',
        fontSize: 18,
        color: Colors.secondaryDarker
    }
})

export default OrdersScreen