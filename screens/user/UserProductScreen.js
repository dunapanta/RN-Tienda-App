import React from 'react'
import { FlatList, Button, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = ({ navigation }) => {
    const userProducts = useSelector(state => state.products.userProducts)

    const dispatch = useDispatch()

    const editProductHandler = (id) => {
        navigation.navigate('EditProduct', { productId: id })
    }

    return (
        <FlatList
            keyExtractor={item => item.id} 
            data={userProducts}
            renderItem={itemData => (
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id)
                    }}
                >
                     <Button 
                        title="Editar" 
                        onPress={() => {
                            editProductHandler(itemData.item.id)
                        }} 
                        color={Colors.secondary}
                    />
                    <Button 
                        title="Eliminar" 
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id))
                        }} 
                        color='#b71c1c'/>
                </ProductItem>
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
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Añadir"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={ () => {
                        navData.navigation.navigate('EditProduct')
                    }}
                />
            </HeaderButtons>
    ),

    }
}

export default UserProductScreen