import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Button, Text, StyleSheet, Platform, View, ActivityIndicator }  from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProdctItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const products = useSelector( state => state.products.availableProducts)

    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(productsActions.fetchProducts())

        }catch(err){
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    useEffect( () => {
        // si se quiere utilizar async await es importante crear una nueva funcion, 
        //useEffect NO debe retornar una promesa y esta es la forma correcta de hacerlo o usando then catch
        
        loadProducts()
    }, [dispatch, loadProducts])

    const selectItemHandler = (id, title) => {
        navigation.navigate({ 
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title,
            }
        })
    }

    if( error) {
        return (
            <View style={styles.centered}>
                <Text style={{fontFamily:'open-sans-bold', fontSize: 16}}>Ha ocurrido un error!</Text>
                <Button title="Intentar de nuevo" onPress={loadProducts} color={Colors.secondaryDarker}/>
            </View>
        )
    }

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryDark} />
            </View>
        )
    }
    // si no hay productos
    if(!isLoading && products.length === 0){
        return (
            <View style={styles.centered}>
                <Text style={{fontFamily:'open-sans-bold', fontSize: 16}}>No se han encontrado productos</Text>
            </View>
        )
    }

    return (
        <FlatList 
            //keyExtractor={item => item.id} 
            data={products} 
            renderItem={ itemData => (
                <ProdctItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={ () => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button 
                        title="Ver Detalles" 
                        onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} 
                        color={Colors.secondary}
                    />
                    <Button 
                        title="Añadir al Carrito" 
                        onPress={() => {
                            dispatch(cartActions.addToCart(itemData.item))
                        }} 
                        color={Colors.secondary}/>
                </ProdctItem>
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Todos los Productos',
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={ () => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
    )
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen