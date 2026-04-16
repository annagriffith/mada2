import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getProducts } from '../services/api';
import ProductItem from '../components/ProductItem';

const ProductListScreen = ({ route, navigation }) => {
  // Get categoryId from route params
  const { categoryId, categoryName } = route.params;
  const products = getProducts(categoryId);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products in {categoryName}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default ProductListScreen;
