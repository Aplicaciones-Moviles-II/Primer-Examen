import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} from '../store/cartSlice';

const CartScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    //Obtiene los ítems del carrito desde el store de Redux
    const items = useSelector(state => state.cart.items);

    //Calcula el gran total multiplicando precio por cantidad de cada ítem
    const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
    );

    //Confirma el pago, limpia el carrito y regresa
    const handlePay = () => {
    Alert.alert(
        'Confirmar Pago',
        `Total a pagar: $${total.toFixed(2)}`,
        [
        {
            text: 'Confirmar',
            onPress: () => {
            dispatch(clearCart());
            Alert.alert('¡Pago exitoso!', 'Gracias por su compra');
            navigation.goBack();
            },
        },
        { text: 'Cancelar' },
        ],
    );
    };

    //Confirma la cancelación y vacía el carrito
    const handleCancel = () => {
    Alert.alert(
        'Cancelar Compra',
        '¿Desea vaciar el carrito y cancelar?',
        [
        {
            text: 'Sí, cancelar',
            onPress: () => {
            dispatch(clearCart());
            navigation.goBack();
            },
        },
        { text: 'No' },
        ],
    );
    };

    //Render de cada producto en el carrito con controles de cantidad
    const renderItem = ({ item }) => (
    <View style={styles.card}>
        <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
        />
        <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
            {item.title}
        </Text>
        <Text style={styles.unitPrice}>
            Precio unitario: ${item.price.toFixed(2)}
        </Text>

        {/*Controles de cantidad: decrementar, mostrar, incrementar*/}
        <View style={styles.qtyRow}>
            <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(decreaseQty(item.id))}>
            <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => dispatch(increaseQty(item.id))}>
            <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
        </View>

        {/*Subtotal del producto*/}
        <Text style={styles.subtotal}>
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </Text>
        </View>

        {/*Botón para eliminar el producto del carrito*/}
        <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => dispatch(removeFromCart(item.id))}>
        <Text style={styles.deleteText}>Borrar</Text>
        </TouchableOpacity>
    </View>
    );

    //Vista cuando el carrito está vacío
    if (items.length === 0) {
    return (
        <View style={styles.empty}>
        <Text style={styles.emptyText}>El carrito está vacío</Text>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.backBtnText}>Seguir comprando</Text>
        </TouchableOpacity>
        </View>
    );
    }

    return (
    <View style={styles.container}>
        {/*Lista de productos en el carrito*/}
        <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        />

        {/*Pie con gran total y botones de acción*/}
        <View style={styles.footer}>
        <Text style={styles.total}>Gran Total: ${total.toFixed(2)}</Text>
        <View style={styles.btnRow}>
            <TouchableOpacity
            style={styles.cancelBtn}
            onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
            <Text style={styles.payText}>Pagar</Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4FF' },
    list: { padding: 12, paddingBottom: 20 },
    card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
    },
    image: { width: 70, height: 70, marginRight: 10 },
    details: { flex: 1 },
    name: { fontSize: 12, color: '#333', marginBottom: 4 },
    unitPrice: { fontSize: 12, color: '#666' },
    qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    },
    qtyBtn: {
    backgroundColor: '#5840e0',
    borderRadius: 6,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    },
    qtyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    qty: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold' },
    subtotal: { fontSize: 13, color: '#5840e0', fontWeight: 'bold' },
    deleteBtn: { padding: 8 },
    deleteText: { fontSize: 20 },
    footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#DDD',
    elevation: 10,
    },
    total: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5840e0',
    textAlign: 'center',
    marginBottom: 12,
    },
    btnRow: { flexDirection: 'row', justifyContent: 'space-between' },
    cancelBtn: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginRight: 8,
    },
    cancelText: { color: '#fff', fontWeight: 'bold' },
    payBtn: {
    flex: 1,
    backgroundColor: '#5840e0',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    },
    payText: { color: '#fff', fontWeight: 'bold' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 20, color: '#666', marginBottom: 20 },
    backBtn: { backgroundColor: '#5840e0', borderRadius: 10, padding: 14 },
    backBtnText: { color: '#fff', fontWeight: 'bold' },
});

export default CartScreen;