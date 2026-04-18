import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet
} from 'react-native';

/**
 * A simple functional component to display an individual product in a list.
 * Props:
 * - product: The product object containing title, price, and image.
 * - onPress: Function to handle clicks on the item.
 */
const ProductItem = ({ product, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      {/* Product Image on the left */}
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Product Info on the right */}
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>
          ${product.price.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    // Shadow for Android
    elevation: 3,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
});

export default ProductItem;
