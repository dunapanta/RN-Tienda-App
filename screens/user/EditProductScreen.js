import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet, Platform, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer =  (state, action) => {
    if (action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid 
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            ...state,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
            formIsValid: updatedFormIsValid
        }
    }
    return state
}

const EditProductScreen = ({ navigation }) => {
    const prodId = navigation.getParam('productId')
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))

    /* const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    const [titleIsValid, setTitleIsValid] = useState(false)
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '') */

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false,
    })

    const submitHandler = useCallback(() => {
        if(!formState.formIsValid){
            Alert.alert("Datos Inválidos", "Porfavor verifica que los campos sean correctos", [{text: 'Aceptar'}])
            return
        }
        if (editedProduct) {
            dispatch(productActions.updateProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
                ))
        }
        else {
            dispatch(productActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
                ))
        }
        navigation.goBack()

    }, [dispatch, editedProduct, prodId, formState])

    useEffect( () => {
        navigation.setParams({ submit: submitHandler})
    }, [submitHandler])

    const textChangeHandler = (inputIdentifier,text) => {
        let isValid = false
        if (text.trim().length > 0){
            isValid = true
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: text,
            isValid: isValid,
            input: inputIdentifier
         })
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Título</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={(text) => textChangeHandler('title', text)}
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        /* onEndEditing={ () => console.log('Terminado editar')} */
                    />
                    {!formState.inputValidities.title && <Text>Ingrese un título válido</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>URL de Imagen</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.imageUrl}
                        onChangeText={(text) => textChangeHandler('imageUrl', text)}
                    />
                </View>
                {editedProduct ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Precio</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.price}
                        onChangeText={(text) => textChangeHandler('price', text)}
                        keyboardType='decimal-pad'
                    />
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.description}
                        onChangeText={(text) => textChangeHandler('description', text)}
                    />
                </View>
            </View>
        </ScrollView>
    )
}


EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')

    return {
        headerTitle: navData.navigation.getParam('productId')
        ? 'Editar Producto'
        : 'Añadir Producto',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Guardar"
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmeark'}
                    onPress={submitFn}
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
