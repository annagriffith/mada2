const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetches all available product categories.
 */
export const getCategories = async () => {
  const response = await fetch(`${BASE_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return await response.json();
};

/**
 * Fetches products belonging to a specific category.
 */
export const getProductsByCategory = async (category) => {
  const encodedCategory = encodeURIComponent(category);
  const response = await fetch(`${BASE_URL}/products/category/${encodedCategory}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products for category: ${category}`);
  }

  return await response.json();
};

/**
 * Fetches details for a single product by its ID.
 */
export const getProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }

  return await response.json();
};
