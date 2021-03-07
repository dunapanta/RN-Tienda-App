import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
/* import { AsyncStorage } from '@react-native-community/async-storage' */
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

const StartupScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    useEffect( () => {
        const tryLogin = async () => {
            const userData = await SecureStore.getItemAsync('userData')
            if(!userData){
                navigation.navigate('Auth')
                return
            }
            // at this point the token still migth be invalid
            const transformedData = JSON.parse(userData)
            /* console.log("TRANSFORMED",transformedData) */
            const {token, userId, expiryDate} = transformedData
            const expirationDate = new Date(expiryDate)

            // new Date() is the current timestamp, si expiration date esta en el pasado por lo el token que es invalido
            if(expirationDate <= Date() || !token || !userId){
                navigation.navigate('Auth')
                return;
            }
            // Si llega hasta aqui se tiene token y userId válido
            const expirationTime = expirationDate.getTime() - new Date().getTime()

            navigation.navigate('Shop')
            dispatch(authActions.authenticate(userId, token, expirationTime))
        }

        tryLogin()
    },[dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator 
                size='large' 
                color={Colors.primaryDark} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen