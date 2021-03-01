import React, { useEffect } from 'react'
import { FlatList, Button, StyleSheet, Platform }  from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProdctItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = ({ navigation }) => {

    const products = useSelector( state => state.products.availableProducts)

    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(productsActions.fetchProducts())
    }, [dispatch])

    const selectItemHandler = (id, title) => {
        navigation.navigate({ 
            routeName: 'ProductDetail',
            params: {
                productId: id,
                productTitle: title,
            }
        })
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

})

export default ProductsOverviewScreen