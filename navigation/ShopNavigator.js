import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { Platform, View, SafeAreaView, Button} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductScreen from '../screens/user/UserProductScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'
import * as authActions from '../store/actions/auth'
import Colors from '../constants/Colors'

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? Colors.secondaryDarker : Colors.primary,

    },
    navigationOptions:{
        drawerLabel: 'Productos',
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={22}
                color={drawerConfig.tintColor}
            />
        ) 

    }
})

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? Colors.secondaryDarker : Colors.primary,

    },
    navigationOptions:{
        drawerLabel: 'Ordenes',
        drawerIcon: (drawerConfig) => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={22}
                color={drawerConfig.tintColor}
            />
        ) 
    }
}) 

const AdminNavigator = createStackNavigator({
    UserProduct: UserProductScreen,
    EditProduct: EditProductScreen
}, {
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? Colors.secondaryDarker : Colors.primary,

    },
    navigationOptions:{
        drawerLabel: 'Tus Productos',
        drawerIcon: (drawerConfig) => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={22}
                color={drawerConfig.tintColor}
            />
        ) 
    }
}) 

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentOptions:{
        activeTintColor:  Colors.secondaryDarker,
        labelStyle: {
            fontFamily: 'open-sans-bold',
            fontSize: 20
        }
    },
    drawerBackgroundColor: Colors.primary,
    contentComponent: props => {
        const dispatch = useDispatch()
        return(
            <View style={{flex: 1, paddingTop: 20}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props} />
                    <Button 
                        title="Cerrar Sesión" 
                        color={Colors.secondaryDarker} 
                        onPress={ () => {
                            dispatch(authActions.logout())
                            props.navigation.navigate('Auth')
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle:{
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? Colors.secondaryDarker : Colors.primary,

    },
} )

const MainNavigator  = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)