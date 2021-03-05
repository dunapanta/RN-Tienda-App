/* import { AsyncStorage } from '@react-native-community/async-storage' */
import * as SecureStore from 'expo-secure-store';

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (userId, token) => {
    return {
        type: AUTHENTICATE,
        userId: userId,
        token: token
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiBrDyMMfV7-p3dm7ZS6vUKFhDm1JdgqM`,
        {
            method: 'POST',
            headers:{
               'Content-Type':  'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        if(!response.ok){
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Algo ha salido mal'
            if(errorId === 'EMAIL_EXIST'){
                message = 'Este correo ya existe'
            } 
            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId })

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)// getTime() current timestamp in miliseconds
        saveDataToStorege(resData.idToken, resData.localId, expirationDate)

    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiBrDyMMfV7-p3dm7ZS6vUKFhDm1JdgqM`,
        {
            method: 'POST',
            headers:{
               'Content-Type':  'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        })

        if(!response.ok){
            const errorResData = await response.json()
            const errorId = errorResData.error.message
            let message = 'Algo ha salido mal'
            if(errorId === 'EMAIL_NOT_FOUND'){
                message = 'No se pudo encontrar el correo'
            } else if (errorId === 'MISSING_PASSWORD'){
                message = 'Ingrese la contraseña'
            } else if (errorId === 'INVALID_EMAIL'){
                message = 'Ingrese un correo válido'
            }

            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId })

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)// getTime() current timestamp in miliseconds
        saveDataToStorege(resData.idToken, resData.localId, expirationDate)
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

const  saveDataToStorege = async (token, userId, expirationDate) => {
    await SecureStore.setItemAsync('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}