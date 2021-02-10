/* import { StatusBar } from 'expo-status-bar'; */
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import productsReducer from './store/reducers/products'
import ShopNavigator from './navigation/ShopNavigator'
import Colors from './constants/Colors'

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer)

export default function App() {
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
