import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getProductById } from '../services/api';
import { addToCart } from '../store/cartSlice';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      Alert.alert("Success", "Added to cart");
    }
  };

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#2196F3" /></View>
  );

  if (error) return (
    <View style={styles.center}><Text style={styles.errorText}>Error: {error}</Text></View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Product Details</Text></View>

      <View style={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Pressable style={[styles.btn, styles.addBtn]} onPress={handleAddToCart}>
          <Text style={styles.btnText}>ADD TO CART</Text>
        </Pressable>

        <Pressable style={[styles.btn, styles.backBtn]} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>BACK</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#2196F3', padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20, alignItems: 'center' },
  image: { width: '100%', height: 300, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
  badge: { backgroundColor: '#F0F0F0', padding: 8, borderRadius: 20, marginBottom: 15 },
  badgeText: { color: '#666', fontSize: 14 },
  price: { fontSize: 26, fontWeight: 'bold', color: '#2196F3', marginBottom: 20 },
  description: { fontSize: 16, color: '#555', lineHeight: 24, textAlign: 'center', marginBottom: 30 },
  btn: { width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  addBtn: { backgroundColor: '#4CAF50' },
  backBtn: { backgroundColor: '#2196F3' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: 'red' }
});

export default ProductDetailScreen;
