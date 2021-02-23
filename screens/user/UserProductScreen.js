import React from 'react'
import { FlatList, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'

const UserProductScreen = () => {
    const userProducts = useSelector(state => state.products.userProducts)

    return (
        <FlatList
            keyExtractor={item => item.id} 
            data={userProducts}
            renderItem={itemData => (
                <ProductItem 
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

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Tus Productos',
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

export default UserProductScreen