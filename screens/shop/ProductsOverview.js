import React from 'react'
import { FlatList, View, Text, StyleSheet }  from 'react-native'
import { useSelector } from 'react-redux'

const ProductsOverview = () => {

    const products = useSelector( state => state.products.availableProducts)

    return (
        <FlatList 
            //keyExtractor={item => item.id} 
            data={products} 
            renderItem={ itemData => <Text>{itemData.item.title}</Text>}
        />
    )
}

const styles = StyleSheet.create({

})

export default ProductsOverview