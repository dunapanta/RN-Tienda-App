import React from 'react'
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Platform, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors'

const AuthScreen = () => {
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
                            errorMessage='Ingrese un correo electrónico válido'
                            onInputChange={ () => {}}
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
                            errorMessage='Ingrese una contraseña válida'
                            onInputChange={ () => {}}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                            title='Iniciar Sesión' 
                            color={Colors.secondary}
                            onPress={ () => {}}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='Cambiar a Registrarse' 
                                color={Colors.secondaryDark}
                                onPress={ () => {}}
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