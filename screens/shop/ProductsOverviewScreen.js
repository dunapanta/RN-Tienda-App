import React from 'react'
import { FlatList, StyleSheet }  from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ProdctItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'

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
                        dispatch(cardActions.addToCart(itemData.item))
                    }}
                />
            )}
        />
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'Todos los Productos'
}

const styles = StyleSheet.create({

})

export default ProductsOverviewScreen