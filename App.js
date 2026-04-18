import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import our custom screens
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Category"
        screenOptions={{
          headerShown: false // Requirements: Disable default headers
        }}
      >
        {/* Step 1: Category Screen (Root) */}
        <Stack.Screen name="Category" component={CategoryScreen} />

        {/* Step 2: Product List Screen */}
        <Stack.Screen name="ProductList" component={ProductListScreen} />

        {/* Step 3: Product Detail Screen */}
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
