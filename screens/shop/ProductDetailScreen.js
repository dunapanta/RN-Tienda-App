import React from 'react'
import { View, Text, Image, Button, ScrrollView, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = ({ navigation }) => {

    const productId = navigation.getParam('productId')
    const selectedProduct = useSelector(
        state => state.products.availableProducts.find(p => p.id === productId) )

    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl}} />
            <View style={styles.action}>
                <Button 
                    title="Agregar al Carrito" 
                    onPress={ () => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }} 
                    color={Colors.secondary}/>
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    action: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: Colors.secondaryDark,
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },
})

export default ProductDetailScreen