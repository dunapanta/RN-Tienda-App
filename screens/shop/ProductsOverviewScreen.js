import React from 'react'
import { FlatList, StyleSheet, Platform }  from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProdctItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen = ({ navigation }) => {

    const products = useSelector( state => state.products.availableProducts)

    const dispatch = useDispatch()

    return (
        <FlatList 
            //keyExtractor={item => item.id} 
            data={products} 
            renderItem={ itemData => (
                <ProdctItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={ () => {
                        navigation.navigate({ 
                            routeName: 'ProductDetail',
                            params: {
                                productId: itemData.item.id,
                                productTitle: itemData.item.title,
                            }
                        })
                    }}
                    onAddToCart={ () => {
                        dispatch(cartActions.addToCart(itemData.item))
                    }}
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'Todos los Productos',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Cart"
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={ () => {}}
            />
        </HeaderButtons>
    )
}

const styles = StyleSheet.create({

})

export default ProductsOverviewScreen