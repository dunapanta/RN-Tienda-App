import React from 'react'
import { FlatList, StyleSheet }  from 'react-native'
import { useSelector } from 'react-redux'

import ProdctItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen = () => {

    const products = useSelector( state => state.products.availableProducts)

    return (
        <FlatList 
            //keyExtractor={item => item.id} 
            data={products} 
            renderItem={ itemData => (
                <ProdctItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetail={ () => {}}
                    onAddToCart={ () => {}}
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