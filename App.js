/* import { StatusBar } from 'expo-status-bar'; */
import React from 'react';
import { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font' 
import AppLoading from 'expo-app-loading'
import ReduxThunk from 'redux-thunk'
/* import { composeWithDevTools } from 'redux-devtools-extension' */

import productsReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import authReducer  from './store/reducers/auth'
import ShopNavigator from './navigation/ShopNavigator'
import Colors from './constants/Colors'
import NavigationContainer from './navigation/NavigationContainer'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer
})

// para realizar debugg en development quitar en produccion
/* const store = createStore(rootReducer, composeWithDevTools()) */
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

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

  console.disableYellowBox = true;

  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
    </>
  );
}
