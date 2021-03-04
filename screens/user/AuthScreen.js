import React, { useState, useReducer, useCallback } from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Platform, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/auth'

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

const AuthScreen = () => {
    const [isSignup, setIsSignup] = useState(false)

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        }, 
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false,
    })

    const dispatch = useDispatch()

    const authHnadler = () => {
        if(isSignup){
            dispatch(
                authActions.signup(formState.inputValues.email, formState.inputValues.password
                    ))
        }else{
            dispatch(
                authActions.login(formState.inputValues.email, formState.inputValues.password
                    ))
        }
    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValid) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue,
            isValid: inputValid,
            input: inputIdentifier
         })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView 
            style={styles.screen}
            behavior={(Platform.OS === 'ios')? "padding" : null}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            >
            <LinearGradient colors={[Colors.primaryLight, Colors.secondaryLight]} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id='email'
                            label='Correo'
                            keyboarsType='email-address'
                            require
                            email
                            autoCapitalize='none'
                            errorText='Ingrese un correo electrónico válido'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input 
                            id='password'
                            label='Contraseña'
                            keyboarsType='default'
                            secureTextEntry
                            require
                            minLength={5}
                            autoCapitalize='none'
                            errorText='La contraseña debe tener al menos 5 caracteres'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                            title={isSignup ? 'Registrarse' :'Iniciar Sesión'} 
                            color={Colors.secondary}
                            onPress={authHnadler}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={`Cambiar a ${isSignup ? 'Iniciar Sesión' : 'Registrarse'}`} 
                                color={Colors.secondaryDark}
                                onPress={ () => {
                                    setIsSignup(preState => !preState)
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Autenticación'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient:{
        flex: 1,
        /* width: '100%',
        height: '100%', */
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer:{
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        color: '#b4ffff'
    },
    buttonContainer:{
        marginTop: 15,
        marginBottom: 5
    }
})

export default AuthScreen