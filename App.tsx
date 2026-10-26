import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CounterScreen from './screens/CounterScreen';
import CartScreen from './screens/CartScreen';
import { View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <View>
        <CounterScreen />
        <CartScreen />
      </View>
    </Provider>
  );
}