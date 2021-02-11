/* import { StatusBar } from 'expo-status-bar'; */
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font' 
import AppLoading from 'expo-app-loading'

import productsReducer from './store/reducers/products'
import ShopNavigator from './navigation/ShopNavigator'
import Colors from './constants/Colors'
import { useState } from 'react';

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

const fetchFonts = async () => {
  await Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded){
    return (
          <AppLoading 
            startAsync={fetchFonts}
            onFinish={ () => setFontLoaded(true)}
            onError={ (err) => console.log(err) }
          />
        )
  }

  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  
});
