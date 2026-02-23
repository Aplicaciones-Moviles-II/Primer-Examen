import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from '../exam_01/src/store/index';

import LoginScreen from '../exam_01/src/screens/LoginScreen';
import ProductsScreen from '../exam_01/src/screens/ProductsScreen';
import DetailScreen from '../exam_01/src/screens/DetailScreen';
import CartScreen from '../exam_01/src/screens/CartScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
    //Provider pone el store de Redux disponible en toda la aplicación
    <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
            headerStyle: { backgroundColor: '#5840e0' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            }}>
            {/*Pantalla de login sin header*/}
            <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
            />
            {/*Pantalla principal sin header, ya que tiene el propio de ella*/}
            <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={{ headerShown: false }}
            />
            {/*Detalle del producto*/}
            <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: 'Detalle del Producto' }}
            />
            {/*Carrito de compras*/}
            <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Carrito de Compras' }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    </Provider>
    );
};

export default App;
