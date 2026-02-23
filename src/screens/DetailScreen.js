import React from 'react';
    import {
      View,
      Text,
      Image,
      ScrollView,
      TouchableOpacity,
      StyleSheet,
      Alert,
    } from 'react-native';
    import { useDispatch } from 'react-redux';
    import { addToCart } from '../store/cartSlice';

    const DetailScreen = ({ route, navigation }) => {
      //El producto viene como parámetro de navegación
      const { product } = route.params;
      const dispatch = useDispatch();

      //Despacha la acción de Redux para agregar el producto al carrito
      const handleAddToCart = () => {
        dispatch(addToCart(product));
        Alert.alert(
          'Agregado al carrito',
          `${product.title}`,
          [
            {
              text: 'Ver carrito',
              onPress: () => navigation.navigate('Cart'),
            },
            { text: 'Seguir comprando' },
          ],
        );
      };

      return (
        <ScrollView style={styles.container}>
          {/*Imagen del producto*/}
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />

          {/*Etiqueta de categoría*/}
          <View style={styles.catTag}>
            <Text style={styles.catText}>{product.category}</Text>
          </View>

          {/*Nombre del producto*/}
          <Text style={styles.title}>{product.title}</Text>

          {/*Precio y calificación*/}
          <View style={styles.row}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.rating}>
              ⭐ {product.rating.rate} ({product.rating.count} reseñas)
            </Text>
          </View>

          {/*Descripción completa del producto*/}
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Botón para agregar al carrito */}
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Agregar al Carrito</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </ScrollView>
      );
    };

    const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#F0F4FF', padding: 16 },
      image: { width: '100%', height: 250, marginBottom: 16 },
      catTag: {
        backgroundColor: '#E8ECFF',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 8,
      },
      catText: { color: '#5840e0', fontSize: 12, fontWeight: '600' },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 12,
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      price: { fontSize: 24, fontWeight: 'bold', color: '#5840e0' },
      rating: { fontSize: 13, color: '#666' },
      label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
      },
      description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 24,
      },
      button: {
        backgroundColor: '#5840e0',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
      },
      buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    });

    export default DetailScreen;
