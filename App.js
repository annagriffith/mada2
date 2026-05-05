import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/store';
import { selectTotalQuantity } from './store/cartSlice';

// Import our custom screens
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the Home flow
function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Category"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

// Main Bottom Tab Navigator
function MainTabs() {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Shop',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarBadge: totalQuantity > 0 ? totalQuantity : null,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </Provider>
  );
}
