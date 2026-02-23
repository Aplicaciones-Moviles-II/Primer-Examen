import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const ProductsScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');

    //Obtiene cantidad de ítems en el carrito con Redux
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

    useEffect(() => {
    //Recupera el nombre del usuario guardado en AsyncStorage
    AsyncStorage.getItem('userData').then(data => {
        if (data) setUsername(JSON.parse(data).username);
    });
    fetchCategories();
    fetchProducts();
    }, []);

    //Obtiene todas las categorías disponibles en el API
    const fetchCategories = async () => {
    try {
        const res = await axios.get(
        'https://fakestoreapi.com/products/categories',
        );
        setCategories(['all', ...res.data]);
    } catch (e) {
        console.log('Error al cargar categorías:', e);
    }
    };

    //Obtiene productos, filtrados por categoría o todos
    const fetchProducts = async (category = 'all') => {
    setLoading(true);
    try {
        const url =
        category === 'all'
            ? 'https://fakestoreapi.com/products'
            : `https://fakestoreapi.com/products/category/${category}`;
        const res = await axios.get(url);
        setProducts(res.data);
    } catch (e) {
        console.log('Error al cargar productos:', e);
    } finally {
        setLoading(false);
    }
    };

    //Cambia la categoría activa y recarga productos
    const handleCategory = cat => {
    setSelected(cat);
    fetchProducts(cat);
    };

    //Limpia AsyncStorage y regresa al Login
    const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    navigation.replace('Login');
    };

    //Render individual de cada producto en la grilla
    const renderProduct = ({ item }) => (
    <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Detail', { product: item })}>
        <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
        />
        <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
            {item.title}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
    </TouchableOpacity>
    );

    return (
    <View style={styles.container}>
        {/*Encabezado con nombre de la tienda y datos*/}
        <View style={styles.header}>
        <View>
            <Text style={styles.storeName}>Fake Store</Text>
            <Text style={styles.devText}>Primera Prueba Parcial</Text>
            <Text style={styles.devText}>Desarrollado por: Sofía Gutiérrez</Text>
        </View>
        <View style={styles.headerRight}>
            <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.cartBtnText}>Carrito{cartCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Salir</Text>
            </TouchableOpacity>
        </View>
        </View>

        {/*Filtros de categoría en scroll horizontal*/}
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}>
        {categories.map(cat => (
            <TouchableOpacity
            key={cat}
            style={[
                styles.catBtn,
                selected === cat && styles.catBtnActive,
            ]}
            onPress={() => handleCategory(cat)}>
            <Text
                style={[
                styles.catText,
                selected === cat && styles.catTextActive,
                ]}>
                {cat === 'all' ? 'Todos' : cat}
            </Text>
            </TouchableOpacity>
        ))}
        </ScrollView>

        {/* Lista de productos en cuadrícula de 2 columnas */}
        {loading ? (
        <ActivityIndicator
            size="large"
            color="#5840e0"
            style={{ marginTop: 40 }}
        />
        ) : (
        <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={renderProduct}
            numColumns={2}
            contentContainerStyle={styles.list}
        />
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4FF' },
    header: {
    backgroundColor: '#5840e0',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    },
    storeName: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    devText: { color: '#AAB4FF', fontSize: 11 },
    headerRight: { alignItems: 'flex-end' },
    cartBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
    },
    cartBtnText: { color: '#5840e0', fontWeight: 'bold' },
    logout: { color: '#FF8A8A', fontSize: 13 },
    catScroll: { paddingHorizontal: 10, paddingVertical: 8 },
    catBtn: {
    borderWidth: 1,
    borderColor: '#5840e0',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#fff',
    },
    catBtnActive: { backgroundColor: '#5840e0' },
    catText: { color: '#5840e0', fontSize: 12 },
    catTextActive: { color: '#fff' },
    list: { paddingHorizontal: 8, paddingBottom: 20 },
    card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    padding: 10,
    elevation: 3,
    alignItems: 'center',
    },
    image: { width: 100, height: 100, marginBottom: 8 },
    info: { alignItems: 'center' },
    name: { fontSize: 12, color: '#333', textAlign: 'center', marginBottom: 4 },
    price: { fontSize: 14, fontWeight: 'bold', color: '#5840e0' },
});

export default ProductsScreen;