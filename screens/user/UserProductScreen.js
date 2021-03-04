import React from 'react'
import { View, FlatList, StyleSheet, Button, Platform, Alert, Text } from 'react-native'
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

    const deleteHandler = (id) => {
        Alert.alert('Estas seguro?', 'Deseas eliminar este producto?', [
            { text: 'No', style: 'default'},
            {text: 'Si', style: 'destructive', onPress: () => {
                dispatch(productsActions.deleteProduct(id))
            }}
        ])
    }

    if(userProducts.length === 0) {
        return (
            <View style={styles.noProducts}>
                <Text style={styles.text}>Aún no se han econtrado productos</Text>
            </View>
        )
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
                        onPress={() => deleteHandler(itemData.item.id)} 
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

const styles = StyleSheet.create({
    noProducts:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'open-sans',
        fontSize: 18
    },
    text:{
        fontFamily: 'open-sans',
        fontSize: 18,
        color: Colors.secondaryDarker
    }
})

export default UserProductScreen