import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  StyleSheet
} from 'react-native';
import { getProductById } from '../services/api';

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // Milestone 1: Empty for now
    console.log("Added to cart:", product.title);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Blue Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Product Details</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Text>
        </View>

        <Text style={styles.price}>${product.price.toFixed(2)}</Text>

        <Text style={styles.descriptionHeader}>Description:</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.addToCartButton]}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>ADD TO CART</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.backButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>BACK</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#777',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
  },
  descriptionHeader: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'justify',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
  },
  backButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
