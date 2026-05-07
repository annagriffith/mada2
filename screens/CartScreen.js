import React from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  selectTotalPrice
} from '../store/cartSlice';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector(selectTotalPrice);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => dispatch(decreaseQuantity(item.id))}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => dispatch(increaseQuantity(item.id))}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={styles.removeBtn}
        onPress={() => dispatch(removeFromCart(item.id))}
      >
        <Text style={styles.removeBtnText}>Remove</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        // Requirement 1: Use ListEmptyComponent for the empty cart message
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
      />

      {/* Requirement 2: Only show footer if there are items */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  emptyContainer: {
    paddingTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: { fontSize: 18, color: '#666' },
  header: { backgroundColor: '#2196F3', padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  list: { padding: 15 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { height: 1 }
  },
  image: { width: 60, height: 60, borderRadius: 4 },
  info: { flex: 1, marginLeft: 10 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  price: { fontSize: 14, color: '#2196F3', marginVertical: 4 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    backgroundColor: '#E3F2FD',
    width: 32, // Requirement 3: Slightly larger buttons
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8, // Requirement 3: Better spacing
  },
  qtyBtnText: { fontSize: 20, fontWeight: 'bold', color: '#2196F3' },
  quantity: { fontSize: 16, fontWeight: '600', minWidth: 20, textAlign: 'center' },
  removeBtn: { padding: 5 },
  removeBtnText: { color: '#FF5252', fontWeight: 'bold' },
  footer: {
    backgroundColor: '#FFF',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE'
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  totalAmount: { fontSize: 22, fontWeight: 'bold', color: '#2196F3' },
});

export default CartScreen;
