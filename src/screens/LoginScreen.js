import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    //Estados locales para el formulario
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    //Maneja el proceso de autenticación contra FakeStore API
    const handleLogin = async () => {
    if (!username || !password) {
        Alert.alert('Error', 'Por favor complete todos los campos');
        return;
    }
    setLoading(true);
    try {
        //POST al endpoint de login de FakeStore
        const response = await axios.post(
        'https://fakestoreapi.com/auth/login',
        { username, password },
        );

        const token = response.data.token;

        //Guardar token y usuario en AsyncStorage (Que es almacenamiento local)
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify({ username }));

        setLoading(false);
        //Redirigir a la pasarela de productos
        navigation.replace('Products');
    } catch (error) {
        setLoading(false);
        Alert.alert(
        'Error de autenticación',
        'Credenciales incorrectas.\nPruebe con: mor_2314 / 83r5^_',
        );
    }
    };

    return (
    <View style={styles.container}>
        <View style={styles.card}>
        <Text style={styles.title}>Fake Store</Text>
        <Text style={styles.subtitle}>Iniciar Sesión</Text>

        <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />

        {loading ? (
            <ActivityIndicator size="large" color="#5840e0" />
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
        )}

        <Text style={styles.hint}>
            Usuario de prueba:{'\n'}mor_2314 / 83r5^_
        </Text>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    },
    card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    width: '85%',
    elevation: 5,
    },
    title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5840e0',
    textAlign: 'center',
    marginBottom: 4,
    },
    subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    },
    input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    fontSize: 15,
    color: '#333',
    },
    button: {
    backgroundColor: '#5840e0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 4,
    },
    buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    },
    hint: {
    marginTop: 20,
    textAlign: 'center',
    color: '#888',
    fontSize: 12,
    },
});

export default LoginScreen;
