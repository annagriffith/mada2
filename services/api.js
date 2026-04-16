// services/api.js
// This file simulates fetching data from a server.

export const getCategories = () => [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Clothing' },
  { id: '3', name: 'Books' },
  { id: '4', name: 'Home & Kitchen' },
];

export const getProducts = (categoryId) => {
  // In a real app, you would fetch products based on the categoryId.
  return [
    { id: '1', name: 'Smartphone', price: '$699', description: 'A high-end smartphone with a great camera.' },
    { id: '2', name: 'Laptop', price: '$999', description: 'A powerful laptop for all your work needs.' },
    { id: '3', name: 'Headphones', price: '$199', description: 'Noise-canceling headphones for immersive sound.' },
  ];
};
