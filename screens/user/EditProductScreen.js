import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/products'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

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
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

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

    useEffect( () => {
       if(error){
           Alert('Ha ocurrido un error', error, [{ text: 'Aceptar'}])
       } 
    },[error]) 

    const submitHandler = useCallback( async () => {
        if(!formState.formIsValid){
            Alert.alert("Datos Inválidos", "Porfavor verifica que los campos sean correctos", [{text: 'Aceptar'}])
            return
        }
        setError(null)
        setIsLoading(true)
        try{
        if (editedProduct) {
            await dispatch(productActions.updateProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl
                ))
        }
        else {
            await dispatch(productActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.imageUrl, 
                +formState.inputValues.price
                ))
        }
        navigation.goBack()
        }catch(err){
            setError(err.message)
        }
        setIsLoading(false)

    }, [dispatch, editedProduct, prodId, formState])

    useEffect( () => {
        navigation.setParams({ submit: submitHandler})
    }, [submitHandler])

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValid) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue,
            isValid: inputValid,
            input: inputIdentifier
         })
    }, [dispatchFormState])

    if(isLoading){
        return <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryDark}/>
            </View>
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}} 
            behavior={(Platform.OS === 'ios')? "padding" : null}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            >
        <ScrollView>
            <View style={styles.form}>
                <Input 
                    id='title'
                    label="Título"
                    errorText="Ingrese un título válido"
                    autoCapitalize='sentences'
                    autoCorrect
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initialValid={!!editedProduct}
                    required
                />
                <Input 
                    id='imageUrl'
                    label="URL de Imagen"
                    errorText="Ingrese una url válida"
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initialValid={!!editedProduct}
                    required
                />

                {editedProduct ? null : (
                    <Input 
                    id='price'
                    label="Precio"
                    onInputChange={inputChangeHandler}
                    errorText="Ingrese un precio válido"
                    keyboardType="decimal-pad"
                    returnKeyType='next'
                    required
                    min={0.1}
                />
                )
                }
                <Input 
                    id='description'
                    label="Descripción"
                    onInputChange={inputChangeHandler}
                    errorText={formState.inputValues.description.length < 5 ? "La descripción debe tener al menos 5 caracteres" : "Ingrese una url válida"}
                    autoCapitalize='sentences'
                    autoCorrect
                    multiline
                    numberOfLines={3}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initialValid={!!editedProduct}
                    required
                    minLength={5}
                />
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditProductScreen
