import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'

const EditProductScreen = ({ navigation }) => {
    const prodId = navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput 
                        style={styles.input}
                        value={title}
                        onChangeText={ text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>URL de Imagen</Text>
                    <TextInput 
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={ text => setImageUrl(text)}
                    />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Precio</Text>
                    <TextInput 
                        style={styles.input}
                        value={price}
                        onChangeText={ text => setPrice(text)}
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={ text => setDescription(text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}


EditProductScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productId')
        ? 'Editar Producto'
        : 'Añadir Producto',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Guardar"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmeark'}
                    onPress={ () => {
                        navData.navigation.navigate('EditProduct')
                    }}
                />
            </HeaderButtons>
    ),
    }
}

const styles = StyleSheet.create({
    form:{
       margin: 20 
    },
    formControl:{
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
        color: Colors.secondaryDarker,
        fontSize: 16
    
    },
    input:{
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1
    }
})

export default EditProductScreen
