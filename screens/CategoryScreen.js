import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { getCategories } from '../services/api';

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const formatName = (name) => {
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  if (loading) return (
    <View style={styles.center}><ActivityIndicator size="large" color="#2196F3" /></View>
  );

  if (error) return (
    <View style={styles.center}><Text style={styles.errorText}>Error: {error}</Text></View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>Categories</Text></View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.pressed]}
            onPress={() => navigation.navigate('ProductList', { category: item })}
          >
            <Text style={styles.cardText}>{formatName(item)}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#2196F3', padding: 20, paddingTop: 40, alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  list: { padding: 15 },
  card: { backgroundColor: '#FFF', padding: 25, borderRadius: 12, marginBottom: 15, elevation: 3, shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: {height: 2} },
  pressed: { opacity: 0.8, backgroundColor: '#E3F2FD' },
  cardText: { fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center' },
  errorText: { color: 'red', fontSize: 16 }
});

export default CategoryScreen;
