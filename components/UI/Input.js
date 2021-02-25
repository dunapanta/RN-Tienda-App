import React, { useReducer } from  'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

const INPUT_CHANGE = 'INPUT_CHANGE'

const inputReducer = (state, action) => {
    switch(action.type) {
        case INPUT_CHANGE:

        
        default:
            return state
    }
}

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initialValid,
        touched: false
    })

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }

        dispatch({ 
            type: INPUT_CHANGE, 
            value: text,
            isValid: isValid
         })
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput 
                {...props}
                style={styles.input}
                value={formState.inputValues.title}
                onChangeText={textChangeHandler}
                /* onEndEditing={ () => console.log('Terminado editar')} */
            />
            {!formState.inputValidities.title && <Text>{props.errorText}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
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

export default Input